/**
 * Page Registry - Page Creation Permission Control
 * 
 * PURPOSE:
 * This registry defines which pages are ALLOWED to exist in production.
 * It separates semantic demand (clusters) from page permissions.
 * 
 * CRITICAL RULE:
 * Keyword clusters define semantic demand.
 * Page registry defines whether a page is allowed to exist.
 * 
 * A cluster can exist without a page.
 * A page cannot exist without a cluster.
 * 
 * USAGE:
 * - AI SEO Factory checks this before generating pages
 * - Validation scripts check this to prevent unauthorized page creation
 * - Import scripts respect this when mapping clusters to pages
 * 
 * GOVERNANCE:
 * - Only modify this file with explicit approval
 * - Page count changes require architecture review
 * - Pilot mode restrictions must be respected
 */

import { SemanticStatus } from './types';

/**
 * Page permission mode
 */
export type PagePermissionMode = 
  | 'allowNew'      // Allow new pages to be created
  | 'existingOnly'  // Only existing pages allowed, no new pages
  | 'pilotMode'     // Special pilot mode with restrictions
  | 'frozen';       // No changes allowed

/**
 * Page permission entry
 */
export interface PagePermission {
  /** Page slug or pattern */
  slug: string;
  
  /** Whether this page is allowed to exist */
  allowed: boolean;
  
  /** Semantic status (for tracking) */
  status: SemanticStatus;
  
  /** Optional: Notes about why this page is allowed/blocked */
  notes?: string;
}

/**
 * Service-level page registry
 */
export interface ServicePageRegistry {
  /** Service identifier */
  serviceId: string;
  
  /** Permission mode for this service */
  mode: PagePermissionMode;
  
  /** Hub page permission (generally always true) */
  hubAllowed: boolean;
  
  /** Child service page permissions */
  children: PagePermission[];
  
  /** Last updated timestamp */
  lastUpdated: string;
  
  /** Optional: Registry notes */
  notes?: string;
}

/**
 * ELECTRICISTA PAGE REGISTRY
 * 
 * STATUS: PILOT MODE
 * Current state: 11 approved child pages exist
 * New pages require explicit semantic approval before being allowed
 */
export const ELECTRICISTA_PAGE_REGISTRY: ServicePageRegistry = {
  serviceId: 'electricista',
  mode: 'pilotMode',
  hubAllowed: true,
  children: [
    {
      slug: 'urgencias-electricas',
      allowed: true,
      status: 'approved',
      notes: 'Existing page - fully implemented'
    },
    {
      slug: 'instalaciones-electricas',
      allowed: true,
      status: 'approved',
      notes: 'Existing page - fully implemented'
    },
    {
      slug: 'cuadros-electricos',
      allowed: true,
      status: 'approved',
      notes: 'Existing page - fully implemented'
    },
    {
      slug: 'iluminacion-led',
      allowed: true,
      status: 'approved',
      notes: 'Existing page - fully implemented'
    },
    {
      slug: 'enchufes-interruptores',
      allowed: true,
      status: 'approved',
      notes: 'Existing page - fully implemented'
    },
    {
      slug: 'averias-electricas',
      allowed: true,
      status: 'approved',
      notes: 'Existing page - fully implemented'
    },
    {
      slug: 'pequenos-trabajos-electricos',
      allowed: true,
      status: 'approved',
      notes: 'Approved from collected Ahrefs semantic review - small electrical jobs'
    },
    {
      slug: 'cargador-coche-electrico',
      allowed: true,
      status: 'approved',
      notes: 'Approved from collected Ahrefs semantic review - EV charger installation'
    },
    {
      slug: 'domotica',
      allowed: true,
      status: 'approved',
      notes: 'Approved from cleaned Ahrefs semantic review - smart home service intent'
    },
    {
      slug: 'mantenimiento-electrico',
      allowed: true,
      status: 'approved',
      notes: 'Approved from cleaned Ahrefs semantic review - electrical maintenance service intent'
    },
    {
      slug: 'revision-electrica',
      allowed: true,
      status: 'approved',
      notes: 'Approved from cleaned Ahrefs semantic review - electrical inspection service intent'
    },
    {
      slug: 'boletin-electrico',
      allowed: false,
      status: 'future',
      notes: 'BLOCKED - Belongs to future Certificados/Boletines architecture, not Electricista child'
    }
  ],
  lastUpdated: '2026-06-14',
  notes: 'PILOT MODE: 11 approved child pages. New pages require semantic-map, approved cluster, seo-map and production content alignment. Boletines blocked - separate architecture planned.'
};

