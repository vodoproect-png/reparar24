/**
 * Electricista Keyword Clusters
 * 
 * PURPOSE:
 * This file stores grouped keyword clusters for Electricista services.
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
 * - All clusters must align with electricista-semantic-map.ts
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
 * Electricista approved keyword clusters
 * Aligned with electricista-semantic-map.ts approved children
 */
export const ELECTRICISTA_CLUSTERS: KeywordCluster[] = [
  // CLUSTER 1: Urgencias Eléctricas
  {
    slug: 'urgencias-electricas',
    primaryKeyword: 'electricista urgente',
    secondaryKeywords: [
      'electricista 24 horas',
      'electricista de urgencias',
      'electricista emergencia',
      'electricista de emergencia',
      'electricista de guardia'
    ],
    commercialIntent: 'high',
    status: 'approved'
  },
  
  // CLUSTER 2: Instalaciones Eléctricas
  {
    slug: 'instalaciones-electricas',
    primaryKeyword: 'instalacion electrica',
    secondaryKeywords: [
      'instalacion electrica vivienda',
      'instalador electricista',
      'electricista instalador',
      'cableado electrico',
      'reforma electrica'
    ],
    commercialIntent: 'high',
    status: 'approved'
  },
  
  // CLUSTER 3: Cuadros Eléctricos
  {
    slug: 'cuadros-electricos',
    primaryKeyword: 'cuadro electrico',
    secondaryKeywords: [
      'cuadro electrico vivienda',
      'cambiar cuadro electrico',
      'reparacion cuadro electrico',
      'diferencial electrico',
      'magnetotermico'
    ],
    commercialIntent: 'high',
    status: 'approved'
  },
  
  // CLUSTER 4: Iluminación LED
  {
    slug: 'iluminacion-led',
    primaryKeyword: 'iluminacion led valencia',
    secondaryKeywords: [
      'instalar iluminacion led en valencia'
    ],
    longTailKeywords: [

    ],
    commercialIntent: 'medium',
    status: 'approved',
    notes: 'Promoted from Ahrefs semantic review. Product, brand, auto and unsafe DIY intents excluded by classifier/resolver.'
  },
  
  // CLUSTER 5: Enchufes e Interruptores
  {
    slug: 'enchufes-interruptores',
    primaryKeyword: 'enchufe valencia',
    secondaryKeywords: [
      'cambiar enchufe pladur',
      'instalar interruptor bombilla',
      'instalar interruptor enchufe',
      'instalar interruptor superficie',
      'instalar interruptor triple',
      'reparar cable enchufe',
      'reparar enchufe roto'
    ],
    longTailKeywords: [
      'instalar enchufe en garaje comunitario',
      'reparar enchufe de pared',
      'como arreglar un enchufe que no funciona',
      'como reparar un enchufe de pared',
      'cuanto cuesta cambiar enchufes e interruptores',
      'enchufe huele a quemado',
      'cambiar enchufe macho con toma de tierra',
      'cambiar enchufe simple a doble',
      'cambiar fusible por enchufe',
      'cambiar interruptor por sensor de movimiento',
      'cambiar interruptor ventilador techo',
      'cambiar pulsador por interruptor',
      'cambiar un enchufe con fusible',
      'cambiar un enchufe quemado',
      'cambiar un interruptor cruzado',
      'causas enchufe quemado',
      'como reparar enchufe de pared',
      'enchufe horno quemado',
      'enchufe quemado corto circuito',
      'enchufes e interruptores antiguos',
      'enchufes e interruptores estancos para exterior',
      'incendio enchufe quemado',
      'instalar enchufe de exterior',
      'instalar enchufe y conmutador',
      'instalar interruptor doble con enchufe',
      'instalar interruptor doble luz',
      'mi enchufe no funciona',
      'olor quemado enchufe',
      'porque mi enchufe no funciona',
      'porque no funciona el enchufe',
      'porque no me funciona un enchufe',
      'reparar caja de enchufe',
      'reparar enchufe que se sale de la pared',
      'reparar enchufe quemado'
    ],
    commercialIntent: 'medium',
    status: 'approved',
    notes: 'Promoted from Ahrefs semantic review. Product, brand, auto and unsafe DIY intents excluded by classifier/resolver.'
  },
  
  // CLUSTER 6: Averías Eléctricas
  {
    slug: 'averias-electricas',
    primaryKeyword: 'averia electrica',
    secondaryKeywords: [
      'reparacion averia electrica',
      'fallo electrico',
      'saltan los plomos',
      'no hay luz en casa',
      'problema electrico vivienda'
    ],
    commercialIntent: 'medium',
    status: 'approved',
    notes: 'Avoid informational/news intent around power cuts, Endesa outages or Red Electrica news.'
  },

  // CLUSTER 7: Pequenos Trabajos Electricos
  {
    slug: 'pequenos-trabajos-electricos',
    primaryKeyword: 'pequenos trabajos electricos',
    secondaryKeywords: [
      'cambiar lampara',
      'instalar lampara',
      'cambiar bombilla',
      'sustituir bombilla',
      'reparacion timbre',
      'pequenos arreglos electricos'
    ],
    longTailKeywords: [
      'cambiar lampara techo',
      'instalar lampara techo',
      'cambiar bombilla empotrada',
      'cambiar cable lampara',
      'cambiar casquillo lampara',
      'instalar punto de luz pequeno',
      'electricista para pequenas reparaciones'
    ],
    commercialIntent: 'medium',
    status: 'approved',
    notes: 'Promoted from Ahrefs semantic review for small home electrical jobs. Vehicle bulb, appliance, product and DIY-only intents excluded.'
  },

  // CLUSTER 8: Cargador Coche Electrico
  {
    slug: 'cargador-coche-electrico',
    primaryKeyword: 'cargador coche electrico',
    secondaryKeywords: [
      'instalacion punto recarga',
      'instalacion wallbox',
      'punto de recarga coche electrico',
      'cargador vehiculo electrico',
      'instalar cargador coche electrico'
    ],
    longTailKeywords: [
      'instalar wallbox en garaje',
      'punto de recarga coche electrico vivienda',
      'punto de recarga coche electrico garaje comunitario',
      'instalacion cargador coche electrico comunidad',
      'electricista cargador coche electrico'
    ],
    commercialIntent: 'high',
    status: 'approved',
    notes: 'Promoted from collected semantic review as a specialized installation service. Product-only, car repair and generic EV informational intents excluded.'
  },

  // CLUSTER 9: Domotica
  {
    slug: 'domotica',
    primaryKeyword: 'domotica valencia',
    secondaryKeywords: [
      'domotica en valencia',
      'instaladores de domotica en valencia',
      'reparacion domotica valencia',
      'domotica vivienda',
      'convertir casa en domotica'
    ],
    longTailKeywords: [
      'electricidad y domotica en valencia',
      'proyectos e instalaciones domotica y electronica',
      'domotica para hogares',
      'persianas domotica',
      'domotica para cortinas',
      'sensores domotica',
      'multimedia domotica',
      'domotica audio video area valencia',
      'bombillas domotica'
    ],
    commercialIntent: 'medium',
    status: 'approved',
    notes: 'Promoted after classifier cleanup. Course, brand, platform, product, translation, foreign-language and broad informational intents excluded.'
  },

  // CLUSTER 10: Mantenimiento Electrico
  {
    slug: 'mantenimiento-electrico',
    primaryKeyword: 'mantenimiento electrico',
    secondaryKeywords: [
      'contratos de mantenimiento electrico',
      'mantenimiento electrico comunidades',
      'mantenimiento electrico de edificios',
      'mantenimiento sistema electrico',
      'empresas mantenimiento electrico'
    ],
    longTailKeywords: [
      'mantenimiento electrico comunidades de vecinos',
      'precio contrato mantenimiento electrico',
      'mantenimiento electrico hoteles',
      'mantenimiento electrico predictivo',
      'gestion de mantenimiento electrico'
    ],
    commercialIntent: 'medium',
    status: 'approved',
    notes: 'Promoted after classifier cleanup. Certificate/boletin intent, panel-specific intent, out-of-market geos, documents, jobs, training and equipment maintenance excluded.'
  },

  // CLUSTER 11: Revision Electrica
  {
    slug: 'revision-electrica',
    primaryKeyword: 'revision electrica',
    secondaryKeywords: [
      'revision instalacion electrica',
      'revision periodica electrica',
      'revision electrica domiciliaria',
      'revision electrica empresa',
      'revision electrica edificios'
    ],
    longTailKeywords: [
      'revision periodica instalacion electrica',
      'revision instalacion electrica vivienda',
      'revision instalacion electrica comunidades',
      'revision instalacion electrica local',
      'precio revision instalacion electrica',
      'presupuesto revision instalacion electrica',
      'revision instalacion electrica parking',
      'revision instalacion electrica baja tension'
    ],
    commercialIntent: 'medium',
    status: 'approved',
    notes: 'Promoted after classifier cleanup. OCA, mandatory inspection, boletin/certificate, Endesa/EDP, out-of-market, vehicle, appliance and product/component intents excluded.'
  }
];

