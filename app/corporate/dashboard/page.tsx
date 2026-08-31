import type { Metadata } from "next";
import Link from "next/link";
import { getSession } from "@/lib/auth/session";
import { ROLE_LABELS, MODULES_FOR_ROLE } from "@/lib/auth/permissions";
import { corporateNavItems } from "@/data/corporate-navigation";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Corporate management system dashboard for authorized TGOI leadership.",
};

export default async function CorporateDashboardPage() {
  const session = await getSession();
  if (!session) {
    // Layout already redirected; this guard keeps static analysis/typing sound.
    return null;
  }

  const allowedModules = new Set(MODULES_FOR_ROLE[session.role]);
  const accessible = corporateNavItems.filter(
    (item) => item.module === null || allowedModules.has(item.module)
  );

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">
          TANTRA GROUP OF INDUSTRIES
        </p>
        <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
          CORPORATE MANAGEMENT SYSTEM
        </h1>
        <p className="mt-3 text-slate-300">
          Welcome, <span className="font-semibold text-white">{session.name}</span>.
          Your role:{" "}
          <span className="font-semibold text-gold-300">
            {ROLE_LABELS[session.role] || session.role}
          </span>
        </p>
        <p className="mt-2 text-sm text-slate-400">
          This secure management suite provides centralized corporate control over leadership profiles, company portfolios, contact information, branding assets, and activity logs.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">
          Secure Modules
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {accessible.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-gold-400 hover:bg-white/[0.06]"
            >
              <h3 className="font-semibold text-white">{item.label}</h3>
              <p className="mt-1 text-xs text-slate-400">Protected corporate module</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}