import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-night-950 py-32 text-white lg:py-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-glow-gold" />
      <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6">
        <p className="text-7xl font-extrabold text-gradient-gold">404</p>
        <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
          Page not found
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-300">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-gold-500 px-7 py-3.5 text-sm font-bold tracking-wide text-night-950 transition hover:bg-gold-400"
        >
          BACK TO HOME
        </Link>
      </div>
    </section>
  );
}