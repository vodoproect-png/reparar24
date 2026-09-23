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

## Paid API policy — DataForSEO

This is a cost/scope control for the paid DataForSEO API. It does not define
or constrain SEO methodology — the agent still decides semantics, intent,
cannibalization, page structure, and SEO actions independently.

1. DataForSEO is a paid API. The agent may use it autonomously, without
   asking for separate confirmation, whenever the data is genuinely needed
   for the task at hand.
2. Before making paid requests, first use already-available free/existing
   data if it can answer the question: GSC, the Reparar24 repository,
   existing semantics/content, and previously fetched data. Use DataForSEO
   for demand validation, semantic expansion, SERP/competitive analysis,
   and filling real gaps.
3. Default market:
   - Country: Spain.
   - Language: Spanish.
   - Primary commercial GEO: Valencia / Valencia metropolitan area /
     relevant part of the Valencian Community.
4. Existing GEOs outside Valencia already present in the project (Madrid,
   Barcelona, Sevilla, Zaragoza, Málaga, etc.) may be researched when the
   task is to evaluate their demand, economic value, cannibalization, or a
   keep/rewrite/merge/redirect/delete decision.
5. Do not automatically expand research to other countries, languages,
   unrelated industries, or global keyword universes unless the specific
   task requires it.
6. Do not artificially cap the number of keywords analyzed with a small
   fixed number. Instead, use DataForSEO efficiently:
   - batch requests whenever supported;
   - don't repeat data already fetched without a reason;
   - use the most appropriate and cost-efficient endpoint;
   - expand semantics iteratively, only when the previous data layer shows
     a useful direction.
7. Maximum actual DataForSEO spend per single autonomous task: **USD 2.00**.
8. Track the actual cost returned by the DataForSEO API and keep a running
   total for the current task.
9. Once USD 2.00 is reached:
   - stop making new paid DataForSEO requests;
   - continue the work using already-collected data and free sources;
   - if additional paid data would meaningfully improve the decision,
     report exactly what should be researched and what extra budget would
     be reasonable.
10. Never split one logical task into multiple subtasks/sessions solely to
    bypass the USD 2.00 limit.
11. This limit is a cost/scope control only — it does not restrict which
    SEO decisions the agent is allowed to make within the data available.

## What was intentionally removed

The old `.clinerules`, `PROJECT_CORE.md`, and `docs/ARCHITECTURE_GUIDE.md` /
`DEVELOPMENT_WORKFLOW.md` / `SEMANTIC_ARCHITECTURE.md` / `SEO_ARCHITECTURE.md`
described a 693-page / 3-locale target state, a 241-page lock, forbidden-file
lists (`data/cities.ts`, `middleware.ts`, templates), mandatory human approval
gates for GEO/routing/page changes, and a full virtual-agent org chart. That
system is gone. Any future SEO methodology/playbook will be introduced
separately (as dedicated skills) — this repo intentionally does not define
its own.
