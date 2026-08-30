import { NextRequest, NextResponse } from "next/server";
import { validateCorporateLoginInput } from "@/lib/validation/corporate";
import { authenticateCorporateUser } from "@/lib/auth/corporate-auth";
import { createSession } from "@/lib/auth/session";
import { isRateLimited, recordAttempt, resetAttempts } from "@/lib/security/rate-limit";
import { GENERIC_LOGIN_ERROR } from "@/lib/auth/constants";

export const runtime = "nodejs";

function getIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: NextRequest) {
  const ip = getIp(req);

  // Reasonable brute-force protection.
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many login attempts. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: GENERIC_LOGIN_ERROR }, { status: 400 });
  }

  // Input validation (server-side, never trusted client input).
  const validated = validateCorporateLoginInput(body);
  if (!validated.ok) {
    recordAttempt(ip);
    return NextResponse.json({ error: GENERIC_LOGIN_ERROR }, { status: 400 });
  }

  recordAttempt(ip);

  const result = await authenticateCorporateUser({
    accessCode: validated.data.accessCode,
    identifier: validated.data.identifier,
    password: validated.data.password,
    ip,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 401 });
  }

  // Create the secure HttpOnly session and only then succeed.
  await createSession({
    userId: result.userId,
    name: result.name,
    role: result.role,
    email: result.email,
  });
  resetAttempts(ip);

  return NextResponse.json({
    ok: true,
    user: {
      name: result.name,
      role: result.role,
    },
  });
}