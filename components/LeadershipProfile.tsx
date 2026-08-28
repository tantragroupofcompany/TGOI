import Reveal from "@/components/Reveal";
import type { LeaderProfile } from "@/data/leadership";

interface LeadershipProfileProps {
  profile: LeaderProfile;
  /** Alternate the photo/text ordering for a dynamic, premium layout. */
  reverse?: boolean;
}

/**
 * Full, reusable leadership profile block used on the /leadership page.
 * Renders a professional photo placeholder, role, name, biography, the
 * leader's personal insight (vision / philosophy / strategy), and a message.
 * Supports unlimited leadership members via the data array.
 */
export default function LeadershipProfile({
  profile,
  reverse = false,
}: LeadershipProfileProps) {
  return (
    <section
      id={profile.id}
      aria-labelledby={`${profile.id}-heading`}
      className={reverse ? "bg-slate-50" : "bg-white"}
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Photo / placeholder */}
          <Reveal className={reverse ? "lg:order-2" : ""}>
            <div className="relative overflow-hidden rounded-2xl bg-night-900 shadow-xl">
              <div aria-hidden="true" className="absolute inset-0 bg-glow-gold" />
              <div className="relative flex aspect-[4/3] items-center justify-center">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#E5B84A"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-24 w-24 opacity-80"
                >
                  <circle cx="12" cy="8" r="3.6" />
                  <path d="M4.5 20c.7-3.6 3.9-6 7.5-6s6.8 2.4 7.5 6" />
                </svg>
                <span className="absolute bottom-5 left-5 rounded-md bg-gold-500/90 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-night-950">
                  {profile.role}
                </span>
              </div>
              <p className="sr-only">{profile.photoAlt}</p>
            </div>
          </Reveal>

          {/* Text */}
          <Reveal delay={120} className={reverse ? "lg:order-1" : ""}>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-gold-600">
              <span aria-hidden="true" className="h-px w-8 bg-current" />
              {profile.role}
            </p>
            <h2
              id={`${profile.id}-heading`}
              className="mt-4 text-3xl font-extrabold tracking-tight text-night-900 sm:text-4xl"
            >
              {profile.name}
            </h2>

            <p className="mt-5 leading-relaxed text-slate-600">
              {profile.biography}
            </p>

            {/* Personal insight */}
            <div className="mt-7 rounded-xl border-l-4 border-gold-500 bg-slate-50 p-6">
              <h3 className="text-sm font-bold uppercase tracking-wide text-night-900">
                {profile.insightHeading}
              </h3>
              <p className="mt-2 leading-relaxed text-night-800">
                {profile.insightStatement}
              </p>
            </div>

            {/* Message */}
            <div className="mt-6">
              <h3 className="text-sm font-bold uppercase tracking-wide text-gold-700">
                {profile.messageHeading}
              </h3>
              <p className="mt-2 leading-relaxed text-slate-600">
                {profile.message}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}