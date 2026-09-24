#!/usr/bin/env ts-node
/**
 * AI SEO Draft Engine - OpenAI Integration
 * 
 * PURPOSE:
 * Generate COMPLETE ProductionSEOEntry-compatible SEO content from Semantic Layer using OpenAI API.
 * 
 * UPGRADE: Now generates complete production-ready output instead of AISEOEntry skeletons.
 * 
 * MODES:
 * - API MODE: Uses OpenAI API when OPENAI_API_KEY is available
 * - DRY MODE: Generates prompt payloads only when API key is missing
 * 
 * SAFETY:
 * - Does NOT modify production data/seo/*.ts files
 * - Does NOT modify pages or routes
 * - Does NOT write to production content files
 * - Only reads from semantic layer, writes to .tmp/
 * - Graceful fallback on API errors
 * 
 * GOVERNANCE:
 * - Respects semantic ownership (no cross-service keywords)
 * - Applies constraint rules (e.g., Electricista avoids boletín keywords)
 * - Only processes approved child services
 * - Maintains Spanish-only focus
 */

// Use CommonJS require with no file extensions (for ts-node compatibility)
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
const { ELECTRICISTA_CLUSTERS } = require('../data/seo/electricista-clusters');
const { ELECTRICISTA_SEMANTIC_MAP } = require('../data/seo/electricista-semantic-map');
const { FONTANERO_CLUSTERS } = require('../data/seo/fontanero-clusters');
const { FONTANERO_SEMANTIC_MAP } = require('../data/seo/fontanero-semantic-map');

// Only import OpenAI if we're using it
let OpenAI: any = null;
try {
  OpenAI = require('openai').default || require('openai');
} catch (err) {
  console.warn('⚠️  OpenAI package not found. Running in DRY MODE only.');
}

// ============================================================================
// TYPES
// ============================================================================

interface AIPromptPayload {
  service: string;
  slug: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  longTailKeywords?: string[];
  commercialIntent: string;
  task: string;
  constraints: {
    language: string;
    market: string;
    locationPlaceholder: string;
    titleMaxLength: number;
    descriptionMaxLength: number;
    avoid: string[];
  };
}

interface ServicePromptData {
  service: string;
  prompts: AIPromptPayload[];
}

// ProductionSEOEntry-compatible output
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
    validatedAt?: string;
    validationNotes?: string;
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
  overrides?: {
    heroSubtitle?: string;
  };
  lastUpdated: string;
  editorNotes?: string;
}

// ============================================================================
// CONSTRAINT RULES
// ============================================================================

const ELECTRICISTA_AVOID_KEYWORDS = [
  'boletín eléctrico',
  'boletín de instalación eléctrica',
  'boletín',
  'certificado eléctrico',
  'certificado de instalación eléctrica',
  'CIE',
  'cie',
  'legalización eléctrica',
  'legalización instalación eléctrica',
  'certificación eléctrica',
  'certificado',
  'legalización',
];

const FONTANERO_AVOID_KEYWORDS = [
  'electricista',
  'eléctrico (except in calentadores-termos: termo eléctrico)',
  'eléctrica',
  'instalación eléctrica',
  'cuadro eléctrico',
  'cableado',
  'iluminación led',
  'enchufe',
  'interruptor',
];

// ============================================================================
// GENERATORS
// ============================================================================

function generateElectricistaPrompts(): AIPromptPayload[] {
  const approvedChildren = ELECTRICISTA_SEMANTIC_MAP.approvedChildren.filter(
    (child: any) => child.status === 'approved'
  );
  const prompts: AIPromptPayload[] = [];

  for (const child of approvedChildren) {
    const cluster = ELECTRICISTA_CLUSTERS.find((c: any) => c.slug === child.slug);
    
    if (!cluster) {
      console.warn(`⚠️  No cluster found for Electricista child: ${child.slug}`);
      continue;
    }

    prompts.push({
      service: 'electricista',
      slug: child.slug,
      primaryKeyword: cluster.primaryKeyword,
      secondaryKeywords: cluster.secondaryKeywords,
      longTailKeywords: cluster.longTailKeywords || [],
      commercialIntent: cluster.commercialIntent,
      task: 'Generate complete ProductionSEOEntry-compatible SEO content',
      constraints: {
        language: 'Spanish',
        market: 'Spain',
        locationPlaceholder: '{city}',
        titleMaxLength: 60,
        descriptionMaxLength: 155,
        avoid: ELECTRICISTA_AVOID_KEYWORDS,
      },
    });
  }

  return prompts;
}

