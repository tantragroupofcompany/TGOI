"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { corporateNavItems } from "@/data/corporate-navigation";
import type { CorporateSession } from "@/lib/auth/session";

type Props = {
  session: CorporateSession;
};

/**
 * Corporate dashboard sidebar. Respects the user's role-based permissions by
 * hiding modules the user is not authorized to access, and highlights the
 * active route. Becomes a slide-over mobile panel within the layout.
 */
export default function CorporateSidebar({ session }: Props) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/corporate/dashboard"
      ? pathname === href
      : pathname?.startsWith(href);

  return (
    <nav aria-label="Corporate dashboard" className="flex flex-col gap-1">
      {corporateNavItems.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-md px-4 py-2.5 text-sm font-semibold transition ${
              active
                ? "bg-gold-500 text-night-950"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
      <div className="mt-4 border-t border-white/10 pt-4">
        <Link href="/" className="rounded-md px-4 py-2.5 text-sm font-semibold text-slate-400 transition hover:bg-white/5 hover:text-white">
          ← View Public Website
        </Link>
      </div>
      <div className="mt-4 px-2">
        <p className="px-2 text-[0.65rem] uppercase tracking-widest text-slate-500">
          Signed in as
        </p>
        <p className="px-2 mt-1 text-sm font-semibold text-white">{session.name}</p>
        <p className="px-2 text-xs text-gold-300">{session.role}</p>
      </div>
    </nav>
  );
}