import "server-only";
import { NextResponse } from "next/server";
import { getSession, type CorporateSession } from "@/lib/auth/session";
import { recordActivity } from "@/lib/security/activity-log";
import { hasPermission, type CorporateModule } from "@/lib/auth/permissions";

export type { CorporateSession };

/**
 * Guard used by protected server-side route handlers (and reusable by future
 * Phase 4 management APIs). Reads the session from the HttpOnly cookie and
 * verifies it. On any failure it records UNAUTHORIZED_ACCESS and returns the
 * appropriate response.
 */
export async function requireSession(): Promise<
  { session: CorporateSession } | { response: NextResponse }
> {
  const session = await getSession();
  if (!session) {
    recordActivity("UNAUTHORIZED_ACCESS", null);
    return {
      response: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      ),
    };
  }
  return { session };
}

export async function requirePermission(
  module: CorporateModule
): Promise<{ session: CorporateSession } | { response: NextResponse }> {
  const guard = await requireSession();
  if ("response" in guard) {
    return guard;
  }
  if (!hasPermission(guard.session.role, module)) {
    recordActivity("UNAUTHORIZED_ACCESS", guard.session.userId, { module });
    return {
      response: NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      ),
    };
  }
  return { session: guard.session };
}

/**
 * Page-level permission check for server components inside the protected
 * dashboard layout. Returns true when the authenticated session has access to
 * the module. (Session existence is already enforced by the layout.)
 */
export async function pageHasModulePermission(
  module: CorporateModule
): Promise<boolean> {
  const session = await getSession();
  if (!session) return false;
  if (!hasPermission(session.role, module)) {
    recordActivity("UNAUTHORIZED_ACCESS", session.userId, { module });
    return false;
  }
  return true;
}