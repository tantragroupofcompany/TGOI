import "server-only";
import { randomBytes } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Image upload storage (Phase 4).
 *
 * A clean storage abstraction for leadership photos, company logos, and brand
 * assets. Phase 4 uses a local provider that writes validated files under
 * public/uploads (dev/local). Production should set STORAGE_PROVIDER and
 * STORAGE_BUCKET and implement an equivalent S3/R2/blob provider behind this
 * same interface — no caller code changes.
 *
 * Security: only allow-listed image MIME types and extensions, a size limit,
 * magic-byte sniffing, and generated unique filenames (never user input) so
 * traversal / arbitrary-file execution is impossible.
 */

export const ALLOWED_IMAGE_TYPES: Record<string, string[]> = {
  "image/png": [".png"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/webp": [".webp"],
  "image/gif": [".gif"],
};

export const MAX_IMAGE_BYTES = 2 * 1024 * 1024; // 2 MB

/** Approximate magic-byte check for the allow-listed formats. */
function sniffImageType(buffer: Buffer): string | null {
  if (buffer.length < 12) return null;
  // PNG
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
    return "image/png";
  }
  // JPEG
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "image/jpeg";
  }
  // GIF
  if (
    (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x38) ||
    (buffer[12] === 0x47 && buffer[13] === 0x49 && buffer[14] === 0x46 && buffer[15] === 0x38)
  ) {
    return "image/gif";
  }
  // WebP (RIFF....WEBP)
  if (
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return "image/webp";
  }
  return null;
}

function contentTypeFromExtension(name: string): string | null {
  const lower = name.toLowerCase();
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".gif")) return "image/gif";
  return null;
}

export interface StoredImage {
  url: string;
  fileName: string;
  size: number;
}

/**
 * Validate and store an uploaded image. Throws a clear error message on any
 * rejection (file too large, wrong type, mismatched contents).
 */
export async function saveImage(file: File): Promise<StoredImage> {
  if (!file || typeof file.arrayBuffer !== "function") {
    throw new Error("No file was provided.");
  }

  const clientType = file.type || contentTypeFromExtension(file.name) || "";
  if (!ALLOWED_IMAGE_TYPES[clientType]) {
    throw new Error("Unsupported file type. Allowed: PNG, JPEG, WebP, GIF.");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  if (buffer.length === 0) {
    throw new Error("The uploaded file is empty.");
  }
  if (buffer.length > MAX_IMAGE_BYTES) {
    throw new Error("Image is too large. Maximum size is 2 MB.");
  }

  const sniffedType = sniffImageType(buffer);
  if (!sniffedType || sniffedType !== clientType) {
    throw new Error("The file contents do not match a supported image type.");
  }

  const extension = ALLOWED_IMAGE_TYPES[clientType][0];
  const fileName = `${Date.now().toString(36)}-${randomBytes(8).toString("hex")}${extension}`;
  const folder = join(process.cwd(), "public", "uploads");
  mkdirSync(folder, { recursive: true });
  writeFileSync(join(folder, fileName), buffer);

  return { url: `/uploads/${fileName}`, fileName, size: buffer.length };
}

/** Storage-provider documentation values for `.env.example`. */
export const STORAGE_PROVIDER_ENV = "STORAGE_PROVIDER";
export const STORAGE_BUCKET_ENV = "STORAGE_BUCKET";