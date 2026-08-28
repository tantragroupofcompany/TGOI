import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import CompanyCard from "@/components/CompanyCard";
import Reveal from "@/components/Reveal";
import { featuredCompanies, futureVentures, shoptantra } from "@/data/companies";

export const metadata: Metadata = {
  title: "Our Companies",
  description:
    "Discover the businesses and ventures being developed under the Tantra Group of Industries (TGOI) umbrella, including the Shoptantra marketplace.",
  openGraph: {
    title: "Our Companies | Tantra Group of Industries",
    description:
      "Discover the businesses and ventures being developed under the TGOI umbrella.",
    type: "website",
  },
};

export default function CompaniesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Companies"
        title="OUR COMPANIES"
        description="Discover the businesses and ventures being developed under TANTRA GROUP OF INDUSTRIES."
      />

      {/* Company Introduction */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Who We Build"
              title="A Growing Portfolio of Businesses"
              description="Tantra Group of Industries builds, nurtures, and scales independent companies across commerce, technology, and services. Each business shares the group's standards — innovation, integrity, and a commitment to long-term value."
            />
          </Reveal>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Our Companies"
              title="FEATURED COMPANIES"
              description="The businesses currently operating under the TGOI umbrella."
              align="center"
            />
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2">
            {featuredCompanies.map((companyItem) => (
              <CompanyCard
                key={companyItem.id}
                company={companyItem}
                ctaLabel={`VISIT ${companyItem.name}`}
              />
            ))}
          </div>
        </div>
      </section>
      {/* Flagship spotlight — SHOPTANTRA */}
      <section className="relative overflow-hidden bg-night-950 py-16 text-white lg:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-glow-gold" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="flex items-center justify-center rounded-2xl bg-white/5 p-10 ring-1 ring-white/10">
                <Image
                  src={shoptantra.logo}
                  alt={`${shoptantra.name} logo`}
                  width={300}
                  height={90}
                  className="h-20 w-auto"
                  unoptimized
                />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-gold-400">
                <span aria-hidden="true" className="h-px w-8 bg-current" />
                Flagship Company
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-300" />
                Operational
              </p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {shoptantra.name}
              </h2>
              <p className="mt-3 text-sm font-bold uppercase tracking-wide text-gold-300">
                {shoptantra.category}
              </p>
              <p className="mt-5 leading-relaxed text-slate-300">
                {shoptantra.description}
              </p>
              <dl className="mt-6 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                <div className="rounded-lg bg-white/5 p-4 ring-1 ring-white/10">
                  <dt className="text-xs uppercase tracking-wider text-slate-400">Status</dt>
                  <dd className="mt-1 font-semibold text-emerald-300">Operational</dd>
                </div>
                <div className="rounded-lg bg-white/5 p-4 ring-1 ring-white/10">
                  <dt className="text-xs uppercase tracking-wider text-slate-400">Founded</dt>
                  <dd className="mt-1 font-semibold">{shoptantra.founded || "—"}</dd>
                </div>
              </dl>
              <a
                href={shoptantra.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-gold-500 px-7 py-3.5 text-sm font-bold tracking-wide text-night-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-night-950"
              >
                VISIT SHOPTANTRA
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
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Future Expansion */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Looking Ahead"
              title="BUILDING THE FUTURE"
              description="Tantra Group of Industries is committed to developing and supporting future ventures across different industries. New businesses will be announced here as they are launched."
              align="center"
            />
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3">
            {futureVentures.map((venture, index) => (
              <Reveal key={venture.id} delay={index * 80}>
                <div className="flex h-full flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-8 text-center">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-night-900 text-gold-400">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <span className="mt-4 inline-flex rounded-full bg-gold-500/15 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-gold-700 ring-1 ring-gold-500/30">
                    COMING SOON
                  </span>
                  <h3 className="mt-3 text-base font-bold tracking-tight text-night-900">
                    {venture.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {venture.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <p className="mt-10 text-center text-sm text-slate-500">
              No assumptions are made about future businesses — details will be
              shared as each venture is officially announced.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}