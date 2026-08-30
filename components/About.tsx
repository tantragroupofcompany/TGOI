const PILLARS = [
  {
    title: "Building Businesses",
    description:
      "We found, fund, and grow companies with long-term vision and disciplined execution.",
  },
  {
    title: "Creating Opportunities",
    description:
      "Every venture creates jobs, skills, and pathways for people and partners to thrive.",
  },
  {
    title: "Shaping The Future",
    description:
      "We invest in innovation and technology that move industries forward.",
  },
];

export default function About() {
  return (
    <section id="about" className="bg-night-950 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-gold-400">Who We Are</p>
        <h2 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          ABOUT TANTRA GROUP OF INDUSTRIES
        </h2>
        <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-slate-400">
          <p>
            TANTRA GROUP OF INDUSTRIES (TGOI) is a parent organization focused on building businesses,
            driving innovation, and supporting entrepreneurship. We operate as the strategic head of a
            growing family of companies, providing vision, structure, and long-term direction.
          </p>
          <p>
            Our approach is simple: build strong foundations, empower capable leadership, and grow
            businesses that create real value for customers, partners, and communities.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-gold-500/40"
            >
              <h3 className="text-lg font-bold text-white">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
