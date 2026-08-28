import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { leadership } from "@/lib/data";

/**
 * Leadership preview — three leadership cards. Reused by the Phase 2
 * /leadership page. Photos and full profiles to be published in Phase 2.
 */
export default function LeadershipPreview() {
  return (
    <section id="leadership" className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Our Leadership"
            title="OUR LEADERSHIP"
            description="The vision and direction behind the Tantra Group of Industries."
            align="center"
          />
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          {leadership.map((leader, index) => (
            <Reveal key={leader.id} delay={index * 100}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-gold-400 hover:shadow-xl">
                {/* Photo placeholder */}
                <div className="relative flex aspect-[4/3] items-end justify-center overflow-hidden bg-night-900">
                  <div aria-hidden="true" className="absolute inset-0 bg-glow-gold" />
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#E5B84A"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="relative mb-6 h-20 w-20 opacity-80"
                  >
                    <circle cx="12" cy="8" r="3.6" />
                    <path d="M4.5 20c.7-3.6 3.9-6 7.5-6s6.8 2.4 7.5 6" />
                  </svg>
                  <span className="relative mb-3 inline-flex w-fit rounded-full bg-gold-500 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-night-950">
                    {leader.role}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold tracking-tight text-night-900">
                    {leader.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {leader.introduction}
                  </p>
                  <Link
                    href="/leadership"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-gold-600 transition hover:text-gold-500"
                  >
                    VIEW PROFILE
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
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-10 text-center text-sm text-slate-500">
            Detailed leadership profiles will be published in Phase 2.
          </p>
        </Reveal>
      </div>
    </section>
  );
}