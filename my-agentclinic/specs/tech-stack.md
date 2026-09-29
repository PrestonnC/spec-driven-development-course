# Tech Stack

## Language and runtime

- **TypeScript** (strict), running server-side on **Node.js 18+**
- npm for package management

## Framework: Hono

Recommended: [Hono](https://hono.dev). It is a small, fast, TypeScript-first web framework with first-class JSX support for server-rendered HTML, a simple routing API, and a Node adapter (`@hono/node-server`). It keeps the stack popular, reliable, and light enough to spec and build in small phases.

## Rendering

- Server-rendered HTML via Hono JSX components
- Plain, modern CSS (responsive, no legacy browser support)

## Tooling

- `tsc` for builds (already scaffolded)
- `tsx` for dev with reload
- A test runner (Vitest) added in an early roadmap phase

## Database

- **SQLite** for persistence: a single local file, zero setup, easy to demo and reset
