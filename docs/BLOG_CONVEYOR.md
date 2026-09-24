# Blog Conveyor

Blog is a supporting SEO and LLM layer for Reparar24 commercial pages. It must not become a separate media project before the commercial index is stable.

## Goals

- Capture informational demand that should not be forced into commercial service pages.
- Support LLM visibility with clear expert answers, local context, and links back to the relevant commercial page.
- Strengthen topical authority around each service category without cannibalizing transactional pages.

## LLM Visibility Rule

Every blog article is created for classic search and LLM/AI answer surfaces from day one. A topic is not ready for writing or indexing unless it can produce a concise answer-first block, clear entities, practical steps, local/service context, and a commercial next action.

Required for every article:

- Answer-first summary in `llmAnswer`.
- At least 3 body sections that work as Answer Units: clear H2, direct first
  sentence, practical context, and a concrete next step.
- Clear question/diagnosis/decision intent, not generic editorial text.
- Approved informational semantic cluster before writing.
- One main commercial owner URL that receives the conversion intent.
- Local service context when relevant: Valencia, urgent repair, certified technician, budget before work.
- Entity coverage in content and schema: primary keyword, related terms, service
  category, Reparar24, and the commercial owner context.
- Structured outline that can become headings, short answers, FAQ, and schema.
- No invented claims, no medical/legal/electrical unsafe instructions, and no long DIY walkthrough when professional safety is required.
- Original body text written for Reparar24, not copied from Google, competitors, manufacturer docs, forums, or generic AI templates.

LLM optimization must never shift the article toward pure media content. The article supports the service page; it does not replace it.

## Server-Visible Content Rule

Blog pages must stay visible to Google and AI crawlers before JavaScript runs.
Reparar24 uses Next.js with server/static HTML output; this advantage must not be
lost during design or UX changes.

Required for blog index, category, and article pages:

- H1, intro copy, article/category cards, article body, FAQ, related service
  links, dates, and JSON-LD must be present in generated HTML.
- Search and filters can be interactive, but they cannot be the only way to
  discover articles.
- Do not load article bodies, SEO blocks, or related links only from client-side
  effects after page load.
- Do not hide the main answer or commercial owner behind accordions that are
  empty in source HTML.
- Blog design can use images and richer cards, but images must support the
  article; they must not replace crawlable text.
- Every new article that is published or prepared for publication must have its
  own card visual before release. In the current vertical split card design this
  means adding a topic-specific scene to `BlogTechnicalCardVisual` or an approved
  bitmap asset; do not rely on a generic fallback visual for new published
  articles.
- When auditing LLM/GEO readiness, inspect generated/rendered HTML and schema,
  not only the visual page after hydration.

If a future change makes a blog page depend on client-side rendering for its main
content, it fails the conveyor even if it looks correct in Chrome.

## Publishing Rules

- Every article must have a `commercialOwner` page.
- Every article must belong to one service category.
- Every article starts as a private/internal draft that is not rendered publicly.
- Articles are excluded from sitemap until they are checked and deliberately published.
- Daily article batches are not parked after external checks. Once a same-day
  batch has passed Text.ru, Copyscape, cannibalization, SEO routing,
  performance, and build checks, publish it in the same conveyor run and deploy
  when the user has requested deploy. If a live article needs adjustment, fix it
  live with a new validation and deploy cycle instead of leaving checked content
  at 404.
- A blog article cannot target the same primary transactional query as a service page.
- A blog article can be written and published only from an approved informational semantic cluster.
- A blog article cannot become `ready` or `published` until external originality is checked with Text.ru and Copyscape.
- Target originality is 100%. The internal audit must show no duplicated article blocks, but it is only a pre-check. Text.ru and Copyscape are mandatory for every article before `ready`, `published`, `index`, sitemap inclusion, or deploy.
- Never set `originalityStatus: 'external-passed'` unless the current article text has actually passed Text.ru and Copyscape in this conveyor run or in a recorded report.
- Informational semantics is collected through the same pipeline as service semantics: seeds, provider collection, clustering, review, approval, then content.
- Candidate topics may exist as planning slots, but they must stay internal `draft` entries and must not be rendered publicly.
- Commercial pages remain the canonical destination for urgent, price, city, district, and service-intent queries.
- Informational pages answer diagnosis, prevention, cost context, safety, maintenance, and decision-support queries.

