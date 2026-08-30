import "server-only";

/**
 * Minimal, reasonable login rate limiting (Phase 3).
 *
 * A per-IP sliding-window attempt counter that guards the corporate login
 * endpoint against brute force. In-memory for this single-instance phase; can
 * be swapped for Redis/DB in Phase 4+. No IPs are persisted or logged.
 */

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 10;

interface AttemptBucket {
  count: number;
  windowStart: number;
}

const buckets = new Map<string, AttemptBucket>();

function prune(): void {
  const cutoff = Date.now() - WINDOW_MS;
  for (const [key, bucket] of buckets) {
    if (bucket.windowStart < cutoff) {
      buckets.delete(key);
    }
  }
}

export function isRateLimited(ip: string): boolean {
  prune();
  const bucket = buckets.get(ip);
  return bucket ? bucket.count >= MAX_ATTEMPTS : false;
}

/** Record an attempt (called on every login submission). */
export function recordAttempt(ip: string): void {
  const nowTimestamp = Date.now();
  const bucket = buckets.get(ip);
  if (!bucket || bucket.windowStart + WINDOW_MS <= nowTimestamp) {
    buckets.set(ip, { count: 1, windowStart: nowTimestamp });
    return;
  }
  bucket.count += 1;
}

/** Reset the counter for an IP (e.g. on a successful login). */
export function resetAttempts(ip: string): void {
  buckets.delete(ip);
}