import "server-only";
import { getDb, isMemoryDb } from "@/lib/db";

/**
 * Secure activity log (Phase 4).
 *
 * Records security-relevant events AND management actions. Passwords, password
 * hashes, corporate access codes, API keys, and secrets are NEVER logged. The
 * log is persisted to the database when available, with an in-memory bounded
 * ring buffer as a fallback for read-only environments.
 */

export type ActivityAction =
  | "LOGIN_SUCCESS"
  | "LOGIN_FAILED"
  | "LOGOUT"
  | "UNAUTHORIZED_ACCESS"
  | "LEADERSHIP_CREATED"
  | "LEADERSHIP_UPDATED"
  | "LEADERSHIP_DELETED"
  | "COMPANY_CREATED"
  | "COMPANY_UPDATED"
  | "COMPANY_DELETED"
  | "CONTACT_UPDATED"
  | "BRANDING_UPDATED"
  | "SETTINGS_UPDATED"
  | "WEBSITE_LINK_CREATED"
  | "WEBSITE_LINK_UPDATED"
  | "WEBSITE_LINK_DELETED"
  | "IMAGE_UPLOADED";

export interface ActivityEntry {
  id: string;
  timestamp: number;
  action: ActivityAction;
  userId: string | null;
  userName: string | null;
  role: string | null;
  module: string | null;
  target: string | null;
  status: string | null;
  meta?: Record<string, string | number | boolean>;
}

export interface ActivityContext {
  userName?: string;
  role?: string;
  module?: string;
  target?: string;
  status?: string;
  meta?: Record<string, string | number | boolean>;
}

const MAX_ENTRIES = 1000;
let counter = 0;
const entries: ActivityEntry[] = [];

export function recordActivity(
  action: ActivityAction,
  userId: string | null,
  context: ActivityContext = {}
): void {
  counter += 1;
  const entry: ActivityEntry = {
    id: `${Date.now().toString(36)}-${counter.toString(36)}`,
    timestamp: Date.now(),
    action,
    userId,
    userName: context.userName ?? null,
    role: context.role ?? null,
    module: context.module ?? null,
    target: context.target ?? null,
    status: context.status ?? (action.endsWith("_FAILED") ? "failed" : "success"),
    meta: sanitizeMeta(context.meta),
  };

  // In-memory ring buffer (fallback + immediate availability).
  entries.push(entry);
  if (entries.length > MAX_ENTRIES) {
    entries.shift();
  }

  // Persist to the database when possible. Never let logging break a flow.
  try {
    if (!isMemoryDb()) {
      const handle = getDb();
      handle
        .prepare(
          `INSERT INTO activity_logs (id, timestamp, action, user_id, user_name, role, module, target, status, meta)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .run(
          entry.id,
          entry.timestamp,
          entry.action,
          entry.userId,
          entry.userName,
          entry.role,
          entry.module,
          entry.target,
          entry.status,
          entry.meta ? JSON.stringify(entry.meta) : null
        );
    }
  } catch {
    // DB unavailable — in-memory record above is sufficient.
  }
}

/** Never persist sensitive values (passwords, access codes, raw tokens). */
function sanitizeMeta(
  meta?: Record<string, string | number | boolean>
): Record<string, string | number | boolean> | undefined {
  if (!meta) return undefined;
  const safe: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(meta)) {
    const normalized = key.toUpperCase();
    if (
      normalized.includes("PASSWORD") ||
      normalized.includes("ACCESS_CODE") ||
      normalized.includes("TOKEN") ||
      normalized.includes("SECRET") ||
      normalized.includes("CREDENTIAL")
    ) {
      continue;
    }
    safe[key] = value;
  }
  return safe;
}

/** Read the most recent events (newest first). Reads DB when persisted. */
export function getActivityLog(limit = 100): ActivityEntry[] {
  try {
    if (!isMemoryDb()) {
      const handle = getDb();
      const rows = handle
        .prepare("SELECT * FROM activity_logs ORDER BY timestamp DESC LIMIT ?")
        .all(Math.max(1, Math.min(limit, 500))) as Array<Record<string, string | number | null>>;
      if (rows.length > 0) {
        return rows.map((row) => ({
          id: String(row.id),
          timestamp: Number(row.timestamp),
          action: String(row.action) as ActivityAction,
          userId: row.user_id ? String(row.user_id) : null,
          userName: row.user_name ? String(row.user_name) : null,
          role: row.role ? String(row.role) : null,
          module: row.module ? String(row.module) : null,
          target: row.target ? String(row.target) : null,
          status: row.status ? String(row.status) : null,
          meta: row.meta ? safeParseMeta(String(row.meta)) : undefined,
        }));
      }
    }
  } catch {
    // Fall through to the in-memory buffer.
  }
  return entries.slice(-limit).reverse();
}

function safeParseMeta(raw: string): Record<string, string | number | boolean> | undefined {
  try {
    const parsed = JSON.parse(raw) as Record<string, string | number | boolean>;
    return sanitizeMeta(parsed);
  } catch {
    return undefined;
  }
}

export function _clearActivityLogForTesting(): void {
  entries.length = 0;
}