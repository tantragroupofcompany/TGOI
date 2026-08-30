import { NextRequest, NextResponse } from "next/server";
import { guardModule, actorOf, ok, handleAction } from "@/lib/api/helpers";
import { getBranding, updateBranding } from "@/lib/content/store-misc";

export const runtime = "nodejs";

/** GET /api/corporate/branding â€” read brand settings. */
export async function GET(): Promise<NextResponse> {
  const guarded = await guardModule("BRANDING_MANAGEMENT");
  if (guarded.response) return guarded.response;
  return ok(getBranding());
}

/** PATCH /api/corporate/branding â€” update brand settings. */
export async function PATCH(req: NextRequest): Promise<NextResponse> {
  const guarded = await guardModule("BRANDING_MANAGEMENT");
  if (guarded.response) return guarded.response;

  return handleAction(async () => {
    const body: unknown = await req.json().catch(() => null);
    const updated = await updateBranding(body, actorOf(guarded.session));
    return ok(updated);
  });
}