/**
 * Future category clusters
 * Not yet approved for production but tracked for planning
 */
export const ELECTRICISTA_FUTURE_CLUSTERS: KeywordCluster[] = [
  // FUTURE: Boletines/Certificados
  {
    slug: 'boletin-electrico',
    primaryKeyword: 'boletin electrico',
    secondaryKeywords: [
      'certificado electrico',
      'certificado instalacion electrica',
      'legalizacion electrica',
      'cie electrico'
    ],
    commercialIntent: 'high',
    status: 'future',
    notes: 'Do not include this inside Electricista child services. It belongs to future Certificados/Boletines architecture.'
  }
];

/**
 * Helper: Get cluster by slug
 * Returns undefined if cluster not found
 */
export function getElectricistaCluster(slug: string): KeywordCluster | undefined {
  return ELECTRICISTA_CLUSTERS.find(cluster => cluster.slug === slug);
}

/**
 * Helper: Get all approved cluster slugs
 */
export function getApprovedElectricistaClusterSlugs(): string[] {
  return ELECTRICISTA_CLUSTERS
    .filter(cluster => cluster.status === 'approved')
    .map(cluster => cluster.slug);
}

/**
 * Helper: Get all primary keywords (for cannibalization checks)
 */
export function getElectricistaClusterPrimaryKeywords(): string[] {
  return ELECTRICISTA_CLUSTERS.map(cluster => cluster.primaryKeyword);
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
  
  ELECTRICISTA_CLUSTERS.forEach(cluster => {
    if (cluster.status === 'approved' && !approvedSemanticSlugs.includes(cluster.slug)) {
      errors.push(`Cluster "${cluster.slug}" is approved but not in semantic map`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
