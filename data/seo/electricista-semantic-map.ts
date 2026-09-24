/**
 * Electricista Semantic Map - Keyword Demand & Semantic Ownership
 * 
 * PURPOSE:
 * This file defines semantic clusters, keyword demand, and semantic relationships
 * for the electricista service family. It documents WHAT users search for and
 * which semantic territories exist in the market.
 * 
 * CRITICAL: SEMANTIC MAP ≠ PAGE PERMISSIONS
 * - Clusters define semantic demand and keyword ownership
 * - They do NOT authorize routes, URLs, or page creation
 * - Page permissions are controlled ONLY by data/seo/page-registry.ts
 * 
 * BUSINESS LOGIC:
 * - Documents existing page optimization targets
 * - Tracks primary keywords to prevent cannibalization
 * - Identifies future semantic expansion candidates
 * - Provides semantic boundaries between related services
 * - Rejects non-service semantic clusters
 * 
 * CONSUMPTION:
 * This map is used by scripts to:
 * - Validate keyword conflicts across semantic territories
 * - Optimize content for existing pages
 * - Identify market demand for future consideration
 * - Generate validation rules for content governance
 * 
 * DO NOT:
 * - Use this file to authorize page creation (use page-registry.ts)
 * - Add SEO templates here (use electricista-seo-map.ts)
 * - Add content strings (this is architecture only)
 * - Modify without governance review
 */

import { SemanticMap } from './types';

