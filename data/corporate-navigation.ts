import type { CorporateModule } from "@/lib/auth/permissions";

export interface CorporateNavItem {
  label: string;
  href: string;
  /** Permission module this item requires; null means authenticated-only. */
  module: CorporateModule | null;
}

/** Sidebar navigation for the protected corporate dashboard. */
export const corporateNavItems: CorporateNavItem[] = [
  { label: "Dashboard", href: "/corporate/dashboard", module: null },
  { label: "Leadership", href: "/corporate/dashboard/leadership", module: "LEADERSHIP_MANAGEMENT" },
  { label: "Companies", href: "/corporate/dashboard/companies", module: "COMPANY_MANAGEMENT" },
  { label: "Contact", href: "/corporate/dashboard/contact", module: "CONTACT_MANAGEMENT" },
  { label: "Branding", href: "/corporate/dashboard/branding", module: "BRANDING_MANAGEMENT" },
  { label: "Website Links", href: "/corporate/dashboard/websites", module: "WEBSITE_MANAGEMENT" },
  { label: "Settings", href: "/corporate/dashboard/settings", module: "SETTINGS" },
  { label: "Activity Logs", href: "/corporate/dashboard/logs", module: "ACTIVITY_LOGS" },
];