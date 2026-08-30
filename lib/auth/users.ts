import "server-only";
import type { CorporateRole } from "@/lib/auth/permissions";
import { DATABASE_URL_ENV } from "@/lib/auth/constants";

/**
 * Corporate user repository (database-ready).
 *
 * Phase 3 does NOT include a database (Phases 4–5 add the production data
 * layer). To comply with the security model:
 *   - no demo accounts are seeded,
 *   - no passwords/access codes are hardcoded,
 *   - the repository FAILS SAFE: until a real database / provisioning path is
 *     configured, login always resolves to "no user" and is rejected with a
 *     generic error.
 *
 * To connect a production database, implement `getUserForLogin` against the
 * chosen store (see `DATABASE_URL_ENV`) and return users that were provisioned
 * through the authorized internal account-management process.
 */

export interface CorporateUser {
  id: string;
  name: string;
  email: string;
  username: string;
  /** bcrypt hash — never returned to clients. */
  passwordHash: string;
  role: CorporateRole;
  isActive: boolean;
  lastLoginAt: number | null;
  createdAt: number;
  updatedAt: number;
}

/** Whether a production database connection is configured. */
export function isDatabaseConfigured(): boolean {
  return Boolean(process.env[DATABASE_URL_ENV]);
}

/**
 * Resolve a corporate user by email or username.
 *
 * Fail-safe default: returns null when no database is configured. Swap this
 * implementation for a real query in Phase 4 — do NOT store corporate users
 * in frontend code or commit credentials.
 */
export async function getUserForLogin(
  identifier: string
): Promise<CorporateUser | null> {
  if (!isDatabaseConfigured()) {
    return null;
  }
  // TODO(Phase 4): query the production users table by normalized email or
  // username (return only active accounts here or filter by isActive below).
  void identifier;
  return null;
}

/** Records a successful login timestamp (fire-and-forget; DB in Phase 4). */
export async function updateLastLogin(
  userId: string,
  timestamp: number
): Promise<void> {
  if (!isDatabaseConfigured()) return;
  // TODO(Phase 4): UPDATE users SET last_login_at = ? WHERE id = ?
  void userId;
  void timestamp;
}