function generateFontaneroPrompts(): AIPromptPayload[] {
  const approvedChildren = FONTANERO_SEMANTIC_MAP.approvedChildren.filter(
    (child: any) => child.status === 'approved'
  );
  const prompts: AIPromptPayload[] = [];

  for (const child of approvedChildren) {
    const cluster = FONTANERO_CLUSTERS.find((c: any) => c.slug === child.slug);
    
    if (!cluster) {
      console.warn(`⚠️  No cluster found for Fontanero child: ${child.slug}`);
      continue;
    }

    const avoidKeywords = child.slug === 'calentadores-termos'
      ? FONTANERO_AVOID_KEYWORDS.filter(k => !k.includes('eléctrico'))
      : FONTANERO_AVOID_KEYWORDS;

    prompts.push({
      service: 'fontanero',
      slug: child.slug,
      primaryKeyword: cluster.primaryKeyword,
      secondaryKeywords: cluster.secondaryKeywords,
      longTailKeywords: cluster.longTailKeywords || [],
      commercialIntent: cluster.commercialIntent,
      task: 'Generate complete ProductionSEOEntry-compatible SEO content',
      constraints: {
        language: 'Spanish',
        market: 'Spain',
        locationPlaceholder: '{city}',
        titleMaxLength: 60,
        descriptionMaxLength: 155,
        avoid: avoidKeywords,
      },
    });
  }

  return prompts;
}

// ============================================================================
// OPENAI API INTEGRATION
// ============================================================================

function hasOpenAIKey(): boolean {
  return !!(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim() !== '');
}

function buildSystemPrompt(): string {
  return `You are an expert SEO content generator for Reparar24, a Spanish home repair services platform.

Generate COMPLETE production-ready SEO content with ALL required fields.

CRITICAL RULES:
- SPANISH ONLY - no English
- Commercial intent - users want to hire services
- Natural language - NO keyword stuffing
- NO copying existing content
- STRICT forbidden keywords compliance
- AI Overview optimization

Output STRICT JSON format with ALL fields:
{
  "slug": "service-slug",
  "metaTitle": "Title max 60 chars with {city}",
  "metaDescription": "Description max 155 chars",
  "h1": "Action-oriented headline",
  "heroSubtitle": "Optional 1-sentence subtitle",
  "faqItems": [
    {"question": "¿Question?", "answer": "Detailed 2-3 sentence answer"},
    ... (4-6 items)
  ],
  "schemaTopics": ["topic1", "topic2", "topic3"],
  "seoTextBlocks": [
    {"id": "block1", "heading": "Heading", "content": "2-3 paragraphs", "priority": "high"},
    {"id": "block2", "heading": "Heading", "content": "2-3 paragraphs", "priority": "medium"},
    {"id": "block3", "heading": "Heading", "content": "2-3 paragraphs", "priority": "medium"}
  ],
  "aiOverviewBlocks": [
    {"id": "ao1", "question": "Question", "answer": "1-2 sentence answer", "keywords": ["kw1", "kw2"]},
    {"id": "ao2", "question": "Question", "answer": "1-2 sentence answer", "keywords": ["kw3"]},
    ... (2-4 items)
  ]
}

Content quality:
- FAQ: Helpful, specific, 2-3 sentences
- SEO blocks: Natural flow, 2-3 paragraphs each
- AI blocks: Concise, direct, 1-2 sentences
- Include practical info (pricing, timing, process)`;
}

