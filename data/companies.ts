/**
 * TGOI — Company public data (Phase 2).
 *
 * Canonical source for companies showcased on the /companies page and the
 * home page. The schema is designed to migrate to a database in Phases 4–5
 * and to support an unlimited number of future companies.
 *
 * Only information appropriate for public viewing is included here.
 */

export type Company = {
  /** Stable identifier (future DB primary key). */
  id: string;
  name: string;
  logo: string;
  description: string;
  category: string;
  website: string;
  status: "live" | "upcoming";
  /** Optional founding date shown publicly where appropriate. */
  founded?: string;
  /** Marks the company for prime placement (e.g. SHOPTANTRA). */
  featured: boolean;
};

export const shoptantra: Company = {
  id: "shoptantra",
  name: "SHOPTANTRA",
  logo: "/images/shoptantra-logo-placeholder.svg",
  description:
    "Shoptantra is the flagship multi-vendor e-commerce marketplace of Tantra Group of Industries — a modern platform where sellers grow their business and customers enjoy a secure, seamless shopping experience.",
  category: "Multi-Vendor E-Commerce Marketplace",
  website: "https://shoptantra.in",
  status: "live",
  founded: "2026",
  featured: true,
};

/** All companies currently public. Add new companies by appending here. */
export const companies: Company[] = [shoptantra];

/** Featured company spotlight entries (prime placement on /companies). */
export const featuredCompanies: Company[] = companies.filter((c) => c.featured);

/**
 * Generic future-venture presentation. No assumptions are made about the
 * names, brands, or specifics of future businesses — these are neutral
 * placeholders only, shown as "COMING SOON".
 */
export type FutureVenture = {
  id: string;
  label: string;
  description: string;
};

export const futureVentures: FutureVenture[] = [
  {
    id: "future-venture-1",
    label: "FUTURE VENTURE",
    description:
      "A new business is being explored in this area. Details will be announced as the venture develops.",
  },
  {
    id: "future-venture-2",
    label: "FUTURE VENTURE",
    description:
      "A new business is being explored in this area. Details will be announced as the venture develops.",
  },
  {
    id: "future-venture-3",
    label: "FUTURE VENTURE",
    description:
      "A new business is being explored in this area. Details will be announced as the venture develops.",
  },
];