# Refund Bank Management

Front end for the Refund Bank feature: customers register the bank account where refunds are paid, and track refunds. Works on desktop and mobile. Runs on demo data for now, with a clean seam to plug in the backend later.

## Plan

### 1. Scope (from the SRS v1.0)

| Req | What we build |
| --- | --- |
| FR01 Bank info submission | Form: bank name, account holder, account number, branch (optional), SWIFT/BIC (where applicable) |
| FR02 Validation | Zod schema, inline errors, confirmation step that shows the account holder clearly |
| FR03 Save and update | Save, edit and remove bank details (demo repository backed by localStorage) |
| FR04 Refund processing | Refund list tied to user and transaction, status timeline, notifications when a refund is initiated or completed |
| NFR Security | Masked account numbers in the UI, no secrets in logs, encryption is a backend concern (noted in the API contract) |
| NFR Usability | Short form, clear states, keyboard and screen reader friendly |
| NFR Reliability | Invalid or incomplete data can never reach the save call |

Users: Customer (this app), Administrator and Payment System (represented by refund statuses and a demo admin view of the data the backend will expose).

### 2. Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS v4 for styling
- GSAP + ScrollTrigger for the landing page animations
- Lenis for smooth scrolling, wired to GSAP's ticker
- Zod for validation
- Vitest + Testing Library for unit tests

### 3. Architecture

```
src/
  app/
    (site)/                  public site: layout with fixed Nav + Footer
      page.tsx               home (hero, facts, features, devices)
      why-it-matters/ features/ devices/ security/ faq/   one page per navbar link
      legal/notice|privacy|terms|cookies/                 legal pages linked from the footer
    dashboard/               overview, refunds, bank details, messages
    icon.svg, apple-icon.png favicon (same artwork as the Logo component)
  components/
    ui/                      Select (animated dropdown), DatePicker, Intro, Logo, ScrollProgress, ScrollToTop
    landing/                 Nav, Hero, Marquee, Why, Features, Devices, Steps, Security, Faq, Cta, Footer, LandingMotion
    dashboard/               BankForm, RefundList, Chat, NotificationsMenu, DashboardNav
  lib/
    validation/              bank schema, IBAN/SWIFT helpers
    format/                  masking, currency
    data/                    demo data + repository interface
  hooks/                     useReducedMotion, useBankDetails, useRefunds
```

Rules: small single purpose components, logic in `lib/` (pure and tested), no logic in JSX. Data access goes through a repository interface so swapping demo data for the API changes one file.

### 4. Design

- Dark, restrained finance palette: deep navy ink, one teal accent, a warm gold used sparingly for refund highlights. No rainbow gradients.
- Liquid glass: translucent surfaces, backdrop blur, thin inner highlight borders, subtle refraction through an SVG filter where supported, solid fallback elsewhere.
- Dark photography sourced from Unsplash (free licence), shown with an overlay so text stays readable.
- No sticky side panels, no generic grids of identical boxes.
- Custom scrollbar, styled calendar, animated dropdowns.

### 5. Motion

- Opening animation: logo reveal and curtain, once per session, skipped for reduced motion.
- Scroll animations: text reveals, parallax on images, pinned device showcase, counters.
- Scroll progress bar at the top and a scroll to top button.
- All animation respects `prefers-reduced-motion`.

### 6. Dashboard

- Overview: balance of pending refunds, recent activity
- Refunds: list with filters, status timeline, date range using the styled calendar
- Bank details: form, confirmation step, edit
- Messages: chat with support, demo conversation with scripted replies

### 7. Testing

Unit tests for validation, masking, formatting, the repository, the Select and the bank form. Run with `npm test`.

### 8. Milestones

1. [x] Scaffold, tooling, dependencies, images
2. [x] Design tokens, glass utilities, scrollbar, calendar styles
3. [x] `lib/` logic and tests
4. [x] UI primitives (Select, DatePicker, Toast, scroll progress, scroll to top)
5. [x] Landing page with GSAP and Lenis
6. [x] Dashboard pages and chat
7. [x] Test pass, lint, production build
8. [ ] Backend integration (later): replace the demo repository

## Styling notes

- Tailwind v4 through `@tailwindcss/postcss` (`postcss.config.mjs`).
- Custom component classes (`.glass`, `.btn`, `.field`, `.pop`, ...) live in `@layer components` in `globals.css`, so utilities such as `fixed` or `absolute` always win over them.
- Popovers (Select, DatePicker) sit in containers raised with `relative z-20`, because the entrance animation (`.rise`) creates stacking contexts.

## Getting started

```bash
npm install
npm run dev        # development
npm test           # unit tests
npm run build && npm start   # production build, best for reviewing the UI
```

If styles look stale in development, hard refresh the page (Ctrl+Shift+R). The dev server keeps the same stylesheet URL while its content changes, and some browsers keep the old copy.

## Image credits

Photos from Unsplash, used under the Unsplash licence.
