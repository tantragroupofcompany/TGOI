import Image from "next/image";
import Reveal from "@/components/Reveal";
import type { Company } from "@/data/companies";

interface CompanyCardProps {
  company: Company;
  /** Button label, e.g. "VISIT SHOPTANTRA" for the flagship company. */
  ctaLabel?: string;
}

/**
 * Reusable company card driven by data/companies.ts. Supports unlimited
 * companies; status and featured flags drive the badges and placement.
 */
export default function CompanyCard({
  company,
  ctaLabel = "VISIT WEBSITE",
}: CompanyCardProps) {
  const live = company.status === "live";

  return (
    <Reveal>
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-gold-400 hover:shadow-xl hover:shadow-slate-200/70">
        <div className="flex items-center justify-center border-b border-slate-100 bg-slate-50 p-8">
          <Image
            src={company.logo}
            alt={`${company.name} logo`}
            width={240}
            height={72}
            className="h-16 w-auto"
            unoptimized
          />
        </div>

        <div className="flex flex-1 flex-col p-7">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-500/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-gold-700 ring-1 ring-gold-500/30">
              {company.category}
            </span>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider ring-1 ${
                live
                  ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                  : "bg-slate-100 text-slate-600 ring-slate-200"
              }`}
            >
              {live ? "OPERATIONAL" : "COMING SOON"}
            </span>
          </div>

          <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-night-900">
            {company.name}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
            {company.description}
          </p>

          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-gold-500 px-5 py-3 text-sm font-bold tracking-wide text-night-950 shadow-sm transition hover:bg-gold-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
          >
            {ctaLabel}
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
  );
}