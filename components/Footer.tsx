import Link from "next/link";
import { getSiteContent } from "@/lib/content/site";

export default function Footer() {
  const { branding, contact, websiteLinks } = getSiteContent();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-night-950">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={branding.logoPath} alt={`${branding.companyName} logo`} className="h-10 w-10" />
              <div>
                <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-white">
                  {branding.companyName}
                </p>
                <p className="mt-0.5 text-xs uppercase tracking-widest text-gold-400">
                  {branding.shortName}
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-400">
              {branding.tagline || "Building Businesses. Creating Opportunities. Shaping The Future."}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-white">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/" className="transition hover:text-gold-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/leadership" className="transition hover:text-gold-300">
                  Leadership
                </Link>
              </li>
              <li>
                <Link href="/companies" className="transition hover:text-gold-300">
                  Companies
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition hover:text-gold-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em] text-white">Our Websites</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              {websiteLinks.length === 0 ? (
                <li className="text-slate-500">More websites launching soon.</li>
              ) : (
                websiteLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition hover:text-gold-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {branding.companyName}. All rights reserved.
          </p>
          <p>
            {contact.email}
            {contact.phone ? ` · ${contact.phone}` : ""}
          </p>
        </div>
      </div>
    </footer>
  );
}
