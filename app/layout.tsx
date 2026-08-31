import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteContent } from "@/lib/content/site";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tantragroupofindustries.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TANTRA GROUP OF INDUSTRIES (TGOI) | Building Businesses. Creating Opportunities.",
    template: "%s | TANTRA GROUP OF INDUSTRIES",
  },
  description:
    "Official website of TANTRA GROUP OF INDUSTRIES — a parent company building businesses, creating opportunities, and shaping the future.",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "TANTRA GROUP OF INDUSTRIES (TGOI)",
    description:
      "Official website of TANTRA GROUP OF INDUSTRIES — building businesses, creating opportunities, and shaping the future.",
    url: SITE_URL,
    siteName: "Tantra Group of Industries",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = getSiteContent();

  return (
    <html lang="en">
      <body className="bg-night-950 text-white antialiased">
        <Navbar
          companyName={content.branding.companyName}
          logoPath={content.branding.logoPath}
        />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
