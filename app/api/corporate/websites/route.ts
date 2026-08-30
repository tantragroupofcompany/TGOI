import { NextRequest, NextResponse } from "next/server";
import { guardModule, actorOf, ok, handleAction } from "@/lib/api/helpers";
import { listWebsiteLinks, createWebsiteLink } from "@/lib/content/store-misc";

export const runtime = "nodejs";

/** GET /api/corporate/websites â€” list website links. */
export async function GET(): Promise<NextResponse> {
  const guarded = await guardModule("WEBSITE_MANAGEMENT");
  if (guarded.response) return guarded.response;
  return ok(listWebsiteLinks());
}

/** POST /api/corporate/websites â€” create a website link. */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const guarded = await guardModule("WEBSITE_MANAGEMENT");
  if (guarded.response) return guarded.response;

  return handleAction(async () => {
    const body: unknown = await req.json().catch(() => null);
    const created = await createWebsiteLink(body, actorOf(guarded.session));
    return ok(created);
  });
}