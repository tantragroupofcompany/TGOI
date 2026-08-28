import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { company } from "@/lib/data";

const pillarIcons: Record<string, React.ReactNode> = {
  Innovation: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M9 18h6M10 21h4M12 2a7 7 0 0 0-4 12.7c.8.6 1.3 1.5 1.5 2.3h5c.2-.8.7-1.7 1.5-2.3A7 7 0 0 0 12 2Z" />
    </svg>
  ),
  Entrepreneurship: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M12 2v4m0 0 2.5-2.5M12 6 9.5 3.5M20 12h-4m0 0 2.5 2.5M16 12l2.5-2.5M4 12h4m0 0L5.5 9.5M8 12l-2.5 2.5M12 20v-4m0 0-2.5 2.5M12 16l2.5 2.5" />
    </svg>
  ),
  Opportunity: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M3 20h18M6 16h12v3H6zM7 16V9a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v7M9 8V7a3 3 0 0 1 6 0v1" />
    </svg>
  ),
  Growth: (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M3 21h18M5 21V7l5 4 4-6 6 5v11" />
    </svg>
  ),
};

/**
 * About section — who the parent company is and what it stands for.
 */
export default function About() {
  return (
    <section id="about" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <SectionHeading
                eyebrow="Who We Are"
                title="ABOUT TANTRA GROUP OF INDUSTRIES"
              />
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-6 space-y-5">
                {company.aboutParagraphs.map((paragraph) => (
                  <p key={paragraph} className="leading-relaxed text-slate-600">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:pt-4">
            <Reveal delay={100}>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {company.pillars.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="group rounded-xl border border-slate-200 bg-slate-50/60 p-6 transition hover:border-gold-400 hover:bg-white hover:shadow-lg hover:shadow-slate-200/60"
                  >
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-night-900 text-gold-400 transition group-hover:bg-gold-500 group-hover:text-night-950">
                      {pillarIcons[pillar.title]}
                    </span>
                    <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-night-900">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {pillar.text}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}