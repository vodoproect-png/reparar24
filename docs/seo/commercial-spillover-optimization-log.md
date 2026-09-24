# Commercial spillover optimization log

Last updated: 2026-06-19

Commercial spillover keywords are collected while building the blog semantic backlog. They are not written as blog articles until the commercial owner decision is clear.

## Batch 1 - high-priority existing owners

Status: completed

Pages optimized:

| Page | Spillover focus | Result |
| --- | --- | --- |
| `/electricista/cargador-coche-electrico` | instalar cargador coche electrico en casa, instalar punto de recarga en casa, instalar wallbox en casa | Existing page enriched with secondary keywords, SEO text and FAQ. |
| `/calefaccion/instalacion-calefaccion` | instalar caldera condensacion, instalar caldera de gas precio, instalar calefaccion gas natural precio | Existing page enriched with secondary keywords, SEO text and FAQ. |
| `/calefaccion/radiadores-calefaccion` | reparar fuga radiador calefaccion, reparar llave radiador gotea, reparar un radiador que pierde agua | Existing page enriched with secondary keywords, SEO text and FAQ. |

Checks:

| Check | Scope | Result | Report |
| --- | --- | --- | --- |
| `npm run validate:data` | data integrity | Passed, 6 non-blocking geo warnings | terminal |
| `npm run audit:blog` | blog conveyor | Passed | terminal |
| `npm run build` | production build | Passed, 348 static pages | terminal |
| `npm run uniqueness:text-ru -- --scope commercial --ids /electricista/cargador-coche-electrico,/calefaccion/instalacion-calefaccion,/calefaccion/radiadores-calefaccion --execute` | 3 commercial pages | Passed: 100% unique, 0% water, spam 68-72% | `.tmp/uniqueness/text-ru-commercial-2026-06-19T08-06-14-645Z.json` |
| `npm run uniqueness:copyscape -- --scope commercial --ids /electricista/cargador-coche-electrico,/calefaccion/instalacion-calefaccion,/calefaccion/radiadores-calefaccion --execute` | 3 commercial pages | Passed: 0% matched | `.tmp/uniqueness/copyscape-commercial-2026-06-19T08-06-46-979Z.json` |

## Batch 2 - fontanero existing owners

Status: completed

Pages optimized:

| Page | Spillover focus | Result |
| --- | --- | --- |
| `/fontanero/reparacion-cisternas` | reparar cisterna que pierde agua, reparar cisterna wc pierde agua, reparar wc/inodoro pierde agua | Existing page enriched with secondary keywords, SEO text and FAQ while keeping WC blockage and inodoro installation separated. |
| `/fontanero/reparacion-duchas` | reparar ducha que gotea, reparar grifo termostatico, reparar grifo de ducha que gotea, reparar grifo banera | Existing page enriched with shower-specific grifo terms and a cannibalization guard for the general grifos page. |
| `/fontanero/mamparas-ducha` | reparar mampara ducha | Existing page already covered the term; FAQ strengthened for repair intent. |
| `/fontanero/instalacion-cambio-inodoros` | cuanto cobra un fontanero por cambiar un inodoro | Existing page enriched with secondary keyword, SEO text and FAQ. |

Checks:

| Check | Scope | Result | Report |
| --- | --- | --- | --- |
| `npm run validate:data` | data integrity | Passed, 6 non-blocking geo warnings | terminal |
| `npm run audit:blog` | blog conveyor | Passed | terminal |
| `npm run build` | production build | Passed, 348 static pages | terminal |
| `npm run uniqueness:text-ru -- --scope commercial --ids /fontanero/reparacion-cisternas,/fontanero/reparacion-duchas,/fontanero/mamparas-ducha,/fontanero/instalacion-cambio-inodoros --execute` | 4 commercial pages | Completed across two runs: all 100% unique, 0% water, spam 68-69%. | `.tmp/uniqueness/text-ru-commercial-2026-06-19T08-24-38-656Z.json`, `.tmp/uniqueness/text-ru-commercial-2026-06-19T08-30-50-391Z.json` |
| `npm run uniqueness:copyscape -- --scope commercial --ids /fontanero/reparacion-cisternas,/fontanero/reparacion-duchas,/fontanero/mamparas-ducha,/fontanero/instalacion-cambio-inodoros --execute` | 4 commercial pages | Passed: 0% matched on all pages | `.tmp/uniqueness/copyscape-commercial-2026-06-19T08-25-17-315Z.json` |

