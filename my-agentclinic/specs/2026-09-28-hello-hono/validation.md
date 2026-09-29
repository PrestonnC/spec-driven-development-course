# Validation: Phase 1 – Hello Hono

Mergeable when every check below passes.

## Manual curl check
1. `npm install && npm run dev`. The server logs its URL (http://localhost:3000).
2. In another terminal:
   - `curl -i http://localhost:3000/` returns `HTTP/1.1 200 OK`, a `Content-Type` of `text/html`, and a body containing the welcome message.
   - `curl -i http://localhost:3000/nope` returns `404`.
3. Reload: edit the welcome text, save, and re-run the curl. The new text appears without restarting the process by hand.

## Build and config
- `npm run build` exits 0 with no TypeScript errors.
- `tsconfig.json` still has `"strict": true`.
- `hono` and `@hono/node-server` in `package.json` are exact versions (no `^` or `~`).

## Scope
- The diff touches only `package.json`, the lockfile, `tsconfig.json`, `src/`, and this spec directory. No layout, styles, data, or tests are added.
