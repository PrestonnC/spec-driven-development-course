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

## 4. Scripts
1. `dev`: `tsx watch src/index.tsx`.
2. `build`: keep `tsc`; update `main` to the compiled entry.
3. `start`: `node dist/index.js`.

## 5. Verify
1. Run `npm run build` and confirm zero errors.
2. Run `npm run dev` and work through `validation.md`.
