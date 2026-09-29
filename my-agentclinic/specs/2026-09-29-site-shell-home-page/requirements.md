# Requirements: Site Shell and Home Page (Roadmap Phase 2)

## Scope
Roadmap line: **shared layout component (header, footer), home page using the layout, navigation links, base CSS and styling.** Kept as a single phase; everything listed is implemented here.

In scope:
- Navigation in the header via a new `Nav` component, with the full planned set of links: Home, Dashboard, Agents, Ailments, Therapies, Appointments.
- Layout shell polish: skip-to-content link, `id="main"` target, richer footer, meta description.
- A richer home page: hero with a call to action plus cards linking to Agents, Ailments, Therapies, and Appointments.
- **PicoCSS** (`@picocss/pico`) as the base stylesheet, plus a small `public/styles.css` of project overrides (brand colour, sticky footer, hero sizing, touch targets, skip link).
- Vitest tests for the new components and page content.

Out of scope: the destination pages themselves (Dashboard Phase 5, Agents 7-8, Ailments 10, Therapies 14, Appointments 18), the 404 page (Phase 3), any data or database, the full accessibility audit (Phase 21) and responsive audit (Phase 20).

## Decisions
- **Full planned nav now.** Links to pages not yet built return Hono's default 404 until their phases ship; Phase 3 turns that into a friendly 404 page. Accepted trade-off, chosen by the user.
- **Active link** is marked with `aria-current="page"` via a `currentPath` prop threaded `Layout` -> `Header` -> `Nav` (no client-side JS).
- **One component per file**: `Nav.tsx` is new; `Header`, `Main`, `Footer`, `Layout` stay separate. Each takes an extracted, named props type.
- **One route list**: `src/routes.ts` is the single source of truth for paths, labels, and card blurbs; the nav and home cards both derive from it, so later phases add a route in one place. Current-page matching (`isCurrent`) also matches sub-pages, so `/agents/42` keeps Agents highlighted.
- **Static assets resolve from the app's location, not the working directory**, so the site is styled however it is started.
- **Dev dependency added**: `@types/node` (pinned exact) so strict `tsc` covers Node APIs; `tsconfig.json` target raised to `es2020`.
- **PicoCSS, installed from npm and self-hosted.** Pinned exact `@picocss/pico@2.1.1` (no `^`/`~`), served locally at `/pico.css` from `node_modules`; no CDN. It replaces the earlier plan of hand-written base CSS and is the one new runtime dependency. It supersedes the "plain modern CSS" line in `specs/tech-stack.md`, which is updated in this phase.
- **Pico conventions**: semantic, mostly classless markup; `container`, `grid`, `<article>` cards, `role="button"` links; light/dark themes follow the OS via `color-scheme`. Brand colours are **orange and black**, set through Pico's CSS variables rather than fighting its styles: black header with an orange bottom border, orange brand link and current-page marker, orange buttons with black text. Link text uses a darker orange (`#b84a00`) on light backgrounds and a lighter one (`#ff9a3d`) in dark mode to keep readable contrast. Because Pico's palette selectors are more specific than `:root`, our overrides use the same selectors in each theme (see plan group 4).
- **Custom CSS stays mobile-first**, per `specs/tech-stack.md`: our overrides use `min-width` queries (48em tablet, 80em wide desktop for the four-card row; the site-wide 64em breakpoint in `tech-stack.md` is not needed yet), `rem`/`clamp()`, 44px minimum touch targets, no `max-width` queries, no fixed-pixel layout widths. The no-`max-width` rule applies to our `styles.css`, not to Pico's vendor file.
- **Tone** per `specs/mission.md`: warm, gently playful copy; never mock the patient.
- **Tests validate the work** via `npm test` (Vitest, `app.request()`); TypeScript strict mode stays on and `npm run build` must compile clean. No new runtime dependencies.
- **Note for Phase 12 (SQLite):** the user decided database migrations will be plain `.sql` files. Not acted on in this phase; record it in `specs/tech-stack.md` when Phase 12 is specced.

## Context
- `specs/mission.md`: reliability over novelty, tiny shippable phases, attractive and responsive by default.
- `specs/tech-stack.md`: Hono + `hono/jsx`, Vitest; styling changes from plain CSS to PicoCSS plus overrides in this phase.
- Existing from Phase 1: `src/app.tsx`, `src/index.tsx`, `src/components/{Layout,Header,Main,Footer}.tsx`, `src/pages/home.tsx`, `public/styles.css` (hand-written base tokens, sticky footer, fluid h1; to be slimmed to Pico overrides), `tests/app.test.tsx`, `tests/components.test.tsx`.
