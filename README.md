# TANTRA GROUP OF INDUSTRIES (TGOI) — Official Website

Official public website of **Tantra Group of Industries (TGOI)** — a parent company
building businesses, creating opportunities, and shaping the future.

## Phase 1 Scope

Phase 1 delivered the public foundation of the website:

- Professional, premium, fully responsive corporate HOME PAGE
- Sticky responsive navbar (mobile menu included)
- Hero, About, Vision, Mission, Our Companies, Leadership Preview,
  Contact Preview and Footer sections
- SHOPTANTRA (https://shoptantra.in) company card with live link
- Structured static content data ready to be converted to database-driven
  content in later phases

## Phase 2 Scope

Phase 2 delivered the remaining public pages:

- **/leadership** — full Leadership page (Founder, Chairman, CEO & MD profiles,
  leadership vision, messages) plus a Corporate Access preview banner
- **/companies** — full Companies page (portfolio introduction, featured
  company cards, SHOPTANTRA flagship spotlight, and a generic
  "BUILDING THE FUTURE" expansion section)
- **/contact** — full Contact page (Email, Phone, Office Address, Website card,
  office information, and a public-access notice)
- Reusable components: `LeadershipProfile`, `CompanyCard`, `ContactCard`,
  `CorporateAccessBanner`
- A dedicated public data layer under `data/` (`leadership.ts`, `companies.ts`,
  `contact.ts`), designed to migrate to a database in Phases 4–5
- SEO metadata and Open Graph basics across pages

**Public access rule (Phases 1–2):** public users have read-only access. There is
no public editing, and no authentication / demo accounts. Corporate access
remains a placeholder link to `/corporate/login` pending Phase 3.

## Phase 3 Scope — Corporate Access & Secure Authentication

Phase 3 delivered the secure corporate area for authorized leadership:

- **/corporate/login** — secure login (Corporate Access Code + Email/Username +
  Password, show/hide password, loading/error states, no registration, no demo
  credentials)
- **Secure authentication** — bcrypt password hashing (`bcryptjs`), server-side
  opaque session tokens stored in HttpOnly `SameSite=Lax` cookies (Secure in
  production), sliding expiration, and genuine session invalidation on logout
- **RBAC** — roles `FOUNDER | CHAIRMAN | CEO | MD` with a reusable permission map
  (`lib/auth/permissions.ts`); Founder = full access, management roles =
  management modules; permissions are adjustable without touching auth
- **Protected routes** — `/corporate/dashboard` and all management modules are
  guarded by `middleware.ts` (first-line) **and** an authoritative server-side
  layout guard that redirects unauthenticated sessions to `/corporate/login`
- **APIs** — `POST /api/corporate/login`, `POST /api/corporate/logout`,
  `GET /api/corporate/session`, with server-side validation, generic errors,
  and login rate limiting
- **Security foundation** — activity logging (`LOGIN_SUCCESS`, `LOGIN_FAILED`,
  `LOGOUT`, `UNAUTHORIZED_ACCESS`), fail-closed access-code verification, and a
  database-ready user repository that fails safe until a DB is configured

**No secrets are committed.** Passwords are never stored in plain text or
localStorage, access codes/credentials never appear in source code, and the
real environment values live only in local `.env` files (git-ignored).

### Required environment variables (see `.env.example`)

| Variable | Purpose |
| --- | --- |
| `CORPORATE_ACCESS_CODE` | Gate code corporate members present before login (fail-closed if unset) |
| `SESSION_SECRET` | Random secret for session security |
| `DATABASE_URL` | Production database connection (Phase 4+; auth fails safe without it) |

## Tech Stack

- Next.js 15 (App Router) + React 19
- TypeScript
- Tailwind CSS v4
- ESLint (`next/core-web-vitals`, `next/typescript`)

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Commands

```bash
npm run dev        # development server
npm run build      # production build
npm run start      # run production build
npm run lint       # ESLint
npm run typecheck  # TypeScript check (tsc --noEmit)
```

## Project Structure

```
app/                  # App Router pages (public + /corporate)
app/corporate/        # Corporate login + protected dashboard (layout, modules)
app/api/corporate/    # Secure API routes: login, logout, session
components/           # Public + corporate components (components/corporate/*)
lib/auth/             # Auth core: session, password, permissions, corporate-auth
lib/security/         # Activity log + rate limiting
lib/validation/       # Server-side input validation
lib/data.ts           # Shared content data (navigation, home sections)
data/                 # Public page data: leadership.ts, companies.ts, contact.ts
middleware.ts         # Edge first-line guard for /corporate/dashboard
public/logo/          # Brand assets
public/images/        # Image / logo placeholder assets
.env.example          # Safe environment variable template (no real secrets)
```

## Future Phases

- **Phase 4** — Corporate Management System: leadership edit+save, company
  add/edit/delete, live website links, contact management, branding & logo
  management, settings, full activity-log UI (database-backed content that
  automatically reflects authorized changes on the public site)
- **Phase 5** — production database integration for the management system