/**
 * FONTANERO PAGE REGISTRY
 * 
 * STATUS: PILOT MODE
 * Current state: 6 approved child pages exist
 * No new pages allowed during pilot
 */
export const FONTANERO_PAGE_REGISTRY: ServicePageRegistry = {
  serviceId: 'fontanero',
  mode: 'existingOnly',
  hubAllowed: true,
  children: [
    {
      slug: 'reparacion-fugas',
      allowed: true,
      status: 'approved',
      notes: 'Existing page - fully implemented'
    },
    {
      slug: 'desatascos',
      allowed: true,
      status: 'approved',
      notes: 'Existing page - fully implemented'
    },
    {
      slug: 'instalaciones',
      allowed: true,
      status: 'approved',
      notes: 'Existing page - fully implemented'
    },
    {
      slug: 'sustitucion-tuberias',
      allowed: true,
      status: 'approved',
      notes: 'Existing page - fully implemented'
    },
    {
      slug: 'calentadores-termos',
      allowed: true,
      status: 'approved',
      notes: 'Existing page - fully implemented'
    },
    {
      slug: 'mantenimiento',
      allowed: true,
      status: 'approved',
      notes: 'Existing page - fully implemented'
    },
    {
      slug: 'cambio-banera-por-ducha',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO wave 2 - bathtub-to-shower conversion'
    },
    {
      slug: 'reparacion-cisternas',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO cisternas-inodoros draft - leaking cistern repair'
    },
    {
      slug: 'cambio-reparacion-grifos',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO grifos draft - faucet replacement and repair'
    },
    {
      slug: 'grupos-presion-agua',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO bombas-grupos-presion draft - pressure groups and water pumps'
    },
    {
      slug: 'descalcificadores-osmosis',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO descalcificadores-osmosis draft - water treatment equipment maintenance and repair'
    },
    {
      slug: 'instalacion-cambio-inodoros',
      allowed: true,
      status: 'approved',
      notes: 'Approved from remaining DataForSEO cisternas-inodoros draft - toilet and sanitary installation/replacement'
    },
    {
      slug: 'instalacion-lavabos',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO duchas-lavabos draft - lavabo, drain, siphon and valve installation/repair'
    },
    {
      slug: 'mamparas-ducha',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO duchas-lavabos draft - shower screen installation, replacement and repair'
    },
    {
      slug: 'bajantes',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO bajantes demand - downpipe repair/replacement, no-obras and comunidad intent'
    },
    {
      slug: 'reparacion-duchas',
      allowed: true,
      status: 'approved',
      notes: 'Approved from remaining DataForSEO duchas-lavabos draft - shower column, flexo, drain and leak repair/replacement'
    }
  ],
  lastUpdated: '2026-06-15',
  notes: 'PILOT MODE: 16 approved child pages. Newest promotions: instalacion-lavabos, mamparas-ducha, bajantes and reparacion-duchas. Shower tray and bathtub conversion demand remains under cambio-banera-por-ducha.'
};

/**
 * DESATASCOS PAGE REGISTRY
 *
 * STATUS: PILOT MODE
 * Pages approved from DataForSEO commercial semantic review on 2026-06-15.
 */
export const DESATASCOS_PAGE_REGISTRY: ServicePageRegistry = {
  serviceId: 'desatascos',
  mode: 'pilotMode',
  hubAllowed: true,
  children: [
    {
      slug: 'desatasco-tuberias',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO desatascos review - desatascar tuberias and blocked pipe demand'
    },
    {
      slug: 'desatascar-fregadero',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO desatascos review - sink blockage demand'
    },
    {
      slug: 'desatascar-wc',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO desatascos review - WC and inodoro blockage demand'
    },
    {
      slug: 'desatascar-lavabo-ducha',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO desatascos review - lavabo and shower drain blockage demand'
    },
    {
      slug: 'camion-cuba',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO desatascos review - camion cuba, alta presion, arquetas and colectores'
    },
    {
      slug: 'limpieza-fosas-septicas',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO desatascos review - fosa septica cleaning and emptying demand'
    }
  ],
  lastUpdated: '2026-06-15',
  notes: 'PILOT MODE: 6 approved child pages. Inspection with camera remains a support section until stronger direct commercial demand is confirmed.'
};

