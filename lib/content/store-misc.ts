import "server-only";
import { randomUUID } from "node:crypto";
import { getDb, type DbRow } from "@/lib/db";
import type {
  WebsiteLinkRecord,
  ContactRecord,
  BrandingRecord,
  SettingsRecord,
} from "@/lib/content/types";
import { validateWebsiteLink, validateContact, validateBranding } from "@/lib/content/validators";
import { isOneOf, optionalString } from "@/lib/validation/content";
import { recordActivity, type ActivityAction } from "@/lib/security/activity-log";
import type { Actor } from "@/lib/content/store";

function log(
  action: ActivityAction,
  actor: Actor,
  module: string,
  target?: string
): void {
  recordActivity(action, actor.userId, {
    userName: actor.name,
    role: actor.role,
    module,
    target,
    status: "success",
  });
}

function now(): number {
  return Date.now();
}

/* ------------------------------------------------------------------------ */
/* Website links                                                            */
/* ------------------------------------------------------------------------ */

function mapWebsiteLinkRow(row: DbRow): WebsiteLinkRecord {
  return {
    id: String(row.id),
    companyId: row.company_id ? String(row.company_id) : null,
    url: String(row.url ?? ""),
    label: String(row.label ?? ""),
    displayOrder: Number(row.display_order ?? 0),
    isActive: Number(row.is_active ?? 1) === 1,
    createdAt: Number(row.created_at ?? 0),
    updatedAt: Number(row.updated_at ?? 0),
  };
}

export function listWebsiteLinks(): WebsiteLinkRecord[] {
  const handle = getDb();
  const rows = handle
    .prepare("SELECT * FROM website_links ORDER BY display_order ASC, label ASC")
    .all() as DbRow[];
  return rows.map(mapWebsiteLinkRow);
}

export function getWebsiteLink(id: string): WebsiteLinkRecord | null {
  const handle = getDb();
  const row = handle.prepare("SELECT * FROM website_links WHERE id = ?").get(id) as DbRow | undefined;
  return row ? mapWebsiteLinkRow(row) : null;
}

