import Link from "next/link";
import type { PublicContact } from "@/lib/content/types";
import { fallbackContent } from "@/data/fallback-data";

export default function ContactPreview({ contact }: { contact?: PublicContact }) {
  const c = contact ?? fallbackContent.contact;

  return (
    <section className="bg-night-950 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gold-500/20 bg-gradient-to-br from-gold-500/10 via-transparent to-transparent p-9 sm:p-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-gold-400">Get In Touch</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">CONTACT TGOI</h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-400">
                For business inquiries, partnerships, or corporate communication, reach the Tantra Group
                of Industries head office.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center justify-center rounded-md bg-gold-500 px-8 py-3.5 text-sm font-extrabold tracking-[0.12em] text-night-950 transition hover:bg-gold-400"
              >
                CONTACT PAGE
              </Link>
            </div>

            <dl className="space-y-5 text-sm">
              <div>
                <dt className="text-xs font-extrabold uppercase tracking-[0.2em] text-slate-500">Email</dt>
                <dd className="mt-1 text-slate-200">{c.email || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs font-extrabold uppercase tracking-[0.2em] text-slate-500">Phone</dt>
                <dd className="mt-1 text-slate-200">{c.phone || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs font-extrabold uppercase tracking-[0.2em] text-slate-500">Head Office</dt>
                <dd className="mt-1 whitespace-pre-line text-slate-200">{c.address || "—"}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
