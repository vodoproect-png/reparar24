# Desatascos Semantic Collection Plan

Date: 2026-06-15

## Decision

`/desatascos` is the top-level owner for drain unblocking demand. Desatascos
keywords already collected during the fontanero pass are reused as source
evidence, not recollected intentionally.

Domestic blocked WC, sink, shower and drain demand remains a boundary area:
classify it before promotion because some queries may belong to urgent plumbing
while professional/company/cuba/bajantes/arquetas demand belongs to desatascos.

## Collection Scope

1. Hub commercial demand:
   - `desatascos`, `empresa de desatascos`, `desatascos 24 horas`,
     `desatascos urgentes`, `desatascador`.
2. Geo demand:
   - Existing city pages: Madrid, Barcelona, Valencia, Sevilla, Malaga,
     Zaragoza.
   - Urgent city modifiers: `urgentes` and `24 horas`.
   - District demand for priority districts already present in the site
     architecture.
3. Commercial child candidates:
   - Domestic blockages: WC, inodoro, fregadero, lavabo, ducha, tuberia,
     desague.
   - Professional blockages: bajantes, arquetas, colectores, comunidades,
     restaurantes, separadores de grasas, fosas.
   - Technique/equipment: camion cuba, inspeccion con camara, alta presion,
     hidrocurado.
4. Pricing and FAQ support:
   - Price, tariff and "cuanto cuesta" demand maps to FAQ or SEO text unless a
     dedicated commercial price page is approved later.
5. Blog backlog:
   - How-to, prevention, caustic soda, home remedies and smell queries are
     collected now as future `content-opportunity` assets.

## Safety

- DataForSEO Standard Queue only.
- No Live Mode.
- No production content changes during collection.
- Provider outputs stay under `.tmp`.
- Duplicate protection stays enabled; use `--force` only for deliberate
  recollection.

## Expected Classification

- `approved-target`: existing `/desatascos` hub and existing geo pages.
- `geo-intent`: city or district layer.
- `future-candidate`: commercial child page candidates.
- `content-opportunity`: future blog.
- `cross-service`: belongs to fontanero or another service owner.
- `rejected`: irrelevant, jobs, products-only, DIY-only where not useful.

## Next Actions

1. Run DataForSEO seed list from `scripts/dataforseo-desatascos-seeds.json`.
2. Merge reused fontanero cross-service desatascos rows with new outputs.
3. Produce a review artifact with:
   - existing pages to optimize,
   - new child service candidates,
   - geo pages with keyword support,
   - geo pages without enough keyword support,
   - future blog ideas.
