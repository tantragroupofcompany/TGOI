# TANTRA GROUP OF INDUSTRIES (TGOI) — Official Website

Official public website of **Tantra Group of Industries (TGOI)** — a parent company
building businesses, creating opportunities, and shaping the future.

## Phase 1 Scope

Phase 1 delivers the public foundation of the website:

- Professional, premium, fully responsive corporate HOME PAGE
- Sticky responsive navbar (mobile menu included)
- Hero, About, Vision, Mission, Our Companies, Leadership Preview,
  Contact Preview and Footer sections
- SHOPTANTRA (https://shoptantra.in) company card with live link
- Placeholder routes for `/leadership`, `/companies`, `/contact`
  and `/corporate/login` (Phase 3+ placeholder only — no authentication)
- Structured static content data in `lib/data.ts`, ready to be converted
  to database-driven content in later phases

**Public access rule (Phase 1):** public users have read-only access.
The Corporate Management system (login, dashboard, content management)
will be implemented in future phases and remains private.

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
app/                  # App Router pages (page.tsx, layout.tsx, globals.css)
components/           # Modular, reusable section components
lib/data.ts           # Structured static content (placeholder data)
public/logo/          # Brand assets
public/images/        # Image / logo placeholder assets
```

## Future Phases

- `/leadership`, `/companies`, `/contact` — full pages
- `/corporate/login`, `/corporate/dashboard` and management modules
- Database-driven content (Phases 4–5)