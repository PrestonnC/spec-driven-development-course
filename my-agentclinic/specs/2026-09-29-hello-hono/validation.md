# Validation: Hello Hono

Phase 1 is mergeable when every check below passes.

## Manual curl check
1. `npm install` from a clean checkout succeeds.
2. `npm run dev` starts the server and logs a listening URL (port 3000).
3. In another terminal: `curl -i http://localhost:3000/`
   - Status `200 OK`
   - `Content-Type` starts with `text/html`
   - Body is a complete HTML document containing `<title>AgentClinic</title>` and an `<h1>` with `Welcome to AgentClinic`
4. `curl -s http://localhost:3000/` starts with `<!doctype html>` and contains `<header`, `<main`, `<footer`, and `<link rel="stylesheet" href="/styles.css"`.
5. `curl -i http://localhost:3000/styles.css` returns `200` with `Content-Type: text/css`.
6. Open `http://localhost:3000/` in a browser: the heading and tagline render inside the styled header, main, and footer (footer sits at the bottom).
7. Stop the server with Ctrl+C; `npm start` also starts it and serves the same response.

## Pinned version
- `package.json` lists `hono` as exactly `4.13.11` (no `^` or `~`).

## Layout structure
- `src/components/` contains `Header.tsx`, `Main.tsx`, `Footer.tsx`, and `Layout.tsx`, each defining exactly one component in its own file; `Layout.tsx` imports and composes the other three.

## Strict TypeScript
- `tsconfig.json` has `"strict": true`.
- `npm run build` exits 0 with no type errors.

## Merge criteria
- All checks above pass.
- Diff contains only Phase 1 changes plus the minimal home page (no tests, navigation links, or extra routes).
