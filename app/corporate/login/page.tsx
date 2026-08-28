import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Corporate Access",
  description:
    "Corporate access for Tantra Group of Industries — coming in a future phase.",
};

/**
 * Placeholder for the Phase 3+ Corporate Login system.
 * Authentication is intentionally NOT built in Phase 1.
 */
export default function CorporateLoginPage() {
  return (
    <section className="relative isolate overflow-hidden bg-night-950 py-24 text-white lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-glow-gold" />
      <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
        <Reveal>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto h-14 w-14 text-gold-400"
          >
            <rect x="4" y="10" width="16" height="11" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            <circle cx="12" cy="15" r="1.4" fill="currentColor" />
          </svg>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
            CORPORATE ACCESS
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
            The Corporate Login, Dashboard, and Management system for Tantra
            Group of Industries will be available in a future phase. During
            Phase 1 the public website remains view-only for everyone.
          </p>
          <p className="mt-3 text-sm text-gold-300/80">
            This area is restricted to authorised company personnel.
          </p>
          <Link
            href="/"
            className="mt-9 inline-flex items-center justify-center gap-2 rounded-md bg-gold-500 px-7 py-3.5 text-sm font-bold tracking-wide text-night-950 transition hover:bg-gold-400"
          >
            BACK TO HOME
          </Link>
        </Reveal>
      </div>
    </section>
  );
}