# Reparar24 Conveyor Rules

## Purpose

This document defines how AI agents should work inside the Reparar24 SEO conveyor.
It adapts the Ponytail idea to this project: write less new code, reuse the existing
conveyor, and never bypass governance gates.

## Ponytail Gate

Before adding code, files, scripts, components, routes, or data structures, answer
these questions in order:

1. Does this need to exist?
   - If the current page, block, script, or validator can solve it, reuse that.
2. Is there already a conveyor layer for this?
   - Semantic demand: `data/seo/*-semantic-map.ts`
   - Approved keyword clusters: `data/seo/*-clusters.ts`
   - Production permission: `data/seo/page-registry.ts`
   - SEO presentation: `data/seo/*-seo-map.ts`
   - Production page content: `data/*/child-services-seo.ts`
   - Validation: `scripts/validate-semantic-layer.ts`
3. Can an existing script be extended instead of creating a new one?
4. Can an existing DS component be reused instead of creating a new component?
5. If new code is still needed, write the smallest version that passes validation.

## Non-Negotiable Gates

Ponytail rules can reduce code, but they cannot reduce governance.

Every production child service page must pass through:

```text
semantic-map -> clusters -> page-registry -> seo-map -> production content -> route/sitemap -> validators
```

Do not create a routable page from:

- `futureClusters` only
- raw Ahrefs exports
- uncleaned semantic review files
- weak service intent
- product/store/manufacturer intent
- informational-only intent
- boletin/certificado/legalizacion clusters inside `electricista`

## Content Rules

Production SEO text must be:

- unique inside this codebase
- checked by Google/index exact-match searches before deploy
- aligned with approved keyword ownership
- written only around the page's approved keyword set:
  `lockedPrimaryKw`, `secondaryKw`, `seoBlockKw`, and `faqKw`
- 1200-1800 characters minimum for commercial child pages; longer is allowed when
  needed to cover the approved intent without stuffing
- at least 95% unique by wording and structure, always aiming for 100%
- written for service intent, not keyword stuffing
- connected to FAQ and metadata

Text quality checks must report:

- Text.ru uniqueness, water, and spam
- Copyscape match percent
- approved keyword coverage from our own semantic fields when Text.ru does not
  return keyword-level data
- keyword coverage format: keyword, role (`primary`, `secondary`, `seo`, `faq`,
  `tag`), exact normalized count, and density
- keyword coverage status for both commercial and informational pages:
  `PASS`, `WARNING`, or `FAIL`
- missing and overused keywords grouped by role, so optimization expands semantic
  coverage instead of repeating the same primary keyword

Every user-facing completion report for article/content work must include key
occurrence data, not only pass/fail summaries: keyword, role, exact normalized
count, density, missing terms, and overused terms. This applies whenever Text.ru,
Copyscape, internal text audit, publication, or deploy is reported.

External originality is mandatory, not optional. For every new or meaningfully
rewritten commercial or informational page, run Text.ru and Copyscape before the
page is published, indexed, added to sitemap, or deployed. Internal uniqueness is
only a local pre-check. Do not mark `external-passed` unless the actual current
text passed both external checks and the report is recorded.

For same-day blog batches, checked content should be published immediately after
the full conveyor passes. Do not leave externally approved daily articles in a
public 404/hidden `ready` state as a normal workflow. If something is wrong after
publication, fix the live article, rerun the relevant checks, and redeploy.

Do not use `noindex` as a conveyor shortcut. If content is not ready for Google,
keep it internal and unrendered by workflow status. Public production URLs should
be deliberately indexable, or they should not exist publicly yet.

For informational/blog pages, the conveyor must also verify GEO/LLM readiness:

- answer-first `llmAnswer`
- at least 3 extractable Answer Unit sections
- article schema with stable `author`, `publisher`, `about`, and `mentions`
- visible publication date, with update date only after meaningful content changes
- commercial owner link so informational intent returns to the correct service
- entity coverage based on the approved semantic cluster, not generic filler

## GEO / AI Crawler Rules

Reparar24 is a Next.js SEO platform, not a client-only SPA. Do not migrate to
WordPress or another CMS only for SEO/GEO reasons while the current stack keeps
serving complete HTML to crawlers.

Every indexable page must remain readable without client-side JavaScript:

- primary H1, intro, service text, SEO text, FAQ, internal links, breadcrumbs,
  dates, and JSON-LD must be present in the server-generated/static HTML
- do not move important content into client-only fetches, click-only tabs,
  lazy-only widgets, or browser state
- interactive filters may improve UX, but the default HTML must expose the
  crawlable article/service list and key links
- `npm run build` output must continue to show static/generated routes for
  services, geo pages, and blog articles
