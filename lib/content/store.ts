import "server-only";
import { randomUUID } from "node:crypto";
import { getDb, type DbRow } from "@/lib/db";
import type { LeadershipRecord, CompanyRecord } from "@/lib/content/types";
import { validateLeadership, validateCompany } from "@/lib/content/validators";
import { recordActivity, type ActivityAction } from "@/lib/security/activity-log";

/** Who is performing the write (for the activity log). */
export interface Actor {
  userId: string;
  name: string;
  role: string;
}

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
/* Leadership                                                               */
/* ------------------------------------------------------------------------ */

function mapLeadershipRow(row: DbRow): LeadershipRecord {
  return {
    id: String(row.id),
    roleKey: String(row.role_key) as LeadershipRecord["roleKey"],
    roleLabel: String(row.role_label ?? ""),
    fullName: String(row.full_name ?? ""),
    photo: row.photo ? String(row.photo) : null,
    photoAlt: String(row.photo_alt ?? ""),
    shortIntro: String(row.short_intro ?? ""),
    biography: String(row.biography ?? ""),
    insightHeading: String(row.insight_heading ?? ""),
    insightStatement: String(row.insight_statement ?? ""),
    messageHeading: String(row.message_heading ?? ""),
    message: String(row.message ?? ""),
    displayOrder: Number(row.display_order ?? 0),
    isActive: Number(row.is_active ?? 1) === 1,
    createdAt: Number(row.created_at ?? 0),
    updatedAt: Number(row.updated_at ?? 0),
  };
}

export function listLeadership(): LeadershipRecord[] {
  const handle = getDb();
  const rows = handle
    .prepare("SELECT * FROM leadership_members ORDER BY display_order ASC, full_name ASC")
    .all() as DbRow[];
  return rows.map(mapLeadershipRow);
}

export function getLeadership(id: string): LeadershipRecord | null {
  const handle = getDb();
  const row = handle.prepare("SELECT * FROM leadership_members WHERE id = ?").get(id) as
    | DbRow
    | undefined;
  return row ? mapLeadershipRow(row) : null;
}

