import type { MetadataRoute } from "next";

/**
 * sitemap.xml — generated dynamically for search engine indexing.
 * Only public pages are listed; corporate/dashboard routes are never exposed.
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tantragroupofindustries.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/leadership`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/companies`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "yearly", priority: 0.7 },
  ];
}