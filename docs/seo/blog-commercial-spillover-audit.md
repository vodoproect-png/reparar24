# Blog commercial spillover audit

Last updated: 2026-06-23

## Summary

- Total commercial spillover keywords: 69
- Optimize existing pages: 47
- Optimize existing pages with secondary-link caution: 5
- Remap to another existing page: 1
- Future commercial architecture: 6
- Keep as blog safety/support topics: 10

## Decision Groups

| Service |Target |Action |Final owner |Keywords |Volume |Examples |
| --- |--- |--- |--- |--- |--- |--- |
| Electricista |cargador-coche-electrico |optimize-existing-owner |/electricista/cargador-coche-electrico |6 |620 |instalar cargador coche electrico en casa,instalar punto de recarga en casa,instalar wallbox en casa,instalar cargador coche en casa,instalar punto recarga coche electrico casa,instalar cargador coche electrico casa |
| Calefaccion |instalacion-calefaccion-coste |optimize-existing-owner |/calefaccion/instalacion-calefaccion |12 |360 |instalar caldera condensacion,instalar caldera de gas precio,instalar calefaccion gas natural precio,instalar caldera de condensacion,instalar calefaccion en casa precio,instalar calefaccion central |
| Calefaccion |radiadores-fugas-valvulas |optimize-existing-owner |/calefaccion/radiadores-calefaccion |9 |100 |reparar fuga radiador casa,reparar fisura radiador calefaccion,reparar fuga agua radiador calefaccion,reparar fuga junta radiador calefaccion,reparar fuga radiador calefaccion,reparar llave de radiador que gotea |
| Fontaneria |cisternas-inodoros |optimize-existing-owner |/fontanero/reparacion-cisternas |6 |70 |reparar cisterna que pierde agua,reparar cisterna wc pierde agua,reparar inodoro pierde agua,reparar perdida de agua inodoro,reparar water pierde agua,reparar wc pierde agua |
| Desatascos |lavabo-ducha-atascados |optimize-existing-owner |/desatascos/desatascar-lavabo-ducha |1 |40 |desatascador desague ducha |
| Fontaneria |mamparas-ducha |optimize-existing-owner |/fontanero/mamparas-ducha |1 |40 |reparar mampara ducha |
| Aire Acondicionado / Climatizacion |instalacion-potencia-precio |optimize-existing-owner |/aire-acondicionado/instalacion-aire-acondicionado |3 |30 |instalar aire acondicionado en casa precio,instalar aire acondicionado en piso,instalar aire acondicionado piso alquiler |
| Aire Acondicionado / Climatizacion |conductos |optimize-existing-owner |/aire-acondicionado/aire-acondicionado-conductos |1 |20 |instalar aire acondicionado centralizado |
| Calefaccion |calefaccion-central-comunidad |optimize-existing-owner |/calefaccion/calefaccion-central-comunidades |1 |10 |instalar contadores individuales en calefaccion central |
| Fontaneria |grifos |optimize-existing-owner |/fontanero/cambio-reparacion-grifos |1 |10 |precio fontanero cambiar grifo |
| Fontaneria |termos-calentadores |optimize-existing-owner |/fontanero/calentadores-termos |1 |10 |presupuesto cambiar termo electrico |
| Fontaneria |tuberias |optimize-existing-owner |/fontanero/sustitucion-tuberias |1 |10 |presupuesto cambiar tuberias casa |
| Fontaneria |reparacion-duchas |optimize-existing-owner |/fontanero/reparacion-duchas |1 |10 |reparar ducha que gotea |
| Desatascos |camion-cuba |optimize-existing-owner |/desatascos/camion-cuba |1 |0 |camion cuba desatascos para que sirve |
| Desatascos |fosas-septicas |optimize-existing-owner |/desatascos/limpieza-fosas-septicas |1 |0 |servicio de limpieza de fosa septica precio |
| Fontaneria |bajantes |optimize-existing-owner |/fontanero/bajantes |1 |0 |reparar bajante sin obras |
| Fontaneria |reparacion-duchas |optimize-existing-with-secondary-link |/fontanero/reparacion-duchas |5 |230 |reparar grifo termostatico grohe gotea,reparar grifo termostatico roca gotea,reparar grifo termostatico,reparar grifo banera,reparar grifo de ducha que gotea |
| Fontaneria |bano-ducha-lavabo |remap-existing-owner |/fontanero/instalacion-cambio-inodoros |1 |40 |cuanto cobra un fontanero por cambiar un inodoro |
| Electricista |boletin-electrico |future-architecture |/certificados-electricos |5 |70 |certificado de instalador electrico,certificado instalador baja tension,boletin del instalador,certificado de instalador electrico autorizado,gva certificado baja tension instalador |
| Electricista |legalizacion-electrica |future-architecture |/certificados-electricos |1 |10 |legalizar instalacion electrica |
| Desatascos |productos-y-errores |blog-safety-support |/desatascos |5 |140 |como hacer un desatascador casero,como hacer desatascador casero,como hacer un desatascador de tuberias casero,sosa caustica desatascador de tuberias,desatascador casero funciona |
| Desatascos |wc-inodoro-atascado |blog-safety-support |/desatascos/desatascar-wc |2 |20 |como abrir wc net turbo desatascador,wc net desatascador como se abre |
| Desatascos |fregadero-atascado |blog-safety-support |/desatascos/desatascar-fregadero |2 |20 |como desatascar el fregadero sin desatascador,como desatascar un fregadero sin desatascador |
| Desatascos |lavabo-ducha-atascados |blog-safety-support |/desatascos/desatascar-lavabo-ducha |1 |10 |como desatascar un lavabo con desatascador |

## Action Rules

- `optimize-existing-owner`: add the variants to the existing commercial page SEO text, FAQ, title/meta only if length allows, and internal anchors.
- `optimize-existing-with-secondary-link`: update the owner page, but add contextual links to the neighboring commercial page to avoid cannibalization.
- `remap-existing-owner`: fix the semantic owner before writing or optimizing content.
- `future-architecture`: do not force into current service pages; hold for a future certificados/boletines family.
- `blog-safety-support`: write informational/safety blog content and link to the correct service page, but do not use as commercial landing-page primary intent.