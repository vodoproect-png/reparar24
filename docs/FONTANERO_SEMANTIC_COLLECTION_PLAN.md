# Fontanero Semantic Collection Plan

Date: 2026-06-14

## Decision

Desatascos is a separate top-level service owner. The existing `/fontanero/desatascos`
page should be reviewed for redirect/canonical consolidation into `/desatascos`.
Until that decision is implemented, DataForSEO desatascos keywords are classified as
`cross-service`, not as automatic fontanero child-page targets.

## Pipeline

1. Collect broad DataForSEO Standard Queue seeds.
2. Normalize provider output into `.tmp/ahrefs`.
3. Classify into:
   - `approved-target`: existing commercial pages.
   - `future-candidate`: possible new child services.
   - `geo-intent`: city/district layer.
   - `cross-service`: belongs to another service owner.
   - `content-opportunity`: informational/blog demand.
   - `rejected`: jobs, products, entertainment, irrelevant intent.
4. Aggregate drafts in `.tmp/semantic-review/cluster-drafts`.
5. Promote only after human approval and page-registry update.

## Current DataForSEO Snapshot

Latest wide fontanero review after wave 2:

- Unique keywords: 7350
- Existing commercial targets: 2053
- Future child candidates: 2264
- Desatascos cross-service: 67
- Blog/content opportunities: 2304
- Geo intent: 13
- Rejected: 110
- Needs review: 539

## Candidate Signals

Strongest observed future candidates:

- `cisternas-inodoros`: 865 candidate keywords.
  Top signal: `cisterna pierde agua`.
  Production decision: promoted the cistern repair subset to `/fontanero/reparacion-cisternas`.
  Production decision: promoted the inodoro installation/replacement subset to `/fontanero/instalacion-cambio-inodoros`.
- `duchas-lavabos`: 751 candidate keywords.
  Top signal: `cambiar bañera por ducha`.
- `grifos`: 360 candidate keywords.
  Top signal: `cambiar grifo cocina`.
  Production decision: promoted replacement/repair subset to `/fontanero/cambio-reparacion-grifos`.
- `bombas-grupos-presion`: 255 candidate keywords.
  Top signal: `grupo de presion de agua`.
  Production decision: promoted installation/repair subset to `/fontanero/grupos-presion-agua`.
- `descalcificadores-osmosis`: 33 candidate keywords.
  Top signal: `mantenimiento descalcificador`.
  Production decision: promoted service subset to `/fontanero/descalcificadores-osmosis`.

Existing page draft counts:

- `fontanero`: 539 approved keywords.
- `calentadores-termos`: 969 approved keywords.
- `instalaciones`: 444 approved keywords.
- `reparacion-fugas`: 48 approved keywords.
- `sustitucion-tuberias`: 31 approved keywords.
- `mantenimiento`: 27 approved keywords.

These are demand-sizing drafts, not approved pages.

## First Candidate Decision

The first promoted fontanero candidate is:

- Slug: `cambio-banera-por-ducha`
- Primary keyword: `cambiar bañera por ducha`
- Status: approved production child page
- Reason: the demand is concentrated around bathtub-to-shower conversion, not a broad
  `duchas-lavabos` page.

Second promoted fontanero candidate:

- Slug: `reparacion-cisternas`
- Primary keyword: `cisterna pierde agua`
- Status: approved production child page
- Reason: the strongest `cisternas-inodoros` demand is repair-focused: leaking cisterns,
  flush mechanisms, floats and embedded cistern issues. Full toilet installation/replacement
  demand remains outside this page to avoid cannibalizing `/fontanero/instalaciones`.

Third promoted fontanero candidate:

- Slug: `cambio-reparacion-grifos`
- Primary keyword: `cambiar grifo cocina`
- Status: approved production child page
- Reason: the strongest `grifos` demand combines faucet replacement and leak repair
  across kitchen, shower and basin taps. Full bathroom/plumbing installation projects
  remain under `/fontanero/instalaciones`.

