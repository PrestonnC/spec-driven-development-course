# Validation: Site Shell and Home Page

Phase 2 is mergeable when every check below passes.

## Automated (must pass)
- `npm test` (`vitest run`) exits 0, including new tests that assert:
  - `isCurrent` matches exact paths and sub-pages but not lookalike prefixes, and Home only matches `/`.
  - `Nav` renders six links (Home `/`, Dashboard `/dashboard`, Agents `/agents`, Ailments `/ailments`, Therapies `/therapies`, Appointments `/appointments`) inside `<nav aria-label="Main">`.
  - `currentPath="/"` puts `aria-current="page"` on exactly one link (Home).
  - `GET /` returns 200 `text/html` with the doctype, `<title>AgentClinic</title>`, meta description, viewport meta, skip link targeting `#main`, `<main id="main">`, hero `<h1>`, and four cards linking to `/agents`, `/ailments`, `/therapies`, `/appointments`.
  - `GET /pico.css` returns 200 `text/css`; the layout `<head>` links `/pico.css` before `/styles.css`; `<meta name="color-scheme">` is present.
  - `GET /styles.css` returns 200 `text/css`, contains `min-width` media queries at 48em and 80em, contains no `max-width` media queries, and its brand-colour selectors match Pico's palette selectors (light, `prefers-color-scheme: dark`, and `[data-theme="dark"]`).
  - Both stylesheets are served (200) when the app is started from a different working directory.
- `npm run build` (`tsc`) completes with zero errors in strict mode; no `any` escapes.

## Manual smoke test checklist
Run `npm run dev` and open `http://localhost:3000/`.
- [ ] Header is black with orange accents (brand link, current-page marker, bottom border); buttons are orange with black text; the brand colours are orange and black, with no leftover teal.
- [ ] Header shows the brand and all six nav links; Home is visibly marked current.
- [ ] Each nav link is clickable and points to the right path (later-phase pages may 404; that is expected).
- [ ] Hero heading, tagline, and "View the dashboard" button render; cards show below with warm copy.
- [ ] Footer sits at the bottom of the viewport even on short pages.
- [ ] Tab from the address bar: the first stop is "Skip to main content" (visible on focus) and it jumps to main; every link shows a clear focus outline.
- [ ] At 360px: no horizontal page scroll, text readable without zoom, nav usable, cards in one column, touch targets at least 44px tall.
- [ ] At 768px and 1100px: cards in two columns; header nav sits alongside the brand.
- [ ] At 1280px: layout centered with comfortable gutters; four cards in one row; the black header spans the full page width.
- [ ] At 360px the wrapped nav is compact (about two rows of links, not a third of the screen).
- [ ] No console errors in the browser; `/pico.css` and `/styles.css` both load from localhost (no external requests).
- [ ] With the OS set to dark mode, the site switches to Pico's dark theme and stays readable.

## Housekeeping
- `CHANGELOG.md` updated, roadmap Phase 2 marked ✅, and `specs/tech-stack.md` Styling line names PicoCSS.
- `package.json` lists `@picocss/pico` at exactly `2.1.1` (no `^` or `~`); it is the only new runtime dependency (`@types/node` is a pinned dev dependency).