/**
 * AIRE ACONDICIONADO PAGE REGISTRY
 *
 * STATUS: PILOT MODE
 * Pages approved from DataForSEO commercial semantic review on 2026-06-15.
 */
export const AIRE_ACONDICIONADO_PAGE_REGISTRY: ServicePageRegistry = {
  serviceId: 'aire-acondicionado',
  mode: 'pilotMode',
  hubAllowed: true,
  children: [
    {
      slug: 'instalacion-aire-acondicionado',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO climate review - installation and montaje demand'
    },
    {
      slug: 'reparacion-aire-acondicionado',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO climate review - repair, service tecnico and no enfria demand'
    },
    {
      slug: 'mantenimiento-aire-acondicionado',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO climate review - maintenance, limpieza and revision demand'
    },
    {
      slug: 'carga-gas-aire-acondicionado',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO climate review - gas recharge and refrigerant support demand'
    },
    {
      slug: 'aire-acondicionado-conductos',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO climate review - conductos installation and repair demand'
    },
    {
      slug: 'instalacion-split',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO climate review - split and multisplit installation demand'
    },
    {
      slug: 'bomba-calor',
      allowed: true,
      status: 'approved',
      notes: 'Approved from expanded DataForSEO climate review - bomba de calor and frio/calor demand'
    },
    {
      slug: 'aire-acondicionado-cassette-techo',
      allowed: true,
      status: 'approved',
      notes: 'Approved from expanded DataForSEO climate review - cassette, techo and suelo-techo demand'
    },
    {
      slug: 'preinstalacion-aire-acondicionado',
      allowed: true,
      status: 'approved',
      notes: 'Approved from expanded DataForSEO climate review - preinstallation and conductos preparation demand'
    },
    {
      slug: 'limpieza-conductos-aire-acondicionado',
      allowed: true,
      status: 'approved',
      notes: 'Approved from expanded DataForSEO climate review - duct cleaning and odor/caudal demand'
    },
    {
      slug: 'empresa-climatizacion',
      allowed: true,
      status: 'approved',
      notes: 'Approved from expanded DataForSEO climate review - B2B company/local/office/community demand'
    }
  ],
  lastUpdated: '2026-06-15',
  notes: 'PILOT MODE: 11 approved child pages after expanded DataForSEO review. Product, marketplace, brand and how-to demand is reserved for blog or rejected from commercial pages.'
};

/**
 * CALEFACCION PAGE REGISTRY
 *
 * STATUS: PILOT MODE
 * Pages approved from DataForSEO commercial semantic review on 2026-06-16.
 */
export const CALEFACCION_PAGE_REGISTRY: ServicePageRegistry = {
  serviceId: 'calefaccion',
  mode: 'pilotMode',
  hubAllowed: true,
  children: [
    {
      slug: 'reparacion-calderas',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO calefaccion review - boiler repair and service tecnico demand'
    },
    {
      slug: 'mantenimiento-calderas',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO calefaccion review - maintenance, revision and puesta a punto demand'
    },
    {
      slug: 'radiadores-calefaccion',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO calefaccion review - radiators, purgado, valves and water radiator demand'
    },
    {
      slug: 'instalacion-calefaccion',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO calefaccion review - heating installation, caldera and radiators demand'
    },
    {
      slug: 'suelo-radiante',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO calefaccion review - underfloor heating commercial demand'
    },
    {
      slug: 'calefaccion-central-comunidades',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO calefaccion review - central/community heating demand'
    },
    {
      slug: 'termostatos-valvulas',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO calefaccion review - thermostat and thermostatic valve service demand'
    },
    {
      slug: 'aerotermia-calefaccion',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO calefaccion review - aerothermal heating demand, separated from air conditioning'
    }
  ],
  lastUpdated: '2026-06-16',
  notes: 'PILOT MODE: 8 approved child pages after DataForSEO review. Product, marketplace, brand and how-to demand is reserved for blog or rejected from commercial pages.'
};

/**
 * LIMPIEZA TUBERIAS PAGE REGISTRY
 *
 * STATUS: PILOT MODE
 * Pages approved from DataForSEO commercial semantic review on 2026-06-16.
 */
