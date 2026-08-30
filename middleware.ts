import { NextRequest, NextResponse } from "next/server";
import { CORPORATE_SESSION_COOKIE } from "@/lib/auth/constants";

/**
 * First-line guard for the protected corporate area (runs on the Edge runtime).
 *
 * This layer only checks for the *presence* of the HttpOnly session cookie and
 * redirects unauthenticated visitors to /corporate/login. It intentionally does
 * NOT trust the cookie alone — the authoritative validation (expiry, session
 * store lookup, role/permission enforcement) happens server-side in the
 * /corporate/dashboard layout and each page via getSession().
 */
export function middleware(request: NextRequest) {
  const hasSession = request.cookies.has(CORPORATE_SESSION_COOKIE);
  const { pathname } = request.nextUrl;

  if (!hasSession) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/corporate/login";
    // Remember the intended destination so the login can return the user to it.
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/corporate/dashboard/:path*"],
};