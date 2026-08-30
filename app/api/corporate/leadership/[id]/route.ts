import { NextRequest, NextResponse } from "next/server";
import { guardModule, actorOf, ok, fail, handleAction } from "@/lib/api/helpers";
import { updateLeadership, deleteLeadership } from "@/lib/content/store";

export const runtime = "nodejs";

function getId(req: NextRequest): string {
  return req.nextUrl.pathname.split("/").pop() ?? "";
}

/** PATCH /api/corporate/leadership/[id] — update a leadership member. */
export async function PATCH(req: NextRequest): Promise<NextResponse> {
  const guarded = await guardModule("LEADERSHIP_MANAGEMENT");
  if (guarded.response) return guarded.response;

  return handleAction(async () => {
    const body: unknown = await req.json().catch(() => null);
    const updated = await updateLeadership(getId(req), body, actorOf(guarded.session));
    if (!updated) return fail("Leadership member not found.", 404);
    return ok(updated);
  });
}

/** DELETE /api/corporate/leadership/[id] — remove a leadership member. */
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const guarded = await guardModule("LEADERSHIP_MANAGEMENT");
  if (guarded.response) return guarded.response;

  return handleAction(async () => {
    const deleted = await deleteLeadership(getId(req), actorOf(guarded.session));
    if (!deleted) return fail("Leadership member not found.", 404);
    return ok({ deleted: true });
  });
}