export const LIMPIEZA_TUBERIAS_PAGE_REGISTRY: ServicePageRegistry = {
  serviceId: 'limpieza-tuberias',
  mode: 'pilotMode',
  hubAllowed: true,
  children: [
    {
      slug: 'inspeccion-camara-tuberias',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO review - camera/video inspection demand'
    },
    {
      slug: 'limpieza-arquetas-colectores',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO review - arquetas, colectores and private sewer network demand'
    },
    {
      slug: 'limpieza-bajantes',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO review - bajantes/community vertical pipe cleaning'
    },
    {
      slug: 'limpieza-tuberias-comunidades',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO review - communities and administrators preventive maintenance'
    },
    {
      slug: 'limpieza-tuberias-empresas',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO review - restaurants, hotels, companies and grease separators'
    },
    {
      slug: 'limpieza-alta-presion-camion-cuba',
      allowed: true,
      status: 'approved',
      notes: 'Approved from DataForSEO review - high pressure, hidrocurado and camion cuba method demand'
    }
  ],
  lastUpdated: '2026-06-16',
  notes: 'PILOT MODE: 6 approved child pages. DIY/product/how-to demand reserved for blog; domestic WC/fregadero ownership remains in desatascos/fontanero.'
};

/**
 * Master page registry
 */
export const PAGE_REGISTRY: Record<string, ServicePageRegistry> = {
  electricista: ELECTRICISTA_PAGE_REGISTRY,
  fontanero: FONTANERO_PAGE_REGISTRY,
  desatascos: DESATASCOS_PAGE_REGISTRY,
  'aire-acondicionado': AIRE_ACONDICIONADO_PAGE_REGISTRY,
  calefaccion: CALEFACCION_PAGE_REGISTRY,
  'limpieza-tuberias': LIMPIEZA_TUBERIAS_PAGE_REGISTRY,
};

/**
 * Check if a page is allowed to exist
 * 
 * @param serviceId - Service identifier (e.g., 'electricista')
 * @param childSlug - Child service slug (e.g., 'urgencias-electricas')
 * @returns true if page is allowed, false otherwise
 */
export function isPageAllowed(serviceId: string, childSlug: string): boolean {
  const registry = PAGE_REGISTRY[serviceId];
  if (!registry) return false;
  
  const permission = registry.children.find(p => p.slug === childSlug);
  return permission?.allowed || false;
}

/**
 * Check if new pages can be created for a service
 * 
 * @param serviceId - Service identifier
 * @returns true if new pages can be created, false otherwise
 */
export function canCreateNewPages(serviceId: string): boolean {
  const registry = PAGE_REGISTRY[serviceId];
  if (!registry) return false;
  
  return registry.mode === 'allowNew';
}

/**
 * Get all allowed page slugs for a service
 * 
 * @param serviceId - Service identifier
 * @returns Array of allowed page slugs
 */
export function getAllowedPageSlugs(serviceId: string): string[] {
  const registry = PAGE_REGISTRY[serviceId];
  if (!registry) return [];
  
  return registry.children
    .filter(p => p.allowed)
    .map(p => p.slug);
}

/**
 * Get permission details for a page
 * 
 * @param serviceId - Service identifier
 * @param childSlug - Child service slug
 * @returns Permission entry or undefined
 */
export function getPagePermission(
  serviceId: string,
  childSlug: string
): PagePermission | undefined {
  const registry = PAGE_REGISTRY[serviceId];
  if (!registry) return undefined;
  
  return registry.children.find(p => p.slug === childSlug);
}

/**
 * Validate that a cluster can be mapped to a page
 * 
 * This is used by import scripts to determine if a cluster
 * represents an existing page, a future category, or is blocked.
 * 
 * @param serviceId - Service identifier
 * @param clusterSlug - Cluster slug from KeywordInsights
 * @returns Classification: 'existing', 'future', or 'blocked'
 */
export function classifyClusterPageMapping(
  serviceId: string,
  clusterSlug: string
): 'existing' | 'future' | 'blocked' {
  const registry = PAGE_REGISTRY[serviceId];
  if (!registry) return 'blocked';
  
  const permission = registry.children.find(p => p.slug === clusterSlug);
  
  if (!permission) return 'blocked';
  
  if (permission.allowed && permission.status === 'approved') {
    return 'existing';
  }
  
  if (permission.status === 'future' || permission.status === 'candidate') {
    return 'future';
  }
  
  return 'blocked';
}
