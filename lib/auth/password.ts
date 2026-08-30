import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

/**
 * Hash a plain-text password with a strong, one-way algorithm (bcrypt).
 *
 * Passwords are NEVER stored, logged, or returned by any API — only their
 * bcrypt hashes ever exist in storage.
 */
export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

/**
 * Constant-time-ish verification of a plain-text password against its stored
 * bcrypt hash. bcrypt internally uses timing-safe comparison of the computed
 * hash, which is sufficient for password verification.
 */
export async function verifyPassword(
  plain: string,
  storedHash: string
): Promise<boolean> {
  if (!plain || !storedHash) return false;
  try {
    return await bcrypt.compare(plain, storedHash);
  } catch {
    // Never leak whether hashing failed.
    return false;
  }
}