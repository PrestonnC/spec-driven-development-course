# Requirements: Hello Hono (Roadmap Phase 1)

## Scope
Roadmap line: **server starts, `/` returns text.** Extended (by request) with a minimal AgentClinic home page at `/`, rendered through a shared layout component with a CSS file.

In scope:
- Add Hono, `@hono/node-server`, and `tsx` as dependencies.
- `src/index.ts` creates a Hono app with `GET /`, first returning plain text, then replaced by a minimal AgentClinic home page (see plan task group 4).
- A `Layout` component composed of `Header`, `Main`, and `Footer` subcomponents (`hono/jsx`) in `src/components/`. Each component lives in its own file: `Header.tsx`, `Main.tsx`, `Footer.tsx`, `Layout.tsx`.
- `public/styles.css`, served at `/styles.css` and linked from the layout `<head>`.
- Vitest route tests (`tests/app.test.tsx`) covering `/` and `/styles.css`, run with `npm test`. The app is exported from `src/app.tsx`, separate from the server in `src/index.tsx`, so tests use `app.request()`.
- Responsive, mobile-first styling: viewport meta tag, `min-width` media queries, fluid heading size, 44px minimum touch target on the brand link.
- npm scripts to run the server (`dev`, `start`) alongside the existing `build`.

Out of scope (later phases): Navigation links and full styling (Phase 2), 404 page (Phase 3), any data or database.

## Decisions
- **Pin Hono to an exact version** (no `^`/`~`): `hono@4.13.11`. Also pin `@hono/node-server@2.1.3` and `tsx@4.23.15` for consistent installs.
- **Enforce strict TypeScript**: `"strict": true` stays on in `tsconfig.json`; `npm run build` must pass with zero errors. No `any` escapes to make it compile.
- Port: 3000 (default, not specified by the user, easily changed later).
- Minimal home page: `<title>AgentClinic</title>`, one `<h1>Welcome to AgentClinic</h1>`, and a short warm tagline from the mission, defined in `src/pages/home.tsx` and rendered inside `Layout`. Only a brand link in the header; no navigation (Phase 2).
- One component per file: `Header`, `Main`, `Footer`, and `Layout` are never combined in a single file; `Layout.tsx` imports the other three.
- Responsive design (per `specs/mission.md` and `specs/tech-stack.md`): CSS is mobile-first; base rules are for small screens and `@media (min-width: 48em)` / `(min-width: 64em)` add tablet and desktop adjustments. No `max-width` queries, no fixed pixel widths on layout containers.
- Layout/CSS: JSX via `hono/jsx` (`jsx: react-jsx`, `jsxImportSource: hono/jsx`); entry file is `src/index.tsx`. CSS is a plain static file in `public/`, served by `serveStatic`; base styling only, not the full Phase 2 styling.
- The plain-text `Hello, AgentClinic!` route is the first checkpoint in the plan and is superseded by the home page. The final `/` response is HTML.
- **Vitest validates the work** (per `specs/tech-stack.md`): `vitest` is pinned to an exact version, `npm test` runs `vitest run`, and tests must pass before merge. This pulls the roadmap's Phase 4 test setup and first route test into this phase.
- Runtime: Node.js 18+ per `specs/tech-stack.md`.

## Context
- `specs/mission.md`: tiny shippable phases, reliability over novelty, warm and gently playful tone.
- `specs/tech-stack.md`: Hono + `@hono/node-server`, `tsx` for dev, `tsc` for type-checking/build.
- Current `src/index.ts` is only a `console.log` placeholder; `package.json` has just `typescript` and a `build` script.
- Existing `tsconfig.json` targets `commonjs`; verify that it works with the pinned `@hono/node-server` (it may need a `module`/`moduleResolution` change to `NodeNext`/ESM).
