import type { ReactNode } from "react";

interface ContactCardProps {
  label: string;
  value: string;
  href?: string;
  note?: string;
  icon?: ReactNode;
}

/**
 * Reusable contact information card for the /contact page.
 * Renders an anchor when an href is provided, otherwise static content.
 */
export default function ContactCard({
  label,
  value,
  href,
  note,
  icon,
}: ContactCardProps) {
  const content = (
    <>
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-night-900 text-gold-400">
        {icon}
      </span>
      <h3 className="mt-4 text-xs font-bold uppercase tracking-widest text-gold-700">
        {label}
      </h3>
      <p className="mt-2 text-base font-semibold break-words text-night-900">
        {value}
      </p>
      {note && <p className="mt-2 text-xs text-slate-500">{note}</p>}
    </>
  );

  const classes =
    "flex h-full flex-col items-start rounded-xl border border-slate-200 bg-slate-50/60 p-7 transition hover:border-gold-400 hover:bg-white hover:shadow-lg";

  return (
    <div className="flex h-full">
      {href ? (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className={classes}
        >
          {content}
        </a>
      ) : (
        <div className={classes}>{content}</div>
      )}
    </div>
  );
}