# Fontanero Cannibalization and Uniqueness Audit

Date: 2026-06-15

## Scope

Audited the commercial `fontanero` cluster:

- 16 child service pages
- 6 city pages
- 35 district routes

## Fixes Applied

- City page metadata now uses `data/city-seo-content.ts` titles, descriptions and keywords instead of the generic service-city metadata template.
- Added `fontanero`-only city SEO appendices so all 6 city SEO texts pass the 1200+ character commercial-page rule.
- Added unique district SEO content for pages with confirmed geo demand:
  - `/fontanero/sevilla/macarena`
  - `/fontanero/zaragoza/centro`
  - `/fontanero/zaragoza/actur`
  - `/fontanero/malaga/teatinos`

## Audit Results

Optimized pages audited:

- 16 child pages
- 6 city pages
- 35 district pages

Checks passed:

- duplicate meta titles: 0
- duplicate meta descriptions: 0
- duplicate child keyword ownership: 0
- high text similarity over threshold: 0
- short SEO text pages: 0

Full district route metadata check:

- total fontanero district routes: 35
- optimized district routes: 35
- fallback district routes without SEO content: 0
- duplicate fallback/optimized titles: 0
- duplicate fallback/optimized descriptions: 0

## Targeted Missing-District Collection

A targeted DataForSEO Standard Queue batch was run for the 8 previously skipped districts:

- `/fontanero/barcelona/sarria`
- `/fontanero/valencia/extramurs`
- `/fontanero/valencia/poblats-maritims`
- `/fontanero/sevilla/casco-antiguo`
- `/fontanero/sevilla/sur`
- `/fontanero/zaragoza/san-jose`
- `/fontanero/malaga/ciudad-jardin`
- `/fontanero/malaga/carretera-cadiz`

Collection file:

- `scripts/dataforseo-fontanero-missing-district-seeds.json`

Execution summary:

- seeds collected: 24/24
- provider: DataForSEO Standard Queue
- positive measurable volume: 0
- exact commercial geo seed terms returned with `volume: null`: 24

Decision: because these routes already exist and the returned seed terms are exact commercial geo intents, each page received conservative unique district SEO content. The content uses the exact collected seed terms as low-volume ownership signals, avoids claiming measurable demand, and does not compete with child service pages.

## Validation

- `npm run validate:semantic`: passed
- `npx tsc --noEmit`: passed
- `npm run build`: passed, 298 static pages generated

No deploy was run during this audit.
