import "server-only";
import type { CorporateRole } from "@/lib/auth/permissions";
import { getDb, type DbRow } from "@/lib/db";

/**
 * Corporate user repository.
 *
 * Reads and updates user credentials from the SQLite database.
 * Passwords and access codes are stored only as strong hashes.
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

/** Whether a production database connection or SQLite store is available. */
export function isDatabaseConfigured(): boolean {
  try {
    getDb();
    return true;
  } catch {
    return false;
  }
}

/**
 * Resolve a corporate user by email or username.
 * Queries the corporate_users table in the SQLite database.
 */
export async function getUserForLogin(
  identifier: string
): Promise<CorporateUser | null> {
  try {
    const handle = getDb();
    const normalized = identifier.trim().toLowerCase();
    const row = handle
      .prepare(
        "SELECT * FROM corporate_users WHERE LOWER(email) = ? OR LOWER(username) = ?"
      )
      .get(normalized, normalized) as DbRow | undefined;

    if (!row) return null;

    return {
      id: String(row.id),
      name: String(row.name ?? ""),
      email: String(row.email ?? ""),
      username: String(row.username ?? ""),
      passwordHash: String(row.password_hash ?? ""),
      role: String(row.role) as CorporateRole,
      isActive: Number(row.is_active ?? 1) === 1,
      lastLoginAt: row.last_login_at ? Number(row.last_login_at) : null,
      createdAt: Number(row.created_at ?? 0),
      updatedAt: Number(row.updated_at ?? 0),
    };
  } catch {
    return null;
  }
}

/** Records a successful login timestamp in the corporate_users table. */
export async function updateLastLogin(
  userId: string,
  timestamp: number
): Promise<void> {
  try {
    const handle = getDb();
    handle
      .prepare("UPDATE corporate_users SET last_login_at = ?, updated_at = ? WHERE id = ?")
      .run(timestamp, timestamp, userId);
  } catch {
    // Fail safe
  }
}