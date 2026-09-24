#!/usr/bin/env ts-node
/**
 * SEO Map Generator - Foundation Script
 * 
 * PURPOSE:
 * Generate draft SEO map entries from Semantic Layer data.
 * Compare generated entries with existing SEO map.
 * 
 * ARCHITECTURE:
 * - Reads semantic-map for approved children
 * - Matches with keyword clusters
 * - Generates SEO templates using deterministic rules
 * - Compares with existing seo-map
 * - Reports differences
 * 
 * MODES:
 * - Console mode (default): Output to console only
 * - Export mode (--export): Write draft JSON to .tmp/seo-drafts/
 * 
 * IMPORTANT:
 * - This is FOUNDATION only - no AI/OpenAI yet
 * - Does NOT modify production SEO data
 * - Does NOT touch routes/pages/components
 * 
 * USAGE:
 * npm run generate:seo-map           (console output only)
 * npm run generate:seo-map:export    (write JSON drafts)
 */

// Use CommonJS require for ts-node compatibility
const fs = require('fs');
const path = require('path');

const { ELECTRICISTA_SEMANTIC_MAP } = require('../data/seo/electricista-semantic-map');
const { ELECTRICISTA_SEO_MAP } = require('../data/seo/electricista-seo-map');
const { ELECTRICISTA_CLUSTERS } = require('../data/seo/electricista-clusters');
const { FONTANERO_SEMANTIC_MAP } = require('../data/seo/fontanero-semantic-map');
const { FONTANERO_SEO_MAP } = require('../data/seo/fontanero-seo-map');
const { FONTANERO_CLUSTERS } = require('../data/seo/fontanero-clusters');

// Import types (for type checking only, not runtime)
import type { ChildServiceDefinition, KeywordCluster, SeoTemplate } from '../data/seo/types';

// ============================================================================
// TYPES
// ============================================================================

interface GeneratedSeoEntry {
  slug: string;
  primaryKeyword: string;
  template: SeoTemplate;
  source: 'generated';
}

interface ComparisonReport {
  service: string;
  generatedEntries: GeneratedSeoEntry[];
  existingEntries: string[];
  missingInExisting: string[];
  extraInExisting: string[];
  mismatches: Array<{
    slug: string;
    field: string;
    generated: string;
    existing: string;
  }>;
}

// ============================================================================
// DETERMINISTIC GENERATION RULES
// ============================================================================

/**
 * Generate SEO template deterministically based on semantic data
 * Uses rule-based logic only - NO AI
 */
