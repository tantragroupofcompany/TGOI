import { NextRequest, NextResponse } from "next/server";
import { guardModule, actorOf, ok, fail, handleAction } from "@/lib/api/helpers";
import { updateWebsiteLink, deleteWebsiteLink } from "@/lib/content/store-misc";

export const runtime = "nodejs";

function getId(req: NextRequest): string {
  return req.nextUrl.pathname.split("/").pop() ?? "";
}

/** PATCH /api/corporate/websites/[id] — update a website link. */
export async function PATCH(req: NextRequest): Promise<NextResponse> {
  const guarded = await guardModule("WEBSITE_MANAGEMENT");
  if (guarded.response) return guarded.response;

  return handleAction(async () => {
    const body: unknown = await req.json().catch(() => null);
    const updated = await updateWebsiteLink(getId(req), body, actorOf(guarded.session));
    if (!updated) return fail("Website link not found.", 404);
    return ok(updated);
  });
}

/** DELETE /api/corporate/websites/[id] — delete a website link (confirm required). */
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const guarded = await guardModule("WEBSITE_MANAGEMENT");
  if (guarded.response) return guarded.response;

  return handleAction(async () => {
    if (req.nextUrl.searchParams.get("confirm") !== "true") {
      return fail("Deletion requires confirmation.", 400);
    }
    const deleted = await deleteWebsiteLink(getId(req), actorOf(guarded.session));
    if (!deleted) return fail("Website link not found.", 404);
    return ok({ deleted: true });
  });
}