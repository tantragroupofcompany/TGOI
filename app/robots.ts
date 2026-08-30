import type { MetadataRoute } from "next";

/**
 * robots.txt — generated dynamically.
 * Public pages are indexable; corporate areas are excluded from indexing.
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tantragroupofindustries.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/corporate", "/corporate/", "/api/", "/uploads/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}