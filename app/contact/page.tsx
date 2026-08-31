import type { Metadata } from "next";
import type { ReactNode } from "react";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ContactCard from "@/components/ContactCard";
import { getSiteContent } from "@/lib/content/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Tantra Group of Industries (TGOI) for partnerships, media, careers, and general enquiries.",
  openGraph: {
    title: "Contact Us | Tantra Group of Industries",
    description:
      "Public contact information for the Tantra Group of Industries.",
    type: "website",
  },
};

const icons: Record<string, ReactNode> = {
  email: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  phone: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M4 5c0 8.3 6.7 15 15 15l1.5-4-4-1.5-2 2C11 15 9 13 10.5 9.5l2-2L11 3.5 7 5H4Z" />
    </svg>
  ),
  address: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
  website: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </svg>
  ),
};

export default function ContactPage() {
  const content = getSiteContent();
  const contact = content.contact;

  const dynamicChannels = [
    {
      id: "email",
      label: "Email",
      value: contact.email,
      href: contact.email ? `mailto:${contact.email}` : undefined,
      note: "General enquiries",
    },
    {
      id: "phone",
      label: "Phone",
      value: contact.phone,
      href: contact.phone ? `tel:${contact.phone.replace(/\s+/g, "")}` : undefined,
      note: "Office hours",
    },
    {
      id: "address",
      label: "Office Address",
      value: contact.address,
      note: "Registered office",
    },
    {
      id: "website",
      label: "Website",
      value: contact.website,
      href: contact.website || undefined,
      note: "Official portal",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="CONTACT US"
        description="Get in touch with TANTRA GROUP OF INDUSTRIES."
      />

      {/* Company contact information */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Get In Touch"
              title="COMPANY CONTACT INFORMATION"
              description="Public channels for partnerships, media, careers, and general enquiries with Tantra Group of Industries."
            />
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dynamicChannels.map((channel, index) => (
              <Reveal key={channel.id} delay={index * 80}>
                <ContactCard
                  label={channel.label}
                  value={channel.value}
                  href={channel.href}
                  note={channel.note}
                  icon={icons[channel.id]}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Office information */}
      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Office Info"
              title="OFFICE INFORMATION"
              align="center"
            />
          </Reveal>

          <div className="mx-auto mt-12 max-w-4xl">
            <Reveal>
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gold-700">
                      Registered Office
                    </h3>
                    <p className="mt-3 max-w-md leading-relaxed text-slate-600">
                      {contact.address}
                    </p>
                    <p className="mt-2 text-xs text-slate-500">{contact.officeHours}</p>
                  </div>
                  <div className="shrink-0">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gold-700">
                      Enquiries
                    </h3>
                    <p className="mt-3 text-sm text-slate-600">
                      {contact.email}
                      <br />
                      {contact.phone}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact information notice */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Reveal>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-night-900 text-gold-400">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8h.01M11 12h1v4h1" />
              </svg>
            </span>
            <h2 className="mt-5 text-2xl font-bold tracking-tight text-night-900">
              Contact Information Notice
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-slate-600">
              {contact.notice}
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-500">
              {contact.note}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}