import "server-only";
import { getDb, isMemoryDb, type DbRow } from "@/lib/db";
import type {
  SiteContent,
  PublicLeaderProfile,
  PublicLeaderPreview,
  PublicCompany,
  PublicContact,
  PublicWebsiteLink,
} from "@/lib/content/types";
import { fallbackContent, shortRoleLabel } from "@/data/fallback-data";

/**
 * Public site-content reader (Phase 4).
 *
 * The public website renders from the database so that authorized corporate
 * changes appear automatically — no code changes needed for normal content
 * updates. When the database is unavailable (e.g. a read-only build host),
 * the static fallback snapshot is used instead.
 *
 * Only content safe for public visibility is returned: active records, valid
 * statuses, and no internal/admin fields.
 */

function publicOnlyStatus(status: string): "LIVE" | "DEVELOPMENT" | "COMING_SOON" | null {
  if (status === "LIVE" || status === "DEVELOPMENT" || status === "COMING_SOON") {
    return status;
  }
  return null;
}

const shortRoleFromKey = (roleKey: string): string => {
  if (roleKey === "CEO") return "CEO & MD";
  return shortRoleLabel(roleKey);
};

export function readFromDatabase(): SiteContent {
  const handle = getDb();

  const leadershipRows = handle
    .prepare("SELECT * FROM leadership_members WHERE is_active = 1 ORDER BY display_order ASC, full_name ASC")
    .all() as DbRow[];

  const leaderProfiles: PublicLeaderProfile[] = leadershipRows.map((row) => ({
    id: String(row.id),
    role: String(row.role_label ?? ""),
    name: String(row.full_name ?? ""),
    photo: row.photo ? String(row.photo) : null,
    photoAlt: String(row.photo_alt ?? ""),
    biography: String(row.biography ?? ""),
    insightHeading: String(row.insight_heading ?? ""),
    insightStatement: String(row.insight_statement ?? ""),
    messageHeading: String(row.message_heading ?? ""),
    message: String(row.message ?? ""),
  }));

  const leaderPreviews: PublicLeaderPreview[] = leadershipRows.map((row) => ({
    id: String(row.id),
    role: shortRoleFromKey(String(row.role_key ?? "")),
    name: String(row.full_name ?? ""),
    introduction: String(row.short_intro ?? ""),
  }));

  const companyRows = handle
    .prepare("SELECT * FROM companies WHERE is_active = 1 ORDER BY display_order ASC, name ASC")
    .all() as DbRow[];

  const companies: PublicCompany[] = [];
  for (const row of companyRows) {
    const status = publicOnlyStatus(String(row.status ?? ""));
    if (!status) continue;
    companies.push({
      id: String(row.id),
      name: String(row.name ?? ""),
      logo: String(row.logo ?? ""),
      description: String(
        row.short_description ? String(row.short_description) : String(row.full_description ?? "")
      ),
      category: String(row.category ?? ""),
      website: String(row.website ?? ""),
      status,
      founded: row.founded ? String(row.founded) : undefined,
      featured: Number(row.featured ?? 0) === 1,
    });
  }

  const featuredCompanies = companies.filter((c) => c.featured);

  const contactRow = handle.prepare("SELECT * FROM contact_details WHERE id = 1").get() as
    | DbRow
    | undefined;

  const contact: PublicContact = {
    email: String(contactRow?.email ?? fallbackContent.contact.email),
    phone: String(contactRow?.phone ?? fallbackContent.contact.phone),
    address: String(contactRow?.address ?? fallbackContent.contact.address),
    website: String(contactRow?.website ?? fallbackContent.contact.website),
    officeHours: String(contactRow?.office_hours ?? fallbackContent.contact.officeHours),
    note: String(contactRow?.note ?? fallbackContent.contact.note),
    notice: String(contactRow?.notice ?? fallbackContent.contact.notice),
    social: {
      instagram: String(contactRow?.instagram ?? ""),
      facebook: String(contactRow?.facebook ?? ""),
      linkedin: String(contactRow?.linkedin ?? ""),
      youtube: String(contactRow?.youtube ?? ""),
    },
  };

  const brandingRow = handle.prepare("SELECT * FROM branding WHERE id = 1").get() as DbRow | undefined;

  const linkRows = handle
    .prepare("SELECT * FROM website_links WHERE is_active = 1 ORDER BY display_order ASC, label ASC")
    .all() as DbRow[];

  const companyNameById = new Map(companyRows.map((r) => [String(r.id), String(r.name ?? "")]));
  const websiteLinks: PublicWebsiteLink[] = linkRows.map((row) => {
    const companyId = row.company_id ? String(row.company_id) : null;
    return {
      id: String(row.id),
      companyId,
      companyName: (companyId && companyNameById.get(companyId)) || "",
      url: String(row.url ?? ""),
      label: String(row.label ?? ""),
      isActive: true,
    };
  });

  const settingsMap = new Map(
    (handle.prepare("SELECT key, value FROM settings").all() as DbRow[]).map((r) => [
      String(r.key),
      String(r.value ?? ""),
    ])
  );

  return {
    branding: {
      companyName: String(brandingRow?.company_name ?? fallbackContent.branding.companyName),
      shortName: String(brandingRow?.short_name ?? fallbackContent.branding.shortName),
      tagline: String(brandingRow?.tagline ?? fallbackContent.branding.tagline),
      logoPath: String(brandingRow?.logo_path ?? fallbackContent.branding.logoPath),
      faviconPath: String(brandingRow?.favicon_path ?? fallbackContent.branding.faviconPath),
    },
    settings: {
      websiteName: settingsMap.get("websiteName") ?? fallbackContent.settings.websiteName,
      tagline: settingsMap.get("tagline") ?? fallbackContent.settings.tagline,
      defaultInfo: settingsMap.get("defaultInfo") ?? fallbackContent.settings.defaultInfo,
      publicVisibility: settingsMap.get("publicVisibility") ?? "public",
      contentDisplay: settingsMap.get("contentDisplay") ?? "standard",
    },
    heroIntro: settingsMap.get("defaultInfo") || fallbackContent.heroIntro,
    aboutParagraphs: fallbackContent.aboutParagraphs,
    pillars: fallbackContent.pillars,
    vision: fallbackContent.vision,
    mission: fallbackContent.mission,
    leaderProfiles,
    leaderPreviews,
    companies,
    featuredCompanies,
    futureVentures: fallbackContent.futureVentures,
    contact,
    websiteLinks,
  };
}

export function getSiteContent(): SiteContent {
  try {
    if (!isMemoryDb()) {
      return readFromDatabase();
    }
  } catch {
    // Fall back to static content below.
  }
  return fallbackContent;
}