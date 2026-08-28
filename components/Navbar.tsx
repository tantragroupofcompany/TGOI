"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/data";

/**
 * Sticky, responsive navbar with a working mobile menu.
 * "Corporate Access" is a placeholder link for the Phase 3 login system —
 * no authentication is built in Phase 1.
 */
export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/70 bg-white/95 shadow-sm backdrop-blur"
          : "border-b border-transparent bg-white/85 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          aria-label="TGOI — Tantra Group of Industries Home"
        >
          <Image
            src="/logo/tgoi-logo.svg"
            alt="TGOI logo"
            width={168}
            height={42}
            className="h-10 w-auto"
            priority
            unoptimized
          />
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 lg:flex"
        >
          {navigation.links.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold tracking-wide transition-colors ${
                  active
                    ? "text-gold-600"
                    : "text-night-800 hover:text-gold-600"
                }`}
              >
                {link.label.toUpperCase()}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href={navigation.corporateAccess.href}
            className="inline-flex items-center justify-center rounded-md bg-gold-500 px-5 py-2.5 text-sm font-bold tracking-wide text-night-950 shadow-sm transition hover:bg-gold-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
          >
            CORPORATE ACCESS
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 text-night-900 transition hover:border-gold-400 hover:text-gold-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 lg:hidden"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="h-5 w-5"
          >
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden ${
          open ? "block border-t border-slate-200 bg-white" : "hidden"
        }`}
      >
        <nav
          aria-label="Mobile"
          className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6"
        >
          {navigation.links.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block rounded-md px-4 py-3 text-sm font-semibold tracking-wide transition ${
                  active
                    ? "bg-slate-50 text-gold-600"
                    : "text-night-800 hover:bg-slate-50 hover:text-gold-600"
                }`}
              >
                {link.label.toUpperCase()}
              </Link>
            );
          })}
          <div className="pt-3">
            <Link
              href={navigation.corporateAccess.href}
              onClick={() => setOpen(false)}
              className="block rounded-md bg-gold-500 px-4 py-3 text-center text-sm font-bold tracking-wide text-night-950 shadow-sm transition hover:bg-gold-400"
            >
              CORPORATE ACCESS
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}