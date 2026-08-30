"use client";

import { useState } from "react";

/**
 * Secure logout button. Calls the server logout API (which invalidates the
 * server-side session and clears the HttpOnly cookie) then performs a full
 * navigation back to /corporate/login with a signed-out notice.
 */
export default function LogoutButton() {
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    if (loading) return;
    setLoading(true);
    try {
      await fetch("/api/corporate/logout", { method: "POST" });
    } catch {
      // Ignore network errors here — the cookie-clearing Set-Cookie response is
      // the important part; navigation will still reach the login page.
    }
    window.location.assign("/corporate/login?loggedout=1");
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-white/15 px-4 py-2.5 text-sm font-bold tracking-wide text-white transition hover:border-gold-400 hover:text-gold-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 disabled:opacity-60"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
      </svg>
      {loading ? "SIGNING OUT…" : "LOGOUT"}
    </button>
  );
}