export const ELECTRICISTA_SEMANTIC_MAP: SemanticMap = {
  // Service identifier (matches service slug in data/services.ts)
  serviceId: 'electricista',
  
  // Hub page slug
  hubSlug: 'electricista',
  
  // Primary keyword for hub page
  hubKeyword: 'electricista',
  
  // EXISTING PAGE TARGETS
  // These clusters correspond to pages that already exist in production.
  // Modification requires checking page-registry.ts for permissions.
  existingPageTargets: [
    {
      slug: 'urgencias-electricas',
      primaryKeyword: 'electricista urgente',
      status: 'approved',
      relatedKeywords: [
        'urgencias electricas',
        'electricista 24 horas',
        'electricista emergencias'
      ],
      semanticNotes: 'Owns all emergency/urgent electrical services. Clear separation from averias-electricas which focuses on diagnosis and repair.',
      pageStatus: 'existing' as const
    },
    {
      slug: 'instalaciones-electricas',
      primaryKeyword: 'instalacion electrica',
      status: 'approved',
      relatedKeywords: [
        'instalaciones electricas',
        'instalacion electrica nueva',
        'instalador electrico'
      ],
      semanticNotes: 'Covers new electrical installations and complete system setups. Does not overlap with repairs (averias) or specific components (cuadros, enchufes).',
      pageStatus: 'existing' as const
    },
    {
      slug: 'cuadros-electricos',
      primaryKeyword: 'cuadro electrico',
      status: 'approved',
      relatedKeywords: [
        'cuadros electricos',
        'cambio cuadro electrico',
        'reparacion cuadro electrico'
      ],
      semanticNotes: 'Specific to electrical panels/distribution boards. Distinct from general installations and repairs.',
      pageStatus: 'existing' as const
    },
    {
      slug: 'iluminacion-led',
      primaryKeyword: 'iluminacion led valencia',
      status: 'approved',
      relatedKeywords: [
        'instalar iluminacion led en valencia',
        'instalacion iluminacion led',
        'iluminacion led interior'
      ],
      semanticNotes: 'Focused on modern LED lighting systems. Distinct from general electrical work and traditional lighting.',
      pageStatus: 'existing' as const
    },
    {
      slug: 'enchufes-interruptores',
      primaryKeyword: 'enchufe valencia',
      status: 'approved',
      relatedKeywords: [
        'instalar interruptor enchufe',
        'instalar interruptor superficie',
        'reparar cable enchufe'
      ],
      semanticNotes: 'Specific to outlets and switches. Component-level work, distinct from full installations.',
      pageStatus: 'existing' as const
    },
    {
      slug: 'averias-electricas',
      primaryKeyword: 'averia electrica',
      status: 'approved',
      relatedKeywords: [
        'averias electricas',
        'reparacion electrica',
        'fallo electrico'
      ],
      semanticNotes: 'General electrical failures and repairs. Distinct from urgencias (time-sensitive) though some semantic overlap exists at user intent level.',
      pageStatus: 'existing' as const
    },
    {
      slug: 'pequenos-trabajos-electricos',
      primaryKeyword: 'pequenos trabajos electricos',
      status: 'approved',
      relatedKeywords: [
        'cambiar lampara',
        'instalar lampara',
        'cambiar bombilla',
        'reparacion timbre',
        'pequenos arreglos electricos'
      ],
      semanticNotes: 'Owns small low-complexity electrician tasks that are too narrow for full installations and not specifically outlet/switch or LED projects. Excludes vehicle bulbs, appliance repair and DIY-only intent.',
      pageStatus: 'existing' as const
    },
    {
      slug: 'cargador-coche-electrico',
      primaryKeyword: 'cargador coche electrico',
      status: 'approved',
      relatedKeywords: [
        'instalacion punto recarga',
        'instalacion wallbox',
        'punto de recarga coche electrico',
        'cargador vehiculo electrico'
      ],
      semanticNotes: 'Owns EV charger and wallbox installation service intent for homes, garages and communities. Excludes product-only searches, car repair and generic EV news intent.',
      pageStatus: 'existing' as const
    },
    {
      slug: 'domotica',
      primaryKeyword: 'domotica valencia',
      status: 'approved',
      relatedKeywords: [
        'domotica en valencia',
        'instaladores de domotica en valencia',
        'domotica vivienda',
        'convertir casa en domotica',
        'persianas domotica'
      ],
      semanticNotes: 'Owns local smart-home installation and repair service intent for homes and small premises. Excludes courses, platforms, brands, product searches, translations and broad informational smart-home topics.',
      pageStatus: 'existing' as const
    },
    {
      slug: 'mantenimiento-electrico',
      primaryKeyword: 'mantenimiento electrico',
      status: 'approved',
      relatedKeywords: [
        'contratos de mantenimiento electrico',
        'mantenimiento electrico comunidades',
        'mantenimiento electrico de edificios',
        'mantenimiento sistema electrico',
        'empresas mantenimiento electrico'
      ],
      semanticNotes: 'Owns recurring electrical maintenance service intent for homes, premises, buildings and communities. Excludes certificates/boletines, panel-specific maintenance and non-core equipment maintenance.',
      pageStatus: 'existing' as const
    },
    {
      slug: 'revision-electrica',
      primaryKeyword: 'revision electrica',
      status: 'approved',
      relatedKeywords: [
        'revision instalacion electrica',
        'revision periodica electrica',
        'revision electrica domiciliaria',
        'revision electrica empresa',
        'revision electrica edificios'
      ],
      semanticNotes: 'Owns practical electrical inspection/revision service intent for homes, premises, buildings, parking areas and communities. Excludes OCA, mandatory compliance, boletines, certificates, utility-company navigation and vehicle/appliance revision.',
      pageStatus: 'existing' as const
    }
  ],
  
  // FUTURE SEMANTIC CANDIDATES
  // These clusters represent market demand but do NOT have pages.
  // They are candidates for future expansion after architecture review.
  // Creating pages requires explicit approval and page-registry.ts update.
  futureCategoryCandidates: [
    {
      slug: 'boletin-electrico',
      keyword: 'boletin electrico',
      status: 'candidate' as const,
      relatedKeywords: [
        'certificado electrico',
        'boletin instalacion electrica',
        'certificado instalacion electrica'
      ],
      notes: 'High search volume cluster. Legal/regulatory content required. May belong to separate Certificados architecture, not electricista child service.',
      commercialViability: 'high',
      marketDemand: 'high'
    },
    {
      slug: 'legalizacion-electrica',
      keyword: 'legalizacion electrica',
      status: 'candidate' as const,
      relatedKeywords: [
        'legalizacion instalacion electrica',
        'legalizar instalacion electrica'
      ],
      notes: 'Related to boletines/certificados. Requires compliance expertise.',
      commercialViability: 'medium',
      marketDemand: 'medium'
    },
  ],
  
  // REJECTED CLUSTERS
  // These clusters exist in keyword research but are NOT service-oriented.
  // They represent informational demand, products, or non-service intents.
  // No pages will be created for these clusters.
  rejectedClusters: [
    {
      keyword: 'herramientas electricista',
      reason: 'Product search - user looking to buy tools, not hire electrician',
      notes: 'E-commerce intent, not service intent'
    },
    {
      keyword: 'guantes electricista',
      reason: 'Product search - safety equipment purchase',
      notes: 'E-commerce intent, not service intent'
    },
    {
      keyword: 'tijeras electricista',
      reason: 'Product search - tool purchase',
      notes: 'E-commerce intent, not service intent'
    },
    {
      keyword: 'botas electricista',
      reason: 'Product search - safety equipment purchase',
      notes: 'E-commerce intent, not service intent'
    },
    {
      keyword: 'trabajo electricista',
      reason: 'Job search - user looking for employment, not hiring',
      notes: 'Employment intent, not customer intent'
    },
    {
      keyword: 'sueldo electricista',
      reason: 'Informational query - salary research',
      notes: 'No commercial intent'
    },
    {
      keyword: 'curso electricista',
      reason: 'Educational query - training information',
      notes: 'User wants to become electrician, not hire one'
    },
    {
      keyword: 'fp electricista',
      reason: 'Educational query - vocational training search',
      notes: 'No commercial intent'
    },
    {
      keyword: 'carnet electricista',
      reason: 'Certification query - licensing information',
      notes: 'User seeking professional qualification, not service'
    },
    {
      keyword: 'material electrico',
      reason: 'Product/supplier search - not service',
      notes: 'B2B or DIY intent, not professional service hire'
    },
    {
      keyword: 'tienda material electrico',
      reason: 'Retail location search - not service',
      notes: 'Looking for store, not electrician'
    }
  ],
  
  // Last updated timestamp
  lastUpdated: '2026-06-14',
  
  // Semantic strategy notes
  semanticNotes: `
    Electricista semantic strategy:
    - Hub page targets generic "electricista" searches
    - Each existing page owns a distinct semantic territory
    - Minimal keyword overlap between existing page targets
    - Emergency vs. repair semantic boundary intentionally soft (matches user behavior)
    - Future expansion candidates exist in certification/compliance territory
    - Many clusters rejected due to non-service intent (products, jobs, education)
  `
};

