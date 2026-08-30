"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Secure corporate login form.
 *
 * All credentials are sent to the server-side API over a normal-POST; nothing
 * sensitive is stored in localStorage (passwords are never persisted
 * client-side). Public users cannot register or self-assign a role here.
 */
export default function CorporateLoginForm() {
  const searchParams = useSearchParams();
  const loggedOut = searchParams.get("loggedout") === "1";
  const next = searchParams.get("next") || "/corporate/dashboard";

  const [accessCode, setAccessCode] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/corporate/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessCode, identifier, password }),
      });

      if (res.ok) {
        // Full navigation ensures the HttpOnly session cookie is set before the
        // protected dashboard mounts.
        window.location.assign(next.startsWith("/") ? next : "/corporate/dashboard");
        return;
      }

      const data: { error?: string } = await res.json().catch(() => ({}));
      // The server never reveals which field failed.
      setError(data.error || "Invalid corporate access credentials.");
    } catch {
      setError("Could not reach the authentication service. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClasses =
    "w-full rounded-md border border-slate-600 bg-night-900 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500/40";

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-left backdrop-blur"
      noValidate
    >
      <p className="text-center text-[0.7rem] font-bold uppercase tracking-[0.3em] text-gold-400">
        Authorized Leadership Only
      </p>

      {loggedOut && (
        <div className="mt-4 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-center text-sm text-emerald-300">
          You have been securely signed out.
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mt-4 rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300"
        >
          {error}
        </div>
      )}
      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="accessCode" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-300">
            Corporate Access Code
          </label>
          <input
            id="accessCode"
            name="accessCode"
            type="password"
            autoComplete="off"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            required
            placeholder="Enter corporate access code"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="identifier" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-300">
            Email or Username
          </label>
          <input
            id="identifier"
            name="identifier"
            type="text"
            autoComplete="username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            placeholder="Email or username"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-300">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className={`${inputClasses} pr-12`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((show) => !show)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-slate-400 transition hover:text-gold-300"
            >
              {showPassword ? (
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
                  <circle cx="12" cy="12" r="2.5" />
                </svg>
              ) : (
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M3 3l18 18" />
                  <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 6.3A11.6 11.6 0 0 1 12 6c6.5 0 10 6 10 6a18.5 18.5 0 0 1-3.2 4.1M6.6 6.6C4 8.3 2 12 2 12s3.5 6 10 6a10.3 10.3 0 0 0 4.1-.9" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-md bg-gold-500 px-6 py-3.5 text-sm font-bold tracking-wide text-night-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-night-950 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4 animate-spin">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z" />
            </svg>
            SIGNING IN…
          </>
        ) : (
          "SECURE LOGIN"
        )}
      </button>

      <p className="mt-5 text-center text-xs leading-relaxed text-slate-500">
        Restricted area for authorized Tantra Group of Industries leadership
        members only. Corporate access is provisioned through internal account
        management — there is no public registration.
      </p>
    </form>
  );
}