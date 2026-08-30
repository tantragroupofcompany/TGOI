/**
 * Rendered when an authenticated user lacks permission for a module.
 * (Phase 3: management roles hold management access; this is future-proofing
 * for finer-grained permission changes.) Never exposes module internals.
 */
export default function AccessDenied() {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center sm:p-10">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-300 ring-1 ring-red-500/30">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          <rect x="4" y="10" width="16" height="11" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
      </span>
      <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-white">
        ACCESS DENIED
      </h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-400">
        Your corporate role does not have permission to access this module. If
        you believe this is an error, contact the Founder.
      </p>
    </section>
  );
}