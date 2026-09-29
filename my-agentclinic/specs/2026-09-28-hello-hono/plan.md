# Plan: Phase 1 – Hello Hono

## 1. Dependencies
1. Install `hono` and `@hono/node-server` with `npm install --save-exact`.
2. Install `tsx` and `@types/node` as devDependencies (exact versions).
3. Confirm `package.json` has no `^` or `~` on `hono` or `@hono/node-server`.

## 2. TypeScript config
1. Keep `"strict": true`.
2. Add `"jsx": "react-jsx"` and `"jsxImportSource": "hono/jsx"`.
3. Ensure module settings resolve Hono and the Node adapter (switch to `Node16`/`NodeNext` if `commonjs` fails).

## 3. Server and home page
1. Replace `src/index.ts` with `src/index.tsx`.
2. Create a Hono app with a `GET /` route rendering a JSX home page with the welcome message.
3. Start it with `serve` from `@hono/node-server`, using `PORT` (default 3000) and logging the URL.

## 4. Layout and styles
1. Create `src/components/` with each subcomponent in its own file: `Header.tsx`, `Main.tsx` (renders `children`) and `Footer.tsx`. Do not define them inside `Layout.tsx`.
2. Create `Layout.tsx` that imports `Header`, `Main` and `Footer` from their files and composes them inside the `<html>` shell, with an optional `title` prop.
3. Create `static/styles.css` (plain CSS: colour variables, sticky-footer flex column, centred `main`).
4. In `Layout`, link it with `<link rel="stylesheet" href="/styles.css" />`.
5. In `src/index.tsx`, import `serveStatic` from `@hono/node-server/serve-static` and serve `/styles.css` from `./static`.
6. Render the home page as `<Layout>` wrapping the welcome message.

## 5. Scripts
1. `dev`: `tsx watch src/index.tsx`.
2. `build`: keep `tsc`; update `main` to the compiled entry.
3. `start`: `node dist/index.js`.

## 6. Verify
1. Run `npm run build` and confirm zero errors.
2. Run `npm run dev` and work through `validation.md`, including the layout and stylesheet checks.
