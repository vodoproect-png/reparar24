# Desatascos Semantic Review

Date: 2026-06-15

## Source

DataForSEO Standard Queue was run from:

- `scripts/dataforseo-desatascos-seeds.json`

Review artifact:

- `.tmp/semantic-review/2026-06-15T14-54-06-371Z-desatascos-dataforseo-review.json`

Already collected fontanero boundary seeds were reused through duplicate
protection, including Valencia desatascos and earlier informational tails.

## Counts

- Seeds processed: 88
- Normalized source files: 88
- Unique keywords: 2,964
- Existing hub commercial: 475
- Geo intent: 149
- Future commercial candidates: 864
- Pricing/FAQ support: 84
- Blog/content opportunities: 834
- Needs review: 338
- Rejected product/non-service: 220

## Commercial Hub

The `/desatascos` hub has confirmed demand around:

- `desatascos`
- `desatascos urgentes`
- `desatascos 24 horas`
- `empresa de desatascos`
- `desatrancos`
- `desatoros`

Product-only or DIY-heavy terms such as Mercadona, Leroy Merlin, manual tools,
springs and chemical cleaners must not be treated as service-page targets.

## Geo Demand

City pages have confirmed keyword support:

- Barcelona: `desatascos barcelona`, `desatascos en barcelona`, `camion cuba barcelona`
- Zaragoza: `desatascos zaragoza`, `desatascos zaragoza precios`
- Madrid: `desatascos madrid`, `poceria madrid`, `desatrancos madrid`,
  `desatascos urgentes madrid`
- Sevilla: `desatascos sevilla`, `desatascos en sevilla`,
  `empresa desatascos sevilla`
- Valencia: `desatascos valencia`, `desatascos en valencia`,
  `empresa desatascos valencia`
- Malaga: supported by city seed and price variants, but weaker than the other
  cities in this pass.

Priority district seeds returned zero-volume exact terms:

- `desatascos centro madrid`
- `desatascos salamanca madrid`
- `desatascos chamberi`
- `desatascos eixample barcelona`
- `desatascos ciutat vella barcelona`
- `desatascos gracia barcelona`
- `desatascos ruzafa`
- `desatascos ciutat vella valencia`
- `desatascos poblats maritims`
- `desatascos triana sevilla`
- `desatascos nervion sevilla`
- `desatascos centro malaga`
- `desatascos centro zaragoza`
- `desatascos casco viejo zaragoza`

Conclusion: optimize city geo pages with confirmed keywords first. District
pages can keep local service context, but should not be forced into exact-match
keyword targeting unless later evidence appears.

## Child Page Candidates

Strong commercial candidates:

- `desatascar tuberias` / `desatascar tuberia`
- `desatascar fregadero`
- `desatascar wc` / `desatascos wc`
- `desatascar lavabo`
- `desatascar ducha`
- `camion cuba` / `cuba desatascos`
- `limpieza fosas septicas`
- `camara inspeccion tuberias`
- `limpieza tuberias`

Boundary rule:

- Domestic blockage pages must be separated from fontanero repair pages. A
  blocked WC/fregadero/lavabo page belongs to `desatascos` only when intent is
  clearly obstruction/unblocking, not plumbing installation or fixture repair.

## Pricing / FAQ Support

Useful FAQ/support terms:

- `camion cuba desatascos precio`
- `precio vaciar fosa septica`
- `limpieza fosa septica precio`
- `inspeccion de tuberias con camara precio`
- `cuanto cuesta desatascar un fregadero`
- `desatascos barcelona precios`
- `precio desatascar fregadero`
- `cuba desatascos precio`

These should feed FAQ and SEO copy before any dedicated pricing page is
considered.

## Blog Backlog

Informational demand is strong and should be saved for the future blog:

- `como desatascar el fregadero`
- `como desatascar wc`
- `como desatascar una ducha`
- `como desatascar un lavabo`
- `desatascador casero`
- `remedios caseros para desatascar el fregadero`
- `sosa caustica tuberias`
- `mal olor desague`
- `toallitas atascan tuberias`

These should link back to the relevant commercial desatascos page and not
compete with service URLs.

## Next Step

Optimize `/desatascos` and city geo pages first, then create the strongest
commercial child pages in this order:

1. `desatasco-tuberias`
2. `desatascar-fregadero`
3. `desatascar-wc`
4. `desatascar-lavabo-ducha`
5. `camion-cuba`
6. `limpieza-fosas-septicas`
7. `inspeccion-camara-tuberias`

## Implementation Pass 1

Implemented on 2026-06-15:

- `/desatascos` now uses the approved unified hero and commercial block pattern.
- Added a dedicated `desatascos` services directory, trust, process, pricing,
  reviews, FAQ and SEO section.
- Approved and implemented six child service pages:
  - `/desatascos/desatasco-tuberias`
  - `/desatascos/desatascar-fregadero`
  - `/desatascos/desatascar-wc`
  - `/desatascos/desatascar-lavabo-ducha`
  - `/desatascos/camion-cuba`
  - `/desatascos/limpieza-fosas-septicas`
- Added `DESATASCOS_PAGE_REGISTRY`, so sitemap includes the approved child URLs.
- `inspeccion-camara-tuberias` remains a support topic for now, not a standalone
  page, because this pass showed stronger direct commercial intent for the six
  pages above.

## District Rendering Fix

Checked on 2026-06-15:

- `data/district-seo-content.ts` already contains 31 `desatascos` district SEO
  entries.
- Exact district keyword probes in DataForSEO returned low/zero visible volume,
  so district pages are treated as local long-tail coverage, not separate
  high-volume child services.
- Fixed the shared district route so `desatascos` district pages render the
  approved unified hero, services directory, trust, process, pricing, reviews,
  FAQ and district-specific SEO text.
