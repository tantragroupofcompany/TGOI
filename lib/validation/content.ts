import "server-only";

/**
 * Server-side content validation (Phase 4).
 * Every management write must pass through these validators — client-side
 * validation is never trusted on its own.
 */

const MAX_LENGTH = 2000;

export type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export function requiredString(value: unknown, max = MAX_LENGTH, label = "Field"): string | null {
  if (typeof value !== "string") return `${label} is required.`;
  const trimmed = value.trim();
  if (!trimmed) return `${label} is required.`;
  if (trimmed.length > max) return `${label} must be ${max} characters or fewer.`;
  return null;
}

export function optionalString(value: unknown, max = MAX_LENGTH): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function isEmail(value: string): boolean {
  // Practical email check (matches the common corporate formats).
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

export function isUrl(value: string): boolean {
  if (!/^https?:\/\//i.test(value)) return false;
  try {
    const url = new URL(value);
    return url.hostname.includes(".");
  } catch {
    return false;
  }
}

export function isPhone(value: string): boolean {
  // Loose international phone check: digits, spaces, +, -, parentheses.
  const compact = value.replace(/[\s\-()]/g, "");
  return /^\+?\d{7,15}$/.test(compact);
}

export function isOneOf<T extends string>(value: unknown, allowed: readonly T[]): value is T {
  return typeof value === "string" && (allowed as readonly string[]).includes(value);
}

export function toBoolean(value: unknown): boolean {
  return value === true || value === "true" || value === "1" || value === 1;
}

export function parseIntOr(value: unknown, fallback = 0): number {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? Math.max(0, Math.floor(n)) : fallback;
}

export function readBody(record: Record<string, unknown>, key: string): string {
  return typeof record[key] === "string" ? record[key] : "";
}