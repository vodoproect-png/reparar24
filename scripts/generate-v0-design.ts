#!/usr/bin/env ts-node
/**
 * v0 Design Prompt Generator (DRY-RUN MODE)
 *
 * PURPOSE:
 * Builds a safe, structured prompt for v0 using the current SEO conveyor output,
 * production content, and existing page/block architecture.
 *
 * SAFETY:
 * - Requires explicit --dry-run or --api
 * - API mode saves v0 output only to .tmp/v0-designs/
 * - Does NOT modify production files
 * - Writes prompt artifacts only to .tmp/v0-designs/
 * - Does NOT print V0_API_KEY
 */

const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: path.join(process.cwd(), '.env.local'), quiet: true });

function showHelp(): void {
  console.log('v0 Design Prompt Generator - Help');
  console.log('=================================\n');
  console.log('USAGE:');
  console.log('  npm run generate:v0-design -- --service electricista --slug enchufes-interruptores --dry-run\n');
  console.log('  npm run generate:v0-design -- --service electricista --slug enchufes-interruptores --api\n');
  console.log('OPTIONS:');
  console.log('  --service <service>  Service id: electricista or fontanero (required)');
  console.log('  --slug <slug>        Child service slug (required)');
  console.log('  --dry-run            Build prompt only; no API calls, no production writes');
  console.log('  --api                Call v0 API and save response to .tmp only');
  console.log('  --help               Show this help message\n');
}

function parseArgs(): { service: string; slug: string; mode: 'dry-run' | 'api' } | null {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return null;
  }

  const serviceIndex = args.indexOf('--service');
  const slugIndex = args.indexOf('--slug');

  if (serviceIndex === -1 || !args[serviceIndex + 1] || slugIndex === -1 || !args[slugIndex + 1]) {
    console.error('Missing required arguments: --service and --slug\n');
    showHelp();
    process.exit(1);
  }

  const dryRun = args.includes('--dry-run');
  const api = args.includes('--api');

  if (!dryRun && !api) {
    console.error('Missing required mode: --dry-run or --api\n');
    showHelp();
    process.exit(1);
  }

  if (dryRun && api) {
    console.error('Choose only one mode: --dry-run or --api\n');
    showHelp();
    process.exit(1);
  }

  return {
    service: args[serviceIndex + 1],
    slug: args[slugIndex + 1],
    mode: api ? 'api' : 'dry-run',
  };
}

function loadService(service: string): {
  clusters: any[];
  productionContent: Record<string, any>;
  routeFile: string;
} {
  if (service === 'electricista') {
    return {
      clusters: require('../data/seo/electricista-clusters').ELECTRICISTA_CLUSTERS,
      productionContent: require('../data/electricista/child-services-seo').childServicesData,
      routeFile: 'app/[locale]/electricista/[childSlug]/page.tsx',
    };
  }

  if (service === 'fontanero') {
    return {
      clusters: require('../data/seo/fontanero-clusters').FONTANERO_CLUSTERS,
      productionContent: require('../data/fontanero/child-services-seo').childServicesData,
      routeFile: 'app/[locale]/fontanero/[childSlug]/page.tsx',
    };
  }

  throw new Error(`Unsupported service: ${service}`);
}

function readOptional(relativePath: string): string {
  const fullPath = path.join(process.cwd(), relativePath);
  return fs.existsSync(fullPath) ? fs.readFileSync(fullPath, 'utf-8') : '';
}