- rendered SEO/LLM audits must verify the HTML body, not only the hydrated
  browser view
- AI/search crawlers must not be blocked by robots unless there is a specific
  privacy or abuse reason

For GEO/AI-search extraction, page content must use:

- direct answer blocks that can be quoted
- stable canonical URLs
- complete Schema.org entities
- visible dates for blog articles
- entity-rich text based on approved semantic clusters
- practical local service context, not generic media filler

## Keyword Coverage Rules

Google does not define a preferred keyword density. The conveyor must optimize
for intent coverage, readability, and usefulness, not for mechanical repetition.

Use keyword counts as guardrails:

- Primary keyword:
  - must appear at least 1 time in visible page content
  - commercial pages: target 1-3 exact normalized mentions in body-level content
  - commercial hub pages: broad category primary may repeat more often because
    the page routes users to multiple child services; target max is 12 mentions,
    warning above 3.5% density, fail above 4.5%
  - blog articles: target 2-5 exact normalized mentions when the article is long
    enough; 1-3 is enough for narrow guides
  - warning above 1.2% density
  - fail above 1.8% density unless manually justified
- Secondary and SEO keywords:
  - exact-match coverage is required only for keywords that represent distinct
    user intent, not for every spelling/accent/plural variant
  - top-priority secondary keywords should appear at least once when they are
    approved for the page
  - when a page has many variants, at least 60% of meaningful secondary/SEO
    phrases should be covered exactly; the rest may be covered naturally through
    synonyms or morphology
- FAQ keywords:
  - target 1 exact mention in the matching FAQ question or answer
  - zero is allowed only if the answer covers the same intent naturally and the
    wording would sound forced
- Tag keywords:
  - tags are supporting labels; zero exact mentions are a warning, not a failure
    if primary/secondary intent is covered
- Total approved exact-keyword density:
  - target 1.5-4.5% across the checked text
  - warning above 5.5%
  - fail above 7% unless the page is a short, highly specific service page and
    still reads naturally
  - commercial hub pages may use a wider semantic net: warning above 8.5%, fail
    above 10%
- Automation:
  - commercial and informational checks use the same reporting format
  - a `FAIL` keyword coverage status fails the Text.ru conveyor check even if
    uniqueness, water, and spam pass
  - `WARNING` does not block publication by itself, but must be reviewed before
    deploy when the page is new or rewritten
- Hard stop:
  - never repeat a keyword only to raise a count
  - never add city/service lists without useful context
  - if a keyword would make the paragraph unnatural, create a FAQ, rewrite the
    surrounding sentence, or leave it uncovered with a note

For child services, the public page should use one shared category service directory
where possible instead of page-specific duplicate service grids.

Every new published blog article, service card, or product/service-like card must
have a deliberate visual asset before release: either a topic-specific scene in
the existing card visual component or an approved bitmap asset with alt text when
rendered as an image. Do not ship new cards on a generic fallback visual.

## Visual System Rules

All public pages must use the approved hero shell from `ServiceHeroV2`.

Only page-specific content may change:

- hero image
- `eyebrow`
- `title`
- `titleHighlight`
- `subtitle`
- CTA labels/messages
- trust cards, chips, and highlights
- SEO metadata and page-specific structured content

Every top-level service category must have its own hero bitmap image:

- technician plus branded Reparar24 vehicle
- vehicle branding must include the service category
- technician shirt uses a small Reparar24 badge on the left chest, not a large
  full-shirt homepage logo
- image alt text is required wherever the asset is rendered

Do not create a separate one-off hero layout for homepage, category, child-service,
geo, or commercial landing pages unless the shared DS hero is formally replaced.

## When To Create A New Page

Create a new child service page only when all are true:

- cleaned keyword set exists
- commercial/service intent is clear
- no existing page should own the intent
- page-registry allows it
- production content can be written uniquely
- validators and build pass

## When Not To Create A New Page

Do not create a page when:

- the cluster is mostly product, course, brand, marketplace, or dictionary intent
- the cluster belongs to future `boletines/certificados`
- the page would cannibalize an existing child service
- the only evidence is a small or dirty Ahrefs sample
- the page needs a new UI component but an existing DS component can work

## Agent Instruction

When proposing the next step, prefer the smallest move that advances the conveyor:

1. clean/classify semantics
2. preview SEO impact
3. promote one page through gates
4. validate
5. visually check
6. deploy

Avoid broad refactors while a page or block is being promoted.

## Deployment Rule

Default production deployment for this project:

```text
npm run build
npx vercel --prod
```

Do not re-discover the deployment method on every deploy request. Re-check only if
the deploy command fails, project scripts change, or the user explicitly asks to
change deployment flow.
