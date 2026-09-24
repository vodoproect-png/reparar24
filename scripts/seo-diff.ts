/**
 * SEO Diff Script - Compare Generated vs Approved SEO Templates
 * 
 * PURPOSE:
 * Safety layer before future OpenAI/API integration.
 * Compares generated SEO output against approved SEO maps.
 * 
 * ARCHITECTURE:
 * - Reads semantic-map & clusters
 * - Generates SEO templates using same logic as generate-seo-map.ts
 * - Compares against approved seo-map files
 * - Reports MATCH/MISMATCH/MISSING/EXTRA
 * 
 * IMPORTANT:
 * - Console output ONLY - does NOT write files
 * - Does NOT modify production SEO data
 * - Does NOT call OpenAI or external APIs
 * - Comparison only
 * 
 * USAGE:
 * npm run seo:diff
 */

// Use CommonJS require for ts-node compatibility
const { ELECTRICISTA_SEMANTIC_MAP } = require('../data/seo/electricista-semantic-map');
const { ELECTRICISTA_SEO_MAP } = require('../data/seo/electricista-seo-map');
const { ELECTRICISTA_CLUSTERS } = require('../data/seo/electricista-clusters');
const { FONTANERO_SEMANTIC_MAP } = require('../data/seo/fontanero-semantic-map');
const { FONTANERO_SEO_MAP } = require('../data/seo/fontanero-seo-map');
const { FONTANERO_CLUSTERS } = require('../data/seo/fontanero-clusters');

// Import types
import type { ChildServiceDefinition, KeywordCluster, SeoTemplate, SeoMap, SemanticMap } from '../data/seo/types';

// ============================================================================
// TYPES
// ============================================================================

type DiffStatus = 'MATCH' | 'MISMATCH' | 'MISSING' | 'EXTRA';

interface FieldDiff {
  field: string;
  status: DiffStatus;
  generated?: string | string[];
  approved?: string | string[];
}

interface SlugDiff {
  slug: string;
  fields: FieldDiff[];
}

interface ServiceDiffReport {
  service: string;
  slugDiffs: SlugDiff[];
  summary: {
    totalSlugs: number;
    matchCount: number;
    mismatchCount: number;
    missingCount: number;
    extraCount: number;
  };
}

// ============================================================================
// DETERMINISTIC GENERATION RULES (same as generate-seo-map.ts)
// ============================================================================

