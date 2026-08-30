import { NextRequest, NextResponse } from "next/server";
import { guardModule, actorOf, ok, handleAction } from "@/lib/api/helpers";
import { getSettings, updateSettings } from "@/lib/content/store-misc";

export const runtime = "nodejs";

/** GET /api/corporate/settings â€” read controlled company settings. */
export async function GET(): Promise<NextResponse> {
  const guarded = await guardModule("SETTINGS");
  if (guarded.response) return guarded.response;
  return ok(getSettings());
}

/**
 * PATCH /api/corporate/settings â€” update controlled company settings.
 * Restricted to FOUNDER. Never accepts or exposes security secrets.
 */
export async function PATCH(req: NextRequest): Promise<NextResponse> {
  const guarded = await guardModule("SETTINGS");
  if (guarded.response) return guarded.response;

  return handleAction(async () => {
    const body: unknown = await req.json().catch(() => null);
    const updated = await updateSettings(body, actorOf(guarded.session));
    return ok(updated);
  });
}