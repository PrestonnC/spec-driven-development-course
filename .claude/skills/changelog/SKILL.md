---
name: changelog
description: Create or update CHANGELOG.md in the project root with date headings and one bullet per change, based on git commits. Run manually before merging a branch.
disable-model-invocation: true
---

# Changelog

Maintain `CHANGELOG.md` in the project root (the directory containing `package.json`, currently `my-agentclinic/`). Entries are grouped under date headings, newest first.

## Format

```markdown
# Changelog

## 2026-09-29
- Add pinned Hono server with a minimal home page
- Add shared layout with header, main, and footer components

## 2026-09-28
- Add initial specs for mission, roadmap, and tech stack
```

- Heading per date: `## YYYY-MM-DD`, using the commit's author date (`git log --format=%ad --date=short`).
- One short, plain-language bullet per user-visible change, in the imperative ("Add", "Fix", "Update"). Describe what changed, not the commit mechanics.
- Never rewrite or reorder existing entries; only add.

## Steps

1. Check whether `CHANGELOG.md` exists in the project root.

2. **If it does not exist (backfill):**
   - Run `git log --reverse --no-merges --format="%ad|%h|%s" --date=short` (limit to the project directory).
   - Group commits by date. Skip merge commits and noise such as "Resetting" or "WIP" unless they carry real changes. Merge related commits into a single bullet.
   - Write `CHANGELOG.md` with the header and one section per date, newest first.

3. **If it exists (incremental):**
   - Read the newest date heading. Collect commits since then with `git log --no-merges --after="<that date> 23:59" ...`, plus any commits on the current branch not yet on `main` (`git log main..HEAD`). Add bullets under the existing date heading if it matches, otherwise add a new heading at the top. Do not duplicate bullets already present.
   - Include uncommitted work only if the user says so; otherwise mention that it isn't covered yet.

4. Show the user the resulting diff of `CHANGELOG.md` and ask before committing. Do not commit, merge, or push on your own. If asked to commit, use a separate commit like `Update CHANGELOG`.

## Notes
- Read the commit diff (`git show --stat <hash>`) when a subject line is too vague to describe.
- If commits are dated before today but not yet merged, they still go under their own dates.
- Keep the tone warm and gently playful only where the project's mission allows; entries should stay factual.
