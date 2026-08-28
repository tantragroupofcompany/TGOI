/**
 * TGOI — Contact public data (Phase 2).
 *
 * Public contact details for the /contact page and home contact preview.
 * Values marked with brackets are clearly-identified placeholders to be
 * replaced with verified corporate details before launch — nothing here
 * invents real phone numbers, email addresses, or physical addresses.
 *
 * This structure is designed to migrate to a database in Phases 4–5.
 */

export type ContactChannel = {
  id: string;
  label: string;
  value: string;
  /** Optional href (mailto:, tel:, or external link). */
  href?: string;
  /** Short descriptor shown under the value. */
  note?: string;
};

export const contact = {
  title: "CONTACT US",
  subtitle: "Get in touch with TANTRA GROUP OF INDUSTRIES.",
  // Placeholder values (preserved from Phase 1) — replace before launch.
  email: "info@tantragroup.com",
  phone: "+91 90000 00000",
  address: "Tantra Group of Industries, [Office Address Placeholder], India",
  website: "https://www.tantragroup.com",
  note: "Placeholder contact details — replace with verified corporate details before public launch.",
  notice:
    "Public visitors may view company contact information only. Internal or corporate contacts are never made public, and there is no public editing of this information.",
  officeHours:
    "[ Office Hours Placeholder ] — e.g. Monday to Friday, 9:00 AM – 6:00 PM IST.",
};

/** Structured contact cards for the /contact page. */
export const channels: ContactChannel[] = [
  {
    id: "email",
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
    note: "General enquiries",
  },
  {
    id: "phone",
    label: "Phone",
    value: contact.phone,
    href: `tel:${contact.phone.replace(/\s+/g, "")}`,
    note: "Office hours",
  },
  {
    id: "address",
    label: "Office Address",
    value: contact.address,
    note: "Registered office",
  },
  {
    id: "website",
    label: "Website",
    value: contact.website,
    href: contact.website,
    note: "Official portal",
  },
];