import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { contact } from "@/lib/data";

const channels = [
  {
    label: "Email Us",
    value: contact.email,
    href: `mailto:${contact.email}`,
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
  {
    label: "Call Us",
    value: contact.phone,
    href: `tel:${contact.phone.replace(/\s+/g, "")}`,
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M4 5c0 8.3 6.7 15 15 15l1.5-4-4-1.5-2 2C11 15 9 13 10.5 9.5l2-2L11 3.5 7 5H4Z" />
      </svg>
    ),
  },
  {
    label: "Office Address",
    value: contact.address,
    href: "/contact",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
];

/**
 * Contact preview — contact channels + CTA to the full contact page.
 */
export default function ContactPreview() {
  return (
    <section id="contact" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Get In Touch"
            title={contact.title}
            description="Reach out to the group for partnerships, media, careers, and general enquiries."
            align="center"
          />
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {channels.map((channel, index) => (
            <Reveal key={channel.label} delay={index * 90}>
              <a
                href={channel.href}
                className="flex h-full flex-col items-start rounded-xl border border-slate-200 bg-slate-50/60 p-7 transition hover:border-gold-400 hover:bg-white hover:shadow-lg"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-night-900 text-gold-400">
                  {channel.icon}
                </span>
                <h3 className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-500">
                  {channel.label}
                </h3>
                <p className="mt-2 text-sm font-semibold break-words text-night-900">
                  {channel.value}
                </p>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-10 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-night-900 px-7 py-3.5 text-sm font-bold tracking-wide text-white transition hover:bg-night-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
            >
              CONTACT US
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}