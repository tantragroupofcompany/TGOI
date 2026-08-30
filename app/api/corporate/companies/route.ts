import { NextRequest, NextResponse } from "next/server";
import { guardModule, actorOf, ok, handleAction } from "@/lib/api/helpers";
import { listCompanies, createCompany } from "@/lib/content/store";

export const runtime = "nodejs";

/** GET /api/corporate/companies â€” list all companies. */
export async function GET(): Promise<NextResponse> {
  const guarded = await guardModule("COMPANY_MANAGEMENT");
  if (guarded.response) return guarded.response;
  return ok(listCompanies());
}

/** POST /api/corporate/companies â€” create a company. */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const guarded = await guardModule("COMPANY_MANAGEMENT");
  if (guarded.response) return guarded.response;

  return handleAction(async () => {
    const body: unknown = await req.json().catch(() => null);
    const created = await createCompany(body, actorOf(guarded.session));
    return ok(created);
  });
}