## Safe Launch Sequence

1. Create the blog data model, routes, and validator.
2. Add related article slots to service pages, but render only published indexable articles.
3. Collect and approve informational semantics for the first wave.
4. Write the first articles from approved clusters outside the public indexable set until checks are complete.
5. Review cannibalization against the commercial map.
6. Publish checked articles with `index`.
7. Monitor Search Console before scaling.

## Publishing Rule

Reparar24 does not use `noindex` for blog workflow states.

Allowed states:

- `published/index`: checked article is public, in sitemap, and available for search.
- private/internal `draft/index`: written or planned article, not rendered in the public blog, not linked, not in sitemap.
- internal `ready/index`: externally checked article waiting for deliberate publication, not rendered in the public blog, not linked, not in sitemap.

Never create public `noindex` blog URLs. If an article is not ready for Google, keep it internal by status, not by a public noindex tag.

The publisher can release checked articles in batches.

Command:

```bash
npm run blog:publish-drip -- --execute --limit=50
```

The script can only publish articles that already have:

- `status: 'ready'`
- `indexing: 'index'`
- `semanticStatus: 'approved'`
- `semanticClusterId`
- `originalityStatus: 'external-passed'`
- valid `llmAnswer`
- unique body sections

It changes them to `published/index`, writes the real publication date in `publishedAt`, and then runs the blog audit. Draft or candidate articles are never opened automatically. Published articles are added to `sitemap.xml`; unpublished blog entries stay internal and out of the sitemap.

Date rule:

- `publishedAt` is assigned only when a ready article is opened to index.
- `updatedAt` is assigned only after meaningful content updates, not during the
  first publication.
- Blog article schema must expose `datePublished` and `dateModified`.
- Sitemap `lastModified` must use `updatedAt` first, then `publishedAt`.
- Article pages must show the publication date to users. The update date is shown only when `updatedAt` exists and differs from `publishedAt`.
- Internal drafts may have planning dates, but they must not pretend to be published and should not be publicly discoverable.

## Article Quality Rules

- Article length is planned from semantic depth, not from a fixed counter.
- Narrow diagnostic article: 900-1,200 useful words when the query has one clear practical answer.
- Standard service-supporting guide: 1,200-1,600 useful words when the topic has several checks, causes, decisions, or local service context.
- Broad/high-value guide: 1,600-2,000 useful words when the topic covers prices, comparisons, prevention, maintenance, safety, repeated faults, or several sub-intents.
- Articles below 900 words cannot become `ready` or `published`.
- Do not pad to hit a number. If the approved keyword set and user intent do not justify the text length, merge the topic into a broader guide or keep it unpublished.
- Batches should not produce articles with nearly identical word counts. Variation is expected because every approved semantic cluster has different depth.
- Main quality signals are approved keyword coverage, natural primary-keyword use, low water/spam, originality, readability, and practical value for the reader.
- Text.ru and Copyscape must be run for every new or meaningfully rewritten article before publication. Text.ru reports must include uniqueness, water, spam/spamminess, and approved keyword coverage. If Text.ru API returns no keyword list, `scripts/uniqueness/text-ru-check.ts` must calculate it locally from the approved semantic fields and report keyword, role, exact normalized count, and density. Copyscape reports must include match percent or a clear no-match result.
- Every user-facing report after writing, rewriting, publishing, or checking an
  article must include key occurrences: primary and secondary keywords, role,
  exact normalized count, density, missing keywords, and overused keywords. Do
  not summarize Text.ru as only uniqueness/water/spam.
