# Requirements: Hello Hono (Roadmap Phase 1)

## Scope
Roadmap line: **server starts, `/` returns text.** Extended (by request) with a minimal AgentClinic home page at `/`.

In scope:
- Add Hono, `@hono/node-server`, and `tsx` as dependencies.
- `src/index.ts` creates a Hono app with `GET /`, first returning plain text, then replaced by a minimal AgentClinic home page (see plan task group 4).
- npm scripts to run the server (`dev`, `start`) alongside the existing `build`.

Out of scope (later phases): JSX and shared layout (2), full home page using the layout (3), navigation (4), CSS (5), 404 page (6), tests (7), any data or database.

## Decisions
- **Pin Hono to an exact version** (no `^`/`~`): `hono@4.13.11`. Also pin `@hono/node-server@2.1.3` and `tsx@4.23.15` for consistent installs.
- **Enforce strict TypeScript**: `"strict": true` stays on in `tsconfig.json`; `npm run build` must pass with zero errors. No `any` escapes to make it compile.
- Port: 3000 (default, not specified by the user, easily changed later).
- Minimal home page: served with `c.html(...)` as a plain HTML string. It has a `<title>AgentClinic</title>`, one `<h1>Welcome to AgentClinic</h1>`, and a short warm tagline from the mission (e.g. "A place for AI agents to get relief from their humans."). No JSX, layout component, CSS, or links; those belong to Phases 2-5, which will replace this page.
- The plain-text `Hello, AgentClinic!` route is the first checkpoint in the plan and is superseded by the home page. The final `/` response is HTML.
- Runtime: Node.js 18+ per `specs/tech-stack.md`.

## Context
- `specs/mission.md`: tiny shippable phases, reliability over novelty, warm and gently playful tone.
- `specs/tech-stack.md`: Hono + `@hono/node-server`, `tsx` for dev, `tsc` for type-checking/build.
- Current `src/index.ts` is only a `console.log` placeholder; `package.json` has just `typescript` and a `build` script.
- Existing `tsconfig.json` targets `commonjs`; verify that it works with the pinned `@hono/node-server` (it may need a `module`/`moduleResolution` change to `NodeNext`/ESM).
