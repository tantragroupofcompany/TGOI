import { NextRequest, NextResponse } from "next/server";
import { guardModule, actorOf, ok, handleAction } from "@/lib/api/helpers";
import { getContact, updateContact } from "@/lib/content/store-misc";

export const runtime = "nodejs";

/** GET /api/corporate/contact â€” read public contact details. */
export async function GET(): Promise<NextResponse> {
  const guarded = await guardModule("CONTACT_MANAGEMENT");
  if (guarded.response) return guarded.response;
  return ok(getContact());
}

/** PATCH /api/corporate/contact â€” update public contact details. */
export async function PATCH(req: NextRequest): Promise<NextResponse> {
  const guarded = await guardModule("CONTACT_MANAGEMENT");
  if (guarded.response) return guarded.response;

  return handleAction(async () => {
    const body: unknown = await req.json().catch(() => null);
    const updated = await updateContact(body, actorOf(guarded.session));
    return ok(updated);
  });
}