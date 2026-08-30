import "server-only";
import {
  requiredString,
  optionalString,
  isEmail,
  isUrl,
  isPhone,
  isOneOf,
  toBoolean,
  parseIntOr,
} from "@/lib/validation/content";
import { COMPANY_STATUSES } from "@/lib/content/types";
import type { LeadershipInput, CompanyInput, WebsiteLinkInput, ContactInput, BrandingInput } from "@/lib/content/types";

const LEADERSHIP_ROLE_KEYS = ["FOUNDER", "CHAIRMAN", "CEO", "MD"] as const;

export type Validated<T> = { ok: true; data: T } | { ok: false; error: string };

function asRecord(input: unknown): Record<string, unknown> {
  return typeof input === "object" && input !== null ? (input as Record<string, unknown>) : {};
}

export function validateLeadership(input: unknown): Validated<LeadershipInput> {
  const record = asRecord(input);
  if (!isOneOf(record.roleKey, LEADERSHIP_ROLE_KEYS)) {
    return { ok: false, error: "roleKey must be FOUNDER, CHAIRMAN, CEO or MD." };
  }
  const fullName = requiredString(record.fullName, 160, "Full name");
  if (fullName) return { ok: false, error: fullName };
  const roleLabel = requiredString(record.roleLabel, 160, "Role label");
  if (roleLabel) return { ok: false, error: roleLabel };

  return {
    ok: true,
    data: {
      roleKey: record.roleKey as LeadershipInput["roleKey"],
      roleLabel: String(record.roleLabel).trim(),
      fullName: String(record.fullName).trim(),
      photo: optionalString(record.photo, 500),
      photoAlt: optionalString(record.photoAlt, 300),
      shortIntro: optionalString(record.shortIntro),
      biography: optionalString(record.biography),
      insightHeading: optionalString(record.insightHeading, 160),
      insightStatement: optionalString(record.insightStatement),
      messageHeading: optionalString(record.messageHeading, 160),
      message: optionalString(record.message),
      displayOrder: parseIntOr(record.displayOrder),
      isActive: toBoolean(record.isActive),
    },
  };
}

export function validateCompany(input: unknown): Validated<CompanyInput> {
  const record = asRecord(input);
  const name = requiredString(record.name, 160, "Company name");
  if (name) return { ok: false, error: name };
  const website = optionalString(record.website, 500);
  if (website && !isUrl(website)) return { ok: false, error: "Website URL is invalid." };
  if (!isOneOf(record.status, COMPANY_STATUSES)) {
    return { ok: false, error: "Company status is invalid." };
  }
  return {
    ok: true,
    data: {
      name: String(record.name).trim(),
      logo: optionalString(record.logo, 500),
      shortDescription: optionalString(record.shortDescription),
      fullDescription: optionalString(record.fullDescription),
      category: optionalString(record.category, 200),
      website,
      status: record.status as CompanyInput["status"],
      founded: optionalString(record.founded, 40),
      displayOrder: parseIntOr(record.displayOrder),
      featured: toBoolean(record.featured),
      isActive: toBoolean(record.isActive),
    },
  };
}

export function validateWebsiteLink(input: unknown): Validated<WebsiteLinkInput> {
  const record = asRecord(input);
  const url = requiredString(record.url, 500, "Website URL");
  if (url) return { ok: false, error: url };
  if (!isUrl(record.url as string)) return { ok: false, error: "Website URL is invalid." };
  const label = requiredString(record.label, 160, "Link label");
  if (label) return { ok: false, error: label };
  return {
    ok: true,
    data: {
      companyId: optionalString(record.companyId, 200),
      url: String(record.url).trim(),
      label: String(record.label).trim(),
      displayOrder: parseIntOr(record.displayOrder),
      isActive: toBoolean(record.isActive),
    },
  };
}

export function validateContact(input: unknown): Validated<ContactInput> {
  const record = asRecord(input);
  const email = optionalString(record.email, 200);
  if (email && !isEmail(email)) return { ok: false, error: "Email address is invalid." };
  const phone = optionalString(record.phone, 60);
  if (phone && !isPhone(phone)) return { ok: false, error: "Phone number is invalid." };
  const website = optionalString(record.website, 500);
  if (website && !isUrl(website)) return { ok: false, error: "Website URL is invalid." };

  const socialFields = ["instagram", "facebook", "linkedin", "youtube"] as const;
  for (const key of socialFields) {
    const value = optionalString(record[key], 500);
    if (value && !isUrl(value)) return { ok: false, error: `${key} URL is invalid.` };
  }

  return {
    ok: true,
    data: {
      email,
      phone,
      address: optionalString(record.address),
      website,
      officeHours: optionalString(record.officeHours, 300),
      instagram: optionalString(record.instagram, 500),
      facebook: optionalString(record.facebook, 500),
      linkedin: optionalString(record.linkedin, 500),
      youtube: optionalString(record.youtube, 500),
      note: optionalString(record.note),
      notice: optionalString(record.notice),
    },
  };
}

export function validateBranding(input: unknown): Validated<BrandingInput> {
  const record = asRecord(input);
  const companyName = requiredString(record.companyName, 160, "Company name");
  if (companyName) return { ok: false, error: companyName };
  const shortName = requiredString(record.shortName, 40, "Short name");
  if (shortName) return { ok: false, error: shortName };
  const logoPath = optionalString(record.logoPath, 500);
  const faviconPath = optionalString(record.faviconPath, 500);
  if (logoPath && !logoPath.startsWith("/")) return { ok: false, error: "Logo path must be a site path." };
  if (faviconPath && !faviconPath.startsWith("/")) return { ok: false, error: "Favicon path must be a site path." };
  return {
    ok: true,
    data: {
      companyName: String(record.companyName).trim(),
      shortName: String(record.shortName).trim(),
      tagline: optionalString(record.tagline, 300),
      logoPath,
      faviconPath,
    },
  };
}