import Link from "next/link";
import Reveal from "@/components/Reveal";

/**
 * Corporate Access preview banner (view-only placeholder).
 * Links to /corporate/login only — NO authentication, demo accounts, or
 * credentials are built here. The real secure system arrives in Phase 3.
 */
export default function CorporateAccessBanner() {
  return (
    <section className="relative overflow-hidden bg-night-950 py-16 text-white lg:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-glow-gold" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal>
          <p className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-gold-400">
            <span aria-hidden="true" className="h-px w-8 bg-current" />
            Corporate Access
            <span aria-hidden="true" className="h-px w-8 bg-current" />
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            CORPORATE ACCESS
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Secure access for authorized TANTRA GROUP OF INDUSTRIES leadership
            members.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold-300">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-300" />
            Authorized Leadership Only
          </p>
          <div className="mt-8">
            <Link
              href="/corporate/login"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-gold-500 px-7 py-3.5 text-sm font-bold tracking-wide text-night-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-night-950"
            >
              SECURE CORPORATE ACCESS
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <rect x="4" y="10" width="16" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}