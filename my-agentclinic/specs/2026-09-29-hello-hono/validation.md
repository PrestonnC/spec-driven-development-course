# Validation: Hello Hono

Phase 1 is mergeable when every check below passes.

## Manual curl check
1. `npm install` from a clean checkout succeeds.
2. `npm run dev` starts the server and logs a listening URL (port 3000).
3. In another terminal: `curl -i http://localhost:3000/`
   - Status `200 OK`
   - `Content-Type` starts with `text/html`
   - Body is a complete HTML document containing `<title>AgentClinic</title>` and an `<h1>` with `Welcome to AgentClinic`
4. Open `http://localhost:3000/` in a browser: the heading and tagline render.
5. Stop the server with Ctrl+C; `npm start` also starts it and serves the same response.

## Pinned version
- `package.json` lists `hono` as exactly `4.13.11` (no `^` or `~`).

## Strict TypeScript
- `tsconfig.json` has `"strict": true`.
- `npm run build` exits 0 with no type errors.

## Merge criteria
- All checks above pass.
- Diff contains only Phase 1 changes plus the minimal home page (no JSX, layout, tests, CSS, links, or extra routes).
