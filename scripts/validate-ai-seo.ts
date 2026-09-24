#!/usr/bin/env ts-node
/**
 * AI SEO Production Entry Validation Script
 * 
 * UPGRADE: Now validates complete ProductionSEOEntry-compatible output
 * instead of just AISEOEntry skeletons.
 * 
 * PURPOSE:
 * Validates AI-generated ProductionSEOEntry draft JSON files against:
 * - Semantic governance rules
 * - Structural completeness
 * - Content quality requirements
 * - Forbidden terms compliance
 * 
 * This is a safety layer before any AI content can be approved for production.
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// TYPES
// ============================================================================

interface ProductionSEODraft {
  slug: string;
  pageSlug?: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroSubtitle?: string;
  governance: {
    serviceGroup: string;
    childServiceSlug?: string;
    primaryKeyword: string;
    secondaryKeywords?: string[];
    validated: boolean;
  };
  faqItems: Array<{
    question: string;
    answer: string;
  }>;
  schemaTopics: string[];
  seoTextBlocks: Array<{
    id: string;
    heading?: string;
    content: string;
    priority?: 'high' | 'medium' | 'low';
  }>;
  aiOverviewBlocks: Array<{
    id: string;
    question: string;
    answer: string;
    keywords?: string[];
  }>;
}

interface ValidationError {
  service: string;
  slug: string;
  field: string;
  problem: string;
  offendingValue: string;
}

// ============================================================================
// FORBIDDEN TERMS
// ============================================================================

const ELECTRICISTA_FORBIDDEN_TERMS = [
  'boletín eléctrico',
  'boletin electrico',
  'certificado eléctrico',
  'certificado electrico',
  'cie',
  'legalización eléctrica',
  'legwalizacion electrica',
  'fontanero',
  'fuga de agua',
  'tubería',
  'tuberías',
  'desatasco',
  'desatascos',
];

const FONTANERO_FORBIDDEN_TERMS = [
  'electricista',
  'eléctrico',
  'electrico',
  'cuadro eléctrico',
  'cuadro electrico',
  'diferencial eléctrico',
  'diferencial electrico',
  'boletín eléctrico',
  'boletin electrico',
  'cie',
];

// ============================================================================
// SEMANTIC MAP + PAGE REGISTRY LOADING
// ============================================================================

function loadSemanticMap(service: string): Set<string> {
  try {
    const semanticMapPath = path.join(
      __dirname,
      '..',
      'data',
      'seo',
      `${service}-semantic-map.ts`
    );
    
    if (!fs.existsSync(semanticMapPath)) {
      console.warn(`⚠️  Semantic map not found: ${service}-semantic-map.ts`);
      return new Set();
    }

    const content = fs.readFileSync(semanticMapPath, 'utf-8');
    const slugs = new Set<string>();

    const childServiceMatches = content.matchAll(/slug:\s*['"]([^'"]+)['"]/g);
    for (const match of childServiceMatches) {
      slugs.add(match[1]);
    }

    return slugs;
  } catch (error) {
    console.error(`Error loading semantic map for ${service}:`, error);
    return new Set();
  }
}

function loadPageRegistry(service: string): Set<string> {
  try {
    const registryPath = path.join(
      __dirname,
      '..',
      'data',
      'seo',
      'page-registry.ts'
    );
    
    if (!fs.existsSync(registryPath)) {
      console.warn(`⚠️  Page registry not found - skipping page permission check`);
      return new Set();
    }

    const content = fs.readFileSync(registryPath, 'utf-8');
    const allowedSlugs = new Set<string>();

    // Find service-specific section and extract allowed slugs
    const serviceRegex = new RegExp(
      `${service.toUpperCase()}_PAGE_REGISTRY[\\s\\S]*?children:\\s*\\[([\\s\\S]*?)\\]`,
      'i'
    );
    const serviceMatch = content.match(serviceRegex);
    
    if (serviceMatch) {
      const childrenBlock = serviceMatch[1];
      const slugMatches = childrenBlock.matchAll(/slug:\s*['"]([^'"]+)['"],\s*allowed:\s*true/g);
      for (const match of slugMatches) {
        allowedSlugs.add(match[1]);
      }
    }

    return allowedSlugs;
  } catch (error) {
    console.error(`Error loading page registry for ${service}:`, error);
    return new Set();
  }
}

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

function validateSlug(slug: string, approvedSlugs: Set<string>): boolean {
  return approvedSlugs.has(slug);
}

function validatePagePermission(
  slug: string,
  service: string,
  allowedPages: Set<string>
): { valid: boolean; reason?: string } {
  // If no registry loaded, skip check
  if (allowedPages.size === 0) {
    return { valid: true };
  }
  
  if (!allowedPages.has(slug)) {
    return {
      valid: false,
      reason: `Page not allowed by registry - check data/seo/page-registry.ts`
    };
  }
  
  return { valid: true };
}

function validateMetaTitle(title: string): { valid: boolean; reason?: string } {
  if (!title || title.trim() === '') {
    return { valid: false, reason: 'Empty metaTitle' };
  }
  if (title.length > 60) {
    return { valid: false, reason: `metaTitle too long (${title.length} > 60 chars)` };
  }
  return { valid: true };
}

function validateMetaDescription(description: string): { valid: boolean; reason?: string } {
  if (!description || description.trim() === '') {
    return { valid: false, reason: 'Empty metaDescription' };
  }
  if (description.length > 155) {
    return { valid: false, reason: `metaDescription too long (${description.length} > 155 chars)` };
  }
  return { valid: true };
}

function validateH1(h1: string): { valid: boolean; reason?: string } {
  if (!h1 || h1.trim() === '') {
    return { valid: false, reason: 'Empty H1' };
  }
  return { valid: true };
}

function validateFAQItems(faqItems: any): { valid: boolean; reason?: string } {
  if (!Array.isArray(faqItems)) {
    return { valid: false, reason: 'faqItems is not an array' };
  }
  if (faqItems.length < 4) {
    return { valid: false, reason: `Too few FAQ items (${faqItems.length} < 4)` };
  }
  if (faqItems.length > 8) {
    return { valid: false, reason: `Too many FAQ items (${faqItems.length} > 8)` };
  }
  
  for (let i = 0; i < faqItems.length; i++) {
    const item = faqItems[i];
    if (!item.question || !item.answer) {
      return { valid: false, reason: `FAQ item ${i} missing question or answer` };
    }
  }
  
  return { valid: true };
}

function validateSEOTextBlocks(blocks: any): { valid: boolean; reason?: string } {
  if (!Array.isArray(blocks)) {
    return { valid: false, reason: 'seoTextBlocks is not an array' };
  }
  if (blocks.length === 0) {
    return { valid: false, reason: 'No seoTextBlocks provided (min 3 recommended)' };
  }
  
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (!block.id || !block.content) {
      return { valid: false, reason: `SEO text block ${i} missing id or content` };
    }
  }
  
  return { valid: true };
}

function validateAIOverviewBlocks(blocks: any): { valid: boolean; reason?: string } {
  if (!Array.isArray(blocks)) {
    return { valid: false, reason: 'aiOverviewBlocks is not an array' };
  }
  if (blocks.length === 0) {
    return { valid: false, reason: 'No aiOverviewBlocks provided (min 2 recommended)' };
  }
  
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (!block.id || !block.question || !block.answer) {
      return { valid: false, reason: `AI Overview block ${i} missing id, question, or answer` };
    }
  }
  
  return { valid: true };
}

function validateGovernance(governance: any): { valid: boolean; reason?: string } {
  if (!governance) {
    return { valid: false, reason: 'Missing governance metadata' };
  }
  if (!governance.serviceGroup) {
    return { valid: false, reason: 'Missing governance.serviceGroup' };
  }
  if (!governance.primaryKeyword) {
    return { valid: false, reason: 'Missing governance.primaryKeyword' };
  }
  return { valid: true };
}

function checkTermMatch(text: string, term: string): boolean {
  const lowerTerm = term.toLowerCase();
  
  if (!lowerTerm.includes(' ')) {
    const regex = new RegExp(`\\b${escapeRegex(lowerTerm)}\\b`, 'i');
    return regex.test(text);
  }
  
  return text.toLowerCase().includes(lowerTerm);
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function checkForbiddenTerms(
  text: string,
  forbiddenTerms: string[],
  service: string,
  slug?: string
): string | null {
  const lowerText = text.toLowerCase();
  
  // Special case for electricista: "fuga eléctrica" is allowed
  if (service === 'electricista' && lowerText.includes('fuga eléctrica')) {
    const cleanedText = lowerText.replace(/fuga eléctrica/g, '');
    for (const term of forbiddenTerms) {
      if (checkTermMatch(cleanedText, term)) {
        return term;
      }
    }
    return null;
  }
  
  // Special case for fontanero calentadores-termos: "termo eléctrico" is allowed
  if (service === 'fontanero' && slug === 'calentadores-termos') {
    const cleanedText = lowerText
      .replace(/termo eléctrico/g, '')
      .replace(/termos eléctricos/g, '');
    for (const term of forbiddenTerms) {
      if (checkTermMatch(cleanedText, term)) {
        return term;
      }
    }
    return null;
  }
  
  for (const term of forbiddenTerms) {
    if (checkTermMatch(lowerText, term)) {
      return term;
    }
  }
  return null;
}

// ============================================================================
// MAIN VALIDATION
// ============================================================================

function validateProductionSEODraft(
  entry: ProductionSEODraft,
  service: string,
  approvedSlugs: Set<string>,
  forbiddenTerms: string[],
  allowedPages?: Set<string>
): ValidationError[] {
  const errors: ValidationError[] = [];

  // 1. Validate slug is approved
  if (!validateSlug(entry.slug, approvedSlugs)) {
    errors.push({
      service,
      slug: entry.slug,
      field: 'slug',
      problem: 'Slug not found in approved semantic map',
      offendingValue: entry.slug,
    });
  }

  // 1b. Validate page permission (if registry available)
  if (allowedPages && allowedPages.size > 0) {
    const pagePermissionCheck = validatePagePermission(entry.slug, service, allowedPages);
    if (!pagePermissionCheck.valid) {
      errors.push({
        service,
        slug: entry.slug,
        field: 'slug',
        problem: pagePermissionCheck.reason!,
        offendingValue: entry.slug,
      });
    }
  }

  // 2. Validate metaTitle
  const titleValidation = validateMetaTitle(entry.metaTitle);
  if (!titleValidation.valid) {
    errors.push({
      service,
      slug: entry.slug,
      field: 'metaTitle',
      problem: titleValidation.reason!,
      offendingValue: entry.metaTitle,
    });
  }

  // 3. Validate metaDescription
  const descValidation = validateMetaDescription(entry.metaDescription);
  if (!descValidation.valid) {
    errors.push({
      service,
      slug: entry.slug,
      field: 'metaDescription',
      problem: descValidation.reason!,
      offendingValue: entry.metaDescription,
    });
  }

  // 4. Validate H1
  const h1Validation = validateH1(entry.h1);
  if (!h1Validation.valid) {
    errors.push({
      service,
      slug: entry.slug,
      field: 'h1',
      problem: h1Validation.reason!,
      offendingValue: entry.h1,
    });
  }

  // 5. Validate governance
  const governanceValidation = validateGovernance(entry.governance);
  if (!governanceValidation.valid) {
    errors.push({
      service,
      slug: entry.slug,
      field: 'governance',
      problem: governanceValidation.reason!,
      offendingValue: JSON.stringify(entry.governance || {}),
    });
  }

  // 6. Validate faqItems
  const faqValidation = validateFAQItems(entry.faqItems);
  if (!faqValidation.valid) {
    errors.push({
      service,
      slug: entry.slug,
      field: 'faqItems',
      problem: faqValidation.reason!,
      offendingValue: JSON.stringify(entry.faqItems),
    });
  }

  // 7. Validate schemaTopics
  if (!entry.schemaTopics || entry.schemaTopics.length < 3) {
    errors.push({
      service,
      slug: entry.slug,
      field: 'schemaTopics',
      problem: `Too few schema topics (${entry.schemaTopics?.length || 0} < 3)`,
      offendingValue: JSON.stringify(entry.schemaTopics || []),
    });
  }

  // 8. Validate seoTextBlocks
  const seoBlocksValidation = validateSEOTextBlocks(entry.seoTextBlocks);
  if (!seoBlocksValidation.valid) {
    errors.push({
      service,
      slug: entry.slug,
      field: 'seoTextBlocks',
      problem: seoBlocksValidation.reason!,
      offendingValue: `${entry.seoTextBlocks?.length || 0} blocks`,
    });
  }

  // 9. Validate aiOverviewBlocks
  const aiBlocksValidation = validateAIOverviewBlocks(entry.aiOverviewBlocks);
  if (!aiBlocksValidation.valid) {
    errors.push({
      service,
      slug: entry.slug,
      field: 'aiOverviewBlocks',
      problem: aiBlocksValidation.reason!,
      offendingValue: `${entry.aiOverviewBlocks?.length || 0} blocks`,
    });
  }

  // 10. Check forbidden terms in all text fields
  const fieldsToCheck = [
    { name: 'metaTitle', value: entry.metaTitle },
    { name: 'metaDescription', value: entry.metaDescription },
    { name: 'h1', value: entry.h1 },
    { name: 'heroSubtitle', value: entry.heroSubtitle || '' },
  ];

  // Add FAQ content
  if (Array.isArray(entry.faqItems)) {
    entry.faqItems.forEach((faq, idx) => {
      fieldsToCheck.push({ name: `faqItems[${idx}].question`, value: faq.question });
      fieldsToCheck.push({ name: `faqItems[${idx}].answer`, value: faq.answer });
    });
  }

  // Add SEO text blocks
  if (Array.isArray(entry.seoTextBlocks)) {
    entry.seoTextBlocks.forEach((block, idx) => {
      fieldsToCheck.push({ name: `seoTextBlocks[${idx}].content`, value: block.content });
      if (block.heading) {
        fieldsToCheck.push({ name: `seoTextBlocks[${idx}].heading`, value: block.heading });
      }
    });
  }

  // Add AI Overview blocks
  if (Array.isArray(entry.aiOverviewBlocks)) {
    entry.aiOverviewBlocks.forEach((block, idx) => {
      fieldsToCheck.push({ name: `aiOverviewBlocks[${idx}].question`, value: block.question });
      fieldsToCheck.push({ name: `aiOverviewBlocks[${idx}].answer`, value: block.answer });
    });
  }

  // Check all fields for forbidden terms
  for (const field of fieldsToCheck) {
    if (!field.value) continue;
    
    const forbiddenTerm = checkForbiddenTerms(field.value, forbiddenTerms, service, entry.slug);
    if (forbiddenTerm) {
      errors.push({
        service,
        slug: entry.slug,
        field: field.name,
        problem: `Contains forbidden term: "${forbiddenTerm}"`,
        offendingValue: field.value.substring(0, 100) + (field.value.length > 100 ? '...' : ''),
      });
    }
  }

  return errors;
}

// ============================================================================
// APPROVAL MANAGEMENT
// ============================================================================

function ensureApprovedDirectory(): string {
  const approvedDir = path.join(process.cwd(), '.tmp', 'seo-ai-approved');
  
  if (!fs.existsSync(approvedDir)) {
    fs.mkdirSync(approvedDir, { recursive: true });
  }
  
  return approvedDir;
}

function writeApprovedEntries(service: string, entries: ProductionSEODraft[], approvedDir: string): void {
  const filename = `${service}-approved-seo.json`;
  const filepath = path.join(approvedDir, filename);
  
  fs.writeFileSync(filepath, JSON.stringify(entries, null, 2), 'utf-8');
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function validateAISEO(): Promise<number> {
  console.log('🔍 ProductionSEOEntry Validator + Auto-Approval');
  console.log('================================================\n');
  
  const draftsDir = path.join(__dirname, '..', '.tmp', 'seo-ai-drafts');

  if (!fs.existsSync(draftsDir)) {
    console.log('⚠️  No AI SEO draft files found. Nothing to validate.');
    console.log(`Expected directory: ${draftsDir}`);
    return 0;
  }

  const draftFiles = fs.readdirSync(draftsDir).filter((f: string) => f.endsWith('-production-seo.json'));

  if (draftFiles.length === 0) {
    console.log('⚠️  No ProductionSEOEntry draft files found.');
    console.log(`Looking for: *-production-seo.json in ${draftsDir}`);
    return 0;
  }

  console.log(`Found ${draftFiles.length} draft file(s) to validate\n`);

  const approvedDir = ensureApprovedDirectory();
  
  let totalEntries = 0;
  let totalApproved = 0;
  let totalRejected = 0;
  const rejectionReasons: { service: string; slug: string; reasons: string[] }[] = [];

  for (const file of draftFiles) {
    const filePath = path.join(draftsDir, file);
    const service = file.replace('-production-seo.json', '');

    console.log(`Validating ${file}...`);

    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const entries: ProductionSEODraft[] = JSON.parse(content);

      totalEntries += entries.length;
      const approvedSlugs = loadSemanticMap(service);
      const allowedPages = loadPageRegistry(service);

      let forbiddenTerms: string[] = [];
      if (service === 'electricista') {
        forbiddenTerms = ELECTRICISTA_FORBIDDEN_TERMS;
      } else if (service === 'fontanero') {
        forbiddenTerms = FONTANERO_FORBIDDEN_TERMS;
      }

      const approvedEntries: ProductionSEODraft[] = [];
      
      for (const entry of entries) {
        const errors = validateProductionSEODraft(entry, service, approvedSlugs, forbiddenTerms, allowedPages);
        
        if (errors.length === 0) {
          approvedEntries.push(entry);
          totalApproved++;
        } else {
          totalRejected++;
          rejectionReasons.push({
            service,
            slug: entry.slug,
            reasons: errors.map(e => `${e.field}: ${e.problem}`)
          });
        }
      }

      if (approvedEntries.length > 0) {
        writeApprovedEntries(service, approvedEntries, approvedDir);
        console.log(`  ✅ Approved ${approvedEntries.length}/${entries.length} entries from ${service}`);
      } else {
        console.log(`  ❌ Rejected all ${entries.length} entries from ${service}`);
      }
    } catch (error: any) {
      console.error(`  ❌ Error processing ${file}: ${error.message}`);
      return 1;
    }
  }

  console.log('\n================================================');
  console.log('VALIDATION SUMMARY');
  console.log('================================================');
  console.log(`Total entries processed: ${totalEntries}`);
  console.log(`✅ Approved entries: ${totalApproved}`);
  console.log(`❌ Rejected entries: ${totalRejected}`);
  console.log('================================================\n');

  if (totalRejected > 0) {
    console.log('REJECTION DETAILS:\n');
    rejectionReasons.forEach((rejection, index) => {
      console.log(`${index + 1}. ${rejection.service}/${rejection.slug}`);
      rejection.reasons.forEach(reason => {
        console.log(`   - ${reason}`);
      });
      console.log('');
    });
  }

  if (totalApproved > 0) {
    console.log('APPROVED OUTPUT:');
    console.log(`  📁 Directory: ${approvedDir}`);
    console.log(`  ✅ ${totalApproved} production-ready entries`);
    console.log('\nAPPROVED FILES:');
    const approvedFiles = fs.readdirSync(approvedDir).filter((f: string) => f.endsWith('-approved-seo.json'));
    approvedFiles.forEach((file: string) => {
      console.log(`  - ${file}`);
    });
  }

  console.log('\n================================================');
  
  if (totalApproved === totalEntries) {
    console.log('✅ ALL ENTRIES APPROVED - Pipeline ready for production');
    return 0;
  } else if (totalApproved > 0) {
    console.log(`⚠️  PARTIAL APPROVAL - ${totalApproved}/${totalEntries} entries approved`);
    console.log('Review rejected entries and regenerate if needed');
    return 0;
  } else {
    console.log('❌ NO ENTRIES APPROVED - All drafts rejected');
    return 1;
  }
}

validateAISEO()
  .then((exitCode) => {
    process.exit(exitCode);
  })
  .catch((error) => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });
