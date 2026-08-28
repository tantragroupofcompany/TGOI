interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
}

/**
 * Consistent section heading: small gold eyebrow, strong title,
 * optional supporting description.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`max-w-3xl ${alignment}`}>
      <p
        className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] ${
          dark ? "text-gold-400" : "text-gold-600"
        }`}
      >
        <span aria-hidden="true" className="h-px w-8 bg-current" />
        {eyebrow}
        {align === "center" && (
          <span aria-hidden="true" className="h-px w-8 bg-current" />
        )}
      </p>
      <h2
        className={`mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[2.6rem] ${
          dark ? "text-white" : "text-night-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            dark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}