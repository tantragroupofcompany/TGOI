import { NextRequest, NextResponse } from "next/server";
import { guardModule, actorOf, ok, handleAction } from "@/lib/api/helpers";
import { listLeadership, createLeadership } from "@/lib/content/store";

export const runtime = "nodejs";

/** GET /api/corporate/leadership â€” list leadership members. */
export async function GET(): Promise<NextResponse> {
  const guarded = await guardModule("LEADERSHIP_MANAGEMENT");
  if (guarded.response) return guarded.response;
  return ok(listLeadership());
}

/** POST /api/corporate/leadership â€” create a leadership member. */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const guarded = await guardModule("LEADERSHIP_MANAGEMENT");
  if (guarded.response) return guarded.response;

  return handleAction(async () => {
    const body: unknown = await req.json().catch(() => null);
    const created = await createLeadership(body, actorOf(guarded.session));
    return ok(created);
  });
}