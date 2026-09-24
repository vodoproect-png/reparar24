/**
 * Fontanero SEO Map - Presentation Logic for Metadata & Content
 * 
 * PURPOSE:
 * This file defines HOW fontanero services are presented to users and search engines.
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
 * - {service}: Service name (e.g., "Reparación de Fugas")
 * - {keyword}: Primary keyword in context
 * 
 * DO NOT:
 * - Add semantic structure here (use fontanero-semantic-map.ts)
 * - Add full content strings (templates only)
 * - Modify without SEO governance review
 */

import { SeoMap } from './types';

export const FONTANERO_SEO_MAP: SeoMap = {
  // Service identifier (must match semantic map)
  serviceId: 'fontanero',
  
  // Hub page SEO templates (generic fontanero)
  hub: {
    titleTemplate: 'Fontanero en {city} | Servicio Profesional 24h',
    descriptionTemplate: 'Fontanero profesional en {city}. Reparaciones, instalaciones y urgencias de fontanería. Servicio 24 horas. Presupuesto sin compromiso.',
    h1Template: 'Fontanero en {city}',
    faqTopics: [
      '¿Cuánto cuesta un fontanero?',
      '¿Cuándo llamar a un fontanero?',
      '¿Qué hace un fontanero?'
    ],
    limits: {
      titleMax: 60,
      descriptionMax: 160
    }
  },
  
  // Child service SEO templates
  children: {
    // Reparación de Fugas
    'reparacion-fugas': {
      titleTemplate: 'Reparación de Fugas de Agua en {city} | Detección y Solución',
      descriptionTemplate: 'Reparación de fugas de agua en {city}. Detección profesional y solución rápida. Fontaneros 24 horas disponibles. Llama ahora.',
      h1Template: 'Reparación de Fugas de Agua en {city}',
      faqTopics: [
        '¿Cómo detectar una fuga de agua?',
        '¿Cuánto cuesta reparar una fuga de agua?',
        '¿Qué hacer si tengo una fuga de agua?',
        '¿Cómo localizar fuga tubería enterrada?'
      ],
      limits: {
        titleMax: 60,
        descriptionMax: 160
      }
    },
    
    // Desatascos
    'desatascos': {
      titleTemplate: 'Desatascos en {city} 24h | Servicio Urgente de Fontanería',
      descriptionTemplate: 'Servicio de desatascos en {city} disponible 24 horas. Desatascamos tuberías, fregaderos y WC. Solución rápida garantizada.',
      h1Template: 'Desatascos en {city} - Servicio 24 Horas',
      faqTopics: [
        '¿Cuánto cuesta un desatasco?',
        '¿Cómo desatascar una tubería?',
        '¿Qué hacer si se atasca el desagüe?',
        '¿Los desatascos trabajan 24 horas?'
      ],
      limits: {
        titleMax: 60,
        descriptionMax: 160
      }
    },
    
    // Instalaciones
    'instalaciones': {
      titleTemplate: 'Instalación de Fontanería en {city} | Fontaneros Profesionales',
      descriptionTemplate: 'Instalación de fontanería completa en {city}. Baños, cocinas y sistemas sanitarios. Fontaneros certificados. Presupuesto gratuito.',
      h1Template: 'Instalación de Fontanería en {city}',
      faqTopics: [
        '¿Cuánto cuesta una instalación de fontanería?',
        '¿Qué incluye una instalación de fontanería?',
        '¿Cuánto tiempo tarda instalar un baño?',
        '¿Necesito certificado de instalación de fontanería?'
      ],
      limits: {
        titleMax: 60,
        descriptionMax: 160
      }
    },
    
    // Sustitución de Tuberías
    'sustitucion-tuberias': {
      titleTemplate: 'Sustitución de Tuberías en {city} | Cambio y Renovación',
      descriptionTemplate: 'Sustitución y cambio de tuberías en {city}. Renovación de tuberías antiguas. Fontaneros especializados. Presupuesto sin compromiso.',
      h1Template: 'Sustitución de Tuberías en {city}',
      faqTopics: [
        '¿Cuándo cambiar las tuberías?',
        '¿Cuánto cuesta cambiar tuberías de una vivienda?',
        '¿Cómo cambiar tuberías sin obras?',
        '¿Cada cuánto renovar las tuberías?'
      ],
      limits: {
        titleMax: 60,
        descriptionMax: 160
      }
    },
    
    // Calentadores y Termos
    'calentadores-termos': {
      titleTemplate: 'Termo Eléctrico en {city} | Instalación y Reparación',
      descriptionTemplate: 'Instalación y reparación de termos eléctricos en {city}. Cambio de calentadores de agua. Fontaneros especializados disponibles.',
      h1Template: 'Termo Eléctrico en {city}',
      faqTopics: [
        '¿Cuánto cuesta instalar un termo eléctrico?',
        '¿Cómo reparar un termo eléctrico?',
        '¿Cuánto dura un termo eléctrico?',
        '¿Cambiar o reparar termo eléctrico?'
      ],
      limits: {
        titleMax: 60,
        descriptionMax: 160
      }
    },
    
    // Mantenimiento
    'mantenimiento': {
      titleTemplate: 'Mantenimiento de Fontanería en {city} | Revisión Profesional',
      descriptionTemplate: 'Mantenimiento preventivo de fontanería en {city}. Revisiones periódicas para evitar averías. Contratos para comunidades y empresas.',
      h1Template: 'Mantenimiento de Fontanería en {city}',
      faqTopics: [
        '¿Cada cuánto hacer mantenimiento de fontanería?',
        '¿Qué incluye el mantenimiento de fontanería?',
        '¿Cuánto cuesta un contrato de mantenimiento?',
        '¿Por qué es importante el mantenimiento preventivo?'
      ],
      limits: {
        titleMax: 60,
        descriptionMax: 160
      }
    },

    // Cambio de Bañera por Ducha
    'cambio-banera-por-ducha': {
      titleTemplate: 'Cambiar Bañera por Ducha en {city} | Presupuesto Profesional',
      descriptionTemplate: 'Cambio de bañera por ducha en {city}. Instalamos plato de ducha con presupuesto previo, materiales de calidad y garantía.',
      h1Template: 'Cambiar Bañera por Ducha en {city}',
      faqTopics: [
        '¿Cuánto cuesta cambiar bañera por ducha?',
        '¿Cuánto tarda cambiar una bañera por plato de ducha?',
        '¿Qué incluye el cambio de bañera por ducha?',
        '¿Se puede cambiar bañera por ducha sin obra grande?'
      ],
      limits: {
        titleMax: 60,
        descriptionMax: 160
      }
    },

    // Reparación de Cisternas
    'reparacion-cisternas': {
      titleTemplate: 'Reparación de Cisternas en {city} | Cisterna Pierde Agua',
      descriptionTemplate: 'Reparamos cisternas que pierden agua en {city}: mecanismo, flotador, descargador y cisternas empotradas con presupuesto previo.',
      h1Template: 'Reparación de Cisternas en {city}',
      faqTopics: [
        '¿Por qué mi cisterna pierde agua?',
        '¿Cuánto cuesta arreglar una cisterna?',
        '¿Se puede cambiar solo el mecanismo de la cisterna?',
        '¿Reparáis cisternas empotradas?'
      ],
      limits: {
        titleMax: 65,
        descriptionMax: 165
      }
    },

    // Cambio y Reparación de Grifos
    'cambio-reparacion-grifos': {
      titleTemplate: 'Cambiar Grifo en {city} | Reparaci\u00f3n de Grifos',
      descriptionTemplate: 'Cambio y reparaci\u00f3n de grifos en {city}: cocina, ducha, lavabo, grifos que gotean y monomandos con presupuesto previo.',
      h1Template: 'Cambio y Reparaci\u00f3n de Grifos en {city}',
      faqTopics: [
        '\u00bfCu\u00e1nto cuesta cambiar un grifo?',
        '\u00bfPor qu\u00e9 gotea un grifo monomando?',
        '\u00bfCu\u00e1ndo reparar o cambiar un grifo?',
        '\u00bfCambi\u00e1is grifos de cocina, ducha y lavabo?'
      ],
      limits: {
        titleMax: 65,
        descriptionMax: 165
      }
    },

    // Grupos de Presion de Agua
    'grupos-presion-agua': {
      titleTemplate: 'Grupo de Presi\u00f3n de Agua en {city} | Instalaci\u00f3n y Reparaci\u00f3n',
      descriptionTemplate: 'Instalaci\u00f3n y reparaci\u00f3n de grupos de presi\u00f3n de agua en {city}. Bombas, calder\u00edn, presostato y presi\u00f3n baja.',
      h1Template: 'Grupos de Presi\u00f3n de Agua en {city}',
      faqTopics: [
        '\u00bfCu\u00e1nto cuesta instalar un grupo de presi\u00f3n?',
        '\u00bfPor qu\u00e9 no arranca la bomba de agua?',
        '\u00bfSirve un grupo de presi\u00f3n para una vivienda?',
        '\u00bfRepar\u00e1is grupos de presi\u00f3n de comunidades?'
      ],
      limits: {
        titleMax: 70,
        descriptionMax: 165
      }
    },

    // Descalcificadores y Osmosis
    'descalcificadores-osmosis': {
      titleTemplate: 'Mantenimiento Descalcificador en {city} | \u00d3smosis',
      descriptionTemplate: 'Mantenimiento y reparaci\u00f3n de descalcificadores y \u00f3smosis en {city}. Filtros, membranas, resina, sal e instalaci\u00f3n.',
      h1Template: 'Descalcificadores y \u00d3smosis en {city}',
      faqTopics: [
        '\u00bfCu\u00e1nto cuesta el mantenimiento de un descalcificador?',
        '\u00bfCada cu\u00e1nto cambiar filtros de \u00f3smosis?',
        '\u00bfRepar\u00e1is descalcificadores y \u00f3smosis?',
        '\u00bfInstal\u00e1is equipos de \u00f3smosis inversa?'
      ],
      limits: {
        titleMax: 65,
        descriptionMax: 165
      }
    },

    // Instalación y Cambio de Inodoros
    'instalacion-cambio-inodoros': {
      titleTemplate: 'Instalar Inodoro en {city} | Cambio de Sanitarios',
      descriptionTemplate: 'Instalaci\u00f3n y cambio de inodoros en {city}. Retirada del antiguo, conexi\u00f3n, sellado, fijaci\u00f3n y prueba final.',
      h1Template: 'Instalaci\u00f3n y Cambio de Inodoros en {city}',
      faqTopics: [
        '\u00bfCu\u00e1nto cuesta instalar un inodoro?',
        '\u00bfCu\u00e1nto cuesta cambiar un inodoro?',
        '\u00bfIncluye retirada del sanitario antiguo?',
        '\u00bfCambi\u00e1is v\u00e1teres y sanitarios?'
      ],
      limits: {
        titleMax: 65,
        descriptionMax: 165
      }
    },

    // Instalación y Reparación de Lavabos
    'instalacion-lavabos': {
      titleTemplate: 'Cambiar Lavabo en {city} | Instalaci\u00f3n y Reparaci\u00f3n',
      descriptionTemplate: 'Cambio e instalaci\u00f3n de lavabos en {city}. Desag\u00fces, sifones, v\u00e1lvulas, sellado y prueba de estanqueidad.',
      h1Template: 'Instalaci\u00f3n y Reparaci\u00f3n de Lavabos en {city}',
      faqTopics: [
        '\u00bfCu\u00e1nto cuesta cambiar un lavabo?',
        '\u00bfPod\u00e9is cambiar el desag\u00fce o sif\u00f3n del lavabo?',
        '\u00bfInstal\u00e1is lavabos suspendidos o sobre encimera?',
        '\u00bfQu\u00e9 hacer si el lavabo gotea por abajo?'
      ],
      limits: {
        titleMax: 65,
        descriptionMax: 165
      }
    },

    // Mamparas de Ducha
    'mamparas-ducha': {
      titleTemplate: 'Cambiar Mampara de Ducha en {city} | Instalaci\u00f3n y Reparaci\u00f3n',
      descriptionTemplate: 'Instalaci\u00f3n, cambio y reparaci\u00f3n de mamparas de ducha en {city}. Ajuste, sellado, puertas y presupuesto previo.',
      h1Template: 'Instalaci\u00f3n y Reparaci\u00f3n de Mamparas de Ducha en {city}',
      faqTopics: [
        '\u00bfCu\u00e1nto cuesta cambiar una mampara de ducha?',
        '\u00bfRepar\u00e1is puertas de mampara que no cierran?',
        '\u00bfPod\u00e9is instalar una mampara si ya la tengo comprada?',
        '\u00bfCu\u00e1ndo conviene reparar o sustituir la mampara?'
      ],
      limits: {
        titleMax: 70,
        descriptionMax: 165
      }
    },

    // Bajantes
    'bajantes': {
      titleTemplate: 'Reparaci\u00f3n de Bajantes en {city} | Sin Obras',
      descriptionTemplate: 'Reparaci\u00f3n y cambio de bajantes en {city}. Bajantes de comunidad, PVC, fugas, mantenimiento y presupuesto previo.',
      h1Template: 'Reparaci\u00f3n de Bajantes en {city}',
      faqTopics: [
        '\u00bfCu\u00e1nto cuesta reparar una bajante?',
        '\u00bfSe pueden reparar bajantes sin obras?',
        '\u00bfCu\u00e1ndo cambiar una bajante de comunidad?',
        '\u00bfRepar\u00e1is bajantes de PVC?'
      ],
      limits: {
        titleMax: 65,
        descriptionMax: 165
      }
    },

    // Reparación de Duchas
    'reparacion-duchas': {
      titleTemplate: 'Reparaci\u00f3n de Duchas en {city} | Cambio y Goteos',
      descriptionTemplate: 'Cambio y reparaci\u00f3n de duchas en {city}. Columnas, flexos, mangueras, desag\u00fces, sumideros y goteos con presupuesto previo.',
      h1Template: 'Reparaci\u00f3n y Cambio de Duchas en {city}',
      faqTopics: [
        '\u00bfCu\u00e1nto cuesta cambiar una ducha?',
        '\u00bfRepar\u00e1is duchas que gotean?',
        '\u00bfPod\u00e9is cambiar columna o flexo de ducha?',
        '\u00bfEsta p\u00e1gina incluye plato de ducha o mampara?'
      ],
      limits: {
        titleMax: 65,
        descriptionMax: 165
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
  lastUpdated: '2026-06-15'
};

/**
 * Helper: Get SEO template for a specific child service
 * Returns undefined if child not found in SEO map
 */
export function getFontaneroSeoTemplate(childSlug: string) {
  return FONTANERO_SEO_MAP.children[childSlug];
}

/**
 * Helper: Validate all templates have required fields
 * For future automation/validation scripts
 */
export function validateFontaneroSeoMap(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Validate hub
  if (!FONTANERO_SEO_MAP.hub.titleTemplate) {
    errors.push('Hub titleTemplate is missing');
  }
  if (!FONTANERO_SEO_MAP.hub.descriptionTemplate) {
    errors.push('Hub descriptionTemplate is missing');
  }
  if (!FONTANERO_SEO_MAP.hub.h1Template) {
    errors.push('Hub h1Template is missing');
  }
  
  // Validate children
  Object.entries(FONTANERO_SEO_MAP.children).forEach(([slug, template]) => {
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

