import { NextResponse } from "next/server";
import { guardModule, ok } from "@/lib/api/helpers";
import { getActivityLog } from "@/lib/security/activity-log";

export const runtime = "nodejs";

/** GET /api/corporate/logs — recent activity log (newest first). */
export async function GET(): Promise<NextResponse> {
  const guarded = await guardModule("ACTIVITY_LOGS");
  if (guarded.response) return guarded.response;
  return ok(getActivityLog(200));
}