export async function createWebsiteLink(
  input: unknown,
  actor: Actor
): Promise<WebsiteLinkRecord> {
  const validated = validateWebsiteLink(input);
  if (!validated.ok) throw new Error(validated.error);
  const d = validated.data;

  const handle = getDb();
  const id = randomUUID();
  const ts = now();
  handle
    .prepare(
      `INSERT INTO website_links (id, company_id, url, label, display_order, is_active, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(id, d.companyId || null, d.url, d.label, d.displayOrder, d.isActive ? 1 : 0, ts, ts);
  const created = getWebsiteLink(id);
  if (!created) throw new Error("Failed to create website link.");
  log("WEBSITE_LINK_CREATED", actor, "WEBSITE_MANAGEMENT", created.label || created.url);
  return created;
}

export async function updateWebsiteLink(
  id: string,
  input: unknown,
  actor: Actor
): Promise<WebsiteLinkRecord | null> {
  const validated = validateWebsiteLink(input);
  if (!validated.ok) throw new Error(validated.error);
  const d = validated.data;

  const handle = getDb();
  const existing = handle.prepare("SELECT * FROM website_links WHERE id = ?").get(id) as
    | DbRow
    | undefined;
  if (!existing) return null;

  handle
    .prepare(
      `UPDATE website_links SET company_id = ?, url = ?, label = ?, display_order = ?, is_active = ?, updated_at = ?
       WHERE id = ?`
    )
    .run(d.companyId || null, d.url, d.label, d.displayOrder, d.isActive ? 1 : 0, now(), id);
  const updated = getWebsiteLink(id);
  log("WEBSITE_LINK_UPDATED", actor, "WEBSITE_MANAGEMENT", updated?.label || id);
  return updated;
}

export async function deleteWebsiteLink(id: string, actor: Actor): Promise<boolean> {
  const handle = getDb();
  const existing = handle.prepare("SELECT * FROM website_links WHERE id = ?").get(id) as
    | DbRow
    | undefined;
  if (!existing) return false;
  handle.prepare("DELETE FROM website_links WHERE id = ?").run(id);
  log("WEBSITE_LINK_DELETED", actor, "WEBSITE_MANAGEMENT", String(existing.label || existing.url));
  return true;
}

/* ------------------------------------------------------------------------ */
/* Contact                                                                  */
/* ------------------------------------------------------------------------ */

function mapContactRow(row: DbRow): ContactRecord {
  return {
    email: String(row.email ?? ""),
    phone: String(row.phone ?? ""),
    address: String(row.address ?? ""),
    website: String(row.website ?? ""),
    officeHours: String(row.office_hours ?? ""),
    instagram: String(row.instagram ?? ""),
    facebook: String(row.facebook ?? ""),
    linkedin: String(row.linkedin ?? ""),
    youtube: String(row.youtube ?? ""),
    note: String(row.note ?? ""),
    notice: String(row.notice ?? ""),
    updatedAt: Number(row.updated_at ?? 0),
  };
}

export function getContact(): ContactRecord {
  const handle = getDb();
  const row = handle.prepare("SELECT * FROM contact_details WHERE id = 1").get() as DbRow | undefined;
  return row ? mapContactRow(row) : ({} as ContactRecord);
}

export async function updateContact(input: unknown, actor: Actor): Promise<ContactRecord> {
  const validated = validateContact(input);
  if (!validated.ok) throw new Error(validated.error);
  const d = validated.data;

  const handle = getDb();
  handle
    .prepare(
      `UPDATE contact_details SET
        email = ?, phone = ?, address = ?, website = ?, office_hours = ?,
        instagram = ?, facebook = ?, linkedin = ?, youtube = ?, note = ?, notice = ?, updated_at = ?
       WHERE id = 1`
    )
    .run(
      d.email,
      d.phone,
      d.address,
      d.website,
      d.officeHours,
      d.instagram,
      d.facebook,
      d.linkedin,
      d.youtube,
      d.note,
      d.notice,
      now()
    );
  log("CONTACT_UPDATED", actor, "CONTACT_MANAGEMENT", d.email);
  return getContact();
}
/* ------------------------------------------------------------------------ */
/* Branding                                                                 */
/* ------------------------------------------------------------------------ */

function mapBrandingRow(row: DbRow): BrandingRecord {
  return {
    companyName: String(row.company_name ?? ""),
    shortName: String(row.short_name ?? ""),
    tagline: String(row.tagline ?? ""),
    logoPath: String(row.logo_path ?? "/logo/tgoi-logo.svg"),
    faviconPath: String(row.favicon_path ?? "/icon.svg"),
    updatedAt: Number(row.updated_at ?? 0),
  };
}

export function getBranding(): BrandingRecord {
  const handle = getDb();
  const row = handle.prepare("SELECT * FROM branding WHERE id = 1").get() as DbRow | undefined;
  return row ? mapBrandingRow(row) : ({} as BrandingRecord);
}

export async function updateBranding(input: unknown, actor: Actor): Promise<BrandingRecord> {
  const validated = validateBranding(input);
  if (!validated.ok) throw new Error(validated.error);
  const d = validated.data;

  const handle = getDb();
  handle
    .prepare(
      `UPDATE branding SET
        company_name = ?, short_name = ?, tagline = ?, logo_path = ?, favicon_path = ?, updated_at = ?
       WHERE id = 1`
    )
    .run(d.companyName, d.shortName, d.tagline, d.logoPath, d.faviconPath, now());
  log("BRANDING_UPDATED", actor, "BRANDING_MANAGEMENT", d.companyName);
  return getBranding();
}

/* ------------------------------------------------------------------------ */
/* Settings (controlled key/value; no security settings exposed)            */
/* ------------------------------------------------------------------------ */

const SETTING_KEYS = [
  "websiteName",
  "tagline",
  "defaultInfo",
  "publicVisibility",
  "contentDisplay",
] as const;

export function getSettings(): SettingsRecord {
  const handle = getDb();
  const rows = handle.prepare("SELECT key, value FROM settings").all() as DbRow[];
  const map = new Map(rows.map((r) => [String(r.key), String(r.value ?? "")]));
  return {
    websiteName: map.get("websiteName") ?? "",
    tagline: map.get("tagline") ?? "",
    defaultInfo: map.get("defaultInfo") ?? "",
    publicVisibility: map.get("publicVisibility") ?? "public",
    contentDisplay: map.get("contentDisplay") ?? "standard",
  };
}

export async function updateSettings(input: unknown, actor: Actor): Promise<SettingsRecord> {
  const record = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;
  const websiteName = optionalString(record.websiteName, 120);
  if (!websiteName) throw new Error("Website name is required.");

  const d: SettingsRecord = {
    websiteName,
    tagline: optionalString(record.tagline, 300),
    defaultInfo: optionalString(record.defaultInfo, 2000),
    publicVisibility: isOneOf(record.publicVisibility, ["public", "draft"])
      ? record.publicVisibility
      : "public",
    contentDisplay: isOneOf(record.contentDisplay, ["standard", "minimal"])
      ? record.contentDisplay
      : "standard",
  };

  const handle = getDb();
  const upsert = handle.prepare(
    "INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value"
  );
  for (const key of SETTING_KEYS) {
    upsert.run(key, String(d[key]));
  }
  log("SETTINGS_UPDATED", actor, "SETTINGS", d.websiteName);
  return getSettings();
}