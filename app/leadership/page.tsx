import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import LeadershipProfile from "@/components/LeadershipProfile";
import CorporateAccessBanner from "@/components/CorporateAccessBanner";
import { getSiteContent } from "@/lib/content/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Leadership",
  description:
    "Meet the leadership team guiding the vision, strategy, and future growth of Tantra Group of Industries (TGOI).",
  openGraph: {
    title: "Our Leadership | Tantra Group of Industries",
    description:
      "Meet the leadership team guiding the vision, strategy, and future growth of TGOI.",
    type: "website",
  },
};

export default function LeadershipPage() {
  const content = getSiteContent();
  const profiles = content.leaderProfiles;

  return (
    <>
      <PageHeader
        eyebrow="Leadership"
        title="OUR LEADERSHIP"
        description="Meet the leadership team guiding the vision, strategy, and future growth of TANTRA GROUP OF INDUSTRIES."
      />
      {profiles.map((profile, index) => (
        <LeadershipProfile
          key={profile.id}
          profile={profile}
          reverse={index % 2 === 1}
        />
      ))}
      <CorporateAccessBanner />
    </>
  );
}