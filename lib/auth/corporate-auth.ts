import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";
import {
  ACCESS_CODE_ENV,
  GENERIC_LOGIN_ERROR,
} from "@/lib/auth/constants";
import { recordActivity } from "@/lib/security/activity-log";
import { getUserForLogin, updateLastLogin } from "@/lib/auth/users";
import type { CorporateRole } from "@/lib/auth/permissions";

/**
 * Secure corporate access-code verification.
 *
 * The real code lives only in server-side environment configuration — never in
 * frontend code or source control. Timing-safe comparison is performed over
 * SHA-256 digests of both values so equal-length, constant-time work happens
 * regardless of the submitted code's length.
 *
 * FAIL-CLOSED: if the environment variable is not configured, the check always
 * fails. No code is ever returned or exposed to clients.
 */
export function verifyAccessCode(presented: string): boolean {
  const expected = process.env[ACCESS_CODE_ENV];
  if (!expected) {
    return false;
  }
  return safeEqual(presented, expected);
}

function safeEqual(a: string, b: string): boolean {
  const digestA = createHash("sha256").update(a).digest();
  const digestB = createHash("sha256").update(b).digest();
  return timingSafeEqual(digestA, digestB);
}

/**
 * Authoritative corporate login orchestration.
 *
 * THE ONLY thing callers may learn from a failure is the generic message —
 * the system deliberately does not reveal which step (access code, user,
 * password, role) failed.
 */
export async function authenticateCorporateUser(input: {
  accessCode: string;
  identifier: string;
  password: string;
  ip: string;
}): Promise<
  | { ok: true; userId: string; name: string; role: CorporateRole; email: string }
  | { ok: false; error: typeof GENERIC_LOGIN_ERROR }
> {
  const genericFailure: { ok: false; error: typeof GENERIC_LOGIN_ERROR } = {
    ok: false,
    error: GENERIC_LOGIN_ERROR,
  };

  // 1. Corporate access code (fail-closed when unset).
  if (!verifyAccessCode(input.accessCode)) {
    recordActivity("LOGIN_FAILED", null);
    return genericFailure;
  }

  // 2. Resolve the corporate user by email or username (fail-safe repo).
  const user = await getUserForLogin(input.identifier);
  if (!user) {
    recordActivity("LOGIN_FAILED", null);
    return genericFailure;
  }

  // 3. Active status.
  if (!user.isActive) {
    recordActivity("LOGIN_FAILED", user.id);
    return genericFailure;
  }

  // 4. Verify password hash (constant-time via bcrypt).
  const { verifyPassword } = await import("@/lib/auth/password");
  const passwordOk = await verifyPassword(input.password, user.passwordHash);
  if (!passwordOk) {
    recordActivity("LOGIN_FAILED", user.id);
    return genericFailure;
  }

  // 5. Verify the account holds an authorized corporate role.
  const { isCorporateRole } = await import("@/lib/auth/permissions");
  if (!isCorporateRole(user.role)) {
    recordActivity("LOGIN_FAILED", user.id);
    return genericFailure;
  }

  // 6. Record a successful login and refresh the last-login timestamp.
  recordActivity("LOGIN_SUCCESS", user.id);
  await updateLastLogin(user.id, Date.now());

  return { ok: true, userId: user.id, name: user.name, role: user.role, email: user.email };
}