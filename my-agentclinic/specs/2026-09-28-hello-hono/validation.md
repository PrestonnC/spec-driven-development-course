# Validation: Phase 1 – Hello Hono

Mergeable when every check below passes.

## Manual curl check
1. `npm install && npm run dev`. The server logs its URL (http://localhost:3000).
2. In another terminal:
   - `curl -i http://localhost:3000/` returns `HTTP/1.1 200 OK`, a `Content-Type` of `text/html`, and a body containing the welcome message.
   - `curl -i http://localhost:3000/nope` returns `404`.
3. Reload: edit the welcome text, save, and re-run the curl. The new text appears without restarting the process by hand.

## Layout and styles
- The `/` response contains a `<header>`, `<main>` and `<footer>`, in that order, with the welcome message inside `<main>`.
- `src/components/` contains separate `Header.tsx`, `Main.tsx` and `Footer.tsx` files, and `Layout.tsx` imports them rather than defining them inline.
- The `<head>` contains `<link rel="stylesheet" href="/styles.css">`.
- `curl -i http://localhost:3000/styles.css` returns `200` with `Content-Type: text/css`.
- In a browser the page is styled and the footer sits at the bottom of the viewport.

## Build and config
- `npm run build` exits 0 with no TypeScript errors.
- `tsconfig.json` still has `"strict": true`.
- `hono` and `@hono/node-server` in `package.json` are exact versions (no `^` or `~`).

## Scope
- The diff touches only `package.json`, the lockfile, `tsconfig.json`, `src/`, `static/`, and this spec directory. No navigation, data, or tests are added.