Fourth promoted fontanero candidate:

- Slug: `grupos-presion-agua`
- Primary keyword: `grupo de presion de agua`
- Status: approved production child page
- Reason: the strongest `bombas-grupos-presion` demand is commercial enough for
  installation, repair and maintenance of water pressure groups in homes and communities.
  Product-only, irrigation-only and industrial fire-system intent stays excluded.

Fifth promoted fontanero candidate:

- Slug: `descalcificadores-osmosis`
- Primary keyword: `mantenimiento descalcificador`
- Status: approved production child page
- Reason: the volume is smaller, but the demand is service-oriented and has strong CPC
  signals around maintenance, repair and installation of descalcifiers and osmosis systems.
  Product comparison and shopping intent stays out of scope.

Sixth promoted fontanero candidate:

- Slug: `instalacion-cambio-inodoros`
- Primary keyword: `instalar inodoro`
- Status: approved production child page
- Reason: the remaining `cisternas-inodoros` demand contains a clear installation and
  replacement cluster around inodoros, sanitarios and WC. Cistern mechanisms stay in
  `/fontanero/reparacion-cisternas`; blocked WC demand stays in `/desatascos`.

Current implementation status:

- Added to `fontanero-semantic-map.ts` as an approved existing page target.
- Added to `fontanero-clusters.ts` as an approved cluster.
- Added to `fontanero-seo-map.ts`.
- Added to `data/fontanero/child-services-seo.ts`.
- Added to `page-registry.ts` with `allowed: true`.
- Linked from the `/fontanero` services grid.

Seventh promoted fontanero candidate:

- Slug: `instalacion-lavabos`
- Primary keyword: `cambiar lavabo`
- Status: approved production child page
- Reason: the remaining `duchas-lavabos` demand contains a distinct lavabo/desague/sifon cluster that does not belong to grifos or full bathroom installation.

Eighth promoted fontanero candidate:

- Slug: `mamparas-ducha`
- Primary keyword: `cambiar mampara ducha`
- Status: approved production child page
- Reason: shower screen installation, replacement and repair has separate commercial intent from shower tray conversion.

Ninth promoted fontanero candidate:

- Slug: `bajantes`
- Primary keyword: `reparacion de bajantes sin obras`
- Status: approved production child page
- Reason: bajante repair/replacement demand has high commercial value, especially no-obras and comunidad intent, and is distinct from generic leak detection and broad pipe renovation.

Tenth promoted fontanero candidate:

- Slug: `reparacion-duchas`
- Primary keyword: `cambiar ducha`
- Status: approved production child page
- Reason: the remaining shower-service demand covers columns, flexos, mangueras, drains and goteos. Shower tray, shower screen and shower tap demand stay with their respective owners.

Current production child pages:

- Total: 16
- Newest pass: `instalacion-lavabos`, `mamparas-ducha`, `bajantes`, `reparacion-duchas`
- Commercial audit: `docs/FONTANERO_COMMERCIAL_SEMANTIC_AUDIT.md`

## Blog Strategy

Do not recollect informational demand later from scratch. Keep it from every service
collection run as `content-opportunity`.

Recommended future structure:

- Service pages own transactional demand.
- Blog/guides own informational demand.
- Each blog idea keeps `serviceOwner`, `relatedTarget`, volume, and CTA mapping.
- Informational pages link back to the relevant service page and do not compete with it.

Examples from current collection:

- `como arreglar cisterna que pierde agua`
- `como cambiar el grifo de la cocina`
- `como instalar termo electrico`
- `como detectar fuga de agua`
- `como vaciar termo electrico`

## Next Actions

1. Decide and implement redirect/canonical strategy for `/fontanero/desatascos`.
2. Review remaining `duchas-lavabos` demand for possible lavabo/ducha fixture pages,
   after excluding the already promoted bathtub-to-shower subset.
3. Keep `blog-fontaneria` as a backlog asset, but do not build blog routes until the
   commercial category architecture is stable.
