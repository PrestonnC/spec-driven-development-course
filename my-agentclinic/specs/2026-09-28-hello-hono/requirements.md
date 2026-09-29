# Requirements: Phase 1 – Hello Hono

## Scope
Exactly the roadmap's Phase 1, nothing more:
- Add Hono and the Node server adapter (`@hono/node-server`).
- Serve a home page at `/`.
- Provide a dev script with reload.

## Decisions
- **Pinned Hono version:** `hono` and `@hono/node-server` are installed at exact versions (no `^`/`~`), via `npm install --save-exact`.
- **Strict TypeScript enforced:** `"strict": true` stays on in `tsconfig.json`; the build must pass with no errors and no `any` or `@ts-ignore` escape hatches.
- **Rendering:** server-rendered HTML through Hono JSX (per tech-stack), so the entry file becomes `src/index.tsx`. Requires `jsx` / `jsxImportSource: "hono/jsx"` in tsconfig.
- **Dev tooling:** `tsx watch` for reload (per tech-stack). `tsx` is a devDependency.
- **Home page content:** a short, deadpan "Welcome to AgentClinic" message, in the mission's tone. No layout, nav, or styles yet (Phase 2).
- **Port:** 3000, overridable with the `PORT` env var.
- **Out of scope:** shared layout, CSS, data, database, Vitest, auth.

## Context
- Mission: `specs/mission.md` (playful satire, reliable app underneath).
- Stack: `specs/tech-stack.md` (TypeScript strict, Node 18+, Hono, Hono JSX, tsx, npm).
- Starting point: `package.json` has only `typescript`; `src/index.ts` is a placeholder `console.log`; `tsconfig.json` is `strict` with `module: commonjs`.
