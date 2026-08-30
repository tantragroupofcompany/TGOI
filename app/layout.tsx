import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteContent } from "@/lib/content/site";
import "./globals.css";

export const metadata: Metadata = {
  title: "TANTRA GROUP OF INDUSTRIES (TGOI) | Building Businesses. Creating Opportunities.",
  description:
    "Official website of TANTRA GROUP OF INDUSTRIES — a parent company building businesses, creating opportunities, and shaping the future.",
  icons: { icon: "/icon.svg" },
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
