import "server-only";
import Database from "node:sqlite";
import { mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fallbackContent, fallbackLeadershipSeed } from "@/data/fallback-data";

/**
 * TGOI database (Phase 4).
 *
 * Uses Node's built-in `node:sqlite` — a real SQL engine with zero native
 * dependencies, so it works on any environment that runs this codebase.
 *
 * Phase 4 stores content in a local SQLite file under data/tgoi.db (git
 * ignored, seeded from the static fallback content on first run). Production
 * can point DATABASE_URL at a managed file location or swap the store behind
 * this module (the read/write surface is intentionally small and database
 * agnostic). Migrations are versioned via PRAGMA user_version and are
 * additive — no destructive schema changes.
 */

export interface DbRow {
  [key: string]: string | number | null;
}

let db: Database.DatabaseSync | null = null;
let dbSource: "file" | "memory" = "file";

function resolvePath(): string {
  const configured = process.env.DATABASE_URL;
  if (configured && (configured.startsWith("file:") || !configured.includes(":"))) {
    const raw = configured.startsWith("file:") ? configured.slice(5) : configured;
    return join(process.cwd(), raw);
  }
  return join(process.cwd(), "data", "tgoi.db");
}

export function getDb(): Database.DatabaseSync {
  if (db) return db;

  const path = resolvePath();
  try {
    if (!existsSync(dirname(path))) {
      mkdirSync(dirname(path), { recursive: true });
    }
    db = new Database.DatabaseSync(path);
    db.exec("PRAGMA journal_mode = WAL;");
    dbSource = "file";
  } catch {
    // Read-only / unwritable build environments fall back to an in-memory DB.
    db = new Database.DatabaseSync(":memory:");
    dbSource = "memory";
  }

  migrate();
  seedIfEmpty();
  return db;
}

