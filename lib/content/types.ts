/**
 * Content type definitions shared by the management system (CRUD), the public
 * website (read path), and the seed/fallback snapshot.
 */

/** Controlled company status values — no arbitrary statuses allowed. */
export const COMPANY_STATUSES = ["LIVE", "DEVELOPMENT", "COMING_SOON", "INACTIVE"] as const;
export type CompanyStatus = (typeof COMPANY_STATUSES)[number];

/** Public-facing subset of company statuses (INACTIVE is never public). */
export type PublicCompanyStatus = "LIVE" | "DEVELOPMENT" | "COMING_SOON";

export type LeadershipRoleKey = "FOUNDER" | "CHAIRMAN" | "CEO" | "MD";

export interface LeadershipRecord {
  id: string;
  roleKey: LeadershipRoleKey;
  roleLabel: string;
  fullName: string;
  photo: string | null;
  photoAlt: string;
  shortIntro: string;
  biography: string;
  insightHeading: string;
  insightStatement: string;
  messageHeading: string;
  message: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface CompanyRecord {
  id: string;
  name: string;
  logo: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  website: string;
  status: CompanyStatus;
  founded: string | null;
  displayOrder: number;
  featured: boolean;
  isActive: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface WebsiteLinkRecord {
  id: string;
  companyId: string | null;
  url: string;
  label: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface ContactRecord {
  email: string;
  phone: string;
  address: string;
  website: string;
  officeHours: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  youtube: string;
  note: string;
  notice: string;
  updatedAt: number;
}

export interface BrandingRecord {
  companyName: string;
  shortName: string;
  tagline: string;
  logoPath: string;
  faviconPath: string;
  updatedAt: number;
}

/** Settings are a controlled key/value store (keys whitelisted in code). */
export interface SettingsRecord {
  websiteName: string;
  tagline: string;
  defaultInfo: string;
  publicVisibility: string;
  contentDisplay: string;
}

/** What the public leadership page needs for one full profile. */
export interface PublicLeaderProfile {
  id: string;
  role: string;
  name: string;
  photo: string | null;
  photoAlt: string;
  biography: string;
  insightHeading: string;
  insightStatement: string;
  messageHeading: string;
  message: string;
}

/** What the home page preview needs for one leader. */
export interface PublicLeaderPreview {
  id: string;
  role: string;
  name: string;
  introduction: string;
}

export interface PublicCompany {
  id: string;
  name: string;
  logo: string;
  description: string;
  category: string;
  website: string;
  status: PublicCompanyStatus;
  founded?: string;
  featured: boolean;
}

export interface PublicContact {
  email: string;
  phone: string;
  address: string;
  website: string;
  officeHours: string;
  note: string;
  notice: string;
  social: {
    instagram: string;
    facebook: string;
    linkedin: string;
    youtube: string;
  };
}

export interface PublicWebsiteLink {
  id: string;
  companyId: string | null;
  companyName: string;
  url: string;
  label: string;
  isActive: boolean;
}

export interface PublicBranding {
  companyName: string;
  shortName: string;
  tagline: string;
  logoPath: string;
  faviconPath: string;
}

/**
 * Everything the public website renders, sourced from the database when
 * available and falling back to the static content otherwise.
 */
export interface SiteContent {
  branding: PublicBranding;
  settings: SettingsRecord;
  heroIntro: string;
  aboutParagraphs: string[];
  pillars: { title: string; text: string }[];
  vision: { title: string; statement: string };
  mission: {
    title: string;
    subtitle: string;
    points: { id: string; title: string; text: string }[];
  };
  leaderProfiles: PublicLeaderProfile[];
  leaderPreviews: PublicLeaderPreview[];
  companies: PublicCompany[];
  featuredCompanies: PublicCompany[];
  futureVentures: { id: string; label: string; description: string }[];
  contact: PublicContact;
  websiteLinks: PublicWebsiteLink[];
}

/** Management input shapes (validated server-side before any write). */
export interface LeadershipInput {
  roleKey: LeadershipRoleKey;
  roleLabel: string;
  fullName: string;
  photo: string;
  photoAlt: string;
  shortIntro: string;
  biography: string;
  insightHeading: string;
  insightStatement: string;
  messageHeading: string;
  message: string;
  displayOrder: number;
  isActive: boolean;
}

export interface CompanyInput {
  name: string;
  logo: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  website: string;
  status: CompanyStatus;
  founded: string;
  displayOrder: number;
  featured: boolean;
  isActive: boolean;
}

export interface WebsiteLinkInput {
  companyId: string;
  url: string;
  label: string;
  displayOrder: number;
  isActive: boolean;
}

export interface ContactInput {
  email: string;
  phone: string;
  address: string;
  website: string;
  officeHours: string;
  note: string;
  notice: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  youtube: string;
}

export interface BrandingInput {
  companyName: string;
  shortName: string;
  tagline: string;
  logoPath: string;
  faviconPath: string;
}

export interface SettingsInput {
  websiteName: string;
  tagline: string;
  defaultInfo: string;
  publicVisibility: string;
  contentDisplay: string;
}