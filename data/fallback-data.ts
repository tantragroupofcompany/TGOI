/**
 * Fallback site-content snapshot (Phase 4).
 *
 * This is the single seed source for the database on first run AND the
 * read-path fallback when the database is unavailable (e.g. a read-only build
 * environment). Values come from the existing Phase 1–2 static content so the
 * public website is byte-for-byte consistent whether it reads from static data
 * or from the seeded database.
 */
import { company, vision, mission, leadership as previewLeadership } from "@/lib/data";
import {
  companies as staticCompanies,
  futureVentures as staticFutureVentures,
  type Company,
} from "@/data/companies";
import { contact as staticContact } from "@/data/contact";
import { leadershipProfiles as staticProfiles } from "@/data/leadership";
import type { PublicCompany, PublicLeaderPreview, SiteContent } from "@/lib/content/types";

const shortRole = (role: string): string => {
  if (role.startsWith("CEO")) return "CEO & MD";
  if (role === "FOUNDER") return "FOUNDER";
  if (role === "CHAIRMAN") return "CHAIRMAN";
  return role;
};

const toPublicCompany = (c: Company): PublicCompany => ({
  id: c.id,
  name: c.name,
  logo: c.logo,
  description: c.description,
  category: c.category,
  website: c.website,
  status: c.status === "live" ? "LIVE" : "COMING_SOON",
  founded: c.founded,
  featured: c.featured,
});

const leadershipPreviews: PublicLeaderPreview[] = previewLeadership.map((l, index) => ({
  id: l.id,
  role: l.role,
  name: l.name,
  introduction: l.introduction,
  ...(index >= 0 ? {} : {}),
}));

export const fallbackContent: SiteContent = {
  branding: {
    companyName: company.name,
    shortName: company.shortName,
    tagline: company.tagline,
    logoPath: "/logo/tgoi-logo.svg",
    faviconPath: "/icon.svg",
  },
  settings: {
    websiteName: company.name,
    tagline: company.tagline,
    defaultInfo: company.heroIntro,
    publicVisibility: "public",
    contentDisplay: "standard",
  },
  heroIntro: company.heroIntro,
  aboutParagraphs: company.aboutParagraphs,
  pillars: company.pillars,
  vision: {
    title: vision.title,
    statement: vision.statement,
  },
  mission: {
    title: mission.title,
    subtitle: mission.subtitle,
    points: mission.points.map((p) => ({ id: p.id, title: p.title, text: p.text })),
  },
  leaderProfiles: staticProfiles.map((p) => ({
    id: p.id,
    role: p.role,
    name: p.name,
    photo: p.photo,
    photoAlt: p.photoAlt,
    biography: p.biography,
    insightHeading: p.insightHeading,
    insightStatement: p.insightStatement,
    messageHeading: p.messageHeading,
    message: p.message,
  })),
  // Preview cards use the home-page leadership entries (with short intros).
  leaderPreviews: leadershipPreviews,
  companies: staticCompanies.map(toPublicCompany),
  featuredCompanies: staticCompanies.filter((c) => c.featured).map(toPublicCompany),
  futureVentures: staticFutureVentures.map((v) => ({ ...v })),
  contact: {
    email: staticContact.email,
    phone: staticContact.phone,
    address: staticContact.address,
    website: staticContact.website,
    officeHours: staticContact.officeHours,
    note: staticContact.note,
    notice: staticContact.notice,
    social: { instagram: "", facebook: "", linkedin: "", youtube: "" },
  },
  websiteLinks: staticCompanies.map((c) => ({
    id: `${c.id}-website`,
    companyId: c.id,
    companyName: c.name,
    url: c.website,
    label: `VISIT ${c.name}`,
    isActive: true,
  })),
};

/** Convenience roles for seeding the database from the fallback snapshot. */
export const fallbackLeadershipSeed = staticProfiles.map((p, index) => ({
  id: p.id,
  roleKey: (p.role.startsWith("CEO") ? "CEO" : p.role.replace(/\s/g, "")) as
    | "FOUNDER"
    | "CHAIRMAN"
    | "CEO"
    | "MD",
  roleLabel: p.role === "CEO & MANAGING DIRECTOR" ? "CEO & MANAGING DIRECTOR" : p.role,
  fullName: p.name,
  photo: p.photo,
  photoAlt: p.photoAlt,
  shortIntro: previewLeadership[index]?.introduction ?? p.biography.slice(0, 140),
  biography: p.biography,
  insightHeading: p.insightHeading,
  insightStatement: p.insightStatement,
  messageHeading: p.messageHeading,
  message: p.message,
  displayOrder: index,
}));

export const shortRoleLabel = shortRole;