function capitalizeWords(str: string): string {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function generateTitleTemplate(
  slug: string,
  primaryKeyword: string,
  commercialIntent: string,
  serviceId: string
): string {
  const capitalizedKeyword = capitalizeWords(primaryKeyword);

  if (serviceId === 'electricista') {
    if (slug.includes('urgencias') || slug.includes('urgente')) {
      return `${capitalizedKeyword} en {city} 24h | Urgencias Eléctricas`;
    }
    if (slug.includes('instalacion')) {
      return `${capitalizedKeyword} en {city} | Electricistas Profesionales`;
    }
    if (slug.includes('reparacion') || slug.includes('averias')) {
      return `Reparación de ${capitalizedKeyword} en {city} | Diagnóstico Rápido`;
    }
    if (slug.includes('cuadros') || slug.includes('cuadro')) {
      return `${capitalizedKeyword} en {city} | Instalación y Reparación`;
    }
    if (slug.includes('iluminacion') || slug.includes('led')) {
      return `${capitalizedKeyword} en {city} | Instalación y Ahorro Energético`;
    }
    if (slug.includes('enchufes') || slug.includes('interruptores')) {
      return `${capitalizedKeyword} en {city} | Instalación Profesional`;
    }
    return `${capitalizedKeyword} en {city} | Servicio Profesional`;
  }

  if (serviceId === 'fontanero') {
    if (slug.includes('fugas')) {
      return `Reparación de ${capitalizedKeyword} en {city} | Detección y Solución`;
    }
    if (slug.includes('desatascos')) {
      return `${capitalizedKeyword} en {city} 24h | Servicio Urgente de Fontanería`;
    }
    if (slug.includes('instalaciones')) {
      return `${capitalizedKeyword} en {city} | Fontaneros Profesionales`;
    }
    if (slug.includes('tuberias')) {
      return `${capitalizedKeyword} en {city} | Cambio y Renovación`;
    }
    if (slug.includes('calentadores') || slug.includes('termos')) {
      return `Termo Eléctrico en {city} | Instalación y Reparación`;
    }
    if (slug.includes('mantenimiento')) {
      return `${capitalizedKeyword} en {city} | Revisión Profesional`;
    }
    return `${capitalizedKeyword} en {city} | Servicio Profesional`;
  }

  return `${capitalizedKeyword} en {city} | Servicio Profesional`;
}

function generateDescriptionTemplate(
  slug: string,
  primaryKeyword: string,
  secondaryKeywords: string[],
  commercialIntent: string,
  serviceId: string
): string {
  const capitalizedKeyword = capitalizeWords(primaryKeyword);

  if (serviceId === 'electricista') {
    if (slug.includes('urgencias') || slug.includes('urgente')) {
      return `Servicio urgente de electricista en {city} disponible 24 horas. Atendemos emergencias eléctricas en menos de 60 minutos. Llámanos ahora.`;
    }
    if (slug.includes('instalacion')) {
      return `${capitalizedKeyword} completa en {city}. Viviendas, locales y oficinas. Certificados oficiales. Presupuesto gratuito sin compromiso.`;
    }
    if (slug.includes('reparacion') || slug.includes('averias')) {
      return `Reparación de ${primaryKeyword} en {city}. Diagnóstico profesional y solución rápida. Electricistas con experiencia disponibles.`;
    }
    if (slug.includes('cuadros') || slug.includes('cuadro')) {
      return `Instalación, cambio y reparación de ${primaryKeyword} en {city}. Actualización de instalaciones antiguas. Electricistas certificados.`;
    }
    if (slug.includes('iluminacion') || slug.includes('led')) {
      return `Instalación de ${primaryKeyword} en {city}. Ahorra hasta 80% en consumo eléctrico. Iluminación inteligente para hogar y negocio.`;
    }
    if (slug.includes('enchufes') || slug.includes('interruptores')) {
      return `Instalación y cambio de ${primaryKeyword} en {city}. Enchufes USB, inteligentes y convencionales. Electricistas cualificados.`;
    }
    return `Servicio de ${primaryKeyword} en {city} para averías, cortes de luz y problemas eléctricos. Atención rápida, presupuesto claro y garantía profesional.`;
  }

  if (serviceId === 'fontanero') {
    if (slug.includes('fugas')) {
      return `Reparación de fugas de agua en {city}. Detección profesional y solución rápida. Fontaneros 24 horas disponibles. Llama ahora.`;
    }
    if (slug.includes('desatascos')) {
      return `Servicio de desatascos en {city} disponible 24 horas. Desatascamos tuberías, fregaderos y WC. Solución rápida garantizada.`;
    }
    if (slug.includes('instalaciones')) {
      return `Instalación de fontanería completa en {city}. Baños, cocinas y sistemas sanitarios. Fontaneros certificados. Presupuesto gratuito.`;
    }
    if (slug.includes('tuberias')) {
      return `Sustitución y cambio de tuberías en {city}. Renovación de tuberías antiguas. Fontaneros especializados. Presupuesto sin compromiso.`;
    }
    if (slug.includes('calentadores') || slug.includes('termos')) {
      return `Instalación y reparación de termos eléctricos en {city}. Cambio de calentadores de agua. Fontaneros especializados disponibles.`;
    }
    if (slug.includes('mantenimiento')) {
      return `Mantenimiento preventivo de fontanería en {city}. Revisiones periódicas para evitar averías. Contratos para comunidades y empresas.`;
    }
    return `Servicio de ${primaryKeyword} en {city}. Reparaciones, instalaciones y urgencias. Atención rápida con garantía profesional.`;
  }

  return `Servicio de ${primaryKeyword} en {city}. Atención rápida, presupuesto claro y garantía profesional.`;
}

function generateH1Template(slug: string, primaryKeyword: string, serviceId: string): string {
  const capitalizedKeyword = capitalizeWords(primaryKeyword);

  if (slug.includes('urgencias') || slug.includes('urgente')) {
    return `${capitalizedKeyword} en {city} - Servicio 24 Horas`;
  }

  if (serviceId === 'fontanero') {
    if (slug.includes('desatascos')) {
      return `${capitalizedKeyword} en {city} - Servicio 24 Horas`;
    }
  }

  return `${capitalizedKeyword} en {city}`;
}

function generateFaqTopics(slug: string, primaryKeyword: string, serviceId: string): string[] {
  const topics: string[] = [];

  topics.push(`¿Cuánto cuesta ${primaryKeyword}?`);

  if (serviceId === 'electricista') {
    if (slug.includes('urgencias') || slug.includes('urgente')) {
      topics.push(`¿Qué es una urgencia eléctrica?`);
      topics.push(`¿Cuánto tarda un electricista urgente?`);
      topics.push(`¿El electricista urgente trabaja los domingos?`);
    } else if (slug.includes('instalacion')) {
      topics.push(`¿Qué incluye una ${primaryKeyword} nueva?`);
      topics.push(`¿Cuánto tiempo tarda una ${primaryKeyword}?`);
      topics.push(`¿Necesito certificado de la ${primaryKeyword}?`);
    } else if (slug.includes('reparacion') || slug.includes('averias')) {
      topics.push(`¿Cómo detectar una ${primaryKeyword}?`);
      topics.push(`¿Por qué salta el diferencial?`);
      topics.push(`¿Qué hacer si hay un fallo eléctrico?`);
    } else if (slug.includes('cuadros') || slug.includes('cuadro')) {
      topics.push(`¿Cuándo cambiar el ${primaryKeyword}?`);
      topics.push(`¿Qué es un ${primaryKeyword}?`);
      topics.push(`¿Cada cuánto revisar el ${primaryKeyword}?`);
    } else if (slug.includes('iluminacion') || slug.includes('led')) {
      topics.push(`¿Cuánto ahorro con ${primaryKeyword}?`);
      topics.push(`¿Qué ventajas tiene la ${primaryKeyword}?`);
      topics.push(`¿Cuánto duran las luces LED?`);
    } else if (slug.includes('enchufes') || slug.includes('interruptores')) {
      topics.push(`¿Cómo instalar un enchufe inteligente?`);
      topics.push(`¿Cuántos enchufes por habitación?`);
      topics.push(`¿Cuánto cuesta cambiar interruptores?`);
    } else {
      topics.push(`¿Cuándo necesito ${primaryKeyword}?`);
      topics.push(`¿Qué hace un electricista en ${primaryKeyword}?`);
    }
  }

  if (serviceId === 'fontanero') {
    if (slug.includes('fugas')) {
      topics.push(`¿Cómo detectar una fuga de agua?`);
      topics.push(`¿Qué hacer si tengo una fuga de agua?`);
      topics.push(`¿Cómo localizar fuga tubería enterrada?`);
    } else if (slug.includes('desatascos')) {
      topics.push(`¿Cómo desatascar una tubería?`);
      topics.push(`¿Qué hacer si se atasca el desagüe?`);
      topics.push(`¿Los desatascos trabajan 24 horas?`);
    } else if (slug.includes('instalaciones')) {
      topics.push(`¿Qué incluye una ${primaryKeyword}?`);
      topics.push(`¿Cuánto tiempo tarda instalar un baño?`);
      topics.push(`¿Necesito certificado de ${primaryKeyword}?`);
    } else if (slug.includes('tuberias')) {
      topics.push(`¿Cuándo cambiar las tuberías?`);
      topics.push(`¿Cómo cambiar tuberías sin obras?`);
      topics.push(`¿Cada cuánto renovar las tuberías?`);
    } else if (slug.includes('calentadores') || slug.includes('termos')) {
      topics.push(`¿Cómo reparar un termo eléctrico?`);
      topics.push(`¿Cuánto dura un termo eléctrico?`);
      topics.push(`¿Cambiar o reparar termo eléctrico?`);
    } else if (slug.includes('mantenimiento')) {
      topics.push(`¿Cada cuánto hacer mantenimiento de fontanería?`);
      topics.push(`¿Qué incluye el mantenimiento de fontanería?`);
      topics.push(`¿Por qué es importante el mantenimiento preventivo?`);
    } else {
      topics.push(`¿Cuándo necesito ${primaryKeyword}?`);
      topics.push(`¿Qué hace un fontanero en ${primaryKeyword}?`);
    }
  }

  return topics;
}

function generateSeoTemplate(
  child: ChildServiceDefinition,
  cluster: KeywordCluster,
  serviceId: string
): SeoTemplate {
  const { slug, primaryKeyword } = child;
  const { secondaryKeywords, commercialIntent } = cluster;

  const titleTemplate = generateTitleTemplate(slug, primaryKeyword, commercialIntent, serviceId);
  const descriptionTemplate = generateDescriptionTemplate(
    slug,
    primaryKeyword,
    secondaryKeywords,
    commercialIntent,
    serviceId
  );
  const h1Template = generateH1Template(slug, primaryKeyword, serviceId);
  const faqTopics = generateFaqTopics(slug, primaryKeyword, serviceId);

  return {
    titleTemplate,
    descriptionTemplate,
    h1Template,
    faqTopics,
    limits: {
      titleMax: 60,
      descriptionMax: 160,
    },
  };
}

// ============================================================================
// DIFF COMPARISON ENGINE
// ============================================================================

function arraysEqual(a?: string[], b?: string[]): boolean {
  if (!a && !b) return true;
  if (!a || !b) return false;
  if (a.length !== b.length) return false;
  return a.every((val, idx) => val === b[idx]);
}

function compareField(
  fieldName: string,
  generated: string | string[] | undefined,
  approved: string | string[] | undefined
): FieldDiff {
  if (generated === undefined && approved === undefined) {
    return { field: fieldName, status: 'MATCH' };
  }

  if (generated === undefined) {
    return { field: fieldName, status: 'MISSING', approved };
  }

  if (approved === undefined) {
    return { field: fieldName, status: 'EXTRA', generated };
  }

  if (Array.isArray(generated) && Array.isArray(approved)) {
    if (arraysEqual(generated, approved)) {
      return { field: fieldName, status: 'MATCH' };
    }
    return { field: fieldName, status: 'MISMATCH', generated, approved };
  }

  if (generated === approved) {
    return { field: fieldName, status: 'MATCH' };
  }

  return { field: fieldName, status: 'MISMATCH', generated, approved };
}

function compareSlug(
  slug: string,
  generatedTemplate: SeoTemplate,
  approvedTemplate: SeoTemplate | undefined
): SlugDiff {
  const fields: FieldDiff[] = [];

  if (!approvedTemplate) {
    return {
      slug,
      fields: [
        { field: 'titleTemplate', status: 'MISSING', generated: generatedTemplate.titleTemplate },
        { field: 'descriptionTemplate', status: 'MISSING', generated: generatedTemplate.descriptionTemplate },
        { field: 'h1Template', status: 'MISSING', generated: generatedTemplate.h1Template },
        { field: 'faqTopics', status: 'MISSING', generated: generatedTemplate.faqTopics },
      ],
    };
  }

  fields.push(compareField('titleTemplate', generatedTemplate.titleTemplate, approvedTemplate.titleTemplate));
  fields.push(compareField('descriptionTemplate', generatedTemplate.descriptionTemplate, approvedTemplate.descriptionTemplate));
  fields.push(compareField('h1Template', generatedTemplate.h1Template, approvedTemplate.h1Template));
  fields.push(compareField('faqTopics', generatedTemplate.faqTopics, approvedTemplate.faqTopics));

  return { slug, fields };
}

// ============================================================================
// SERVICE DIFF GENERATOR
// ============================================================================

function generateServiceDiff(
  serviceId: string,
  semanticMap: SemanticMap,
  seoMap: SeoMap,
  clusters: KeywordCluster[]
): ServiceDiffReport {
  const slugDiffs: SlugDiff[] = [];
  const approvedChildren = (semanticMap.approvedChildren || (semanticMap as any).existingPageTargets || [])
    .filter((child: ChildServiceDefinition) => child.status === 'approved');

  // Compare generated vs approved
  for (const child of approvedChildren) {
    const cluster = clusters.find((c: any) => c.slug === child.slug);
    if (!cluster) {
      console.warn(`⚠️  Warning: No cluster found for ${serviceId}/${child.slug}`);
      continue;
    }

    const generatedTemplate = generateSeoTemplate(child, cluster, serviceId);
    const approvedTemplate = seoMap.children[child.slug];
    const slugDiff = compareSlug(child.slug, generatedTemplate, approvedTemplate);
    slugDiffs.push(slugDiff);
  }

  // Check for extra slugs in approved map
  const semanticSlugs = approvedChildren.map((c: ChildServiceDefinition) => c.slug);
  const approvedSlugs = Object.keys(seoMap.children);
  const extraSlugs = approvedSlugs.filter((s) => !semanticSlugs.includes(s));

  for (const extraSlug of extraSlugs) {
    const approvedTemplate = seoMap.children[extraSlug];
    slugDiffs.push({
      slug: extraSlug,
      fields: [
        { field: 'titleTemplate', status: 'EXTRA', approved: approvedTemplate.titleTemplate },
        { field: 'descriptionTemplate', status: 'EXTRA', approved: approvedTemplate.descriptionTemplate },
        { field: 'h1Template', status: 'EXTRA', approved: approvedTemplate.h1Template },
        { field: 'faqTopics', status: 'EXTRA', approved: approvedTemplate.faqTopics },
      ],
    });
  }

  // Calculate summary
  let matchCount = 0;
  let mismatchCount = 0;
  let missingCount = 0;
  let extraCount = 0;

  for (const slugDiff of slugDiffs) {
    for (const fieldDiff of slugDiff.fields) {
      switch (fieldDiff.status) {
        case 'MATCH':
          matchCount++;
          break;
        case 'MISMATCH':
          mismatchCount++;
          break;
        case 'MISSING':
          missingCount++;
          break;
        case 'EXTRA':
          extraCount++;
          break;
      }
    }
  }

  return {
    service: serviceId,
    slugDiffs,
    summary: {
      totalSlugs: slugDiffs.length,
      matchCount,
      mismatchCount,
      missingCount,
      extraCount,
    },
  };
}

// ============================================================================
// CONSOLE OUTPUT
// ============================================================================

function printServiceDiff(report: ServiceDiffReport): void {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`SERVICE: ${report.service}`);
  console.log('='.repeat(80));

  for (const slugDiff of report.slugDiffs) {
    console.log(`\nSLUG: ${slugDiff.slug}`);

    for (const fieldDiff of slugDiff.fields) {
      const statusSymbol = fieldDiff.status === 'MATCH' ? '✅' : fieldDiff.status === 'MISMATCH' ? '❌' : fieldDiff.status === 'MISSING' ? '⚠️ ' : '🔵';
      console.log(`  ${fieldDiff.field}: ${statusSymbol} ${fieldDiff.status}`);

      if (fieldDiff.status !== 'MATCH') {
        if (fieldDiff.generated !== undefined) {
          const genValue = Array.isArray(fieldDiff.generated) ? `[${fieldDiff.generated.length} items]` : fieldDiff.generated;
          console.log(`    Generated: ${genValue}`);
        }
        if (fieldDiff.approved !== undefined) {
          const appValue = Array.isArray(fieldDiff.approved) ? `[${fieldDiff.approved.length} items]` : fieldDiff.approved;
          console.log(`    Approved:  ${appValue}`);
        }
      }
    }
  }

  console.log(`\nSummary:`);
  console.log(`  MATCH: ${report.summary.matchCount}`);
  console.log(`  MISMATCH: ${report.summary.mismatchCount}`);
  console.log(`  MISSING: ${report.summary.missingCount}`);
  console.log(`  EXTRA: ${report.summary.extraCount}`);
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

function main(): void {
  console.log('\n🔍 SEO DIFF SCRIPT - COMPARE GENERATED VS APPROVED');
  console.log('='.repeat(80));
  console.log('Purpose: Safety layer before OpenAI/API integration');
  console.log('Mode: Comparison only (NO file writes, NO API calls)');
  console.log('='.repeat(80));

  try {
    // Generate diffs for Electricista
    console.log('\n🔄 Processing: ELECTRICISTA');
    const electricistaReport = generateServiceDiff(
      'electricista',
      ELECTRICISTA_SEMANTIC_MAP,
      ELECTRICISTA_SEO_MAP,
      ELECTRICISTA_CLUSTERS
    );
    printServiceDiff(electricistaReport);

    // Generate diffs for Fontanero
    console.log('\n🔄 Processing: FONTANERO');
    const fontaneroReport = generateServiceDiff(
      'fontanero',
      FONTANERO_SEMANTIC_MAP,
      FONTANERO_SEO_MAP,
      FONTANERO_CLUSTERS
    );
    printServiceDiff(fontaneroReport);

    // Overall summary
    console.log(`\n${'='.repeat(80)}`);
    console.log('OVERALL SUMMARY');
    console.log('='.repeat(80));
    console.log(`Total Services: 2 (electricista, fontanero)`);
    console.log(`Total Slugs Compared: ${electricistaReport.summary.totalSlugs + fontaneroReport.summary.totalSlugs}`);
    console.log(`Total Matches: ${electricistaReport.summary.matchCount + fontaneroReport.summary.matchCount}`);
    console.log(`Total Mismatches: ${electricistaReport.summary.mismatchCount + fontaneroReport.summary.mismatchCount}`);
    console.log(`Total Missing: ${electricistaReport.summary.missingCount + fontaneroReport.summary.missingCount}`);
    console.log(`Total Extra: ${electricistaReport.summary.extraCount + fontaneroReport.summary.extraCount}`);

    const allMatch = 
      electricistaReport.summary.mismatchCount === 0 && 
      electricistaReport.summary.missingCount === 0 && 
      electricistaReport.summary.extraCount === 0 &&
      fontaneroReport.summary.mismatchCount === 0 && 
      fontaneroReport.summary.missingCount === 0 && 
      fontaneroReport.summary.extraCount === 0;

    if (allMatch) {
      console.log('\n✅ SUCCESS: All generated templates match approved SEO maps!');
    } else {
      console.log('\n⚠️  ATTENTION: Differences detected between generated and approved templates');
    }

    console.log('\n⚠️  IMPORTANT: This script does NOT write files');
    console.log('⚠️  Comparison output is for review only');
    console.log('⚠️  Production SEO data remains unchanged\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error running SEO Diff:', error);
    process.exit(1);
  }
}

// Run the script
main();
