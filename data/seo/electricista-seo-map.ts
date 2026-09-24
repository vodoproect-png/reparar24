/**
 * Electricista SEO Map - Presentation Logic for Metadata & Content
 * 
 * PURPOSE:
 * This file defines HOW electricista services are presented to users and search engines.
 * It contains SEO templates that will be populated with dynamic data (city names, etc.).
 * 
 * PRESENTATION LOGIC:
 * - Title/description templates for metadata
 * - H1 templates for page headers
 * - FAQ topic suggestions for content sections
 * - Character limits for validation
 * 
 * FUTURE AUTOMATION:
 * This map will be consumed by scripts to:
 * - Auto-generate metadata for approved child services
 * - Populate templates with city/district data
 * - Validate metadata length before deployment
 * - Generate OpenGraph and Twitter card content
 * 
 * PLACEHOLDERS:
 * - {city}: City name (e.g., "Madrid")
 * - {service}: Service name (e.g., "Electricista Urgente")
 * - {keyword}: Primary keyword in context
 * 
 * DO NOT:
 * - Add semantic structure here (use electricista-semantic-map.ts)
 * - Add full content strings (templates only)
 * - Modify without SEO governance review
 */

import { SeoMap } from './types';

export const ELECTRICISTA_SEO_MAP: SeoMap = {
  // Service identifier (must match semantic map)
  serviceId: 'electricista',
  
  // Hub page SEO templates (generic electricista)
  hub: {
    titleTemplate: 'Electricista en {city} | Servicio Profesional 24h',
    descriptionTemplate: 'Electricista profesional en {city}. Instalaciones, reparaciones y urgencias eléctricas. Servicio 24 horas. Presupuesto sin compromiso.',
    h1Template: 'Electricista en {city}',
    faqTopics: [
      '¿Cuánto cuesta un electricista?',
      '¿Cuándo llamar a un electricista?',
      '¿Qué hace un electricista?'
    ],
    limits: {
      titleMax: 60,
      descriptionMax: 160
    }
  },
  
  // Child service SEO templates
  children: {
    // Urgencias Eléctricas
    'urgencias-electricas': {
      titleTemplate: 'Electricista Urgente en {city} 24h | Urgencias Eléctricas',
      descriptionTemplate: 'Servicio urgente de electricista en {city} disponible 24 horas. Atendemos emergencias eléctricas en menos de 60 minutos. Llámanos ahora.',
      h1Template: 'Electricista Urgente en {city} - Servicio 24 Horas',
      faqTopics: [
        '¿Qué es una urgencia eléctrica?',
        '¿Cuánto tarda un electricista urgente?',
        '¿Cuánto cuesta una urgencia eléctrica?',
        '¿El electricista urgente trabaja los domingos?'
      ],
      limits: {
        titleMax: 60,
        descriptionMax: 160
      }
    },
    
    // Instalaciones Eléctricas
    'instalaciones-electricas': {
      titleTemplate: 'Instalación Eléctrica en {city} | Electricistas Profesionales',
      descriptionTemplate: 'Instalación eléctrica completa en {city}. Viviendas, locales y oficinas. Certificados oficiales. Presupuesto gratuito sin compromiso.',
      h1Template: 'Instalación Eléctrica en {city}',
      faqTopics: [
        '¿Cuánto cuesta una instalación eléctrica completa?',
        '¿Qué incluye una instalación eléctrica nueva?',
        '¿Cuánto tiempo tarda una instalación eléctrica?',
        '¿Necesito certificado de la instalación eléctrica?'
      ],
      limits: {
        titleMax: 60,
        descriptionMax: 160
      }
    },
    
    // Cuadros Eléctricos
    'cuadros-electricos': {
      titleTemplate: 'Cuadro Eléctrico en {city} | Instalación y Reparación',
      descriptionTemplate: 'Instalación, cambio y reparación de cuadros eléctricos en {city}. Actualización de instalaciones antiguas. Electricistas certificados.',
      h1Template: 'Cuadro Eléctrico en {city}',
      faqTopics: [
        '¿Cuándo cambiar el cuadro eléctrico?',
        '¿Cuánto cuesta cambiar un cuadro eléctrico?',
        '¿Qué es un cuadro eléctrico?',
        '¿Cada cuánto revisar el cuadro eléctrico?'
      ],
      limits: {
        titleMax: 60,
        descriptionMax: 160
      }
    },
    
    // Iluminación LED
    'iluminacion-led': {
      titleTemplate: 'Iluminación LED en {city} | Instalación Profesional',
      descriptionTemplate: 'Instalación de iluminación LED en {city} para viviendas y negocios. Interior, exterior y cocina con electricistas cualificados y presupuesto claro.',
      h1Template: 'Iluminación LED en {city}',
      faqTopics: [
        '¿Cuánto cuesta instalar iluminación LED?',
        '¿Qué zonas se pueden iluminar con LED?',
        '¿Cuánto ahorro con iluminación LED?',
        '¿Cuánto tarda una instalación LED?'
      ],
      limits: {
        titleMax: 60,
        descriptionMax: 160
      }
    },
    // Enchufes e Interruptores
    'enchufes-interruptores': {
      titleTemplate: 'Enchufe en {city} | Instalación y Reparación',
      descriptionTemplate: 'Instalación, cambio y reparación de enchufes en {city}. Interruptores, enchufes de exterior y averías de enchufes con electricistas cualificados.',
      h1Template: 'Enchufe en {city}',
      faqTopics: [
        '¿Cuánto cuesta instalar un enchufe?',
        '¿Cuándo reparar un enchufe quemado?',
        '¿Cuánto tarda cambiar un interruptor?',
        '¿Por qué un enchufe no funciona?'
      ],
      limits: {
        titleMax: 60,
        descriptionMax: 160
      }
    },
    
    // Averías Eléctricas
    'averias-electricas': {
      titleTemplate: 'Reparación de Averías Eléctricas en {city} | Diagnóstico Rápido',
      descriptionTemplate: 'Reparación de averías eléctricas en {city}. Diagnóstico profesional y solución rápida. Electricistas con experiencia disponibles.',
      h1Template: 'Reparación de Averías Eléctricas en {city}',
      faqTopics: [
        '¿Cómo detectar una avería eléctrica?',
        '¿Cuánto cuesta reparar una avería eléctrica?',
        '¿Por qué salta el diferencial?',
        '¿Qué hacer si hay un fallo eléctrico?'
      ],
      limits: {
        titleMax: 60,
        descriptionMax: 160
      }
    },

    // Pequenos Trabajos Eléctricos
    'pequenos-trabajos-electricos': {
      titleTemplate: 'Pequenos Trabajos Eléctricos en {city} | Electricista',
      descriptionTemplate: 'Pequenos trabajos eléctricos en {city}: cambiar lámparas, bombillas, timbres, puntos de luz y arreglos eléctricos con presupuesto claro.',
      h1Template: 'Pequenos Trabajos Eléctricos en {city}',
      faqTopics: [
        '¿Cuánto cuesta un pequeno trabajo eléctrico?',
        '¿Qué trabajos eléctricos pequenos realizais?',
        '¿Podéis cambiar una lampara o bombilla?',
        '¿Cuándo llamar a un electricista para un arreglo pequeno?'
      ],
      limits: {
        titleMax: 60,
        descriptionMax: 160
      }
    },

    // Cargador Coche Eléctrico
    'cargador-coche-electrico': {
      titleTemplate: 'Cargador Coche Eléctrico en {city} | Instalación Wallbox',
      descriptionTemplate: 'Instalación de cargador de coche eléctrico en {city}: wallbox, punto de recarga en vivienda, garaje y comunidad con electricista.',
      h1Template: 'Cargador Coche Eléctrico en {city}',
      faqTopics: [
        '¿Cuánto cuesta instalar un cargador de coche eléctrico?',
        '¿Puedo instalar un wallbox en garaje comunitario?',
        '¿Qué potencia necesita un punto de recarga?',
        '¿Cuánto tarda instalar un cargador eléctrico?'
      ],
      limits: {
        titleMax: 60,
        descriptionMax: 160
      }
    },

    // Domótica
    'domotica': {
      titleTemplate: 'Domótica en {city} | Instaladores Smart Home',
      descriptionTemplate: 'Domótica en {city} para viviendas y locales: instalación, reparación, persianas, sensores, iluminación y control inteligente.',
      h1Template: 'Domótica en {city}',
      faqTopics: [
        '¿Qué incluye una instalación domótica?',
        '¿Cuánto cuesta domotizar una vivienda?',
        '¿Podéis reparar una instalación domótica?',
        '¿Qué sistemas se pueden automatizar en casa?'
      ],
      limits: {
        titleMax: 60,
        descriptionMax: 160
      }
    },

    // Mantenimiento Eléctrico
    'mantenimiento-electrico': {
      titleTemplate: 'Mantenimiento Eléctrico en {city} | Electricista',
      descriptionTemplate: 'Mantenimiento eléctrico en {city} para viviendas, locales, edificios y comunidades. Revisiones periódicas, contratos y presupuesto claro.',
      h1Template: 'Mantenimiento Eléctrico en {city}',
      faqTopics: [
        '¿Qué incluye el mantenimiento eléctrico?',
        '¿Cuánto cuesta un contrato de mantenimiento eléctrico?',
        '¿Cada cuánto revisar una instalación eléctrica?',
        '¿Hacéis mantenimiento eléctrico en comunidades?'
      ],
      limits: {
        titleMax: 60,
        descriptionMax: 160
      }
    },

    // Revisión Eléctrica
    'revision-electrica': {
      titleTemplate: 'Revisión Eléctrica en {city} | Electricista',
      descriptionTemplate: 'Revisión eléctrica en {city} para viviendas, locales, comunidades y empresas. Comprobamos cuadro, cableado, enchufes y protecciones.',
      h1Template: 'Revisión Eléctrica en {city}',
      faqTopics: [
        '¿Qué incluye una revisión eléctrica?',
        '¿Cuánto cuesta revisar una instalación eléctrica?',
        '¿Cuándo hacer una revisión eléctrica domiciliaria?',
        'La revisión eléctrica incluye certificado?'
      ],
      limits: {
        titleMax: 60,
        descriptionMax: 160
      }
    }
  },
  
  // City-level template overrides (optional adjustments for city pages)
  cityOverrides: {
    // City pages may want slightly different emphasis
    // Can be expanded in future for city-specific optimizations
  },
  
  // District-level template overrides (optional adjustments for district pages)
  districtOverrides: {
    // District pages may want hyper-local emphasis
    // Can be expanded in future for district-specific optimizations
  },
  
  // Last updated timestamp
  lastUpdated: '2026-06-14'
};

/**
 * Helper: Get SEO template for a specific child service
 * Returns undefined if child not found in SEO map
 */
export function getElectricistaSeoTemplate(childSlug: string) {
  return ELECTRICISTA_SEO_MAP.children[childSlug];
}

/**
 * Helper: Validate all templates have required fields
 * For future automation/validation scripts
 */
export function validateElectricistaSeoMap(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Validate hub
  if (!ELECTRICISTA_SEO_MAP.hub.titleTemplate) {
    errors.push('Hub titleTemplate is missing');
  }
  if (!ELECTRICISTA_SEO_MAP.hub.descriptionTemplate) {
    errors.push('Hub descriptionTemplate is missing');
  }
  if (!ELECTRICISTA_SEO_MAP.hub.h1Template) {
    errors.push('Hub h1Template is missing');
  }
  
  // Validate children
  Object.entries(ELECTRICISTA_SEO_MAP.children).forEach(([slug, template]) => {
    if (!template.titleTemplate) {
      errors.push(`Child "${slug}" titleTemplate is missing`);
    }
    if (!template.descriptionTemplate) {
      errors.push(`Child "${slug}" descriptionTemplate is missing`);
    }
    if (!template.h1Template) {
      errors.push(`Child "${slug}" h1Template is missing`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