- Use first-hand local service context where possible.
- Include clear next-step advice and when to call a professional.
- Link to exactly one main commercial owner and, where useful, one secondary commercial page.
- Avoid generic AI filler.
- Do not reuse the same paragraph frame across articles.
- Start with a direct answer suitable for LLM extraction.
- Each main H2 section should start with a short extractable answer, then add
  context, risk/diagnosis, proof or field experience, and the recommended action.
- Keep paragraphs short, entity-rich, and easy to quote in AI summaries.
- Keep title and H1 informational, not transactional.
- Visible Spanish SEO text must use natural Spanish punctuation and accents, including opening question marks for questions. Slugs, `primaryKeyword`, and normalized semantic keywords stay ASCII/no punctuation.
- Use FAQ only when the questions add real value.

## GEO / AI Search Schema Rules

Blog articles must expose structured data for both search engines and LLM answer
systems:

- `Article` schema must use `headline`, `description`, `datePublished`,
  `dateModified`, `image`, `mainEntityOfPage`, `author`, `publisher`, `about`,
  and `mentions`.
- `author` must point to the stable Reparar24 editorial/technical entity
  `https://reparar24.es/#reparar24-editorial-team`.
- `publisher` must point to the stable organization entity
  `https://reparar24.es/#organization`.
- `about` should include the primary informational entity and service category.
- `mentions` should include related repair entities, equipment, symptoms, city
  context, and the commercial owner topic.
- FAQ schema is allowed only when visible FAQ content exists and answers are
  useful, not keyword padding.

Robots policy:

- Do not block AI search crawlers by default.
- Keep explicit allow rules for `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`,
  `ClaudeBot`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot`,
  `Perplexity-User`, and `Googlebot`.
- Keep private routes such as `/api/` and `/admin/` disallowed.

## Google Ads Frequency Rule

DataForSEO is the broad expansion layer. Google Ads Historical Metrics is the
official validation layer for Spanish search frequency, CPC, and competition.

Before writing new articles, rebuild the writing plan from the Google Ads enriched
backlog:

```bash
npm run blog:enrich:google-ads
npm run blog:rerank
```

Primary keyword selection:

- The highest-frequency keyword can become `primaryKeyword`, URL slug, H1, and
  title basis only when it matches the article's informational intent.
- If the highest-frequency keyword is too broad, transactional, local-only,
  brand/product-specific, or unnatural for the planned guide, keep a more precise
  informational primary and use the larger term in H2/body/FAQ.
- Intent beats volume. Do not let a broad head term cannibalize the commercial
  owner page.
- Question keywords shown to users should use natural Spanish punctuation, while
  slugs remain ASCII and punctuation-free.

## Blog Preflight Rule

Before a new article is imported into the public blog data set, run the blog
preflight gate against the Google Ads reranked writing plan:

```bash
npm run audit:blog-preflight
```

The preflight gate must verify:

- the article has a unique `categorySlug/slug`
- the article has one approved informational `semanticClusterId`
- the semantic cluster can be matched to the Google Ads reranked backlog by
  cluster ID, primary keyword, approved keyword set, or commercial owner context
- the chosen `primaryKeyword` is compared with the
  `recommendedPrimaryKeyword` from Google Ads frequency data
- the article URL slug and H1 are checked against the chosen primary keyword
- existing published articles are checked for duplicate primary keywords,
  overlapping semantic clusters, and high keyword/topic similarity
- warnings are emitted when the highest-frequency keyword is not used in URL/H1,
  so the editor can confirm that intent, safety, or commercial ownership was the
  reason

Preflight warnings do not automatically block publication. Preflight errors do.
The goal is to prevent accidental cannibalization while still allowing a lower
volume, higher-intent phrase to own the article when it is the better match.

## Indexing Policy

Current policy: public blog routes should expose only deliberately published indexable articles.

The sitemap must include only `published/index` blog articles. Ready, draft, and candidate entries stay out of the sitemap and out of public listing until they are checked and published. Do not use `noindex`; unfinished content must remain internal, not publicly accessible.
