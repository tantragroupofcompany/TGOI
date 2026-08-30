import "server-only";

/**
 * Server-side input validation for the corporate login payload.
 * No client-only validation is trusted; every credential field is re-checked
 * here before it is used.
 */

export interface CorporateLoginInput {
  accessCode: string;
  identifier: string; // email OR username
  password: string;
}

const MAX_LOGIN_FIELD_LENGTH = 254;

/** Returns a sanitized, validated payload or a generic error flag. */
export function validateCorporateLoginInput(
  raw: unknown
): { ok: true; data: CorporateLoginInput } | { ok: false } {
  if (typeof raw !== "object" || raw === null) {
    return { ok: false };
  }

  const record = raw as Record<string, unknown>;

  const accessCode = coerceString(record.accessCode);
  const identifier = coerceString(record.identifier);
  const password = typeof record.password === "string" ? record.password : "";

  if (
    !accessCode ||
    !identifier ||
    !password ||
    accessCode.length > MAX_LOGIN_FIELD_LENGTH ||
    identifier.length > MAX_LOGIN_FIELD_LENGTH ||
    password.length > MAX_LOGIN_FIELD_LENGTH
  ) {
    return { ok: false };
  }

  // Both email and username are permitted; we simply require a non-empty,
  // reasonable credential identifier (a full email validation is applied
  // by the user store lookup in Phase 4).
  return {
    ok: true,
    data: { accessCode: accessCode.trim(), identifier: identifier.trim(), password },
  };
}

function coerceString(value: unknown): string {
  return typeof value === "string" ? value : "";
}