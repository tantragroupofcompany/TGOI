import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { recordActivity } from "@/lib/security/activity-log";
import CorporateHeader from "@/components/corporate/CorporateHeader";
import CorporateSidebar from "@/components/corporate/CorporateSidebar";

export const metadata: Metadata = {
  title: {
    default: "Corporate Management System | Tantra Group of Industries",
    template: "%s | TGOI Corporate",
  },
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Protected Corporate Dashboard layout.
 *
 * This is the AUTHORITATIVE access-control layer for every dashboard route.
 * Even though middleware performs a first-line cookie check, this server
 * layout validates the session in the store (expiry, validity) and redirects
 * unauthenticated/expired sessions to /corporate/login. No protected data is
 * rendered before authentication succeeds.
 */
export default async function CorporateDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    recordActivity("UNAUTHORIZED_ACCESS", null);
    redirect("/corporate/login");
  }

  return (
    <div className="min-h-screen bg-night-950 text-white">
      <CorporateHeader session={session} />
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:px-8">
        <aside className="lg:w-64 lg:shrink-0">
          <CorporateSidebar session={session} />
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}