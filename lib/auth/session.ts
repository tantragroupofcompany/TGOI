import "server-only";
import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import type { CorporateRole } from "@/lib/auth/permissions";
import {
  CORPORATE_SESSION_COOKIE,
  SESSION_REFRESH_WINDOW_MS,
  SESSION_TTL_MS,
} from "@/lib/auth/constants";

/**
 * Secure corporate sessions.
 *
 * Design: opaque random session tokens stored in a server-side session store,
 * delivered to the browser only inside an HttpOnly, SameSite cookie. This
 * intentionally avoids stateless JWTs / Base64-encoded payloads and (unlike a
 * stateless cookie) lets us genuinely invalidate a session on logout.
 *
 * Phase 3 hosts the store in memory (single instance). The store interface is
 * deliberately small so it can be swapped for a database-backed or Redis store
 * in Phase 4/5 without changing authentication logic.
 */

export interface CorporateSession {
  token: string;
  userId: string;
  name: string;
  role: CorporateRole;
  email: string;
  createdAt: number;
  expiresAt: number;
}

interface SessionRecord {
  session: CorporateSession;
}

/** In-memory store — replace with a persistent store in Phase 4+ (see README). */
const sessionStore = new Map<string, SessionRecord>();

function now(): number {
  return Date.now();
}

function isExpired(session: CorporateSession): boolean {
  return session.expiresAt <= now();
}

/** Generate a cryptographically random opaque session token. */
function generateToken(): string {
  return randomBytes(32).toString("hex");
}

function serializeCookie(token: string, maxAgeSeconds: number): string {
  const parts = [
    `${CORPORATE_SESSION_COOKIE}=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
  ];
  if (process.env.NODE_ENV === "production") {
    parts.push("Secure");
  }
  parts.push(`Max-Age=${Math.floor(maxAgeSeconds)}`);
  return parts.join("; ");
}

/**
 * Store a session in memory and set the HttpOnly cookie. Returns the token.
 */
export async function createSession(input: {
  userId: string;
  name: string;
  role: CorporateRole;
  email: string;
}): Promise<string> {
  const token = generateToken();
  const issuedAt = now();
  const session: CorporateSession = {
    token,
    userId: input.userId,
    name: input.name,
    role: input.role,
    email: input.email,
    createdAt: issuedAt,
    expiresAt: issuedAt + SESSION_TTL_MS,
  };
  sessionStore.set(token, { session });

  const cookieStore = await cookies();
  cookieStore.set(CORPORATE_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });

  return token;
}

/**
 * Read the current session from the request cookie and validate it.
 * Applies a sliding expiration — a still-valid session refreshes its
 * expiry on active use.
 */
export async function getSession(): Promise<CorporateSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(CORPORATE_SESSION_COOKIE)?.value;
  if (!token) return null;

  const record = sessionStore.get(token);
  if (!record) return null;
  if (isExpired(record.session)) {
    sessionStore.delete(token);
    return null;
  }

  // Sliding expiration refresh.
  const remaining = record.session.expiresAt - now();
  if (remaining <= SESSION_REFRESH_WINDOW_MS) {
    record.session.expiresAt = now() + SESSION_TTL_MS;
  }

  return record.session;
}

/**
 * Invalidates a session (if present) and clears the authentication cookie.
 * Used by both logout and any forced-session-removal flows.
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(CORPORATE_SESSION_COOKIE)?.value;
  if (token) {
    sessionStore.delete(token);
  }
  cookieStore.set(CORPORATE_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

/** Used by tests/utilities to reset state (server-only). */
export function _clearSessionStoreForTesting(): void {
  sessionStore.clear();
}

export { serializeCookie };