import { DAILY_BLOG_SEMANTIC_CLUSTERS_2026_06_19 } from './daily-informational-semantics-2026-06-19.ts'
import { DAILY_BLOG_SEMANTIC_CLUSTERS_2026_06_20 } from './daily-informational-semantics-2026-06-20.ts'
import { DAILY_BLOG_SEMANTIC_CLUSTERS_2026_06_21 } from './daily-informational-semantics-2026-06-21.ts'
import { DAILY_BLOG_SEMANTIC_CLUSTERS_2026_06_22 } from './daily-informational-semantics-2026-06-22.ts'
import { DAILY_BLOG_SEMANTIC_CLUSTERS_2026_06_23 } from './daily-informational-semantics-2026-06-23.ts'
import { DAILY_BLOG_SEMANTIC_CLUSTERS_2026_06_24 } from './daily-informational-semantics-2026-06-24.ts'
import { DAILY_BLOG_SEMANTIC_CLUSTERS_2026_06_25 } from './daily-informational-semantics-2026-06-25.ts'

export interface BlogInformationalSemanticCluster {
  id: string
  articleSlug: string
  categorySlug: string
  commercialOwner: string
  sourceFile: string
  approvedKeywords: string[]
  notes: string
}

export const BLOG_INFORMATIONAL_SEMANTIC_CLUSTERS: BlogInformationalSemanticCluster[] = [
  {
    id: 'fontaneria-fuga-agua-casa',
    articleSlug: 'que-hacer-fuga-agua-casa',
    categorySlug: 'fontaneria',
    commercialOwner: '/fontanero/reparacion-fugas',
    sourceFile: '.tmp/semantic-review/2026-06-14T19-47-44-292Z-fontanero-dataforseo-review.json',
    approvedKeywords: [
      'como detectar fuga de agua',
      'como localizar una fuga de agua en una tuberia enterrada',
      'como detectar fuga de agua en casa',
      'detectar fuga de agua sin romper',
      'fuga de agua en casa',
    ],
    notes: 'Cluster informativo de diagnostico y primera respuesta; enlaza a reparacion de fugas.',
  },
  {
    id: 'fontaneria-cisterna-pierde-agua',
    articleSlug: 'por-que-gotea-cisterna',
    categorySlug: 'fontaneria',
    commercialOwner: '/fontanero/reparacion-cisternas',
    sourceFile: '.tmp/semantic-review/2026-06-14T19-47-44-292Z-fontanero-dataforseo-review.json',
    approvedKeywords: [
      'como arreglar cisterna que pierde agua',
      'porque pierde agua la cisterna',
      'cisterna pierde agua',
      'reparar mecanismo cisterna',
      'wc pierde agua',
    ],
    notes: 'Cluster de averia frecuente con salida comercial clara hacia reparacion de cisternas.',
  },
  {
    id: 'fontaneria-coste-fontanero-valencia',
    articleSlug: 'cuanto-cuesta-fontanero-valencia',
    categorySlug: 'fontaneria',
    commercialOwner: '/fontanero',
    sourceFile: '.tmp/semantic-review/2026-06-14T19-47-44-292Z-fontanero-dataforseo-review.json',
    approvedKeywords: [
      'cuanto cuesta un fontanero en valencia',
      'precio fontanero valencia',
      'tarifa fontanero urgente',
      'fontanero presupuesto previo',
      'precio reparacion fontaneria',
    ],
    notes: 'Cluster informativo de precio; debe explicar variables sin competir con la pagina comercial de fontaneria.',
  },
  {
    id: 'electricidad-salta-diferencial',
    articleSlug: 'por-que-salta-diferencial',
    categorySlug: 'electricidad',
    commercialOwner: '/electricista/averias-electricas',
    sourceFile: '.tmp/semantic-review/2026-06-13T16-58-16-158Z-electricista-salta-diferencial.json',
    approvedKeywords: [
      'porque salta el diferencial',
      'por que salta el diferencial',
      'porque salta el interruptor diferencial',
      'salta diferencial en vivienda',
      'que hacer si salta un diferencial',
    ],
    notes: 'Cluster de seguridad electrica; requiere CTA prudente a averias y revision electrica.',
  },
  {
    id: 'electricidad-cortocircuito-casa',
    articleSlug: 'que-hacer-cortocircuito-casa',
    categorySlug: 'electricidad',
    commercialOwner: '/electricista/averias-electricas',
    sourceFile: '.tmp/semantic-review/2026-06-13T16-58-12-313Z-electricista-cortocircuito.json',
    approvedKeywords: [
      'cortocircuito cuadro electrico',
      'cortocircuito en un circuito electrico',
      'como averiguar un cortocircuito',
      'cortocircuito casa',
      'que hacer cortocircuito casa',
    ],
    notes: 'Cluster informativo mixto; usar enfoque de seguridad y evitar tutorial tecnico peligroso.',
  },
  {
    id: 'electricidad-coste-electricista-valencia',
    articleSlug: 'cuanto-cuesta-electricista-valencia',
    categorySlug: 'electricidad',
    commercialOwner: '/electricista',
    sourceFile: '.tmp/semantic-review/2026-06-13T16-58-16-158Z-electricista-salta-diferencial.json',
    approvedKeywords: [
      'cuanto cuesta un electricista en valencia',
      'precio electricista valencia',
      'tarifa electricista urgente',
      'electricista presupuesto',
      'precio reparacion electrica',
    ],
    notes: 'Cluster informativo de coste para electricidad; orienta al usuario y deriva a presupuesto profesional.',
  },
  {
    id: 'desatascos-tuberia-atascada',
    articleSlug: 'como-saber-tuberia-atascada',
    categorySlug: 'desatascos',
    commercialOwner: '/desatascos/desatasco-tuberias',
    sourceFile: '.tmp/semantic-review/2026-06-15T14-54-06-371Z-desatascos-dataforseo-review.json',
    approvedKeywords: [
      'como desatascar tuberia',
      'como desatascar tuberias',
      'tuberia atascada sintomas',
      'desague lento',
      'mal olor tuberias',
    ],
    notes: 'Cluster de sintomas y decision; mantiene la parte DIY limitada y deriva a desatasco profesional.',
  },
  {
    id: 'desatascos-wc-atascado',
    articleSlug: 'que-hacer-wc-atascado',
    categorySlug: 'desatascos',
    commercialOwner: '/desatascos/desatascar-wc',
    sourceFile: '.tmp/semantic-review/2026-06-15T14-54-06-371Z-desatascos-dataforseo-review.json',
    approvedKeywords: [
      'como desatascar un water',
      'como desatascar wc',
      'como desatascar un wc muy atascado',
      'wc atascado',
      'inodoro atascado',
    ],
    notes: 'Cluster de urgencia domestica con alta relacion comercial hacia desatascar WC.',
  },
  {
    id: 'desatascos-camion-cuba',
    articleSlug: 'cuando-llamar-camion-cuba',
    categorySlug: 'desatascos',
    commercialOwner: '/desatascos/camion-cuba',
    sourceFile: '.tmp/semantic-review/2026-06-15T14-54-06-371Z-desatascos-dataforseo-review.json',
    approvedKeywords: [
      'camion cuba desatascos',
      'desatasco alta presion',
      'atasco arqueta',
      'camion cuba para arquetas',
      'cuando llamar camion cuba',
    ],
    notes: 'Cluster de seleccion de servicio para comunidades, arquetas y saneamiento de gran volumen.',
  },
  {
    id: 'climatizacion-aire-no-enfria',
    articleSlug: 'aire-acondicionado-no-enfria-causas',
    categorySlug: 'climatizacion',
    commercialOwner: '/aire-acondicionado/reparacion-aire-acondicionado',
    sourceFile: '.tmp/semantic-review/2026-06-15T19-06-16-788Z-aire-acondicionado-expanded-review.json',
    approvedKeywords: [
      'por que no enfria el aire acondicionado',
      'aire acondicionado no enfria que hacer',
      'aire acondicionado no enfria',
      'split no enfria',
      'falta de gas aire acondicionado',
    ],
    notes: 'Cluster de diagnostico con salida comercial a reparacion de aire acondicionado.',
  },
  {
    id: 'climatizacion-limpieza-filtros',
    articleSlug: 'cuando-hacer-mantenimiento-aire-acondicionado',
    categorySlug: 'climatizacion',
    commercialOwner: '/aire-acondicionado/mantenimiento-aire-acondicionado',
    sourceFile: '.tmp/semantic-review/2026-06-15T19-06-16-788Z-aire-acondicionado-expanded-review.json',
    approvedKeywords: [
      'limpieza filtros aire acondicionado',
      'como limpiar filtros aire acondicionado',
      'cada cuanto hacer mantenimiento aire acondicionado',
      'revision aire acondicionado',
      'mantenimiento split',
    ],
    notes: 'Cluster preventivo; buen puente hacia mantenimiento anual y revision antes del verano.',
  },
  {
    id: 'climatizacion-coste-instalar-split',
    articleSlug: 'cuanto-cuesta-instalar-split',
    categorySlug: 'climatizacion',
    commercialOwner: '/aire-acondicionado/instalacion-split',
    sourceFile: '.tmp/semantic-review/2026-06-15T19-06-16-788Z-aire-acondicionado-expanded-review.json',
    approvedKeywords: [
      'cuanto cuesta instalar un split',
      'precio instalacion split',
      'instalar aire acondicionado split',
      'montaje split',
      'precio montaje aire acondicionado',
    ],
    notes: 'Cluster de coste y decision para instalacion de split; conecta con la pagina comercial de instalacion.',
  },
  {
    id: 'calefaccion-caldera-no-arranca',
    articleSlug: 'caldera-no-arranca-que-revisar',
    categorySlug: 'calefaccion',
    commercialOwner: '/calefaccion/reparacion-calderas',
    sourceFile: '.tmp/semantic-review/2026-06-16T08-14-56-038Z-calefaccion-review.json',
    approvedKeywords: [
      'caldera no funciona',
      'caldera no calienta agua',
      'caldera no arranca',
      'caldera no enciende',
      'fallo caldera',
    ],
    notes: 'Cluster de averia y seguridad; evitar instrucciones de manipulacion de gas.',
  },
  {
    id: 'calefaccion-radiador-no-calienta',
    articleSlug: 'radiador-no-calienta-causas',
    categorySlug: 'calefaccion',
    commercialOwner: '/calefaccion/radiadores-calefaccion',
    sourceFile: '.tmp/semantic-review/2026-06-16T08-14-56-038Z-calefaccion-review.json',
    approvedKeywords: [
      'radiador no calienta',
      'purgar radiadores',
      'como purgar radiadores',
      'radiador frio',
      'radiador no calienta abajo',
    ],
    notes: 'Cluster fuerte de mantenimiento y diagnostico de radiadores.',
  },
  {
    id: 'calefaccion-presion-baja-caldera',
    articleSlug: 'presion-baja-caldera',
    categorySlug: 'calefaccion',
    commercialOwner: '/calefaccion/reparacion-calderas',
    sourceFile: '.tmp/semantic-review/2026-06-16T08-14-56-038Z-calefaccion-review.json',
    approvedKeywords: [
      'porque baja la presion de la caldera',
      'porque pierde presion la caldera',
      'presion baja caldera',
      'caldera pierde presion',
      'subir presion caldera',
    ],
    notes: 'Cluster de diagnostico recurrente; buen candidato LLM por respuesta breve y accionable.',
  },
  {
    id: 'saneamiento-limpieza-bajantes',
    articleSlug: 'cuando-limpiar-bajantes-comunidad',
    categorySlug: 'saneamiento',
    commercialOwner: '/limpieza-tuberias/limpieza-bajantes',
    sourceFile: '.tmp/semantic-review/2026-06-16T10-05-52-496Z-limpieza-tuberias-review.json',
    approvedKeywords: [
      'como limpiar bajantes comunidad',
      'mantenimiento bajantes comunidad',
      'limpieza bajantes edificio',
      'bajantes mal olor',
      'limpiar bajantes comunidad',
    ],
    notes: 'Cluster B2B/comunidades; volumen menor pero alta afinidad comercial.',
  },
  {
    id: 'saneamiento-inspeccion-camara',
    articleSlug: 'inspeccion-camara-tuberias-cuando-conviene',
    categorySlug: 'saneamiento',
    commercialOwner: '/limpieza-tuberias/inspeccion-camara-tuberias',
    sourceFile: '.tmp/semantic-review/2026-06-16T10-05-52-496Z-limpieza-tuberias-review.json',
    approvedKeywords: [
      'camara tuberias',
      'inspeccion CCTV tuberias',
      'localizar rotura tuberia',
      'inspeccion camara tuberias',
      'atascos repetidos tuberias',
    ],
    notes: 'Cluster de seleccion tecnica; apoya inspeccion con camara y diagnostico de atascos repetidos.',
  },
  {
    id: 'saneamiento-arquetas-olores',
    articleSlug: 'limpieza-arquetas-olores-comunidad',
    categorySlug: 'saneamiento',
    commercialOwner: '/limpieza-tuberias/limpieza-arquetas-colectores',
    sourceFile: '.tmp/semantic-review/2026-06-16T10-05-52-496Z-limpieza-tuberias-review.json',
    approvedKeywords: [
      'mal olor tuberias comunidad',
      'limpieza arquetas comunidad',
      'arquetas con olor',
      'mantenimiento arquetas',
      'como limpiar tuberias con mal olor',
    ],
    notes: 'Cluster preventivo para comunidades; enlaza a arquetas y colectores.',
  },
  ...DAILY_BLOG_SEMANTIC_CLUSTERS_2026_06_19,
  ...DAILY_BLOG_SEMANTIC_CLUSTERS_2026_06_20,
  ...DAILY_BLOG_SEMANTIC_CLUSTERS_2026_06_21,
  ...DAILY_BLOG_SEMANTIC_CLUSTERS_2026_06_22,
  ...DAILY_BLOG_SEMANTIC_CLUSTERS_2026_06_23,
  ...DAILY_BLOG_SEMANTIC_CLUSTERS_2026_06_24,
  ...DAILY_BLOG_SEMANTIC_CLUSTERS_2026_06_25,
]

export const BLOG_INFORMATIONAL_SEMANTIC_CLUSTER_BY_ID = Object.fromEntries(
  BLOG_INFORMATIONAL_SEMANTIC_CLUSTERS.map((cluster) => [cluster.id, cluster])
)