/**
 * Get all semantic keywords for conflict validation
 * Returns keywords from hub and existing page targets
 */
export function getElectricistaKeywords(): string[] {
  return [
    ELECTRICISTA_SEMANTIC_MAP.hubKeyword,
    ...ELECTRICISTA_SEMANTIC_MAP.existingPageTargets.map(target => target.primaryKeyword),
    ...ELECTRICISTA_SEMANTIC_MAP.futureCategoryCandidates.map(candidate => candidate.keyword)
  ];
}

/**
 * Get existing page target slugs
 * Used for content optimization of existing pages ONLY.
 * Does NOT authorize page creation or routing.
 */
export function getElectricistaExistingPageTargets(): string[] {
  return ELECTRICISTA_SEMANTIC_MAP.existingPageTargets.map(target => target.slug);
}

/**
 * Get future category candidate slugs
 * These are semantic territories for future consideration ONLY.
 * They do NOT authorize page creation.
 */
export function getElectricistaFutureCategoryCandidates(): string[] {
  return ELECTRICISTA_SEMANTIC_MAP.futureCategoryCandidates.map(candidate => candidate.slug);
}

/**
 * Get rejected cluster keywords
 * These clusters will NEVER have pages created.
 */
export function getElectricistaRejectedClusters(): string[] {
  return ELECTRICISTA_SEMANTIC_MAP.rejectedClusters.map(cluster => cluster.keyword);
}

/**
 * @deprecated Use getElectricistaExistingPageTargets() instead
 * This function name implied routing authorization, which is incorrect.
 * Semantic map does not control routing - page-registry.ts does.
 */
export function getApprovedElectricistaChildren(): string[] {
  console.warn('getApprovedElectricistaChildren() is deprecated. Use getElectricistaExistingPageTargets() instead.');
  return getElectricistaExistingPageTargets();
}
