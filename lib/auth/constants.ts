/**
 * Shared authentication constants.
 *
 * This module is intentionally dependency-free so it can be imported safely
 * by the Edge-runtime middleware without pulling in Node-only modules.
 */

/** Name of the HttpOnly corporate session cookie. */
export const CORPORATE_SESSION_COOKIE = "tgoi_corporate_session";

/** Duration a corporate session remains valid (milliseconds). */
export const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

/** Session is refreshed (sliding) when a request occurs within this window. */
export const SESSION_REFRESH_WINDOW_MS = 60 * 60 * 1000; // 1 hour

/** Environment variable holding the secure gate access code. */
export const ACCESS_CODE_ENV = "CORPORATE_ACCESS_CODE";

/** Environment variable for the session secret (future encrypted cookies). */
export const SESSION_SECRET_ENV = "SESSION_SECRET";

/** Environment variable for the database connection (Phase 4+). */
export const DATABASE_URL_ENV = "DATABASE_URL";

/** Generic message shown for any failed corporate login attempt. */
export const GENERIC_LOGIN_ERROR = "Invalid corporate access credentials.";