import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactPreview from "@/components/ContactPreview";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Tantra Group of Industries (TGOI) for partnerships, media, careers, and general enquiries.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="CONTACT US"
        description="Reach out to the group for partnerships, media, careers, and general enquiries."
      />
      <div className="bg-white pb-20 pt-2 lg:pb-24">
        <ContactPreview />
      </div>
    </>
  );
}