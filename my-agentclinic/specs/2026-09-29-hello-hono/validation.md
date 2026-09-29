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

## Responsive design
- Page has `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- In browser dev tools, at 360px, 768px, and 1280px widths: no horizontal scrolling, text readable without zooming, footer at the bottom, and gutters grow with width.
- `public/styles.css` uses `min-width` media queries only (mobile-first).

## Automated tests
- `npm test` (`vitest run`) exits 0. `tests/app.test.tsx` covers `GET /` (status, `text/html`, doctype, title, h1, header/main/footer, stylesheet link) and `GET /styles.css` (`text/css`).
- The manual curl checks above still confirm the running server.

## Pinned version
- `package.json` lists `hono` as exactly `4.13.11` and `vitest` as an exact version (no `^` or `~`).

## Layout structure
- `src/components/` contains `Header.tsx`, `Main.tsx`, `Footer.tsx`, and `Layout.tsx`, each defining exactly one component in its own file; `Layout.tsx` imports and composes the other three.

## Strict TypeScript
- `tsconfig.json` has `"strict": true`.
- `npm run build` exits 0 with no type errors.

## Merge criteria
- All checks above pass, including `npm test`.
- Diff contains only Phase 1 changes plus the minimal home page (no navigation links or extra routes).
