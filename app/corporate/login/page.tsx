import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getSession } from "@/lib/auth/session";
import CorporateLoginForm from "@/components/corporate/CorporateLoginForm";

export const metadata: Metadata = {
  title: "Corporate Access",
  description:
    "Secure corporate access for authorized Tantra Group of Industries leadership members. Restricted area — no public registration.",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Corporate login page.
 *
 * Redirects already-authenticated sessions straight to the protected
 * dashboard. Public users can only reach the secure login form — there is no
 * registration, no self-signup, and no demo credentials.
 */
export default async function CorporateLoginPage() {
  const session = await getSession();
  if (session) {
    redirect("/corporate/dashboard");
  }

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-night-950 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-glow-gold" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center px-4 py-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 py-2"
          aria-label="TGOI — Tantra Group of Industries home"
        >
          <Image
            src="/logo/tgoi-logo-light.svg"
            alt="TGOI logo"
            width={168}
            height={42}
            className="h-9 w-auto"
            unoptimized
          />
        </Link>

        <div className="mt-8 w-full text-center">
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            TANTRA GROUP OF INDUSTRIES
          </h1>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
            Corporate Access
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Authorized leadership only · View credentials are managed internally
          </p>
        </div>

        <div className="mt-10 w-full">
          <CorporateLoginForm />
        </div>

        <p className="mt-10 max-w-md text-center text-xs leading-relaxed text-slate-500">
          This system is restricted to authorized Tantra Group of Industries
          leadership. All access attempts are securely logged. Public visitors
          remain view-only on the public website.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-gold-300 transition hover:text-gold-200"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
            <path d="M19 12H5M11 5l-7 7 7 7" />
          </svg>
          Back to public website
        </Link>
      </div>
    </div>
  );
}