function buildUserPrompt(payload: AIPromptPayload): string {
  return `Generate COMPLETE production-ready SEO content:

SERVICE: ${payload.service}
SLUG: ${payload.slug}
PRIMARY KEYWORD: ${payload.primaryKeyword}
SECONDARY KEYWORDS: ${payload.secondaryKeywords.join(', ')}
${payload.longTailKeywords && payload.longTailKeywords.length > 0 ? `LONG-TAIL: ${payload.longTailKeywords.join(', ')}` : ''}
COMMERCIAL INTENT: ${payload.commercialIntent}

CONSTRAINTS:
- Language: ${payload.constraints.language} (SPANISH ONLY)
- Market: Valencia, ${payload.constraints.market}
- Location: ${payload.constraints.locationPlaceholder} in metaTitle
- Title: max ${payload.constraints.titleMaxLength} chars
- Description: max ${payload.constraints.descriptionMaxLength} chars
- FORBIDDEN: ${payload.constraints.avoid.join(', ')}

Generate complete JSON with ALL fields: slug, metaTitle, metaDescription, h1, heroSubtitle, faqItems, schemaTopics, seoTextBlocks, aiOverviewBlocks`;
}

async function generateSEOWithAI(
  client: any,
  payload: AIPromptPayload,
  model: string = 'gpt-4o'
): Promise<ProductionSEODraft | null> {
  try {
    const response = await client.chat.completions.create({
      model: model,
      messages: [
        { role: 'system', content: buildSystemPrompt() },
        { role: 'user', content: buildUserPrompt(payload) }
      ],
      temperature: 0.7,
      max_tokens: 3000,
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      console.warn(`⚠️  No content returned for ${payload.slug}`);
      return null;
    }

    const parsed = JSON.parse(content);
    
    // Build complete ProductionSEODraft
    const draft: ProductionSEODraft = {
      slug: parsed.slug || payload.slug,
      pageSlug: `${payload.service}/${parsed.slug || payload.slug}`,
      metaTitle: parsed.metaTitle || parsed.title || '',
      metaDescription: parsed.metaDescription || parsed.description || '',
      h1: parsed.h1 || '',
      heroSubtitle: parsed.heroSubtitle || undefined,
      governance: {
        serviceGroup: payload.service,
        childServiceSlug: payload.slug,
        primaryKeyword: payload.primaryKeyword,
        secondaryKeywords: payload.secondaryKeywords,
        validated: false,
        validatedAt: undefined,
        validationNotes: 'AI-generated draft - requires human review'
      },
      faqItems: Array.isArray(parsed.faqItems) ? parsed.faqItems : [],
      schemaTopics: Array.isArray(parsed.schemaTopics) ? parsed.schemaTopics : [],
      seoTextBlocks: Array.isArray(parsed.seoTextBlocks) ? parsed.seoTextBlocks : [],
      aiOverviewBlocks: Array.isArray(parsed.aiOverviewBlocks) ? parsed.aiOverviewBlocks : [],
      overrides: parsed.heroSubtitle ? { heroSubtitle: parsed.heroSubtitle } : undefined,
      lastUpdated: new Date().toISOString(),
      editorNotes: `Generated by AI for ${payload.primaryKeyword} - ${payload.commercialIntent} intent`
    };

    // Validate minimum requirements
    if (!draft.metaTitle || !draft.metaDescription || !draft.h1 || draft.faqItems.length === 0) {
      console.warn(`⚠️  Incomplete response for ${payload.slug}`);
      return null;
    }

    return draft;
  } catch (error: any) {
    console.error(`❌ API error for ${payload.slug}:`, error.message);
    return null;
  }
}

async function processPromptsWithAI(
  prompts: AIPromptPayload[],
  service: string
): Promise<ProductionSEODraft[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey || !OpenAI) {
    throw new Error('OpenAI API key or client not available');
  }

  const client = new OpenAI({ apiKey });
  const results: ProductionSEODraft[] = [];
  
  const model = 'gpt-4o';
  
  console.log(`  Using model: ${model}`);
  console.log(`  Processing ${prompts.length} prompts...`);
  
  for (let i = 0; i < prompts.length; i++) {
    const prompt = prompts[i];
    console.log(`  [${i + 1}/${prompts.length}] Generating: ${prompt.slug}...`);
    
    const result = await generateSEOWithAI(client, prompt, model);
    
    if (result) {
      results.push(result);
      console.log(`    ✅ Generated complete ProductionSEOEntry`);
    } else {
      console.log(`    ⚠️  Skipped (error)`);
    }
    
    if (i < prompts.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  return results;
}

// ============================================================================
// OUTPUT MANAGEMENT
// ============================================================================

function ensureOutputDirectory(): string {
  const outputDir = path.join(process.cwd(), '.tmp', 'seo-ai-drafts');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`✅ Created output directory: ${outputDir}`);
  }
  
  return outputDir;
}

