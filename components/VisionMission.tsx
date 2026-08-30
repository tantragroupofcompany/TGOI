export default function VisionMission() {
  return (
    <section className="bg-night-900 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gold-500/20 bg-gradient-to-br from-gold-500/10 to-transparent p-9">
            <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-gold-400">Our Vision</p>
            <h2 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">
              To build a future-ready group of companies that create lasting value.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              We envision TGOI as a trusted parent company behind businesses that stand for quality,
              integrity, and innovation — across India and globally.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-9">
            <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-gold-400">Our Mission</p>
            <h2 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">
              To build businesses, create opportunities, and shape the future.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              We launch and grow ventures with disciplined strategy, empower entrepreneurial leadership,
              and hold every company in the group to the highest standards.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
