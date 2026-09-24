/**
 * Fontanero Semantic Map - SOURCE OF TRUTH for Page Architecture
 * 
 * PURPOSE:
 * This file defines WHAT exists in the fontanero service family.
 * It is the single source of truth for semantic relationships and approval status.
 * 
 * BUSINESS LOGIC:
 * - Defines which child services are approved for production
 * - Tracks primary keywords to prevent cannibalization
 * - Documents future expansion plans without committing to implementation
 * - Provides semantic boundaries between related services
 * 
 * FUTURE AUTOMATION:
 * This map will be consumed by scripts to:
 * - Auto-generate pages for approved children
 * - Validate no keyword conflicts exist before deployment
 * - Generate dynamic routes based on semantic structure
 * - Create validation rules for content governance
 * 
 * DO NOT:
 * - Add SEO templates here (use fontanero-seo-map.ts)
 * - Add content strings (this is architecture only)
 * - Modify without governance review
 */

import { SemanticMap } from './types';

export const FONTANERO_SEMANTIC_MAP: SemanticMap = {
  // Service identifier (matches service slug in data/services.ts)
  serviceId: 'fontanero',
  
  // Hub page slug
  hubSlug: 'fontanero',
  
  // Primary keyword for hub page
  hubKeyword: 'fontanero',
  
  // Existing page targets (backward compatible with approvedChildren)
  existingPageTargets: [
    {
      slug: 'reparacion-fugas',
      primaryKeyword: 'reparación fugas agua',
      status: 'approved',
      relatedKeywords: [
        'fuga de agua',
        'detectar fuga de agua',
        'reparación fuga tubería',
        'fuga tubería enterrada',
        'detector de fugas'
      ],
      semanticNotes: 'Owns all water leak detection and repair services. Critical emergency service with high commercial intent.',
      pageStatus: 'existing' as const
    },
    {
      slug: 'desatascos',
      primaryKeyword: 'desatascos',
      status: 'approved',
      relatedKeywords: [
        'desatascos urgentes',
        'desatascos 24 horas',
        'desatascar tubería',
        'desatascar fregadero',
        'empresa desatascos'
      ],
      semanticNotes: 'Covers all drain unblocking and pipe clearing services. Distinct from leak repairs and general plumbing installations.',
      pageStatus: 'existing' as const
    },
    {
      slug: 'instalaciones',
      primaryKeyword: 'instalación fontanería',
      status: 'approved',
      relatedKeywords: [
        'instalar grifo',
        'instalación baño',
        'instalación sanitarios',
        'instalación tuberías',
        'fontanero instalador'
      ],
      semanticNotes: 'Covers new plumbing installations and complete system setups. Does not overlap with repairs or specific component replacements.',
      pageStatus: 'existing' as const
    },
    {
      slug: 'sustitucion-tuberias',
      primaryKeyword: 'sustitución tuberías',
      status: 'approved',
      relatedKeywords: [
        'cambio tuberías',
        'renovar tuberías',
        'tuberías antiguas',
        'cambiar tuberías vivienda',
        'sustitución bajantes'
      ],
      semanticNotes: 'Specific to pipe replacement and renovation. Distinct from new installations and leak repairs though some semantic overlap exists.',
      pageStatus: 'existing' as const
    },
    {
      slug: 'bajantes',
      primaryKeyword: 'reparación de bajantes sin obras',
      status: 'approved',
      relatedKeywords: [
        'reparar bajantes sin obras',
        'reparación de bajantes',
        'reparar bajante pvc',
        'cambiar bajante comunidad',
        'cambiar bajantes comunidad precio',
        'sustitución bajantes valencia'
      ],
      semanticNotes: 'Owns downpipe/bajante repair and replacement demand, especially comunidad and no-obras intent. Generic leak detection stays under reparación-fugas; broad pipe renovation stays under sustitución-tuberías.',
      pageStatus: 'existing' as const
    },
    {
      slug: 'calentadores-termos',
      primaryKeyword: 'termo eléctrico',
      status: 'approved',
      relatedKeywords: [
        'reparación termo eléctrico',
        'instalación termo eléctrico',
        'cambiar termo eléctrico',
        'calentador de agua',
        'termo agua eléctrico'
      ],
      semanticNotes: 'Focused on water heater services (electric and gas). Distinct from general plumbing installations and boiler services.',
      pageStatus: 'existing' as const
    },
    {
      slug: 'mantenimiento',
      primaryKeyword: 'mantenimiento fontanería',
      status: 'approved',
      relatedKeywords: [
        'revisión fontanería',
        'mantenimiento tuberías',
        'prevencion fugas',
        'mantenimiento comunidad',
        'contrato mantenimiento fontanería'
      ],
      semanticNotes: 'Preventive maintenance and inspection services. Lower urgency than repairs but important for B2B and community management.',
      pageStatus: 'existing' as const
    },
    {
      slug: 'reparacion-cisternas',
      primaryKeyword: 'cisterna pierde agua',
      status: 'approved',
      relatedKeywords: [
        'arreglar cisterna',
        'cisterna gotea',
        'reparar cisterna roca',
        'cambiar mecanismo cisterna',
        'cisterna no carga agua',
        'cisterna empotrada pierde agua'
      ],
      semanticNotes: 'Owns cistern/toilet-tank repair demand: leaking cisterns, stuck floats, flush valves and fill mechanisms. Installation or full toilet replacement remains under instalaciones or a future inodoro-specific child.',
      pageStatus: 'existing' as const
    },
    {
      slug: 'cambio-reparacion-grifos',
      primaryKeyword: 'cambiar grifo cocina',
      status: 'approved',
      relatedKeywords: [
        'grifo gotea',
        'cambiar grifo ducha',
        'cambiar grifo lavabo',
        'arreglar goteo grifo',
        'reparar grifo monomando',
        'precio cambiar grifo cocina'
      ],
      semanticNotes: 'Owns faucet/tap replacement and repair demand: kitchen, shower and basin taps, leaking monomando taps and cartridge/joint fixes. Broad bathroom or full plumbing installations remain under instalaciones.',
      pageStatus: 'existing' as const
    },
    {
      slug: 'grupos-presion-agua',
      primaryKeyword: 'grupo de presion de agua',
      status: 'approved',
      relatedKeywords: [
        'grupo de presi\u00f3n',
        'grupo presion agua',
        'grupo presion',
        'grupo presi\u00f3n agua dom\u00e9stico',
        'grupo de presi\u00f3n de agua para comunidades',
        'instalación bomba de agua',
        'bomba de agua para vivienda',
        'bomba de agua no arranca'
      ],
      semanticNotes: 'Owns water pressure groups and pump service demand for homes and communities: installation, repair, pressure diagnosis and pump/calderin/presostato work. Product-only purchase and industrial fire systems stay out of scope.',
      pageStatus: 'existing' as const
    },
    {
      slug: 'descalcificadores-osmosis',
      primaryKeyword: 'mantenimiento descalcificador',
      status: 'approved',
      relatedKeywords: [
        'mantenimiento de descalcificador',
        'mantenimiento osmosis',
        'mantenimiento osmosis inversa',
        'reparar descalcificador',
        'reparación descalcificadores',
        'reparar osmosis',
        'instalar osmosis valencia',
        'instalar descalcificador valencia'
      ],
      semanticNotes: 'Owns water treatment equipment service demand: maintenance, repair and installation of descalcificadores and osmosis systems. Product comparisons and shopping intent stay out of scope.',
      pageStatus: 'existing' as const
    },
    {
      slug: 'instalacion-cambio-inodoros',
      primaryKeyword: 'instalar inodoro',
      status: 'approved',
      relatedKeywords: [
        'cambiar inodoro',
        'instalación sanitario',
        'instalación de sanitario',
        'instalar sanitario',
        'cambiar vater',
        'instalar vater',
        'precio cambiar inodoro'
      ],
      semanticNotes: 'Owns toilet/sanitary installation and replacement demand. Leaking cistern mechanisms stay under reparación-cisternas; blocked WC demand stays under desatascos.',
      pageStatus: 'existing' as const
    },
    {
      slug: 'cambio-banera-por-ducha',
      primaryKeyword: 'cambiar ba\u00f1era por ducha',
      status: 'approved',
      relatedKeywords: [
        'cambiar ba\u00f1era por plato de ducha',
        'cambio de ba\u00f1era por ducha',
        'cambiar ba\u00f1era por ducha precio',
        'precio cambiar ba\u00f1era por ducha',
        'cambiar plato de ducha',
        'instalación de plato ducha',
        'instalar plato de ducha',
        'reparar plato ducha resina',
        'quitar ba\u00f1era y poner ducha'
      ],
      semanticNotes: 'Owns bathtub-to-shower conversion and shower tray replacement intent. Distinct from broad plumbing installations and minor fixture repairs.',
      pageStatus: 'existing' as const
    },
    {
      slug: 'instalacion-lavabos',
      primaryKeyword: 'cambiar lavabo',
      status: 'approved',
      relatedKeywords: [
        'cambiar desagüe lavabo',
        'cambiar sifon lavabo',
        'instalar lavabo',
        'montaje lavabo',
        'cambiar valvula lavabo',
        'arreglar lavabo que gotea'
      ],
      semanticNotes: 'Owns basin/lavabo service demand: replacement, installation, drain, siphon, click-clack valve and small leak fixes. Faucet-specific demand stays under cambio-reparación-grifos; full bathroom renovation stays under instalaciones.',
      pageStatus: 'existing' as const
    },
    {
      slug: 'mamparas-ducha',
      primaryKeyword: 'cambiar mampara ducha',
      status: 'approved',
      relatedKeywords: [
        'reparación de mamparas de ba\u00f1o',
        'reparación de mamparas de ducha',
        'reparar mampara ducha',
        'arreglar mampara ducha',
        'sustituir mampara de ducha',
        'poner una mampara de ducha'
      ],
      semanticNotes: 'Owns shower screen installation, replacement and repair. Bathtub-to-shower conversion and shower tray replacement remain under cambio-bañera-por-ducha to avoid cannibalization.',
      pageStatus: 'existing' as const
    },
    {
      slug: 'reparacion-duchas',
      primaryKeyword: 'cambiar ducha',
      status: 'approved',
      relatedKeywords: [
        'cambio de ducha',
        'reforma ducha',
        'cambiar columna de ducha',
        'cambiar desagüe ducha',
        'ducha gotea',
        'cambiar flexo ducha'
      ],
      semanticNotes: 'Owns shower repair/replacement demand for shower columns, hose/flexo, drains, leaks and minor shower service. Shower tray conversion stays under cambio-bañera-por-ducha, shower screens under mamparas-ducha, and shower taps under cambio-reparación-grifos.',
      pageStatus: 'existing' as const
    }
  ],
  
  // Future semantic candidates
  futureCategoryCandidates: [],
  
  // Rejected clusters
  rejectedClusters: [],
  
  // Backward compatibility
  approvedChildren: undefined as any,
  futureCategories: undefined as any,
  
  // Last updated timestamp
  lastUpdated: '2026-06-15',
  
  // Semantic notes about the entire service family
  semanticNotes: `
    Fontanero service family strategy:
    - Hub page targets generic "fontanero" searches
    - Each child owns a distinct semantic territory
    - Minimal keyword overlap between approved children
    - Emergency services (fugas, desatascos) have high commercial intent
    - Maintenance services target B2B and community contracts
    - cambio-bañera-por-ducha, reparación-cisternas, cambio-reparación-grifos, grupos-presion-agua, descalcificadores-osmosis, instalación-cambio-inodoros, instalación-lavabos, mamparas-ducha, bajantes and reparación-duchas were promoted from DataForSEO demand signals
    - Clear separation between installation, repair, and replacement services
  `
};

/**
 * Validation helper (for future automation)
 * Returns all primary keywords to check for conflicts
 */
export function getFontaneroKeywords(): string[] {
  return [
    FONTANERO_SEMANTIC_MAP.hubKeyword,
    ...FONTANERO_SEMANTIC_MAP.existingPageTargets.map(child => child.primaryKeyword)
  ];
}

/**
 * Get approved child slugs (for routing)
 */
export function getApprovedFontaneroChildren(): string[] {
  return FONTANERO_SEMANTIC_MAP.existingPageTargets
    .filter(child => child.status === 'approved')
    .map(child => child.slug);
}

