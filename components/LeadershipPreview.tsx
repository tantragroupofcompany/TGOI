import Link from "next/link";
import type { PublicLeaderPreview } from "@/lib/content/types";
import { fallbackContent } from "@/data/fallback-data";

export default function LeadershipPreview({ leaders }: { leaders?: PublicLeaderPreview[] }) {
  const list = leaders && leaders.length > 0 ? leaders : fallbackContent.leaderPreviews;

  return (
    <section className="bg-night-900 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-gold-400">Leadership</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              GROUP LEADERSHIP
            </h2>
          </div>
          <Link
            href="/leadership"
            className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-[0.15em] text-gold-300 transition hover:text-gold-200"
          >
            VIEW FULL LEADERSHIP
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {list.slice(0, 3).map((leader) => (
            <article
              key={leader.id}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-7 text-center transition hover:border-gold-500/40"
            >
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-500/15 text-lg font-extrabold text-gold-300">
                {leader.name
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.2em] text-gold-400">{leader.role}</p>
              <h3 className="mt-2 text-lg font-bold text-white">{leader.name}</h3>
              {leader.introduction && (
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{leader.introduction}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
