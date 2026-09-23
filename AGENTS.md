# Reparar24 — AI Agent Guide

This file replaces the previous multi-role AI governance system (SEO_STRATEGIST,
IMPLEMENTATION_AGENT, QA_AUDITOR, DEPLOY_MANAGER, PROJECT_ORCHESTRATOR, page-count
locks, mandatory approval gates, and sign-off reports). None of that applies anymore.

## How this project is run

A single AI agent can independently explore the project and its data, and make
decisions about code, content, routing, and page structure. There is no fixed
architecture, page count, or GEO footprint to preserve for its own sake — the
current site is a snapshot, not a target. Change it when the data supports it,
and verify changes technically (build/typecheck/lint) before finishing.

## Business facts (current, factual — not a spec to protect)

- **Public language:** Spanish only. `app/[locale]/` and `messages/en.json` /
  `messages/ru.json` exist in the codebase for historical/technical reasons,
  but there is no live English or Russian version — don't treat them as a
  roadmap unless explicitly asked to work on multilingual support.
- **Primary market:** Valencia. The business is willing to travel to other
  cities/regions for jobs that are large enough or economically justified;
  it is not trying to be "everywhere" by default.
- **Services:** home repair trades (plumbing, electrical, drainage, AC,
  heating, pipe cleaning) — see `data/services.ts` for the current list.
- **Cities/districts currently in the codebase:** see `data/cities.ts`. This
  is today's footprint, not a locked structure — pages/cities/districts can
  be added, merged, or removed when justified by real demand.

## Tech stack (factual)

- Next.js 15 (App Router) + React 18 + TypeScript (strict)
- TailwindCSS 3.x
- Static Site Generation; page count varies as content changes — check
  `npm run build` output for the current number, don't hardcode it anywhere.
- GTM/GA4 analytics, cookie consent
- See `docs/DESIGN_SYSTEM.md` for real UI conventions (colors, type scale,
  components, spacing) — this reflects `tailwind.config.ts` and should be
  kept in sync with it.

## Non-negotiable safeguards

- **No fake business data.** Never invent reviews, ratings (e.g. "4.9/5"),
  certifications, awards, or testimonials that don't come from the business.
- **No doorway/GEO spam.** Don't create city/district/service pages just to
  raise URL count. Every new page needs a real, distinct intent and some
  evidence of demand (not just "we could target this keyword").
- **Don't break URLs silently.** If a public URL is removed, merged, or
  moved, add a proper redirect, update `app/sitemap.ts`, and fix internal
  links that pointed to it.
- **Validate before finishing any technical change:**
  ```bash
  npm run build   # must succeed
  npx tsc --noEmit
  npm run lint
  ```
  Pre-existing lint warnings are fine; new errors are not.

## What was intentionally removed

The old `.clinerules`, `PROJECT_CORE.md`, and `docs/ARCHITECTURE_GUIDE.md` /
`DEVELOPMENT_WORKFLOW.md` / `SEMANTIC_ARCHITECTURE.md` / `SEO_ARCHITECTURE.md`
described a 693-page / 3-locale target state, a 241-page lock, forbidden-file
lists (`data/cities.ts`, `middleware.ts`, templates), mandatory human approval
gates for GEO/routing/page changes, and a full virtual-agent org chart. That
system is gone. Any future SEO methodology/playbook will be introduced
separately (as dedicated skills) — this repo intentionally does not define
its own.