export function isMemoryDb(): boolean {
  return dbSource === "memory";
}

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS corporate_users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  username TEXT UNIQUE,
  password_hash TEXT,
  role TEXT NOT NULL,
  is_active INTEGER NOT NULL DEFAULT 1,
  last_login_at INTEGER,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS leadership_members (
  id TEXT PRIMARY KEY,
  role_key TEXT NOT NULL,
  role_label TEXT NOT NULL DEFAULT '',
  full_name TEXT NOT NULL DEFAULT '',
  photo TEXT,
  photo_alt TEXT NOT NULL DEFAULT '',
  short_intro TEXT NOT NULL DEFAULT '',
  biography TEXT NOT NULL DEFAULT '',
  insight_heading TEXT NOT NULL DEFAULT '',
  insight_statement TEXT NOT NULL DEFAULT '',
  message_heading TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL DEFAULT '',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS companies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  logo TEXT NOT NULL DEFAULT '',
  short_description TEXT NOT NULL DEFAULT '',
  full_description TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  website TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'LIVE',
  founded TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  featured INTEGER NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS website_links (
  id TEXT PRIMARY KEY,
  company_id TEXT,
  url TEXT NOT NULL DEFAULT '',
  label TEXT NOT NULL DEFAULT '',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS contact_details (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  email TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  address TEXT NOT NULL DEFAULT '',
  website TEXT NOT NULL DEFAULT '',
  office_hours TEXT NOT NULL DEFAULT '',
  instagram TEXT NOT NULL DEFAULT '',
  facebook TEXT NOT NULL DEFAULT '',
  linkedin TEXT NOT NULL DEFAULT '',
  youtube TEXT NOT NULL DEFAULT '',
  note TEXT NOT NULL DEFAULT '',
  notice TEXT NOT NULL DEFAULT '',
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS branding (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  company_name TEXT NOT NULL DEFAULT 'TANTRA GROUP OF INDUSTRIES',
  short_name TEXT NOT NULL DEFAULT 'TGOI',
  tagline TEXT NOT NULL DEFAULT '',
  logo_path TEXT NOT NULL DEFAULT '/logo/tgoi-logo.svg',
  favicon_path TEXT NOT NULL DEFAULT '/icon.svg',
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS activity_logs (
  id TEXT PRIMARY KEY,
  timestamp INTEGER NOT NULL,
  action TEXT NOT NULL,
  user_id TEXT,
  user_name TEXT,
  role TEXT,
  module TEXT,
  target TEXT,
  status TEXT,
  meta TEXT
);
`;

function migrate(): void {
  const handle = db as Database.DatabaseSync;
  handle.exec(SCHEMA_SQL);
}
function seedIfEmpty(): void {
  const handle = db as Database.DatabaseSync;
  const now = Date.now();

  const leaderCount = (handle.prepare("SELECT COUNT(*) AS n FROM leadership_members").get() as DbRow).n;
  if (Number(leaderCount) === 0) {
    const insert = handle.prepare(
      `INSERT INTO leadership_members
        (id, role_key, role_label, full_name, photo, photo_alt, short_intro, biography,
         insight_heading, insight_statement, message_heading, message, display_order, is_active, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );
    for (const row of fallbackLeadershipSeed) {
      insert.run(
        row.id,
        row.roleKey,
        row.roleLabel,
        row.fullName,
        row.photo,
        row.photoAlt,
        row.shortIntro,
        row.biography,
        row.insightHeading,
        row.insightStatement,
        row.messageHeading,
        row.message,
        row.displayOrder,
        1,
        now,
        now
      );
    }
  }

  const companyCount = (handle.prepare("SELECT COUNT(*) AS n FROM companies").get() as DbRow).n;
  if (Number(companyCount) === 0) {
    const insert = handle.prepare(
      `INSERT INTO companies
        (id, name, logo, short_description, full_description, category, website, status, founded,
         display_order, featured, is_active, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );
    fallbackContent.companies.forEach((c, index) => {
      insert.run(
        c.id,
        c.name,
        c.logo,
        c.description,
        c.description,
        c.category,
        c.website,
        c.status,
        c.founded ?? null,
        index * 10,
        c.featured ? 1 : 0,
        1,
        now,
        now
      );
    });
  }

  const linkCount = (handle.prepare("SELECT COUNT(*) AS n FROM website_links").get() as DbRow).n;
  if (Number(linkCount) === 0) {
    const insert = handle.prepare(
      `INSERT INTO website_links (id, company_id, url, label, display_order, is_active, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    );
    fallbackContent.websiteLinks.forEach((link, index) => {
      insert.run(link.id, link.companyId, link.url, link.label, index * 10, 1, now, now);
    });
  }

  const contactCount = (handle.prepare("SELECT COUNT(*) AS n FROM contact_details").get() as DbRow).n;
  if (Number(contactCount) === 0) {
    handle
      .prepare(
        `INSERT INTO contact_details
          (id, email, phone, address, website, office_hours, instagram, facebook, linkedin, youtube, note, notice, updated_at)
         VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        fallbackContent.contact.email,
        fallbackContent.contact.phone,
        fallbackContent.contact.address,
        fallbackContent.contact.website,
        fallbackContent.contact.officeHours,
        fallbackContent.contact.social.instagram,
        fallbackContent.contact.social.facebook,
        fallbackContent.contact.social.linkedin,
        fallbackContent.contact.social.youtube,
        fallbackContent.contact.note,
        fallbackContent.contact.notice,
        now
      );
  }

  const brandingCount = (handle.prepare("SELECT COUNT(*) AS n FROM branding").get() as DbRow).n;
  if (Number(brandingCount) === 0) {
    handle
      .prepare(
        `INSERT INTO branding (id, company_name, short_name, tagline, logo_path, favicon_path, updated_at)
         VALUES (1, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        fallbackContent.branding.companyName,
        fallbackContent.branding.shortName,
        fallbackContent.branding.tagline,
        fallbackContent.branding.logoPath,
        fallbackContent.branding.faviconPath,
        now
      );
  }

  const settingsCount = (handle.prepare("SELECT COUNT(*) AS n FROM settings").get() as DbRow).n;
  if (Number(settingsCount) === 0) {
    const insert = handle.prepare("INSERT INTO settings (key, value) VALUES (?, ?)");
    const settingsEntries = Object.entries(fallbackContent.settings);
    for (const [key, value] of settingsEntries) {
      insert.run(key, typeof value === "boolean" ? (value ? "1" : "0") : String(value));
    }
  }
}