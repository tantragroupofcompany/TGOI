"use client";

import Link from "next/link";

/**
 * Friendly application-level error boundary.
 * Never exposes stack traces, database details, or internal paths publicly.
 */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-night-950 px-4">
      <div className="mx-auto max-w-lg text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-400">Something went wrong</p>
        <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
          An unexpected error occurred
        </h1>
        <p className="mt-4 text-slate-400">
          We are sorry for the inconvenience. Please try again — if the problem persists,
          contact the TGOI corporate team.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="rounded-md bg-gold-500 px-6 py-3 text-sm font-bold tracking-wide text-night-950 transition hover:bg-gold-400"
          >
            TRY AGAIN
          </button>
          <Link
            href="/"
            className="rounded-md border border-white/15 px-6 py-3 text-sm font-bold tracking-wide text-slate-300 transition hover:border-gold-400 hover:text-gold-300"
          >
            BACK TO HOME
          </Link>
        </div>
      </div>
    </main>
  );
}