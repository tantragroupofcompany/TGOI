import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { companies } from "@/lib/data";

/**
 * Our Companies — generic card grid driven by lib/data.ts.
 * Add unlimited companies by extending the `companies` array; the future
 * Corporate Dashboard (Phase 4+) will manage this content.
 */
export default function Companies() {
  return (
    <section id="companies" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Our Companies"
            title="OUR COMPANIES"
            description="A growing portfolio of independent businesses built under the Tantra Group of Industries umbrella."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {companies.map((companyItem, index) => (
            <Reveal key={companyItem.id} delay={index * 100}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-gold-400 hover:shadow-xl hover:shadow-slate-200/70">
                <div className="flex items-center justify-center border-b border-slate-100 bg-slate-50 p-8">
                  <Image
                    src={companyItem.logo}
                    alt={`${companyItem.name} logo`}
                    width={240}
                    height={72}
                    className="h-16 w-auto"
                    unoptimized
                  />
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <span className="inline-flex w-fit items-center rounded-full bg-gold-500/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-gold-700 ring-1 ring-gold-500/30">
                    {companyItem.category}
                  </span>
                  <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-night-900">
                    {companyItem.name}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                    {companyItem.description}
                  </p>
                  <a
                    href={companyItem.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-gold-500 px-5 py-3 text-sm font-bold tracking-wide text-night-950 shadow-sm transition hover:bg-gold-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
                  >
                    VISIT LIVE WEBSITE
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
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-10 text-center text-sm text-slate-500">
            More group companies will be listed here in future phases.
          </p>
        </Reveal>
      </div>
    </section>
  );
}