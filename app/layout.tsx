import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default:
      "Tantra Group of Industries (TGOI) | Building Businesses. Creating Opportunities.",
    template: "%s | Tantra Group of Industries",
  },
  description:
    "Official website of Tantra Group of Industries (TGOI) — a parent company building innovative businesses, supporting entrepreneurship, and shaping the future.",
  keywords: [
    "Tantra Group of Industries",
    "TGOI",
    "Tantra Group",
    "parent company",
    "Shoptantra",
    "corporate",
    "business group",
  ],
  applicationName: "TGOI Official Website",
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-x-safe">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-gold-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-night-950"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}