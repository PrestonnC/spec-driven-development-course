# Tech Stack

AgentClinic is a server-side TypeScript application. All rendering happens on the server; the browser receives plain HTML that works well and looks good.

## Core

| Layer | Choice | Rationale |
|---|---|---|
| Language | TypeScript | Type safety end-to-end; satisfies Mary's requirement |
| Runtime | Node.js | Stable, well-supported, vast ecosystem |
| Server framework | **Hono** | Lightweight, TypeScript-first, fast, excellent DX; routes and middleware feel natural |
| Templating | Hono JSX (server-side) | JSX without React overhead; components are just functions |
| CSS | PicoCSS 2.1.1 classless variant (pinned, self-hosted at `/pico.css`) + a small override stylesheet with CSS custom properties | No build step required; semantic HTML is styled by default; mobile-first responsive layout; Steve gets a modern, attractive result on any device |

## Recommended: Hono

[Hono](https://hono.dev) is chosen over Express/Fastify because:

- First-class TypeScript with zero config
- Built-in JSX renderer for server-side HTML
- Middleware model is simple and composable
- Runs on Node, Deno, Bun, and edge runtimes without changes

## Data

- **SQLite** (via `better-sqlite3`) for local development and early production — simple, embedded, no infrastructure
- Migrations via plain SQL files; no ORM to start

## Testing

- **Vitest** — fast, TypeScript-native, compatible with the rest of the stack
- Tests live alongside source files or in a `tests/` directory
- Run via `npm test`; CI must pass before merge

## Tooling

- `tsx` for development (run TypeScript directly, no build step needed)
- `tsc` for production builds
- `prettier` for formatting

## CSS Approach

PicoCSS (classless variant) is the base stylesheet, served locally from `node_modules` (no CDN). Project overrides live in `static/style.css`, served at `/static/style.css` and linked after Pico. Our CSS is mobile-first: base styles target small screens and `min-width` media queries progressively enhance for larger viewports. CSS custom properties hold brand colors and other tokens so values stay consistent across breakpoints. No build step — the browser receives two flat stylesheets.

## What We Are Not Using

- No CSS framework beyond PicoCSS (no Tailwind or Bootstrap)
- No React, Vue, or Svelte — server-side rendering keeps the stack simple
- No ORM — SQL is sufficient at this scale
- No Docker — not yet; that's a later phase concern