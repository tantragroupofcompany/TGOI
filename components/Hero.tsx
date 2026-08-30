import Link from "next/link";

export default function Hero({ intro }: { intro?: string }) {
  const text =
    intro ||
    "TANTRA GROUP OF INDUSTRIES (TGOI) is a parent company dedicated to building businesses, creating opportunities, and shaping the future across industries.";

  return (
    <section className="relative overflow-hidden bg-night-950">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-gold-400/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 sm:pt-28 lg:px-8">
        <p className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-[0.25em] text-gold-300">
          Parent Company · TGOI
        </p>

        <h1 className="mt-8 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          TANTRA GROUP OF INDUSTRIES
        </h1>

        <p className="mt-6 text-xl font-semibold leading-snug text-gold-300 sm:text-2xl">
          Building Businesses.
          <br />
          Creating Opportunities.
          <br />
          Shaping The Future.
        </p>

        <p className="mt-8 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">{text}</p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/companies"
            className="inline-flex items-center justify-center rounded-md bg-gold-500 px-8 py-3.5 text-sm font-extrabold tracking-[0.12em] text-night-950 transition hover:bg-gold-400"
          >
            EXPLORE OUR COMPANIES
          </Link>
          <Link
            href="/leadership"
            className="inline-flex items-center justify-center rounded-md border border-white/20 px-8 py-3.5 text-sm font-extrabold tracking-[0.12em] text-white transition hover:border-gold-400 hover:text-gold-300"
          >
            VIEW LEADERSHIP
          </Link>
        </div>
      </div>
    </section>
  );
}
