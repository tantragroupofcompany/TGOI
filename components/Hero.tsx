import Link from "next/link";
import Reveal from "@/components/Reveal";
import { company } from "@/lib/data";

const highlights = [
  {
    title: "Multi-Business Portfolio",
    text: "A growing group of independent, future-ready ventures.",
  },
  {
    title: "Entrepreneurship First",
    text: "We back founders, ideas, and people who build.",
  },
  {
    title: "Sustainable Growth",
    text: "Value that lasts, created responsibly for the long term.",
  },
];

/**
 * Premium corporate hero for the home page.
 */
export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-night-950 text-white">
      {/* Decorative background layers */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-glow-gold" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night-800/60 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-36 sm:px-6 lg:px-8 lg:pb-28 lg:pt-44">
        <div className="max-w-4xl">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-gold-300">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-300" />
              Official Corporate Website
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              TANTRA GROUP
              <br />
              OF INDUSTRIES
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl">
              Building Businesses.
              <br />
              Creating Opportunities.
              <br />
              <span className="text-gradient-gold">Shaping The Future.</span>
            </p>
          </Reveal>

          <Reveal delay={300}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {company.heroIntro}
            </p>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#companies"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-gold-500 px-7 py-3.5 text-sm font-bold tracking-wide text-night-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-night-950"
              >
                EXPLORE OUR COMPANIES
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
              <Link
                href="#leadership"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 px-7 py-3.5 text-sm font-bold tracking-wide text-white transition hover:border-gold-400 hover:text-gold-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-night-950"
              >
                VIEW LEADERSHIP
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Bottom highlights strip */}
        <Reveal delay={500}>
          <dl className="mt-16 grid grid-cols-1 gap-6 border-t border-white/10 pt-10 sm:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-1 h-2.5 w-2.5 shrink-0 rotate-45 rounded-[2px] bg-gold-400"
                />
                <div>
                  <dt className="text-sm font-bold uppercase tracking-wide text-white">
                    {item.title}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-slate-400">
                    {item.text}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}