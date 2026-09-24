# Aire Acondicionado Semantic Review

Date: 2026-06-15
Source: DataForSEO Standard Queue

## Collection Result

- Seeds processed: 96
- Normalized files found: 95
- Unique keywords reviewed: 14,752
- Commercial hub keywords: 4,044
- Geo keywords: 409
- Future / child candidates: 4,710
- Pricing / FAQ support: 1,346
- Blog candidates: 1,587
- Rejected / weak commercial intent: 569

## Approved Commercial Pages

These child pages were approved for production because they map to clear service intent:

- `/aire-acondicionado/instalacion-aire-acondicionado`
- `/aire-acondicionado/reparacion-aire-acondicionado`
- `/aire-acondicionado/mantenimiento-aire-acondicionado`
- `/aire-acondicionado/carga-gas-aire-acondicionado`
- `/aire-acondicionado/aire-acondicionado-conductos`
- `/aire-acondicionado/instalacion-split`
- `/aire-acondicionado/bomba-calor`
- `/aire-acondicionado/aire-acondicionado-cassette-techo`
- `/aire-acondicionado/preinstalacion-aire-acondicionado`
- `/aire-acondicionado/limpieza-conductos-aire-acondicionado`
- `/aire-acondicionado/empresa-climatizacion`

## Expanded Collection

Second DataForSEO Standard Queue wave:

- Seeds processed: 172 total across wave 1 and wave 2
- Normalized files found: 172
- Unique keywords reviewed: 17,449
- Existing commercial coverage: 7,554
- New commercial candidates reviewed: 604
- Commercial support terms: 1,079
- Geo intent: 344
- Content/blog opportunities: 1,613

Promoted from expanded review:

- `bomba-calor`: 224 keywords / 27,600 volume
- `aire-acondicionado-cassette-techo`: 225 keywords / 8,880 volume
- `preinstalacion-aire-acondicionado`: 64 keywords / 5,060 volume
- `limpieza-conductos-aire-acondicionado`: 39 keywords / 2,040 volume
- `empresa-climatizacion`: 72 keywords / 5,240 volume

## Rejected From Commercial Pages

The following keyword families are not used for commercial landing pages:

- Marketplace and store intent: Amazon, Leroy Merlin, Carrefour, Media Markt, Brico, second hand.
- Product-only intent: portable AC, offers, brand/model searches without service modifier.
- DIY-only intent: manuals, PDF, courses, forums, free-only searches.
- Pure informational intent: how-to, consumption, temperatures, inverter definitions, frigorias, savings.

## Blog Backlog

Informational demand should be saved for a future blog architecture, not mixed into commercial landing pages:

- Como limpiar filtros de aire acondicionado.
- Por que mi aire acondicionado no enfria.
- Aire acondicionado pierde agua.
- Que son frigorias y cuantas necesito.
- Aire acondicionado inverter: que es.
- Como ahorrar con aire acondicionado.
- R32 vs R410 and refrigerant explainers.

## Geo Coverage

Existing production geo content already includes:

- City pages: 6 entries for `aire-acondicionado`.
- District pages: 31 entries for `aire-acondicionado`.

Route rendering was updated so these geo records use the same modern DS/hero path as the optimized categories.

## Implementation Notes

- `PAGE_REGISTRY` now allows 11 climate child pages.
- Hub page uses `ServiceHeroV2`, `ServicesDirectoryV2`, trust/process/pricing/reviews, FAQ and SEO text.
- Child pages include locked primary keywords, secondary keywords, SEO block keywords and FAQ keywords.
- Commercial SEO texts follow the 1200-1800+ character rule and are written for approved page keywords.
- Deployment is intentionally not run unless explicitly requested.