export async function createLeadership(
  input: unknown,
  actor: Actor
): Promise<LeadershipRecord> {
  const validated = validateLeadership(input);
  if (!validated.ok) throw new Error(validated.error);
  const d = validated.data;

  const handle = getDb();
  const id = randomUUID();
  const ts = now();
  handle
    .prepare(
      `INSERT INTO leadership_members
        (id, role_key, role_label, full_name, photo, photo_alt, short_intro, biography,
         insight_heading, insight_statement, message_heading, message, display_order, is_active, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      id,
      d.roleKey,
      d.roleLabel,
      d.fullName,
      d.photo || null,
      d.photoAlt,
      d.shortIntro,
      d.biography,
      d.insightHeading,
      d.insightStatement,
      d.messageHeading,
      d.message,
      d.displayOrder,
      d.isActive ? 1 : 0,
      ts,
      ts
    );
  const created = getLeadership(id);
  if (!created) throw new Error("Failed to create leadership member.");
  log("LEADERSHIP_CREATED", actor, "LEADERSHIP_MANAGEMENT", created.fullName);
  return created;
}

export async function updateLeadership(
  id: string,
  input: unknown,
  actor: Actor
): Promise<LeadershipRecord | null> {
  const validated = validateLeadership(input);
  if (!validated.ok) throw new Error(validated.error);
  const d = validated.data;

  const handle = getDb();
  const existing = handle.prepare("SELECT * FROM leadership_members WHERE id = ?").get(id) as
    | DbRow
    | undefined;
  if (!existing) return null;

  handle
    .prepare(
      `UPDATE leadership_members SET
        role_key = ?, role_label = ?, full_name = ?, photo = ?, photo_alt = ?, short_intro = ?,
        biography = ?, insight_heading = ?, insight_statement = ?, message_heading = ?,
        message = ?, display_order = ?, is_active = ?, updated_at = ?
       WHERE id = ?`
    )
    .run(
      d.roleKey,
      d.roleLabel,
      d.fullName,
      d.photo || null,
      d.photoAlt,
      d.shortIntro,
      d.biography,
      d.insightHeading,
      d.insightStatement,
      d.messageHeading,
      d.message,
      d.displayOrder,
      d.isActive ? 1 : 0,
      now(),
      id
    );
  const updated = getLeadership(id);
  log("LEADERSHIP_UPDATED", actor, "LEADERSHIP_MANAGEMENT", updated?.fullName ?? id);
  return updated;
}

export async function deleteLeadership(id: string, actor: Actor): Promise<boolean> {
  const handle = getDb();
  const existing = handle.prepare("SELECT * FROM leadership_members WHERE id = ?").get(id) as
    | DbRow
    | undefined;
  if (!existing) return false;
  handle.prepare("DELETE FROM leadership_members WHERE id = ?").run(id);
  log("LEADERSHIP_DELETED", actor, "LEADERSHIP_MANAGEMENT", String(existing.full_name));
  return true;
}
/* ------------------------------------------------------------------------ */
/* Companies                                                                */
/* ------------------------------------------------------------------------ */

function mapCompanyRow(row: DbRow): CompanyRecord {
  return {
    id: String(row.id),
    name: String(row.name ?? ""),
    logo: String(row.logo ?? ""),
    shortDescription: String(row.short_description ?? ""),
    fullDescription: String(row.full_description ?? ""),
    category: String(row.category ?? ""),
    website: String(row.website ?? ""),
    status: String(row.status ?? "LIVE") as CompanyRecord["status"],
    founded: row.founded ? String(row.founded) : null,
    displayOrder: Number(row.display_order ?? 0),
    featured: Number(row.featured ?? 0) === 1,
    isActive: Number(row.is_active ?? 1) === 1,
    createdAt: Number(row.created_at ?? 0),
    updatedAt: Number(row.updated_at ?? 0),
  };
}

export function listCompanies(): CompanyRecord[] {
  const handle = getDb();
  const rows = handle
    .prepare("SELECT * FROM companies ORDER BY display_order ASC, name ASC")
    .all() as DbRow[];
  return rows.map(mapCompanyRow);
}

export function getCompany(id: string): CompanyRecord | null {
  const handle = getDb();
  const row = handle.prepare("SELECT * FROM companies WHERE id = ?").get(id) as DbRow | undefined;
  return row ? mapCompanyRow(row) : null;
}

export async function createCompany(input: unknown, actor: Actor): Promise<CompanyRecord> {
  const validated = validateCompany(input);
  if (!validated.ok) throw new Error(validated.error);
  const d = validated.data;

  const handle = getDb();
  const id = randomUUID();
  const ts = now();
  handle
    .prepare(
      `INSERT INTO companies
        (id, name, logo, short_description, full_description, category, website, status, founded,
         display_order, featured, is_active, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      id,
      d.name,
      d.logo,
      d.shortDescription,
      d.fullDescription,
      d.category,
      d.website,
      d.status,
      d.founded || null,
      d.displayOrder,
      d.featured ? 1 : 0,
      d.isActive ? 1 : 0,
      ts,
      ts
    );
  const created = getCompany(id);
  if (!created) throw new Error("Failed to create company.");
  log("COMPANY_CREATED", actor, "COMPANY_MANAGEMENT", created.name);
  return created;
}

export async function updateCompany(
  id: string,
  input: unknown,
  actor: Actor
): Promise<CompanyRecord | null> {
  const validated = validateCompany(input);
  if (!validated.ok) throw new Error(validated.error);
  const d = validated.data;

  const handle = getDb();
  const existing = handle.prepare("SELECT * FROM companies WHERE id = ?").get(id) as
    | DbRow
    | undefined;
  if (!existing) return null;

  handle
    .prepare(
      `UPDATE companies SET
        name = ?, logo = ?, short_description = ?, full_description = ?, category = ?,
        website = ?, status = ?, founded = ?, display_order = ?, featured = ?, is_active = ?, updated_at = ?
       WHERE id = ?`
    )
    .run(
      d.name,
      d.logo,
      d.shortDescription,
      d.fullDescription,
      d.category,
      d.website,
      d.status,
      d.founded || null,
      d.displayOrder,
      d.featured ? 1 : 0,
      d.isActive ? 1 : 0,
      now(),
      id
    );
  const updated = getCompany(id);
  log("COMPANY_UPDATED", actor, "COMPANY_MANAGEMENT", updated?.name ?? id);
  return updated;
}

export async function deleteCompany(id: string, actor: Actor): Promise<boolean> {
  const handle = getDb();
  const existing = handle.prepare("SELECT * FROM companies WHERE id = ?").get(id) as
    | DbRow
    | undefined;
  if (!existing) return false;
  handle.prepare("DELETE FROM website_links WHERE company_id = ?").run(id);
  handle.prepare("DELETE FROM companies WHERE id = ?").run(id);
  log("COMPANY_DELETED", actor, "COMPANY_MANAGEMENT", String(existing.name));
  return true;
}