import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth/session";
import { recordActivity } from "@/lib/security/activity-log";

export const runtime = "nodejs";

/**
 * Corporate logout. Invalidates the server-side session, clears the HttpOnly
 * cookie, records the event, and confirms success. Idempotent — calling it
 * with no active session simply returns success.
 */
export async function POST() {
  await destroySession();
  recordActivity("LOGOUT", null);
  return NextResponse.json({ ok: true });
}