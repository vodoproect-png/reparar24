# Fontanero Commercial Semantic Audit

Date: 2026-06-15

## Result

Commercial plumbing semantics from the current DataForSEO collection has been assigned to production page owners.

Approved child service pages now total: 16.

New pages promoted in this pass:

- `/fontanero/instalacion-lavabos`
- `/fontanero/mamparas-ducha`
- `/fontanero/bajantes`
- `/fontanero/reparacion-duchas`

## Ownership Decisions

- `cambio-banera-por-ducha` owns bathtub-to-shower conversion and shower tray replacement/installation terms, including `cambiar plato de ducha`, `instalar plato de ducha`, `cambio baño por ducha` and related price intent.
- `mamparas-ducha` owns shower screen installation, replacement and repair. It does not own shower tray replacement.
- `reparacion-duchas` owns shower column, flexo, manguera, desague/sumidero and shower leak terms. It does not own shower tray, shower screen or shower tap terms.
- `instalacion-lavabos` owns lavabo replacement/installation plus lavabo drain, siphon and valve terms. Faucet terms stay under `cambio-reparacion-grifos`.
- `bajantes` owns downpipe repair/replacement terms, especially no-obras and comunidad intent. Generic leak detection stays under `reparacion-fugas`; broad pipe renovation stays under `sustitucion-tuberias`.
- `desatascos` remains a separate top-level owner. Fontanero child links point to `/desatascos` where appropriate.

## Remaining Non-Page Commercial-Looking Terms

The remaining terms after assigning the 16 page owners do not currently justify additional plumbing child pages:

- `lampista cerca de mi`: general/Catalan regional synonym, better handled by hub/geo strategy later.
- Brand/model heater queries such as `junkers ... no enciende`, `vaillant ... no enciende`, `cointra ... no enciende`: belong under `calentadores-termos` or future FAQ/blog expansions, not separate pages per brand model.
- Pump/product price variants such as `bombas de agua para casa precios`: belong under `grupos-presion-agua` when service-oriented; pure product intent is excluded.
- `llave de paso gotea`, `sifon fregadero`: low-volume repair tails. Keep for FAQ/blog or fold into existing grifos/instalaciones/lavabos content, not separate pages yet.
- Solar/pool/irrigation/septic pump terms: outside current plumbing service architecture.

## Validation

Required production layers updated for the 16 approved pages:

- semantic map
- clusters
- SEO map
- page registry
- production SEO content
- service directory links
- 3D service icons

Validation status:

- `npm run validate:semantic`: passed
- `npx tsc --noEmit`: passed
- `npm run build`: passed, 298 static pages generated

No deploy was run as part of this audit.

## Final Residual Sweep

Additional residual sweep over unique keywords with volume >= 10:

- Total reviewed: 6390 unique keywords
- Assigned to approved commercial owners: 4960
- Informational/blog intent: 409
- Rejected/noise/out of scope: 56
- Remaining unassigned by child-page regex: 965

The remaining unassigned group is not a new child-service backlog. Its top terms are hub and geo demand such as:

- `fontanero`
- `fontaneria`
- `fontanero cerca de mi`
- `fontanero madrid`
- `fontanero valencia`
- `fontanero 24 horas`
- `fontanero urgente madrid`
- `empresa de fontaneria`

Decision: these belong to the hub and geo layer, not new child service pages.

Final child-page conclusion: no additional commercial plumbing child pages are justified from the current DataForSEO collection after the 16 approved owners.
