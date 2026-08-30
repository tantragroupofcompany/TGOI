import "server-only";
import { NextResponse } from "next/server";
import { requirePermission, type CorporateSession } from "@/lib/auth/guards";
import type { CorporateModule } from "@/lib/auth/permissions";
import type { Actor } from "@/lib/content/store";

/**
 * Shared helpers for protected management APIs.
 * Every sensitive route verifies: valid session → authorized role → module
 * permission. No frontend-only protection is relied upon.
 */

export async function guardModule(
  module: CorporateModule
): Promise<{ session: CorporateSession; response: null } | { session: null; response: NextResponse }> {
  const result = await requirePermission(module);
  if ("response" in result) {
    return { session: null, response: result.response };
  }
  return { session: result.session, response: null };
}

export function actorOf(session: CorporateSession): Actor {
  return { userId: session.userId, name: session.name, role: session.role };
}

export function ok<T>(data: T): NextResponse {
  return NextResponse.json({ ok: true, data });
}

export function fail(error: string, status = 400): NextResponse {
  return NextResponse.json({ ok: false, error }, { status });
}

/** Wrap handlers so internal errors never leak stack traces to clients. */
export function handleAction(fn: () => Promise<NextResponse>): Promise<NextResponse> {
  return fn().catch((err: unknown) => {
    const message = err instanceof Error ? err.message : "";
    // Validation/store errors surface as 400; anything unexpected is generic.
    return fail(message || "An unexpected error occurred.", message ? 400 : 500);
  });
}