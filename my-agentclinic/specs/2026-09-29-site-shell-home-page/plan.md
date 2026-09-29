# Plan: Site Shell and Home Page

## 1. Navigation component
1. Create `src/components/Nav.tsx` (one component per file) rendering `<nav aria-label="Main">` with a `<ul>` of links: Home `/`, Dashboard `/dashboard`, Agents `/agents`, Ailments `/ailments`, Therapies `/therapies`, Appointments `/appointments`. Define the link list as a typed constant in the same file.
2. Accept an optional `currentPath` prop; the matching link gets `aria-current="page"`.
3. Render `<Nav />` inside `Header.tsx` next to the brand link.
4. Add a `currentPath` prop to `Layout` and pass it through to `Header` and `Nav`; `Home` passes `/`.

## 2. Layout shell improvements
1. Add a "Skip to main content" link as the first element in `<body>`, targeting `id="main"` on `<main>` (`Main.tsx`).
2. Update `Footer.tsx`: keep the tagline, add a small line with the current year and a mention that no agents were harmed.
3. Add `<meta name="description">` to the layout `<head>`.

## 3. Home page
1. Rework `src/pages/home.tsx`: hero (`<h1>Welcome to AgentClinic</h1>`, tagline, and a "View the dashboard" link styled with Pico's `role="button"`) followed by a section of cards (Agents, Ailments, Therapies, Appointments), each a Pico `<article>` in a `.grid`, with a short warm blurb and a link to its page.
2. Keep title `AgentClinic`; use only components/markup (no data yet).

## 4. PicoCSS and custom CSS
1. Install PicoCSS pinned to an exact version: `npm install --save-exact @picocss/pico@2.1.1`.
2. Serve `node_modules/@picocss/pico/css/pico.min.css` at `/pico.css` (a `serveStatic` route with `rewriteRequestPath`, or a small route that reads the file), so the site has no external CDN dependency.
3. In `Layout.tsx`, link `/pico.css` first and `/styles.css` second (custom overrides load after Pico). Add `<meta name="color-scheme" content="light dark">` so Pico's light/dark themes follow the OS.
4. Adopt Pico's semantic markup: wrap `<main>` content in `class="container"`; nav as `<nav><ul>` with the brand in its own `<ul><li><strong>` (Pico's nav pattern); hero as a `<header>` inside main; home cards as `<article>` elements in a `<div class="grid">`; the call to action as `<a role="button">`. `aria-current` links use Pico's built-in styling.
5. Slim `public/styles.css` down to overrides only: brand colour via Pico's CSS variables (`--pico-primary` etc., teal accent), sticky-footer flex body, fluid hero heading with `clamp()`, 44px minimum touch targets for nav links, skip-link styling. Remove the Phase 1 tokens Pico now covers.
6. Keep our own rules mobile-first: `min-width` queries at 48em and 64em, no `max-width` queries. Pico's `.grid` stacks on small screens; add a `min-width: 48em` rule if needed so cards are 2 columns on tablet and 4 on desktop.

## 5. Tests
1. Extend `tests/components.test.tsx`: `Nav` renders all six links with correct hrefs; `currentPath` sets `aria-current="page"` on exactly one link; `Header` contains `nav`; skip link targets `#main`, and `<main>` has `id="main"`.
2. Extend `tests/app.test.tsx`: `GET /` contains the nav links, skip link, description meta, hero h1, and four section cards with correct hrefs; the `<head>` links `/pico.css` before `/styles.css`; `GET /pico.css` returns 200 `text/css`; `/styles.css` has `min-width` queries and no `max-width` queries.
3. Run `npm test` and `npm run build`; both must pass with zero errors.

## 6. Verify and wrap up
1. Work through the manual smoke test checklist in `validation.md` at 360px, 768px, and 1280px.
2. Update `specs/tech-stack.md` (Styling) to name PicoCSS, update `CHANGELOG.md` (use the changelog skill), and mark roadmap Phase 2 as done ✅.
3. Commit on branch `site-shell-home-page`.
