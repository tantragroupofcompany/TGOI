interface ModulePlaceholderProps {
  module: string;
  title: string;
  description: string;
}

/**
 * Controlled empty state for dashboard modules.
 *
 * Phase 3 delivers the secure dashboard structure only — no editing/saving.
 * Edit, change, and save functionality arrives in Phase 4. No public editing
 * is exposed anywhere.
 */
export default function ModulePlaceholder({
  module,
  title,
  description,
}: ModulePlaceholderProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
      <span className="inline-flex rounded-full bg-gold-500/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-gold-300 ring-1 ring-gold-500/30">
        {module}
      </span>
      <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-slate-300">
        {description}
      </p>
      <div className="mt-8 rounded-xl border border-dashed border-white/15 bg-night-900/60 px-6 py-8 text-center">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto h-10 w-10 text-slate-500"
        >
          <path d="M12 8v4l2.5 2.5" />
          <circle cx="12" cy="12" r="9" />
        </svg>
        <p className="mt-4 text-sm font-semibold text-slate-300">
          Management tools for this module arrive in Phase 4
        </p>
        <p className="mt-2 text-xs leading-relaxed text-slate-500">
          The area is securely gated. Editing, saving, and publishing will be
          available to authorized leadership in the next phase.
        </p>
      </div>
    </section>
  );
}