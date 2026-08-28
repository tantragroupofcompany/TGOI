/**
 * TGOI — Structured static content (Phase 1 placeholder data).
 *
 * NOTE: This module is the single source of placeholder content for the
 * public website. In Phases 4–5 it will be replaced by database-driven
 * content managed from the Corporate Dashboard (per-section fields).
 * Keeping content here means converting later is mechanical and safe.
 */

export const brand = {
  shortName: "TGOI",
  startYear: 2026,
};

export const company = {
  name: "TANTRA GROUP OF INDUSTRIES",
  shortName: "TGOI",
  tagline: "Building Businesses. Creating Opportunities. Shaping The Future.",
  heroIntro:
    "Tantra Group of Industries (TGOI) is a parent organisation that builds, nurtures, and scales businesses across industries — combining vision, capital, and operational discipline to create lasting value for customers, communities, and partners.",
  aboutParagraphs: [
    "Tantra Group of Industries is a parent organisation dedicated to building, nurturing, and scaling businesses that create real value. As a group, we bring together vision, capital, and operational discipline to launch ventures across commerce, technology, and services.",
    "Our philosophy is simple — business should solve real problems, create opportunities for people, and contribute to long-term economic growth. Every company under the TGOI umbrella is built on innovation, integrity, and a commitment to excellence.",
    "From digital marketplaces to future-ready ventures, we invest in ideas that matter, support the entrepreneurs behind them, and grow sustainable businesses that stand the test of time.",
  ],
  pillars: [
    {
      title: "Innovation",
      text: "Modern technology and fresh thinking at the heart of every venture.",
    },
    {
      title: "Entrepreneurship",
      text: "Empowering founders and teams with resources, guidance, and capital.",
    },
    {
      title: "Opportunity",
      text: "Creating meaningful jobs and economic value in every community we serve.",
    },
    {
      title: "Growth",
      text: "Building resilient, sustainable businesses built for the long term.",
    },
  ],
};

export const vision = {
  title: "OUR VISION",
  statement:
    "To build successful, innovative, and sustainable businesses that create opportunities and contribute to economic growth.",
};

export const mission = {
  title: "OUR MISSION",
  subtitle:
    "What drives us forward — the commitments behind every company we build.",
  points: [
    {
      id: "innovative-businesses",
      title: "Build Innovative Businesses",
      text: "Launch and scale ventures that use modern technology and fresh thinking to solve real market problems.",
    },
    {
      id: "entrepreneurship",
      title: "Support Entrepreneurship",
      text: "Empower founders and teams with the resources, guidance, and capital they need to succeed.",
    },
    {
      id: "employment",
      title: "Create Employment Opportunities",
      text: "Grow businesses that generate meaningful jobs and strengthen local economies.",
    },
    {
      id: "digital",
      title: "Develop Digital Businesses",
      text: "Invest in digital-first ventures that bring convenience, transparency, and access to customers.",
    },
    {
      id: "future",
      title: "Build Future Opportunities",
      text: "Continuously explore new sectors and ideas to keep the group resilient and future-ready.",
    },
  ],
};

export type Company = {
  id: string;
  name: string;
  category: string;
  website: string;
  logo: string;
  description: string;
  status: "live" | "upcoming";
};

/**
 * Company cards. The array is rendered generically on the website and in the
 * future will be managed from /corporate/dashboard/companies. Add unlimited
 * companies by pushing new entries here.
 */
export const companies: Company[] = [
  {
    id: "shoptantra",
    name: "SHOPTANTRA",
    category: "Multi-Vendor E-Commerce Marketplace",
    website: "https://shoptantra.in",
    logo: "/images/shoptantra-logo-placeholder.svg",
    description:
      "Shoptantra is the flagship multi-vendor e-commerce marketplace of Tantra Group of Industries — a modern platform where sellers grow their business and customers enjoy a secure, seamless shopping experience.",
    status: "live",
  },
];

export type Leader = {
  id: string;
  role: string;
  name: string;
  introduction: string;
};

/**
 * Leadership preview cards. Reused by the Phase 2 /leadership page.
 * Photos and full profiles will be published in Phase 2.
 */
export const leadership: Leader[] = [
  {
    id: "founder",
    role: "FOUNDER",
    name: "Founder Name",
    introduction:
      "Guides the group with vision, values, and long-term strategy. Full profile coming in Phase 2.",
  },
  {
    id: "chairman",
    role: "CHAIRMAN",
    name: "Chairman Name",
    introduction:
      "Leads governance, partnerships, and corporate direction. Full profile coming in Phase 2.",
  },
  {
    id: "ceo-md",
    role: "CEO & MD",
    name: "CEO & Managing Director",
    introduction:
      "Drives day-to-day group operations and venture growth. Full profile coming in Phase 2.",
  },
];

export const contact = {
  title: "CONTACT US",
  email: "info@tantragroup.com",
  phone: "+91 90000 00000",
  address: "Tantra Group of Industries, [Office Address Placeholder], India",
  note: "General enquiries only. Corporate access is restricted to authorised personnel.",
};

export const navigation = {
  links: [
    { label: "Home", href: "/" },
    { label: "Leadership", href: "/leadership" },
    { label: "Companies", href: "/companies" },
    { label: "Contact", href: "/contact" },
  ],
  corporateAccess: { label: "Corporate Access", href: "/corporate/login" },
};