import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { mission, vision } from "@/lib/data";

const missionIcons: Record<string, React.ReactNode> = {
  "Build Innovative Businesses": (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M9 18h6M10 21h4M12 2a7 7 0 0 0-4 12.7c.8.6 1.3 1.5 1.5 2.3h5c.2-.8.7-1.7 1.5-2.3A7 7 0 0 0 12 2Z" />
    </svg>
  ),
  "Support Entrepreneurship": (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.6-3.2 3.4-5 7-5s6.4 1.8 7 5" />
    </svg>
  ),
  "Create Employment Opportunities": (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M3 20h18M6 16h12v3H6zM7 16V9a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v7M9 8V7a3 3 0 0 1 6 0v1" />
    </svg>
  ),
  "Develop Digital Businesses": (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  "Build Future Opportunities": (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
};

/**
 * Vision (dark statement band) and Mission (card grid) sections.
 */
export default function VisionMission() {
  return (
    <>
      {/* VISION */}
      <section id="vision" className="relative overflow-hidden bg-night-950 py-20 text-white lg:py-28">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-glow-gold" />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <p className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-gold-400">
              <span aria-hidden="true" className="h-px w-8 bg-current" />
              {vision.title}
              <span aria-hidden="true" className="h-px w-8 bg-current" />
            </p>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mx-auto mt-6 h-10 w-10 text-gold-500/70"
            >
              <path d="M10 8c-2.2 0-4 1.8-4 4v6h7v-6H8.6c.2-1.2 1.1-2 2.1-2V8Zm7 0c-2.2 0-4 1.8-4 4v6h7v-6h-4.4c.2-1.2 1.1-2 2.1-2V8Z" />
            </svg>
            <blockquote className="mt-6 text-2xl font-bold leading-snug tracking-tight sm:text-3xl lg:text-4xl">
              {vision.statement}
            </blockquote>
          </Reveal>
        </div>
      </section>
      {/* MISSION */}
      <section id="mission" className="bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Our Mission"
              title={mission.title}
              description={mission.subtitle}
              align="center"
            />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mission.points.map((point, index) => (
              <Reveal key={point.id} delay={index * 80}>
                <div className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-gold-400 hover:shadow-lg">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-night-900 text-gold-400 transition group-hover:bg-gold-500 group-hover:text-night-950">
                    {missionIcons[point.title]}
                  </span>
                  <h3 className="mt-5 text-lg font-bold tracking-tight text-night-900">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {point.text}
                  </p>
                </div>
              </Reveal>
            ))}

            {/* Balanced CTA card to complete the grid */}
            <Reveal delay={5 * 80}>
              <div className="flex h-full flex-col justify-between rounded-xl bg-night-950 p-7 text-white shadow-sm">
                <div>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gold-500 text-night-950">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                      <path d="M3 20h18M5 20V7l5 4 4-6 6 5v10" />
                    </svg>
                  </span>
                  <h3 className="mt-5 text-lg font-bold tracking-tight">
                    Shape the future with us
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    Partnerships, ventures, and opportunities — let&apos;s build
                    what comes next, together.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center justify-center rounded-md border border-gold-500/60 px-5 py-2.5 text-sm font-bold tracking-wide text-gold-300 transition hover:bg-gold-500 hover:text-night-950"
                >
                  CONTACT US
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

    </>
  );
}