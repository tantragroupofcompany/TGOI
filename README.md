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
components/           # Modular, reusable section & page components
lib/data.ts           # Shared content data (navigation, home sections)
data/                 # Public page data: leadership.ts, companies.ts, contact.ts
public/logo/          # Brand assets
public/images/        # Image / logo placeholder assets
```

## Future Phases

- **Phase 3** — Corporate Access + secure authentication (`/corporate/login`,
  `/corporate/dashboard`)
- **Phases 4–5** — database-driven content with Corporate Dashboard management
  (leadership, companies, contact, branding, settings, logs)