Text.ru API note: for this commercial run the provider returned `keywords: []` for the checked page, so keyword entries must be audited from our approved keyword fields until Text.ru exposes keyword-level data in the response.

## Batch 3 - remaining existing owners

Status: completed

Pages optimized:

| Page | Spillover focus | Result |
| --- | --- | --- |
| `/desatascos/desatascar-lavabo-ducha` | desatascador desague ducha | Existing page enriched with service-specific shower drain intent. |
| `/desatascos/camion-cuba` | camion cuba desatascos para que sirve | Existing page enriched with explanatory commercial intent and FAQ. |
| `/desatascos/limpieza-fosas-septicas` | servicio de limpieza de fosa septica precio | Existing page enriched with price/service intent. |
| `/aire-acondicionado/instalacion-aire-acondicionado` | instalar aire acondicionado en casa precio, instalar aire acondicionado en piso, instalar aire acondicionado piso alquiler | Existing page enriched with installation context, price intent and rental-flat caveat. |
| `/aire-acondicionado/aire-acondicionado-conductos` | instalar aire acondicionado centralizado | Existing page enriched with centralised installation intent. |
| `/calefaccion/calefaccion-central-comunidades` | instalar contadores individuales en calefaccion central | Existing page enriched with community heating metering intent. |
| `/fontanero/cambio-reparacion-grifos` | precio fontanero cambiar grifo | Existing page enriched with price intent. |
| `/fontanero/calentadores-termos` | presupuesto cambiar termo electrico | Existing page enriched and rewritten after Text.ru flagged 96.5% uniqueness. |
| `/fontanero/sustitucion-tuberias` | presupuesto cambiar tuberias casa | Existing page enriched with whole-house pipe replacement price intent. |
| `/fontanero/bajantes` | reparar bajante sin obras | Existing page enriched with no-obras repair intent. |

Checks:

| Check | Scope | Result | Report |
| --- | --- | --- | --- |
| `npm run validate:data` | data integrity | Passed, 6 non-blocking geo warnings | terminal |
| `npm run audit:blog` | blog conveyor | Passed | terminal |
| `npm run build` | production build | Passed, 348 static pages | terminal |
| `npm run uniqueness:text-ru -- --scope commercial --ids ... --execute` | 10 commercial pages | First run: 9 pages passed; `/fontanero/calentadores-termos` failed at 96.5% unique. Rewritten and rechecked: 100% unique, 0% water, 71% spam. Other pages: 100% unique, 0% water, spam 66-69%. | `.tmp/uniqueness/text-ru-commercial-2026-06-19T08-46-46-981Z.json`, `.tmp/uniqueness/text-ru-commercial-2026-06-19T08-53-09-176Z.json` |
| `npm run uniqueness:copyscape -- --scope commercial --ids ... --execute` | 10 commercial pages | Passed: 0% matched on all pages | `.tmp/uniqueness/copyscape-commercial-2026-06-19T08-53-45-778Z.json` |

Text.ru API note: for this commercial run the provider returned `keywords: []`, so keyword entries are tracked from the approved keyword fields (`secondaryKw`, `seoBlockKw`, `faqKw`, `keywordTags`) until Text.ru exposes keyword-level data in the response.

## Next recommended batch

1. Re-audit the commercial spillover backlog after the next semantic expansion.
2. Keep `boletin-electrico` and `legalizacion-electrica` out of `/electricista`; reserve them for the future `/certificados-electricos` architecture.