function ensureOutputDirectory(): string {
  const outputDir = path.join(process.cwd(), '.tmp', 'v0-designs');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  return outputDir;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function formatList(values: string[] = [], max = 20): string {
  if (!values.length) return '- none';
  return values.slice(0, max).map(value => `- ${value}`).join('\n');
}

function buildPrompt(service: string, slug: string, cluster: any, content: any): string {
  const currentBlocks = [
    'ServiceHeroV2',
    'MobileStickyCTA',
    'ServicesGridV1',
    'TrustSignalsV1',
    'ProcessStepsV3',
    'PricingSectionV1',
    'SeoContentSectionV1',
    'ServiceAreasV1',
    'OpinionesClientesV1',
    'FaqSectionV2',
    'TrustCtaBlueV1',
  ];

  return `You are helping improve the Reparar24 service page design system.

Task:
Audit the existing block architecture and propose block-level improvements for the service page:
/${service}/${slug}

Important:
- Do not create a marketing landing page from scratch.
- Do not replace the full page route.
- Work at component/block level.
- Keep the page practical, conversion-focused, and SEO-safe.
- Use Spanish copy only.
- Preserve the current Reparar24 visual direction: clean home-services UI, blue/orange/green accents, trust, speed, clear CTAs.
- Avoid product/store intent and DIY unsafe advice.

Current Page Blocks:
${formatList(currentBlocks)}

Current SEO Intent:
- Service: ${service}
- Slug: ${slug}
- Primary keyword: ${cluster.primaryKeyword}
- Commercial intent: ${cluster.commercialIntent}
- Cluster status: ${cluster.status}

Secondary Keywords:
${formatList(cluster.secondaryKeywords || [], 15)}

Long-tail / FAQ Intent:
${formatList(cluster.longTailKeywords || [], 20)}

Production Content Snapshot:
- H1: ${content.h1}
- Meta title: ${content.metaTitle}
- Meta description: ${content.metaDescription}
- Description: ${content.description}
- Content brief: ${content.contentBrief}

Current SEO Content Section:
- Badge: ${content.seoContent?.badge || ''}
- Title: ${content.seoContent?.title || ''}
- Intro paragraphs: ${(content.seoContent?.intro || []).length}
- Service cards: ${(content.seoContent?.serviceCards || []).map((card: any) => card.title).join(' | ')}
- Benefits: ${(content.seoContent?.benefits || []).join(' | ')}
- Keyword tags: ${(content.seoContent?.keywordTags || []).join(' | ')}

Current FAQs:
${formatList((content.faqs || []).map((faq: any) => `${faq.question} -> ${faq.answer}`), 10)}

Design Review Goals:
1. Identify whether current blocks are sufficient for this service intent.
2. Suggest missing blocks, if any, such as problem/symptom block, service variants, safety warning, price context, before/after process, or local proof.
3. Suggest improvements to SeoContentSectionV1 content structure.
4. Suggest whether this needs a reusable component or only content/schema changes.
5. Return a concise implementation plan with component names, props/data fields, and risks.

Output format:
- Summary
- Recommended block changes
- Component/data schema changes
- Copy suggestions in Spanish
- What NOT to change
- Implementation checklist
`;
}

async function callV0Api(prompt: string): Promise<any> {
  if (!process.env.V0_API_KEY || !process.env.V0_API_KEY.trim()) {
    throw new Error('V0_API_KEY is missing in .env.local');
  }

  const { v0 } = require('v0-sdk');

  return v0.chats.create({
    message: prompt,
    system: [
      'You are a senior product designer and frontend architect.',
      'Return practical block-level recommendations for a Next.js/Tailwind service page.',
      'Do not claim to have changed repository files.',
      'Do not include secrets or environment variables.',
    ].join(' '),
    chatPrivacy: 'private',
    responseMode: 'sync',
    modelConfiguration: {
      imageGenerations: false,
      thinking: false,
    },
    metadata: {
      source: 'reparar24-v0-design-generator',
    },
  });
}

function writeV0Files(outputDir: string, baseName: string, chat: any): string | null {
  const files = chat?.latestVersion?.files;
  if (!Array.isArray(files) || files.length === 0) {
    return null;
  }

  const filesDir = path.join(outputDir, `${baseName}-files`);
  fs.mkdirSync(filesDir, { recursive: true });

  files.forEach((file: any, index: number) => {
    const safeName = String(file.name || `file-${index}.txt`)
      .replace(/^[a-zA-Z]:/, '')
      .replace(/\.\./g, '')
      .replace(/[\\/]+/g, '__');
    fs.writeFileSync(path.join(filesDir, safeName), file.content || '', 'utf-8');
  });

  return filesDir;
}

function sanitizeChatForJson(chat: any): any {
  return {
    id: chat?.id,
    object: chat?.object,
    name: chat?.name,
    title: chat?.title,
    createdAt: chat?.createdAt,
    updatedAt: chat?.updatedAt,
    webUrl: chat?.webUrl,
    apiUrl: chat?.apiUrl,
    latestVersion: chat?.latestVersion ? {
      id: chat.latestVersion.id,
      object: chat.latestVersion.object,
      status: chat.latestVersion.status,
      demoUrl: chat.latestVersion.demoUrl,
      screenshotUrl: chat.latestVersion.screenshotUrl,
      createdAt: chat.latestVersion.createdAt,
      updatedAt: chat.latestVersion.updatedAt,
      files: Array.isArray(chat.latestVersion.files)
        ? chat.latestVersion.files.map((file: any) => ({
          object: file.object,
          name: file.name,
          locked: file.locked,
          contentLength: String(file.content || '').length,
        }))
        : [],
    } : undefined,
    messages: Array.isArray(chat?.messages)
      ? chat.messages.map((message: any) => ({
        id: message.id,
        role: message.role,
        type: message.type,
        finishReason: message.finishReason,
        createdAt: message.createdAt,
        content: message.content,
      }))
      : [],
    text: chat?.text,
  };
}

function main(): void {
  const options = parseArgs();
  if (!options) return;

  const serviceData = loadService(options.service);
  const cluster = serviceData.clusters.find(cluster => cluster.slug === options.slug);
  const content = serviceData.productionContent[options.slug];

  if (!cluster) throw new Error(`Cluster not found: ${options.service}/${options.slug}`);
  if (!content) throw new Error(`Production content not found: ${options.service}/${options.slug}`);

  const hasV0Key = !!(process.env.V0_API_KEY && process.env.V0_API_KEY.trim());
  const routeSource = readOptional(serviceData.routeFile);
  const seoContentSource = readOptional('components/ds/SeoContentSectionV1.tsx');
  const prompt = buildPrompt(options.service, options.slug, cluster, content);

  const outputDir = ensureOutputDirectory();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const baseName = `${timestamp}-${options.service}-${slugify(options.slug)}`;
  const promptPath = path.join(outputDir, `${baseName}-prompt.md`);
  const contextPath = path.join(outputDir, `${baseName}-context.json`);

  fs.writeFileSync(promptPath, prompt, 'utf-8');
  const context = {
    source: 'v0-design-prompt-generator',
    mode: options.mode,
    generatedAt: new Date().toISOString(),
    hasV0Key,
    service: options.service,
    slug: options.slug,
    files: {
      routeFile: serviceData.routeFile,
      seoContentComponent: 'components/ds/SeoContentSectionV1.tsx',
    },
    cluster,
    productionContent: {
      h1: content.h1,
      metaTitle: content.metaTitle,
      metaDescription: content.metaDescription,
      lockedPrimaryKw: content.lockedPrimaryKw,
      secondaryKw: content.secondaryKw,
      seoBlockKw: content.seoBlockKw,
      faqKw: content.faqKw,
      contentBrief: content.contentBrief,
      description: content.description,
      seoContent: content.seoContent,
      faqs: content.faqs,
    },
    sourceStats: {
      routeChars: routeSource.length,
      seoContentComponentChars: seoContentSource.length,
    },
    promptPath: path.relative(process.cwd(), promptPath),
  };

  fs.writeFileSync(contextPath, JSON.stringify(context, null, 2), 'utf-8');

  console.log('v0 Design Prompt Generator');
  console.log('==========================');
  console.log(`Mode: ${options.mode.toUpperCase()}`);
  console.log(`V0_API_KEY present: ${hasV0Key ? 'yes' : 'no'}`);
  console.log(`Service: ${options.service}`);
  console.log(`Slug: ${options.slug}`);
  console.log(`Primary keyword: ${cluster.primaryKeyword}`);
  console.log(`Prompt saved to: ${path.relative(process.cwd(), promptPath)}`);
  console.log(`Context saved to: ${path.relative(process.cwd(), contextPath)}`);

  if (options.mode === 'dry-run') {
    console.log('\nNo API calls were made. No production files were modified.');
    return;
  }

  callV0Api(prompt)
    .then((chat) => {
      const responsePath = path.join(outputDir, `${baseName}-v0-response.json`);
      fs.writeFileSync(responsePath, JSON.stringify({
        source: 'v0-design-prompt-generator',
        mode: 'api',
        generatedAt: new Date().toISOString(),
        promptPath: path.relative(process.cwd(), promptPath),
        contextPath: path.relative(process.cwd(), contextPath),
        chat: sanitizeChatForJson(chat),
      }, null, 2), 'utf-8');

      const filesDir = writeV0Files(outputDir, baseName, chat);

      console.log(`v0 chat URL: ${chat.webUrl || 'not provided'}`);
      console.log(`v0 demo URL: ${chat.latestVersion?.demoUrl || 'not provided'}`);
      console.log(`v0 response saved to: ${path.relative(process.cwd(), responsePath)}`);
      if (filesDir) {
        console.log(`v0 files saved to: ${path.relative(process.cwd(), filesDir)}`);
      }
      console.log('\nNo production files were modified.');
    })
    .catch((error: any) => {
      console.error(`\nv0 API call failed: ${error.message}\n`);
      process.exit(1);
    });
}

try {
  main();
} catch (error: any) {
  console.error(`\nv0 design prompt generation failed: ${error.message}\n`);
  process.exit(1);
}
