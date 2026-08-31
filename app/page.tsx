import type { Metadata } from "next";
import Hero from "@/components/Hero";
import About from "@/components/About";
import VisionMission from "@/components/VisionMission";
import Companies from "@/components/Companies";
import LeadershipPreview from "@/components/LeadershipPreview";
import ContactPreview from "@/components/ContactPreview";
import { getSiteContent } from "@/lib/content/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "TANTRA GROUP OF INDUSTRIES (TGOI) | Official Corporate Website",
  description:
    "Official parent company portal of Tantra Group of Industries (TGOI) — building, nurturing, and scaling businesses across commerce, technology, and services.",
  openGraph: {
    title: "TANTRA GROUP OF INDUSTRIES (TGOI)",
    description:
      "Building Businesses. Creating Opportunities. Shaping The Future.",
    type: "website",
  },
};

export default function HomePage() {
  const content = getSiteContent();

  return (
    <>
      <Hero intro={content.heroIntro} />
      <About />
      <VisionMission />
      <Companies companies={content.companies} />
      <LeadershipPreview leaders={content.leaderPreviews} />
      <ContactPreview contact={content.contact} />
    </>
  );
}
