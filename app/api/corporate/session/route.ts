import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";

export const runtime = "nodejs";

/**
 * Returns a safe, minimal view of the current session — never any security
 * fields, tokens, hashes, or access codes.
 */
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
  return NextResponse.json({
    authenticated: true,
    user: {
      name: session.name,
      role: session.role,
    },
  });
}