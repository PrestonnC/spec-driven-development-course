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
1. Change the `GET /` handler to return `c.html(...)` with a minimal HTML document: `<title>AgentClinic</title>`, `<h1>Welcome to AgentClinic</h1>`, and a one-line tagline from the mission.
2. Keep it a plain HTML string: no JSX, layout, CSS, or links (Phases 2-5).
3. Re-run `npm run build` to confirm strict type-checking still passes.

## 5. Verify
1. Follow every step in `validation.md`.
2. Commit on branch `phase-1-hello-hono` and open a PR.
