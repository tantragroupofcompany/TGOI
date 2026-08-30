import { NextRequest, NextResponse } from "next/server";
import { guardModule, actorOf, ok, fail, handleAction } from "@/lib/api/helpers";
import { updateCompany, deleteCompany } from "@/lib/content/store";

export const runtime = "nodejs";

function getId(req: NextRequest): string {
  return req.nextUrl.pathname.split("/").pop() ?? "";
}

/** PATCH /api/corporate/companies/[id] — update a company. */
export async function PATCH(req: NextRequest): Promise<NextResponse> {
  const guarded = await guardModule("COMPANY_MANAGEMENT");
  if (guarded.response) return guarded.response;

  return handleAction(async () => {
    const body: unknown = await req.json().catch(() => null);
    const updated = await updateCompany(getId(req), body, actorOf(guarded.session));
    if (!updated) return fail("Company not found.", 404);
    return ok(updated);
  });
}

/**
 * DELETE /api/corporate/companies/[id] — hard delete a company.
 * Callers must present an explicit confirmation flag; the UI shows a
 * confirmation dialog before invoking this.
 */
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const guarded = await guardModule("COMPANY_MANAGEMENT");
  if (guarded.response) return guarded.response;

  return handleAction(async () => {
    const params = req.nextUrl.searchParams;
    if (params.get("confirm") !== "true") {
      return fail("Deletion requires confirmation.", 400);
    }
    const deleted = await deleteCompany(getId(req), actorOf(guarded.session));
    if (!deleted) return fail("Company not found.", 404);
    return ok({ deleted: true });
  });
}