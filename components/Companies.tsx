import type { PublicCompany } from "@/lib/content/types";
import { fallbackContent } from "@/data/fallback-data";

const STATUS_STYLES: Record<string, string> = {
  LIVE: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
  DEVELOPMENT: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  COMING_SOON: "bg-sky-500/10 text-sky-300 border-sky-500/30",
};

const STATUS_LABELS: Record<string, string> = {
  LIVE: "LIVE",
  DEVELOPMENT: "IN DEVELOPMENT",
  COMING_SOON: "COMING SOON",
};

export default function Companies({
  companies,
  heading = "OUR COMPANIES",
  subheading = "A growing family of businesses operated under the TGOI parent company.",
}: {
  companies?: PublicCompany[];
  heading?: string;
  subheading?: string;
}) {
  const list = companies && companies.length > 0 ? companies : fallbackContent.companies;

  return (
    <section id="companies" className="bg-night-950 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-gold-400">The Group</p>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{heading}</h2>
        <p className="mt-4 max-w-2xl text-base text-slate-400">{subheading}</p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((company) => (
            <article
              key={company.id}
              className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-gold-500/40"
            >
              <div className="flex items-center justify-between">
                {company.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={company.logo} alt={`${company.name} logo`} className="h-10 w-10 object-contain" />
                ) : (
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-500/15 text-sm font-extrabold text-gold-300">
                    {company.name.slice(0, 2).toUpperCase()}
                  </span>
                )}
                <span
                  className={`rounded-full border px-3 py-1 text-[0.6rem] font-extrabold uppercase tracking-[0.15em] ${
                    STATUS_STYLES[company.status] ?? "border-white/20 text-slate-300"
                  }`}
                >
                  {STATUS_LABELS[company.status] ?? company.status}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-bold text-white">{company.name}</h3>
              {company.category && (
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gold-400/80">
                  {company.category}
                </p>
              )}
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{company.description}</p>

              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-extrabold tracking-[0.15em] text-gold-300 transition hover:text-gold-200"
                >
                  VISIT WEBSITE
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