function writePromptPayloads(service: string, prompts: AIPromptPayload[], outputDir: string): void {
  const filename = `${service}-ai-prompts.json`;
  const filepath = path.join(outputDir, filename);
  
  const data: ServicePromptData = {
    service,
    prompts,
  };
  
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`✅ Generated ${prompts.length} prompts for ${service}: ${filename}`);
}

function writeSEOResults(service: string, results: ProductionSEODraft[], outputDir: string): void {
  const filename = `${service}-production-seo.json`;
  const filepath = path.join(outputDir, filename);
  
  fs.writeFileSync(filepath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`✅ Generated ${results.length} ProductionSEOEntry drafts for ${service}: ${filename}`);
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
  console.log('🤖 AI SEO Factory - Production Entry Generator');
  console.log('===============================================\n');
  
  const hasKey = hasOpenAIKey();
  const mode = hasKey ? 'API MODE' : 'DRY MODE';
  
  console.log(`MODE: ${mode}`);
  if (hasKey) {
    console.log('✅ OPENAI_API_KEY detected');
    console.log('📡 Will generate complete ProductionSEOEntry drafts');
  } else {
    console.log('⚠️  OPENAI_API_KEY not found');
    console.log('📝 Will generate prompt payloads only');
  }
  console.log('OUTPUT: .tmp/seo-ai-drafts/\n');
  
  const outputDir = ensureOutputDirectory();
  console.log('');
  
  console.log('⚡ Processing Electricista service...');
  const electricistaPrompts = generateElectricistaPrompts();
  
  if (hasKey) {
    try {
      const electricistaResults = await processPromptsWithAI(electricistaPrompts, 'electricista');
      writeSEOResults('electricista', electricistaResults, outputDir);
    } catch (error: any) {
      console.error(`❌ API error for Electricista: ${error.message}`);
      console.log('⚠️  Falling back to DRY MODE for Electricista');
      writePromptPayloads('electricista', electricistaPrompts, outputDir);
    }
  } else {
    writePromptPayloads('electricista', electricistaPrompts, outputDir);
  }
  console.log('');
  
  console.log('🔧 Processing Fontanero service...');
  const fontaneroPrompts = generateFontaneroPrompts();
  
  if (hasKey) {
    try {
      const fontaneroResults = await processPromptsWithAI(fontaneroPrompts, 'fontanero');
      writeSEOResults('fontanero', fontaneroResults, outputDir);
    } catch (error: any) {
      console.error(`❌ API error for Fontanero: ${error.message}`);
      console.log('⚠️  Falling back to DRY MODE for Fontanero');
      writePromptPayloads('fontanero', fontaneroPrompts, outputDir);
    }
  } else {
    writePromptPayloads('fontanero', fontaneroPrompts, outputDir);
  }
  console.log('');
  
  console.log('===============================================');
  console.log(`✅ AI SEO Factory - Complete (${mode})\n`);
  console.log('SUMMARY:');
  console.log(`  - Electricista prompts: ${electricistaPrompts.length}`);
  console.log(`  - Fontanero prompts: ${fontaneroPrompts.length}`);
  console.log(`  - Total prompts: ${electricistaPrompts.length + fontaneroPrompts.length}`);
  console.log(`  - Output directory: ${outputDir}`);
  console.log('');
  
  if (hasKey) {
    console.log('NEXT STEPS:');
    console.log('  1. Run: npm run validate:ai-seo');
    console.log('  2. Review AI-generated ProductionSEOEntry drafts');
    console.log('  3. Validate against semantic governance');
    console.log('  4. Human review before production use');
  } else {
    console.log('NEXT STEPS:');
    console.log('  1. Add OPENAI_API_KEY to .env.local');
    console.log('  2. Re-run: npm run generate:seo-ai');
  }
  console.log('');
  console.log('SAFETY CONFIRMED:');
  console.log('  ✅ No production data modified');
  console.log('  ✅ No pages modified');
  console.log('  ✅ No routes modified');
  console.log('  ✅ Only .tmp/ files created');
}

main().catch((error) => {
  console.error('\n❌ FATAL ERROR:', error.message);
  console.error('\n⚠️  Falling back to safe state - no production files modified');
  process.exit(1);
});
