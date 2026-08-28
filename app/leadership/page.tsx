import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import LeadershipPreview from "@/components/LeadershipPreview";

export const metadata: Metadata = {
  title: "Our Leadership",
  description:
    "Leadership of Tantra Group of Industries (TGOI). Detailed profiles are being prepared for Phase 2.",
};

export default function LeadershipPage() {
  return (
    <>
      <PageHeader
        eyebrow="Leadership"
        title="OUR LEADERSHIP"
        description="The vision and direction behind the Tantra Group of Industries. Detailed leadership profiles will be published in Phase 2."
      />
      <div className="bg-slate-50 pb-20 pt-4 lg:pb-24">
        <LeadershipPreview />
      </div>
    </>
  );
}