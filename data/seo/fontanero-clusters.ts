/**
 * Fontanero Keyword Clusters
 * 
 * PURPOSE:
 * This file stores grouped keyword clusters for Fontanero services.
 * It bridges Ahrefs keyword research with the Semantic Layer.
 * 
 * USAGE:
 * Future automation will consume this to:
 * - Generate SEO-optimized metadata
 * - Create content blocks for AI Overviews
 * - Generate FAQ topics based on search intent
 * - Validate no keyword cannibalization exists
 * - Power the SEO Engine and Content Engine
 * 
 * GOVERNANCE:
 * - All clusters must align with fontanero-semantic-map.ts
 * - Keywords must match approved commercial intent
 * - Product/e-commerce keywords excluded
 * - News/informational keywords excluded
 * 
 * DO NOT:
 * - Add keywords from rejected semantic categories
 * - Include product search queries (e-commerce)
 * - Include news/informational non-service queries
 * - Modify without SEO governance approval
 */

import { KeywordCluster } from './types';

/**
 * Fontanero approved keyword clusters
 * Aligned with fontanero-semantic-map.ts approved children
 */
export const FONTANERO_CLUSTERS: KeywordCluster[] = [
  // CLUSTER 1: Reparación de Fugas
  {
    slug: 'reparacion-fugas',
    primaryKeyword: 'reparación fugas agua',
    secondaryKeywords: [
      'fuga de agua',
      'detectar fuga de agua',
      'reparación fuga tubería',
      'fuga tubería enterrada',
      'detector de fugas'
    ],
    longTailKeywords: [
      'como detectar fuga de agua oculta',
      'reparar fuga tubería sin romper pared',
      'reparación fuga agua urgente',
      'fuga agua bajante comunidad'
    ],
    commercialIntent: 'high',
    status: 'approved',
    notes: 'High urgency emergency service. Strong overlap with desatascos at intent level but distinct technical service.'
  },
  
  // CLUSTER 2: Desatascos
  {
    slug: 'desatascos',
    primaryKeyword: 'desatascos',
    secondaryKeywords: [
      'desatascos urgentes',
      'desatascos 24 horas',
      'desatascar tubería',
      'desatascar fregadero',
      'empresa desatascos'
    ],
    longTailKeywords: [
      'desatascar wc urgente',
      'desatascos tuberías comunidad',
      'desatascos con garantía',
      'servicio desatascos 24h'
    ],
    commercialIntent: 'high',
    status: 'approved',
    notes: 'Emergency service with very high commercial intent. Avoid product keywords (drain cleaners, plungers).'
  },
  
  // CLUSTER 3: Instalaciones
  {
    slug: 'instalaciones',
    primaryKeyword: 'instalación fontanería',
    secondaryKeywords: [
      'instalar grifo',
      'instalación baño',
      'instalación sanitarios',
      'instalación tuberías',
      'fontanero instalador'
    ],
    longTailKeywords: [
      'instalación completa baño',
      'instalación fontanería nueva vivienda',
      'instalación sanitarios cocina',
      'fontanero instalación reforma'
    ],
    commercialIntent: 'high',
    status: 'approved',
    notes: 'Project-based service. Distinct from repairs and replacements.'
  },
  
  // CLUSTER 4: Sustitución de Tuberías
  {
    slug: 'sustitucion-tuberias',
    primaryKeyword: 'sustitución tuberías',
    secondaryKeywords: [
      'cambio tuberías',
      'renovar tuberías',
      'tuberías antiguas',
      'cambiar tuberías vivienda',
      'sustitución bajantes'
    ],
    longTailKeywords: [
      'cambiar tuberías sin obra',
      'renovación tuberías plomo',
      'sustitución tuberías comunidad',
      'cambio bajantes fachada'
    ],
    commercialIntent: 'high',
    status: 'approved',
    notes: 'Renovation and replacement focus. Higher ticket than repairs, overlaps semantically with installations but distinct intent.'
  },
  
  // CLUSTER 5: Calentadores y Termos
  {
    slug: 'calentadores-termos',
    primaryKeyword: 'termo eléctrico',
    secondaryKeywords: [
      'reparación termo eléctrico',
      'instalación termo eléctrico',
      'cambiar termo eléctrico',
      'calentador de agua',
      'termo agua eléctrico'
    ],
    longTailKeywords: [
      'termo eléctrico no calienta',
      'cambiar termo eléctrico viejo',
      'instalación calentador gas',
      'reparar termo sin agua caliente'
    ],
    commercialIntent: 'high',
    status: 'approved',
    notes: 'Specialized equipment service. Avoid product/e-commerce intent (buying water heaters).'
  },
  
  // CLUSTER 6: Mantenimiento
  {
    slug: 'mantenimiento',
    primaryKeyword: 'mantenimiento fontanería',
    secondaryKeywords: [
      'revisión fontanería',
      'mantenimiento tuberías',
      'prevencion fugas',
      'mantenimiento comunidad',
      'contrato mantenimiento fontanería'
    ],
    longTailKeywords: [
      'mantenimiento preventivo fontanería comunidad',
      'contrato mantenimiento fontanería empresa',
      'revisión anual fontanería',
      'mantenimiento tuberías edificio'
    ],
    commercialIntent: 'medium',
    status: 'approved',
    notes: 'B2B and community focus. Lower urgency but higher contract value. Target property managers and communities.'
  },

  // CLUSTER 7: Cambio de Bañera por Ducha
  {
    slug: 'cambio-banera-por-ducha',
    primaryKeyword: 'cambiar ba\u00f1era por ducha',
    secondaryKeywords: [
      'cambiar ba\u00f1era por plato de ducha',
      'cambio de ba\u00f1era por ducha',
      'cambiar ba\u00f1era por ducha precio',
      'cambiar ba\u00f1era por plato de ducha precio',
      'precio cambiar ba\u00f1era por ducha',
      'cambiar plato de ducha',
      'cambiar plato de ducha precio',
      'instalación de plato ducha',
      'instalar plato de ducha',
      'colocar plato de ducha',
      'reparar plato ducha resina',
      'cambio ba\u00f1o por ducha',
      'cambio de ba\u00f1o por ducha',
      'cambio ba\u00f1era por ducha madrid',
      'cambio ba\u00f1o por ducha',
      'quitar ba\u00f1era poner ducha',
      'quitar ba\u00f1era y poner ducha',
      'cambio plato ducha'
    ],
    longTailKeywords: [
      'precio cambiar plato de ducha por otro',
      'cambiar ba\u00f1era por plato ducha',
      'cambio de ba\u00f1era por ducha precio',
      'cambiar plato de ducha por otro',
      'montar plato de ducha',
      'instalación plato ducha precio',
      'cambiar desagüe plato ducha',
      'reparar grieta plato ducha',
      'cambio ba\u00f1era por ducha barcelona',
      'cambio ba\u00f1era por ducha valencia',
      'cambiar ba\u00f1era por ducha madrid',
      'cambiar ba\u00f1era por ducha barcelona',
      'cambiar ba\u00f1era por ducha valencia'
    ],
    commercialIntent: 'high',
    status: 'approved',
    notes: 'Promoted from DataForSEO wave 2. Owns bathtub-to-shower conversion and shower tray replacement; broad fixture repairs stay in instalaciones or future grifos/cisternas clusters.'
  },

  // CLUSTER 8: Reparación de Cisternas
  {
    slug: 'reparacion-cisternas',
    primaryKeyword: 'cisterna pierde agua',
    secondaryKeywords: [
      'arreglar cisterna',
      'arreglar cisterna que gotea',
      'cisterna gotea',
      'mi cisterna pierde agua',
      'cisterna roca pierde agua',
      'cisterna no carga agua',
      'cambiar mecanismo cisterna',
      'cambio mecanismo cisterna',
      'reparar cisterna roca',
      'cisterna empotrada pierde agua'
    ],
    longTailKeywords: [
      'cisterna roca doble pulsador pierde agua',
      'cisterna pierde agua continuamente',
      'cisterna pierde agua por abajo',
      'reparar flotador cisterna roca',
      'cambiar descargador cisterna roca',
      'cambiar mecanismo cisterna roca',
      'arreglar pulsador cisterna roca',
      'cambiar junta descargador cisterna roca'
    ],
    commercialIntent: 'high',
    status: 'approved',
    notes: 'Promoted from DataForSEO cisternas-inodoros draft. Owns repair of leaking or malfunctioning cistern mechanisms; full toilet installation/replacement remains in instalaciones or future inodoros cluster.'
  },

  // CLUSTER 9: Cambio y Reparación de Grifos
  {
    slug: 'cambio-reparacion-grifos',
    primaryKeyword: 'cambiar grifo cocina',
    secondaryKeywords: [
      'grifo gotea',
      'cambiar grifo ducha',
      'cambiar grifo lavabo',
      'cambiar grifo bañera',
      'arreglar goteo grifo',
      'gotea grifo monomando',
      'grifo cocina pierde agua',
      'reparar grifo monomando cocina',
      'reparar grifo termostatico',
      'precio cambiar grifo cocina'
    ],
    longTailKeywords: [
      'cambiar grifo cocina monomando',
      'cambiar grifo ducha termostatico',
      'cambiar grifo lavabo antiguo',
      'grifo cocina pierde agua por donde gira',
      'grifo pierde agua por la rosca',
      'arreglar grifo monomando gotea',
      'reparar cartucho grifo monomando',
      'cambiar junta grifo fregadero'
    ],
    commercialIntent: 'high',
    status: 'approved',
    notes: 'Promoted from DataForSEO grifos draft. Owns tap/faucet replacement and repair demand for kitchen, shower, basin and monomando leaks; broad plumbing installation projects remain in instalaciones.'
  },

  // CLUSTER 10: Grupos de Presion de Agua
  {
    slug: 'grupos-presion-agua',
    primaryKeyword: 'grupo de presion de agua',
    secondaryKeywords: [
      'grupo de presi\u00f3n',
      'grupo presion agua',
      'grupo presion',
      'grupo presi\u00f3n agua dom\u00e9stico',
      'grupo de presi\u00f3n de agua para comunidades',
      'grupo presion agua vivienda',
      'grupo de presion para vivienda',
      'instalación bomba de agua',
      'bomba de agua para vivienda unifamiliar',
      'bomba de agua no arranca'
    ],
    longTailKeywords: [
      'grupo de presi\u00f3n de agua con dep\u00f3sito',
      'grupo de presi\u00f3n con calder\u00edn',
      'instalar bomba de agua en vivienda',
      'reparar grupo de presion de agua',
      'grupo de presion comunidad vecinos',
      'bomba de agua vivienda poca presion',
      'presostato grupo de presion',
      'calderin grupo de presion'
    ],
    commercialIntent: 'medium',
    status: 'approved',
    notes: 'Promoted from DataForSEO bombas-grupos-presion draft. Owns installation, repair and maintenance of pressure groups and water pumps for homes and communities; excludes product-only shopping, irrigation-only and industrial fire-system intent.'
  },

  // CLUSTER 11: Descalcificadores y Osmosis
  {
    slug: 'descalcificadores-osmosis',
    primaryKeyword: 'mantenimiento descalcificador',
    secondaryKeywords: [
      'mantenimiento de descalcificador',
      'mantenimiento osmosis',
      'mantenimiento osmosis inversa',
      'mantenimiento de osmosis inversa',
      'reparar descalcificador',
      'reparación descalcificadores',
      'reparar osmosis',
      'reparación osmosis',
      'instalar osmosis valencia',
      'instalar descalcificador valencia'
    ],
    longTailKeywords: [
      'mantenimiento de descalcificadores de agua',
      'mantenimiento descalcificador de sal',
      'precio mantenimiento descalcificador',
      'precio mantenimiento osmosis',
      'mantenimiento descalcificador domestico',
      'mantenimiento descalcificador comunitario',
      'tecnico osmosis',
      'reparar grifo osmosis'
    ],
    commercialIntent: 'medium',
    status: 'approved',
    notes: 'Promoted from DataForSEO descalcificadores-osmosis draft. Owns maintenance, repair and installation service demand for water treatment equipment; excludes comparison, product-only and DIY guide intent.'
  },

  // CLUSTER 12: Instalación y Cambio de Inodoros
  {
    slug: 'instalacion-cambio-inodoros',
    primaryKeyword: 'instalar inodoro',
    secondaryKeywords: [
      'cambiar inodoro',
      'instalación sanitario',
      'instalación de sanitario',
      'instalación de sanitarios',
      'instalar sanitario',
      'cambiar vater',
      'instalar vater',
      'cambiar taza water',
      'cambiar taza vater',
      'precio cambiar inodoro'
    ],
    longTailKeywords: [
      'instalación sanitario con brida',
      'instalación sanitario suspendido',
      'colocacion de sanitarios',
      'colocacion de taza de ba\u00f1o',
      'colocar una taza de ba\u00f1o',
      'precio instalación sanitarios',
      'cambiar vater precio',
      'instalar un sanitario'
    ],
    commercialIntent: 'medium',
    status: 'approved',
    notes: 'Promoted from the remaining DataForSEO cisternas-inodoros draft. Owns toilet/sanitary installation and replacement; cistern repair remains in reparación-cisternas and WC blockage remains in desatascos.'
  },

  // CLUSTER 13: Instalación y Reparación de Lavabos
  {
    slug: 'instalacion-lavabos',
    primaryKeyword: 'cambiar lavabo',
    secondaryKeywords: [
      'cambiar desagüe lavabo',
      'cambiar sifon lavabo',
      'cambiar valvula lavabo',
      'instalar lavabo',
      'instalar lavabo suspendido',
      'montaje lavabo',
      'montar lavabo sobre encimera',
      'colocar lavabo suspendido',
      'poner desagüe lavabo',
      'arreglar lavabo que gotea'
    ],
    longTailKeywords: [
      'cambiar desag\u00fce lavabo antiguo',
      'cambiar v\u00e1lvula lavabo click clack',
      'instalación valvula click clack lavabo',
      'cambiar lavabo de pie por suspendido',
      'cambiar lavabo de pie por mueble',
      'conectar desagüe lavabo',
      'montaje sifon lavabo',
      'precio instalar lavabo',
      'precio instalación lavabo',
      'cambiar llave de paso lavabo'
    ],
    commercialIntent: 'medium',
    status: 'approved',
    notes: 'Promoted from DataForSEO duchas-lavabos draft. Owns lavabo replacement, installation, drain, siphon and valve service intent; faucet-specific demand stays in cambio-reparación-grifos and full bathroom projects stay in instalaciones.'
  },

  // CLUSTER 14: Mamparas de Ducha
  {
    slug: 'mamparas-ducha',
    primaryKeyword: 'cambiar mampara ducha',
    secondaryKeywords: [
      'reparación de mamparas de ba\u00f1o',
      'reparación de mamparas de ducha',
      'reparar mampara ducha',
      'arreglar mampara ducha',
      'sustituir mampara de ducha',
      'poner una mampara de ducha',
      'cambiar mampara ba\u00f1era',
      'instalación mampara ducha'
    ],
    longTailKeywords: [
      'arreglar puerta mampara ducha',
      'reparación mampara ducha',
      'reparación mamparas ducha',
      'precio instalación plato de ducha y mampara',
      'precio cambiar plato de ducha y mampara',
      'presupuesto plato de ducha y mampara',
      'cambiar plato de ducha y mampara',
      'cambio de plato de ducha y mampara'
    ],
    commercialIntent: 'medium',
    status: 'approved',
    notes: 'Promoted from DataForSEO duchas-lavabos draft. Owns shower screen repair, replacement and installation; shower tray and bathtub-to-shower conversion demand remains in cambio-bañera-por-ducha.'
  },

  // CLUSTER 15: Bajantes
  {
    slug: 'bajantes',
    primaryKeyword: 'reparación de bajantes sin obras',
    secondaryKeywords: [
      'reparar bajantes sin obras',
      'reparación de bajantes',
      'reparar bajante pvc',
      'reparación bajantes',
      'arreglar bajantes',
      'cambiar bajante comunidad',
      'cambiar bajantes comunidad precio',
      'cambio de bajantes comunidad',
      'reparación bajantes comunidad',
      'sustitución bajantes valencia'
    ],
    longTailKeywords: [
      'reparación de bajantes sin obras opiniones',
      'precio cambiar bajante comunitaria',
      'precio cambiar tubería bajantes comunidad',
      'mantenimiento bajantes comunidad',
      'sustituir bajante comunidad',
      'localizar fuga en bajante',
      'bajante de poceta',
      'reparar bajante pvc sin obra'
    ],
    commercialIntent: 'high',
    status: 'approved',
    notes: 'Promoted from DataForSEO bajantes demand found across sustitución-tuberías, mantenimiento and blog drafts. Owns bajante repair/replacement, especially no-obras and comunidad intent; generic leak detection remains in reparación-fugas.'
  },

  // CLUSTER 16: Reparación de Duchas
  {
    slug: 'reparacion-duchas',
    primaryKeyword: 'cambiar ducha',
    secondaryKeywords: [
      'cambio de ducha',
      'reforma ducha',
      'reformas de duchas',
      'cambiar columna de ducha',
      'cambiar desagüe ducha',
      'ducha gotea',
      'ducha goteando',
      'goteo ducha',
      'cambiar flexo ducha',
      'cambiar manguera ducha'
    ],
    longTailKeywords: [
      'cambio de ducha precio',
      'cambiar ducha precio',
      'cambio de ducha en 24 horas',
      'cambiar ducha de ba\u00f1o',
      'reformas de duchas',
      'reformas duchas ba\u00f1os',
      'arreglar ducha que gotea',
      'colocacion ducha',
      'arreglar manguera ducha',
      'cambiar sumidero ducha',
      'cambiar cartucho desviador columna ducha',
      'reparar selector columna hidromasaje'
    ],
    commercialIntent: 'high',
    status: 'approved',
    notes: 'Promoted from remaining DataForSEO duchas-lavabos demand. Owns shower column, hose, drain and leak repair/replacement; excludes shower tray conversion, shower screens and shower taps.'
  }
];

