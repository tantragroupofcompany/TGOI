import "server-only";

/**
 * Secure activity-log foundation (Phase 3).
 *
 * Records only security-relevant events. Passwords and corporate access codes
 * are NEVER logged. The full Activity Log management UI is added in Phase 4;
 * here the events are captured in an in-memory, bounded ring buffer that can be
 * swapped for a database-backed store later.
 */

export type ActivityAction =
  | "LOGIN_SUCCESS"
  | "LOGIN_FAILED"
  | "LOGOUT"
  | "UNAUTHORIZED_ACCESS";

export interface ActivityEntry {
  id: string;
  timestamp: number;
  action: ActivityAction;
  userId: string | null;
  meta?: Record<string, string | number | boolean>;
}

const MAX_ENTRIES = 1000;
let counter = 0;
const entries: ActivityEntry[] = [];

export function recordActivity(
  action: ActivityAction,
  userId: string | null,
  meta?: ActivityEntry["meta"]
): void {
  counter += 1;
  const entry: ActivityEntry = {
    id: `${Date.now().toString(36)}-${counter.toString(36)}`,
    timestamp: Date.now(),
    action,
    userId,
    meta: sanitizeMeta(meta),
  };
  entries.push(entry);
  if (entries.length > MAX_ENTRIES) {
    entries.shift();
  }
}

/** Never persist sensitive values (passwords, access codes, raw tokens). */
function sanitizeMeta(meta?: ActivityEntry["meta"]): ActivityEntry["meta"] | undefined {
  if (!meta) return undefined;
  const safe: ActivityEntry["meta"] = {};
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

/** Read the most recent events (newest first). Server-side only. */
export function getActivityLog(limit = 100): ActivityEntry[] {
  return entries.slice(-limit).reverse();
}

export function _clearActivityLogForTesting(): void {
  entries.length = 0;
}