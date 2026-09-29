# Tech Stack

Server-side TypeScript, with **Hono** as the recommended framework.

- **Language:** TypeScript (strict mode)
- **Runtime:** Node.js 18+
- **Framework:** Hono with `@hono/node-server`
- **Rendering:** Server-rendered JSX (`hono/jsx`) with a shared layout component
- **Styling:** Plain modern CSS, responsive; modern browsers only
- **Database:** SQLite via `better-sqlite3` is our database (a single local file, no separate server to run)
- **Testing:** Vitest, using `app.request()` for route tests
- **Tooling:** `tsx` for dev, `tsc` for type-checking/build, npm scripts

## Why Hono
Popular and TypeScript-first, tiny and fast, minimal dependencies, and JSX rendering means no separate template language. That fits Mary's ask for reliability on a mainstream stack.
