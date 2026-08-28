import Link from "next/link";
import Image from "next/image";
import { company, navigation } from "@/lib/data";

const year = new Date().getFullYear();

/**
 * Premium footer: brand, quick links, companies, and corporate access.
 */
export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-night-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
              aria-label="TGOI — Tantra Group of Industries Home"
            >
              <Image
                src="/logo/tgoi-logo-light.svg"
                alt="TGOI logo"
                width={168}
                height={42}
                className="h-10 w-auto"
                unoptimized
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-400">
              A parent company building businesses, creating opportunities, and
              shaping the future.
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">
              Company
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {navigation.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-300 transition hover:text-gold-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Group companies */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">
              Group Companies
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href="https://shoptantra.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 transition hover:text-gold-300"
                >
                  Shoptantra
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs text-slate-500">More companies coming soon.</p>
          </div>

          {/* Corporate access */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">
              Corporate
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-slate-400">
              Restricted area for authorised personnel. Available in a future
              phase.
            </p>
            <Link
              href={navigation.corporateAccess.href}
              className="mt-5 inline-flex items-center justify-center rounded-md bg-gold-500 px-5 py-2.5 text-sm font-bold tracking-wide text-night-950 transition hover:bg-gold-400"
            >
              CORPORATE ACCESS
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-slate-400">
            © {year} {company.name}. All Rights Reserved.
          </p>
          <p className="text-xs text-slate-500">
            Public website · Phase 1 · {company.shortName}
          </p>
        </div>
      </div>
    </footer>
  );
}