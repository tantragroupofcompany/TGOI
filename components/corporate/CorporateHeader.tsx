import Image from "next/image";
import Link from "next/link";
import LogoutButton from "@/components/corporate/LogoutButton";
import type { CorporateSession } from "@/lib/auth/session";
import { ROLE_LABELS } from "@/lib/auth/permissions";

/**
 * Corporate dashboard header (server component). Shows the TGOI brand plus
 * the signed-in user's name/role and a secure logout control.
 */
export default function CorporateHeader({ session }: { session: CorporateSession }) {
  return (
    <header className="border-b border-white/10 bg-night-950">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="TGOI home">
          <Image
            src="/logo/tgoi-logo-light.svg"
            alt="TGOI logo"
            width={168}
            height={42}
            className="h-8 w-auto"
            unoptimized
          />
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-white">{session.name}</p>
            <p className="text-xs text-gold-300">{ROLE_LABELS[session.role] || session.role}</p>
          </div>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}