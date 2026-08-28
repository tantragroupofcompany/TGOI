import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Companies from "@/components/Companies";

export const metadata: Metadata = {
  title: "Our Companies",
  description:
    "Companies built and scaled under the Tantra Group of Industries (TGOI) umbrella.",
};

export default function CompaniesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Companies"
        title="OUR COMPANIES"
        description="A growing portfolio of independent businesses built under the Tantra Group of Industries umbrella."
      />
      <div className="bg-white pb-20 pt-2 lg:pb-24">
        <Companies />
      </div>
    </>
  );
}