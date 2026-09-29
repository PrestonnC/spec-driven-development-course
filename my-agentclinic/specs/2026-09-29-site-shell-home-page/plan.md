# Plan: Site Shell and Home Page

## 1. Navigation component
1. Create `src/routes.ts`, the single source of truth for site routes: a typed `routes` list (`href`, `label`, optional `blurb`) for Home `/`, Dashboard `/dashboard`, Agents `/agents`, Ailments `/ailments`, Therapies `/therapies`, Appointments `/appointments`, plus `homePath`/`dashboardPath` constants and an `isCurrent(href, currentPath)` helper. Nav and the home cards both read from it.
2. Create `src/components/Nav.tsx` (one component per file) rendering `<nav aria-label="Main">`: the brand link in its own `<ul>` (Pico's nav pattern), then a `<ul>` of links built from `routes`. It takes an optional `currentPath` prop; a link matching it gets `aria-current="page"`. `isCurrent` matches the exact path or a sub-page (`/agents/42` keeps Agents current); Home matches only `/`.
3. Render `<Nav />` inside `Header.tsx` (a `<header class="site-header">` wrapping a `.container` div, so the black band is full-bleed while the content is centred). The brand link lives in `Nav`.
4. Add a `currentPath` prop to `Layout` and pass it through to `Header` and `Nav`; `Home` passes `/`.

## 2. Layout shell improvements
1. Add a "Skip to main content" link as the first element in `<body>`, targeting `id="main"` on `<main>` (`Main.tsx`, which also gets `tabindex="-1"` so focus reliably moves there).
2. Update `Footer.tsx`: keep the tagline, add a small line with the current year and a mention that no agents were harmed.
3. Add `<meta name="description">` to the layout `<head>`.

## 3. Home page
1. Rework `src/pages/home.tsx`: hero (`<h1>Welcome to AgentClinic</h1>`, tagline, and a "View the dashboard" link styled with Pico's `role="button"`) followed by a section of cards, one per route in `routes` that has a `blurb` (Agents, Ailments, Therapies, Appointments), each a Pico `<article>` in a `.grid` with a warm blurb and a link to its page.
2. Keep title `AgentClinic`; use only components/markup (no data yet).
3. Each component's props use a named, extracted TypeScript type (`HeaderProps`, `NavProps`, `MainProps`, `LayoutProps`) rather than an inline type.

## 4. PicoCSS and custom CSS
1. Install PicoCSS pinned to an exact version: `npm install --save-exact @picocss/pico@2.1.1`.
2. Serve `node_modules/@picocss/pico/css/pico.min.css` at `/pico.css` (a `serveStatic` route with `rewriteRequestPath`), so the site has no external CDN dependency. `serveStatic` roots resolve against `process.cwd()`, so build both static roots (Pico and `public/`) from the location of `src/app.tsx` (`path.relative(process.cwd(), ...)`) so the app works no matter which directory it is started from.
3. In `Layout.tsx`, link `/pico.css` first and `/styles.css` second (custom overrides load after Pico). Add `<meta name="color-scheme" content="light dark">` so Pico's light/dark themes follow the OS.
4. Adopt Pico's semantic markup: wrap `<main>` content in `class="container"`; nav as `<nav><ul>` with the brand in its own `<ul><li><strong>` (Pico's nav pattern); hero as a `<header>` inside main; home cards as `<article>` elements in a `<div class="grid">`; the call to action as `<a role="button">`. `aria-current` links use Pico's built-in styling.
5. Slim `public/styles.css` down to overrides only: brand colour via Pico's CSS variables (`--pico-primary` etc., orange and black brand colours: black header with orange accents, orange buttons with black text, darker orange for link text on light backgrounds so contrast holds), sticky-footer flex body (`100vh` then `100dvh`), fluid hero heading with `clamp()`, 44px minimum touch targets for nav links with Pico's extra list-item padding removed so the wrapped nav stays compact on phones, orange focus outlines on the black header and a black outline on the skip link, skip-link styling. Remove the Phase 1 tokens Pico now covers.
   Pico defines its palettes under `[data-theme="light"], :root:not([data-theme="dark"])` (light) and `:root:not([data-theme])` inside `prefers-color-scheme: dark` plus `[data-theme="dark"]` (dark), which are more specific than a bare `:root`. Our brand variables must use the same selectors, and set the full primary set (`-primary`, `-background`, `-underline`, `-hover`, `-hover-background`, `-focus`, `-inverse`) in each theme, or Pico's blue shows through.
6. Keep our own rules mobile-first: `min-width` queries only, no `max-width` queries. Cards: 1 column by default (overriding Pico's `.grid`), 2 columns at `min-width: 48em`, 4 columns at `min-width: 80em` (Pico's container is only 950px wide between 64em and 80em, too narrow for four cards).
7. Add `@types/node` (pinned exact, `22.20.4`) as a dev dependency and raise the `tsconfig.json` target to `es2020` so `tsc` type-checks `node:path`, `process`, and `String.prototype.matchAll` in source and tests.

## 5. Tests
1. Add `tests/routes.test.ts` for the route list and `isCurrent` (exact match, sub-pages, lookalike prefixes like `/agentsmith`, Home never a prefix).
2. Extend `tests/components.test.tsx`: `Nav` renders all six links with correct hrefs; `currentPath` sets `aria-current="page"` on exactly one link (checked with an order-independent helper) and sub-pages keep their section current; `Header` contains `nav`; skip link targets `#main`, and `<main>` has `id="main"` and `tabindex="-1"`; the footer year is checked with fake timers.
3. Extend `tests/app.test.tsx`: `GET /` contains the nav links (checked inside `<nav>`), skip link, description meta, hero h1, and exactly four cards, each linking to its own page (checked per card, not across cards); the `<head>` links `/pico.css` before `/styles.css`; `GET /pico.css` returns 200 `text/css`; `/styles.css` has `min-width` queries (48em, 80em), no `max-width` queries, and brand-colour selectors that match Pico's palettes; both stylesheets are still served when the process starts from a different working directory.
4. Run `npm test` and `npm run build`; both must pass with zero errors.

## 6. Verify and wrap up
1. Work through the manual smoke test checklist in `validation.md` at 360px, 768px, and 1280px.
2. Update `specs/tech-stack.md` (Styling) to name PicoCSS, update `CHANGELOG.md` (use the changelog skill), and mark roadmap Phase 2 as done ✅.
3. Commit on branch `site-shell-home-page`.