function generateSeoTemplate(
  child: ChildServiceDefinition,
  cluster: KeywordCluster
): SeoTemplate {
  const { slug, primaryKeyword } = child;
  const { secondaryKeywords, commercialIntent } = cluster;

  // Rule 1: Generate title template
  const titleTemplate = generateTitleTemplate(slug, primaryKeyword, commercialIntent);

  // Rule 2: Generate description template
  const descriptionTemplate = generateDescriptionTemplate(
    slug,
    primaryKeyword,
    secondaryKeywords,
    commercialIntent
  );

  // Rule 3: Generate h1 template
  const h1Template = generateH1Template(slug, primaryKeyword);

  // Rule 4: Generate FAQ topics
  const faqTopics = generateFaqTopics(slug, primaryKeyword);

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

/**
 * Generate title template deterministically
 */
function generateTitleTemplate(
  slug: string,
  primaryKeyword: string,
  commercialIntent: string
): string {
  // Capitalize first letter of each word in primary keyword
  const capitalizedKeyword = capitalizeWords(primaryKeyword);

  // Rule-based templates based on slug patterns
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

  // Default template
  return `${capitalizedKeyword} en {city} | Servicio Profesional`;
}

/**
 * Generate description template deterministically
 */
function generateDescriptionTemplate(
  slug: string,
  primaryKeyword: string,
  secondaryKeywords: string[],
  commercialIntent: string
): string {
  const capitalizedKeyword = capitalizeWords(primaryKeyword);

  // Rule-based descriptions based on slug patterns
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

  // Default description
  return `Servicio de ${primaryKeyword} en {city} para averías, cortes de luz y problemas eléctricos. Atención rápida, presupuesto claro y garantía profesional.`;
}

/**
 * Generate H1 template deterministically
 */
function generateH1Template(slug: string, primaryKeyword: string): string {
  const capitalizedKeyword = capitalizeWords(primaryKeyword);

  if (slug.includes('urgencias') || slug.includes('urgente')) {
    return `${capitalizedKeyword} en {city} - Servicio 24 Horas`;
  }

  // Default H1
  return `${capitalizedKeyword} en {city}`;
}

/**
 * Generate FAQ topics deterministically
 */
function generateFaqTopics(slug: string, primaryKeyword: string): string[] {
  const topics: string[] = [];

  // Common pricing question
  topics.push(`¿Cuánto cuesta ${primaryKeyword}?`);

  // Service-specific questions based on slug
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
    // Generic fallback questions
    topics.push(`¿Cuándo necesito ${primaryKeyword}?`);
    topics.push(`¿Qué hace un electricista en ${primaryKeyword}?`);
  }

  return topics;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Capitalize first letter of each word
 */
function capitalizeWords(str: string): string {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Match child service with keyword cluster
 */
function matchCluster(childSlug: string, clusters: KeywordCluster[]): KeywordCluster | undefined {
  return clusters.find((cluster: any) => cluster.slug === childSlug);
}

// ============================================================================
// GENERATION ENGINE
// ============================================================================

/**
 * Generate SEO entries for a service
 */
function generateSeoEntries(
  semanticMap: any,
  clusters: KeywordCluster[],
  serviceName: string
): GeneratedSeoEntry[] {
  const entries: GeneratedSeoEntry[] = [];

  for (const child of (semanticMap.existingPageTargets || semanticMap.approvedChildren || [])) {
    if (child.status !== 'approved') {
      continue;
    }

    // Match with keyword cluster
    const cluster = matchCluster(child.slug, clusters);

    if (!cluster) {
      console.warn(`⚠️  Warning: No cluster found for approved child "${child.slug}" in ${serviceName}`);
      continue;
    }

    // Generate SEO template
    const template = generateSeoTemplate(child, cluster);

    entries.push({
      slug: child.slug,
      primaryKeyword: child.primaryKeyword,
      template,
      source: 'generated',
    });
  }

  return entries;
}

/**
 * Generate SEO entries for electricista service
 */
function generateElectricistaSeoEntries(): GeneratedSeoEntry[] {
  return generateSeoEntries(ELECTRICISTA_SEMANTIC_MAP, ELECTRICISTA_CLUSTERS, 'electricista');
}

/**
 * Generate SEO entries for fontanero service
 */
function generateFontaneroSeoEntries(): GeneratedSeoEntry[] {
  return generateSeoEntries(FONTANERO_SEMANTIC_MAP, FONTANERO_CLUSTERS, 'fontanero');
}

// ============================================================================
// COMPARISON ENGINE
// ============================================================================

/**
 * Compare generated entries with existing SEO map
 */
function compareWithExistingSeoMap(
  generatedEntries: GeneratedSeoEntry[]
): ComparisonReport {
  const report: ComparisonReport = {
    service: 'electricista',
    generatedEntries,
    existingEntries: Object.keys(ELECTRICISTA_SEO_MAP.children),
    missingInExisting: [],
    extraInExisting: [],
    mismatches: [],
  };

  const generatedSlugs = generatedEntries.map((e) => e.slug);
  const existingSlugs = report.existingEntries;

  // Find missing entries (in generated but not in existing)
  report.missingInExisting = generatedSlugs.filter(
    (slug) => !existingSlugs.includes(slug)
  );

  // Find extra entries (in existing but not in generated)
  report.extraInExisting = existingSlugs.filter(
    (slug) => !generatedSlugs.includes(slug)
  );

  // Compare templates for matching slugs
  for (const entry of generatedEntries) {
    const existingTemplate = ELECTRICISTA_SEO_MAP.children[entry.slug];

    if (!existingTemplate) {
      continue;
    }

    // Compare title
    if (entry.template.titleTemplate !== existingTemplate.titleTemplate) {
      report.mismatches.push({
        slug: entry.slug,
        field: 'titleTemplate',
        generated: entry.template.titleTemplate,
        existing: existingTemplate.titleTemplate,
      });
    }

    // Compare description
    if (entry.template.descriptionTemplate !== existingTemplate.descriptionTemplate) {
      report.mismatches.push({
        slug: entry.slug,
        field: 'descriptionTemplate',
        generated: entry.template.descriptionTemplate,
        existing: existingTemplate.descriptionTemplate,
      });
    }

    // Compare h1
    if (entry.template.h1Template !== existingTemplate.h1Template) {
      report.mismatches.push({
        slug: entry.slug,
        field: 'h1Template',
        generated: entry.template.h1Template,
        existing: existingTemplate.h1Template,
      });
    }
  }

  return report;
}

// ============================================================================
// EXPORT MODE - JSON DRAFT GENERATION
// ============================================================================

interface DraftJsonExport {
  service: string;
  generatedAt: string;
  source: {
    semanticMap: string;
    clusters: string;
  };
  entries: Array<{
    slug: string;
    titleTemplate: string;
    descriptionTemplate: string;
    h1Template: string;
    faqTopics: string[];
    schemaTopics?: string[];
  }>;
}

/**
 * Convert generated entries to JSON export format
 */
function createDraftExport(
  serviceName: string,
  entries: GeneratedSeoEntry[]
): DraftJsonExport {
  return {
    service: serviceName,
    generatedAt: new Date().toISOString(),
    source: {
      semanticMap: `data/seo/${serviceName}-semantic-map.ts`,
      clusters: `data/seo/${serviceName}-clusters.ts`,
    },
    entries: entries.map((entry) => ({
      slug: entry.slug,
      titleTemplate: entry.template.titleTemplate,
      descriptionTemplate: entry.template.descriptionTemplate,
      h1Template: entry.template.h1Template,
      faqTopics: entry.template.faqTopics || [],
      schemaTopics: [], // Reserved for future schema generation
    })),
  };
}

/**
 * Write draft JSON to .tmp/seo-drafts/
 */
function writeDraftJson(serviceName: string, draftData: DraftJsonExport): void {
  const outputDir = path.join(process.cwd(), '.tmp', 'seo-drafts');
  const outputFile = path.join(outputDir, `${serviceName}-seo-draft.json`);

  // Ensure directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write JSON file
  fs.writeFileSync(outputFile, JSON.stringify(draftData, null, 2), 'utf-8');
  
  console.log(`\n✅ Exported draft JSON: ${outputFile}`);
  console.log(`   Entries: ${draftData.entries.length}`);
}

// ============================================================================
// CONSOLE OUTPUT
// ============================================================================

/**
 * Print generated entries to console
 */
function printGeneratedEntries(entries: GeneratedSeoEntry[]): void {
  console.log('\n📝 GENERATED SEO ENTRIES');
  console.log('='.repeat(80));

  for (const entry of entries) {
    console.log(`\n🔹 Slug: ${entry.slug}`);
    console.log(`   Primary Keyword: ${entry.primaryKeyword}`);
    console.log(`   Title: ${entry.template.titleTemplate}`);
    console.log(`   Description: ${entry.template.descriptionTemplate}`);
    console.log(`   H1: ${entry.template.h1Template}`);
    console.log(`   FAQ Topics: ${entry.template.faqTopics?.length || 0} topics`);
    if (entry.template.faqTopics) {
      entry.template.faqTopics.forEach((topic, i) => {
        console.log(`     ${i + 1}. ${topic}`);
      });
    }
  }
}

/**
 * Print comparison report
 */
function printComparisonReport(report: ComparisonReport): void {
  console.log('\n\n📊 COMPARISON REPORT');
  console.log('='.repeat(80));

  console.log(`\n✅ Generated Entries: ${report.generatedEntries.length}`);
  console.log(`✅ Existing Entries: ${report.existingEntries.length}`);

  if (report.missingInExisting.length > 0) {
    console.log(`\n⚠️  Missing in Existing SEO Map (${report.missingInExisting.length}):`);
    report.missingInExisting.forEach((slug) => {
      console.log(`   - ${slug}`);
    });
  } else {
    console.log(`\n✅ No missing entries`);
  }

  if (report.extraInExisting.length > 0) {
    console.log(`\n⚠️  Extra in Existing SEO Map (${report.extraInExisting.length}):`);
    report.extraInExisting.forEach((slug) => {
      console.log(`   - ${slug}`);
    });
  } else {
    console.log(`\n✅ No extra entries`);
  }

  if (report.mismatches.length > 0) {
    console.log(`\n🔄 Template Mismatches (${report.mismatches.length}):`);
    report.mismatches.forEach((mismatch) => {
      console.log(`\n   Slug: ${mismatch.slug}`);
      console.log(`   Field: ${mismatch.field}`);
      console.log(`   Generated: ${mismatch.generated}`);
      console.log(`   Existing:  ${mismatch.existing}`);
    });
  } else {
    console.log(`\n✅ All templates match`);
  }
}

/**
 * Print summary
 */
function printSummary(report: ComparisonReport): void {
  console.log('\n\n📋 SUMMARY');
  console.log('='.repeat(80));

  const allMatch =
    report.missingInExisting.length === 0 &&
    report.extraInExisting.length === 0 &&
    report.mismatches.length === 0;

  if (allMatch) {
    console.log('✅ Generated SEO map matches existing SEO map perfectly!');
    console.log('✅ All approved children have SEO templates');
    console.log('✅ No orphaned SEO templates found');
  } else {
    console.log('⚠️  Differences found between generated and existing SEO maps');
    console.log(`   Missing entries: ${report.missingInExisting.length}`);
    console.log(`   Extra entries: ${report.extraInExisting.length}`);
    console.log(`   Template mismatches: ${report.mismatches.length}`);
  }

  console.log('\n⚠️  IMPORTANT: This script does NOT write files');
  console.log('⚠️  Generated output is for review only');
  console.log('⚠️  Production SEO data remains unchanged\n');
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

function main(): void {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const isExportMode = args.includes('--export');

  console.log('\n🚀 SEO MAP GENERATOR - FOUNDATION');
  console.log('='.repeat(80));
  console.log('Services: electricista, fontanero');
  console.log('Mode: Deterministic rule-based generation (NO AI)');
  console.log(`Output: ${isExportMode ? 'JSON export to .tmp/seo-drafts/' : 'Console only'}`);
  console.log('='.repeat(80));

  try {
    // ========================================================================
    // ELECTRICISTA SERVICE
    // ========================================================================
    console.log('\n\n📍 SERVICE: ELECTRICISTA');
    console.log('='.repeat(80));

    console.log('\n🔄 Step 1: Reading Semantic Layer...');
    console.log(`   Approved children: ${(ELECTRICISTA_SEMANTIC_MAP.existingPageTargets || ELECTRICISTA_SEMANTIC_MAP.approvedChildren || []).length}`);
    console.log(`   Available clusters: ${ELECTRICISTA_CLUSTERS.length}`);

    console.log('\n🔄 Step 2: Generating SEO templates...');
    const electricistaEntries = generateElectricistaSeoEntries();
    console.log(`   Generated: ${electricistaEntries.length} SEO templates`);

    if (isExportMode) {
      // Export mode: Write JSON draft
      console.log('\n🔄 Step 3: Exporting to JSON draft...');
      const electricistaDraft = createDraftExport('electricista', electricistaEntries);
      writeDraftJson('electricista', electricistaDraft);
    } else {
      // Console mode: Compare with existing and print
      console.log('\n🔄 Step 3: Comparing with existing SEO map...');
      const electricistaReport = compareWithExistingSeoMap(electricistaEntries);
      printGeneratedEntries(electricistaEntries);
      printComparisonReport(electricistaReport);
    }

    // ========================================================================
    // FONTANERO SERVICE
    // ========================================================================
    console.log('\n\n📍 SERVICE: FONTANERO');
    console.log('='.repeat(80));

    console.log('\n🔄 Step 1: Reading Semantic Layer...');
    console.log(`   Approved children: ${(FONTANERO_SEMANTIC_MAP.existingPageTargets || FONTANERO_SEMANTIC_MAP.approvedChildren || []).length}`);
    console.log(`   Available clusters: ${FONTANERO_CLUSTERS.length}`);

    console.log('\n🔄 Step 2: Generating SEO templates...');
    const fontaneroEntries = generateFontaneroSeoEntries();
    console.log(`   Generated: ${fontaneroEntries.length} SEO templates`);

    if (isExportMode) {
      // Export mode: Write JSON draft
      console.log('\n🔄 Step 3: Exporting to JSON draft...');
      const fontaneroDraft = createDraftExport('fontanero', fontaneroEntries);
      writeDraftJson('fontanero', fontaneroDraft);
    } else {
      // Console mode: Print (no comparison for fontanero yet)
      printGeneratedEntries(fontaneroEntries);
    }

    // ========================================================================
    // SUMMARY
    // ========================================================================
    console.log('\n\n📋 SUMMARY');
    console.log('='.repeat(80));

    if (isExportMode) {
      console.log('✅ Export mode completed successfully');
      console.log(`✅ Generated draft JSON files in: .tmp/seo-drafts/`);
      console.log(`   - electricista-seo-draft.json (${electricistaEntries.length} entries)`);
      console.log(`   - fontanero-seo-draft.json (${fontaneroEntries.length} entries)`);
      console.log('\n⚠️  IMPORTANT: Draft JSON files are NOT production data');
      console.log('⚠️  These are temporary files for review/API integration');
      console.log('⚠️  Production SEO maps remain unchanged');
    } else {
      console.log('✅ Console mode completed successfully');
      console.log('✅ Generated SEO templates for electricista and fontanero');
      console.log(`   - Electricista: ${electricistaEntries.length} entries`);
      console.log(`   - Fontanero: ${fontaneroEntries.length} entries`);
      console.log('\n⚠️  IMPORTANT: No files were written');
      console.log('⚠️  Generated output is for review only');
      console.log('⚠️  Production SEO data remains unchanged');
    }

    console.log('\n');
  } catch (error) {
    console.error('\n❌ Error running SEO Map Generator:', error);
    process.exit(1);
  }
}

// Run the script
main();