/**
 * Future category clusters
 * Not yet approved for production but tracked for planning
 */
export const FONTANERO_FUTURE_CLUSTERS: KeywordCluster[] = [];

/**
 * Helper: Get cluster by slug
 * Returns undefined if cluster not found
 */
export function getFontaneroCluster(slug: string): KeywordCluster | undefined {
  return FONTANERO_CLUSTERS.find(cluster => cluster.slug === slug);
}

/**
 * Helper: Get all approved cluster slugs
 */
export function getApprovedFontaneroClusterSlugs(): string[] {
  return FONTANERO_CLUSTERS
    .filter(cluster => cluster.status === 'approved')
    .map(cluster => cluster.slug);
}

/**
 * Helper: Get all primary keywords (for cannibalization checks)
 */
export function getFontaneroClusterPrimaryKeywords(): string[] {
  return FONTANERO_CLUSTERS.map(cluster => cluster.primaryKeyword);
}

/**
 * Helper: Validate cluster exists in semantic map
 * For future automation scripts
 */
export function validateClusterAlignment(approvedSemanticSlugs: string[]): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  FONTANERO_CLUSTERS.forEach(cluster => {
    if (cluster.status === 'approved' && !approvedSemanticSlugs.includes(cluster.slug)) {
      errors.push(`Cluster "${cluster.slug}" is approved but not in semantic map`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

