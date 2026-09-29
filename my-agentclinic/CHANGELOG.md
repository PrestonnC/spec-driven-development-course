# Changelog

## 2026-09-29 (specs alignment)
- Add SQLite (`better-sqlite3`, pinned) with a migration runner, `agents`, `ailments`, and `agent_ailments` tables, seed data, and an `npm run seed` script
- Add `/agents`, `/agents/:id` (404 when not found), and `/ailments` pages with list and detail components
- Add tests for migrations, seeds, and the new routes
- Match Phase 1 specs: `typecheck` script, viewport `initial-scale=1.0`, `src/pages/Home.tsx`, stylesheet at `static/style.css` served from `/static/style.css`
- Rename the nav route list `src/routes.ts` to `src/nav.ts` so `src/routes/` can hold the Hono routers
- Rename the Phase 2 spec folder to `specs/2026-09-29-agents-ailments` and align its wording with the code
- Switch to PicoCSS's classless variant (`/pico.css` now serves `pico.classless.min.css`); header, main, and footer are styled as Pico containers, and the home cards use a small `.card-grid`
- Mark roadmap Phase 2 as done

## 2026-09-29
- Add Hono server with a home page served at `/`, using pinned dependency versions and strict TypeScript
- Add shared layout built from Header, Main, and Footer components, each in its own file
- Add home page in `src/pages/home.tsx` and a linked stylesheet served from `public/`
- Add plan, requirements, and validation specs for Phase 1: Hello Hono
- Add Vitest with route tests, splitting the app (`src/app.tsx`) from the server entry point
- Make the CSS mobile-first with a viewport meta tag and `min-width` breakpoints
- Add site navigation with links to Home, Dashboard, Agents, Ailments, Therapies, and Appointments, marking the current page
- Add PicoCSS (pinned, self-hosted at `/pico.css`) as the base stylesheet, with a slim `public/styles.css` of overrides
- Add a skip-to-content link, meta description, and light/dark color scheme to the layout
- Redesign the home page with a hero and cards linking to each section
- Add a shared route list (`src/routes.ts`) that drives both the nav and the home page cards, with sub-page-aware current-page highlighting
- Use orange and black brand colours, applied to Pico in both light and dark mode; make the header full width and the wrapped nav compact on phones
- Serve static assets relative to the app location so styles load regardless of the working directory
- Add `@types/node` and raise the TypeScript target to `es2020`; extract component props into named types
- Add tests for the route list, nav highlighting, brand-colour selectors, and serving assets from another working directory
- Update the tech stack to use PicoCSS as the base stylesheet, and mark roadmap Phase 2 as done
- Add plan, requirements, and validation specs for Phase 2: Site shell and home page

## 2026-09-28
- Add the AgentClinic starter project
- Add initial specs for the mission, roadmap, and tech stack
