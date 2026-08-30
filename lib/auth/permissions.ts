/**
 * Corporate Role-Based Access Control (RBAC).
 *
 * Only the four authorized leadership roles exist. Public users can never
 * assign themselves a role — roles are granted only through internal account
 * provisioning/management logic.
 */
export type CorporateRole = "FOUNDER" | "CHAIRMAN" | "CEO" | "MD";

/** Modules that corporate members may manage, now and in future phases. */
export type CorporateModule =
  | "LEADERSHIP_MANAGEMENT"
  | "COMPANY_MANAGEMENT"
  | "CONTACT_MANAGEMENT"
  | "BRANDING_MANAGEMENT"
  | "WEBSITE_MANAGEMENT"
  | "SETTINGS"
  | "ACTIVITY_LOGS";

export const CORPORATE_ROLES: readonly CorporateRole[] = [
  "FOUNDER",
  "CHAIRMAN",
  "CEO",
  "MD",
];

/** Human-readable role labels. */
export const ROLE_LABELS: Record<CorporateRole, string> = {
  FOUNDER: "Founder",
  CHAIRMAN: "Chairman",
  CEO: "Chief Executive Officer",
  MD: "Managing Director",
};

export function isCorporateRole(value: unknown): value is CorporateRole {
  return (
    typeof value === "string" && (CORPORATE_ROLES as readonly string[]).includes(value)
  );
}

/**
 * Access model:
 * - FOUNDER → full corporate access to every module.
 * - CHAIRMAN / CEO / MD → corporate management access to the management
 *   modules (they can manage content, but not full platform control).
 *
 * The map is the single place permission changes are made, so adjustments can
 * be applied later without touching authentication logic.
 */
const ROLE_PERMISSIONS: Record<CorporateRole, Record<CorporateModule, boolean>> = {
  FOUNDER: {
    LEADERSHIP_MANAGEMENT: true,
    COMPANY_MANAGEMENT: true,
    CONTACT_MANAGEMENT: true,
    BRANDING_MANAGEMENT: true,
    WEBSITE_MANAGEMENT: true,
    SETTINGS: true,
    ACTIVITY_LOGS: true,
  },
  CHAIRMAN: {
    LEADERSHIP_MANAGEMENT: true,
    COMPANY_MANAGEMENT: true,
    CONTACT_MANAGEMENT: true,
    BRANDING_MANAGEMENT: true,
    WEBSITE_MANAGEMENT: true,
    SETTINGS: true,
    ACTIVITY_LOGS: true,
  },
  CEO: {
    LEADERSHIP_MANAGEMENT: true,
    COMPANY_MANAGEMENT: true,
    CONTACT_MANAGEMENT: true,
    BRANDING_MANAGEMENT: true,
    WEBSITE_MANAGEMENT: true,
    SETTINGS: true,
    ACTIVITY_LOGS: true,
  },
  MD: {
    LEADERSHIP_MANAGEMENT: true,
    COMPANY_MANAGEMENT: true,
    CONTACT_MANAGEMENT: true,
    BRANDING_MANAGEMENT: true,
    WEBSITE_MANAGEMENT: true,
    SETTINGS: true,
    ACTIVITY_LOGS: true,
  },
};

/** All modules a role is allowed to manage. */
export const MODULES_FOR_ROLE: Record<CorporateRole, CorporateModule[]> =
  Object.fromEntries(
    (Object.keys(ROLE_PERMISSIONS) as CorporateRole[]).map((role) => [
      role,
      (Object.keys(ROLE_PERMISSIONS[role]) as CorporateModule[]).filter(
        (module) => ROLE_PERMISSIONS[role][module]
      ),
    ])
  ) as Record<CorporateRole, CorporateModule[]>;

/** Reusable check: does a role have access to a given module? */
export function hasPermission(
  role: CorporateRole,
  module: CorporateModule
): boolean {
  return ROLE_PERMISSIONS[role]?.[module] === true;
}

/** Convenience: can this role access ANY corporate module at all? */
export function isAuthorizedCorporateRole(role: unknown): role is CorporateRole {
  return isCorporateRole(role);
}