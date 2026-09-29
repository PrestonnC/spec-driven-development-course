# Plan: Hello Hono

## 1. Dependencies and scripts
1. Install exact versions: `npm install --save-exact hono@4.13.11 @hono/node-server@2.1.3` and `npm install --save-dev --save-exact tsx@4.23.15`.
2. Confirm `package.json` has no `^` or `~` on `hono`.
3. Add scripts: `"dev": "tsx watch src/index.ts"`, `"start": "tsx src/index.ts"`. Keep `"build": "tsc"`.

## 2. TypeScript config
1. Keep `"strict": true`.
2. If needed for Hono/ESM resolution, adjust `module` and `moduleResolution` (e.g. `NodeNext`) and set `"type": "module"` in `package.json`.
3. Run `npm run build` and fix any type errors without loosening strictness.

## 3. Server
1. Replace `src/index.ts` with a Hono app: `app.get('/', (c) => c.text('Hello, AgentClinic!'))`.
2. Start it with `serve({ fetch: app.fetch, port: 3000 })` from `@hono/node-server`.
3. Log the listening URL on startup.
4. Run it and confirm the plain-text response with curl before moving on.

## 4. Minimal home page
1. Change the `GET /` handler to return `c.html(...)` with a minimal AgentClinic home page: `<title>AgentClinic</title>`, `<h1>Welcome to AgentClinic</h1>`, and a one-line tagline from the mission.
2. Initially a plain HTML string; group 5 replaces it with the layout component.

## 5. Layout component and CSS
1. Enable JSX in `tsconfig.json`: `"jsx": "react-jsx"`, `"jsxImportSource": "hono/jsx"`. Rename `src/index.ts` to `src/index.tsx` and update the `dev`/`start` scripts.
2. Create three subcomponents, each in its own file (one component per file, no shared file) in `src/components/`: `Header.tsx` (brand link to `/`), `Main.tsx` (wraps `children` in `<main>`), `Footer.tsx`.
3. Create `src/components/Layout.tsx`: emits the doctype, `<html>`, `<head>` (charset, viewport, `title` prop, `<link rel="stylesheet" href="/styles.css">`), and a body composing `<Header />`, `<Main>{children}</Main>`, `<Footer />`.
4. Create `public/styles.css` (color variables, sticky-footer flex column body, header/main/footer styles).
5. Serve it with `serveStatic({ root: "./public" })` on `/styles.css`.
6. Create the home page as `src/pages/home.tsx` (exports `Home`, rendered inside `<Layout title="AgentClinic">`) and have `src/index.tsx` render `<Home />` for `GET /`.
7. Re-run `npm run build` to confirm strict type-checking passes.

## 6. Vitest tests
1. Install a pinned Vitest: `npm install --save-dev --save-exact vitest`. Add `"test": "vitest run"` to `package.json`.
2. Split the app from the server: `src/app.tsx` exports the Hono `app` (routes and static CSS); `src/index.tsx` only calls `serve`. This lets tests call `app.request()` without opening a port.
3. Add `vitest.config.ts` limiting tests to `tests/**/*.test.{ts,tsx}` (so compiled output in `dist/` is ignored). Add `tests` and `vitest.config.ts` to `tsconfig.json` `include` so strict type-checking covers them.
4. Write `tests/app.test.tsx`: `GET /` returns 200, `text/html`, doctype, title, h1, header/main/footer, and the stylesheet link; `GET /styles.css` returns 200 `text/css`.
5. Run `npm test` and `npm run build`; both must pass.

## 7. Verify
1. Follow every step in `validation.md`, including `npm test`.
2. Commit on branch `phase-1-hello-hono` and open a PR.
