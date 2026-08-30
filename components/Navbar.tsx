"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "HOME" },
  { href: "/leadership", label: "LEADERSHIP" },
  { href: "/companies", label: "COMPANIES" },
  { href: "/contact", label: "CONTACT" },
];

export default function Navbar({
  companyName = "TANTRA GROUP OF INDUSTRIES",
  logoPath = "/logo/tgoi-logo.svg",
}: {
  companyName?: string;
  logoPath?: string;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur transition-colors duration-300 ${
        scrolled ? "border-white/10 bg-night-950/95" : "border-white/5 bg-night-950/80"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoPath} alt={`${companyName} logo`} className="h-9 w-9 shrink-0" />
          <span className="hidden text-sm font-extrabold uppercase tracking-[0.18em] text-white sm:inline">
            {companyName}
          </span>
          <span className="text-sm font-extrabold uppercase tracking-[0.18em] text-white sm:hidden">
            TGOI
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-bold tracking-[0.15em] text-slate-300 transition hover:text-gold-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/corporate/login"
            className="hidden rounded-md bg-gold-500 px-5 py-2.5 text-xs font-extrabold tracking-[0.15em] text-night-950 transition hover:bg-gold-400 md:inline-block"
          >
            CORPORATE ACCESS
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-slate-200 md:hidden"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <>
                  <line x1="5" y1="5" x2="19" y2="19" />
                  <line x1="19" y1="5" x2="5" y2="19" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-white/10 bg-night-950/95 px-4 pb-6 pt-2 md:hidden">
          <div className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/5 py-3.5 text-sm font-bold tracking-[0.15em] text-slate-200 transition hover:text-gold-300"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/corporate/login"
              onClick={() => setOpen(false)}
              className="mt-5 inline-flex items-center justify-center rounded-md bg-gold-500 px-5 py-3 text-xs font-extrabold tracking-[0.15em] text-night-950"
            >
              CORPORATE ACCESS
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
