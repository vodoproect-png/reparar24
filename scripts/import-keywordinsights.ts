#!/usr/bin/env ts-node
/**
 * KeywordInsights API Importer for AI SEO Factory
 * 
 * PURPOSE:
 * Imports keyword clustering results from KeywordInsights API
 * into the semantic layer for AI content generation.
 * 
 * CRITICAL GOVERNANCE:
 * - Clusters define semantic demand, NOT page permissions
 * - Page registry controls which pages are allowed to exist
 * - Clusters can exist without pages (for future planning)
 * - Pages cannot exist without clusters (semantic validation)
 * 
 * WORKFLOW:
 * 1. Connect to KeywordInsights API
 * 2. Fetch clustering results for specified service
 * 3. Normalize cluster data to our format
 * 4. Classify clusters: existing page / future category / blocked
 * 5. Update service's cluster file (data/seo/{service}-clusters.ts)
 * 6. DO NOT create pages or routes
 * 
 * USAGE:
 * npm run import:keywords -- --service electricista --project-id abc123
 */

import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';

// ============================================================================
// TYPES
// ============================================================================

interface KeywordInsightsCluster {
  cluster_id: string;
  primary_keyword: string;
  keywords: string[];
  search_volume?: number;
  difficulty?: number;
  intent?: string;
}

interface NormalizedCluster {
  slug: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  commercialIntent: 'high' | 'medium' | 'low';
  status: 'approved' | 'future';
  notes?: string;
  pageMapping?: 'existing' | 'future' | 'blocked';
}

interface ImportResult {
  service: string;
  totalClusters: number;
  existingPageClusters: number;
  futureCategoryClusters: number;
  blockedClusters: number;
  imported: NormalizedCluster[];
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const API_KEY = process.env.KEYWORDINSIGHTS_API_KEY;
const API_BASE_URL = 'https://api.keywordinsights.ai/v1';

// ============================================================================
// PAGE REGISTRY INTEGRATION
// ============================================================================

/**
 * Check if a cluster slug maps to an existing allowed page
 */
function classifyCluster(serviceId: string, slug: string): 'existing' | 'future' | 'blocked' {
  // Import page registry dynamically to avoid build-time issues
  const registryPath = path.join(__dirname, '..', 'data', 'seo', 'page-registry.ts');
  
  // For now, hardcode pilot mode rules
  // In production, this would read from page-registry.ts
  const existingPages: Record<string, string[]> = {
    electricista: [
      'urgencias-electricas',
      'instalaciones-electricas',
      'cuadros-electricos',
      'iluminacion-led',
      'enchufes-interruptores',
      'averias-electricas'
    ],
    fontanero: [
      'urgencias-fontaneria',
      'fugas-agua',
      'desatascos',
      'instalacion-sanitarios',
      'reparacion-grifos',
      'calentadores-termos'
    ]
  };
  
  const blockedSlugs: Record<string, string[]> = {
    electricista: ['boletines', 'certificado-electrico', 'cie'],
    fontanero: []
  };
  
  const allowed = existingPages[serviceId] || [];
  const blocked = blockedSlugs[serviceId] || [];
  
  if (blocked.includes(slug)) return 'blocked';
  if (allowed.includes(slug)) return 'existing';
  return 'future';
}

// ============================================================================
// API INTEGRATION
// ============================================================================

/**
 * Fetch clustering results from KeywordInsights API
 */
async function fetchClusters(projectId: string): Promise<KeywordInsightsCluster[]> {
  if (!API_KEY) {
    throw new Error(
      'KEYWORDINSIGHTS_API_KEY not found in environment.\n' +
      'Add it to .env.local: KEYWORDINSIGHTS_API_KEY=your_api_key_here'
    );
  }
  
  console.log('🔌 Connecting to KeywordInsights API...');
  
  // Mock data for testing - replace with real API call
  console.log('⚠️  DEMO MODE: Using mock data (API integration pending)');
  
  return [
    {
      cluster_id: 'cluster_1',
      primary_keyword: 'electricista urgente',
      keywords: [
        'electricista 24 horas',
        'electricista de urgencias',
        'electricista emergencia',
        'electricista de emergencia'
      ],
      search_volume: 2900,
      difficulty: 45,
      intent: 'commercial'
    },
    {
      cluster_id: 'cluster_2',
      primary_keyword: 'instalacion electrica',
      keywords: [
        'instalacion electrica vivienda',
        'instalador electricista',
        'electricista instalador',
        'cableado electrico'
      ],
      search_volume: 1800,
      difficulty: 42,
      intent: 'commercial'
    },
    {
      cluster_id: 'cluster_3',
      primary_keyword: 'cuadro electrico',
      keywords: [
        'cuadro electrico vivienda',
        'cambiar cuadro electrico',
        'reparacion cuadro electrico',
        'diferencial electrico'
      ],
      search_volume: 1600,
      difficulty: 38,
      intent: 'commercial'
    },
    {
      cluster_id: 'cluster_4',
      primary_keyword: 'iluminacion led',
      keywords: [
        'instalacion iluminacion led',
        'iluminacion exterior',
        'iluminacion interior',
        'iluminacion jardin'
      ],
      search_volume: 1200,
      difficulty: 35,
      intent: 'commercial'
    },
    {
      cluster_id: 'cluster_5',
      primary_keyword: 'enchufe interruptor',
      keywords: [
        'instalar enchufe',
        'cambiar enchufe',
        'instalar interruptor',
        'cambiar interruptor'
      ],
      search_volume: 980,
      difficulty: 32,
      intent: 'commercial'
    },
    {
      cluster_id: 'cluster_6',
      primary_keyword: 'averia electrica',
      keywords: [
        'reparacion averia electrica',
        'fallo electrico',
        'saltan los plomos',
        'no hay luz en casa'
      ],
      search_volume: 1400,
      difficulty: 40,
      intent: 'commercial'
    },
    {
      cluster_id: 'cluster_7',
      primary_keyword: 'boletin electrico',
      keywords: [
        'certificado electrico',
        'certificado instalacion electrica',
        'legalizacion electrica',
        'cie electrico'
      ],
      search_volume: 2200,
      difficulty: 48,
      intent: 'commercial'
    }
  ];
}

/**
 * Normalize KeywordInsights cluster to our format
 */
function normalizeCluster(
  cluster: KeywordInsightsCluster,
  serviceId: string
): NormalizedCluster {
  // Generate slug from primary keyword
  const slug = cluster.primary_keyword
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[áàäâã]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöôõ]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/[^a-z0-9-]/g, '');
  
  // Determine commercial intent
  let commercialIntent: 'high' | 'medium' | 'low' = 'medium';
  if (cluster.intent === 'commercial' || cluster.intent === 'transactional') {
    commercialIntent = 'high';
  } else if (cluster.intent === 'informational') {
    commercialIntent = 'low';
  }
  
  // Classify cluster based on page registry
  const pageMapping = classifyCluster(serviceId, slug);
  
  // Determine status
  let status: 'approved' | 'future' = 'future';
  let notes: string | undefined;
  
  if (pageMapping === 'existing') {
    status = 'approved';
    notes = 'Existing page - cluster aligned with live page';
  } else if (pageMapping === 'future') {
    status = 'future';
    notes = 'Future category - no page permission yet';
  } else if (pageMapping === 'blocked') {
    status = 'future';
    notes = 'BLOCKED - Does not belong to this service architecture';
  }
  
  return {
    slug,
    primaryKeyword: cluster.primary_keyword,
    secondaryKeywords: cluster.keywords.slice(0, 5), // Take top 5
    commercialIntent,
    status,
    notes,
    pageMapping
  };
}

// ============================================================================
// FILE GENERATION
// ============================================================================

/**
 * Generate TypeScript cluster file content
 */
function generateClusterFile(
  serviceId: string,
  clusters: NormalizedCluster[]
): string {
  const timestamp = new Date().toISOString().split('T')[0];
  
  const approvedClusters = clusters.filter(c => c.status === 'approved');
  const futureClusters = clusters.filter(c => c.status === 'future');
  
  return `/**
 * ${serviceId.charAt(0).toUpperCase() + serviceId.slice(1)} Keyword Clusters
 * 
 * GENERATED BY: scripts/import-keywordinsights.ts
 * LAST UPDATED: ${timestamp}
 * SOURCE: KeywordInsights API
 * 
 * PURPOSE:
 * This file stores grouped keyword clusters for ${serviceId.charAt(0).toUpperCase() + serviceId.slice(1)} services.
 * It bridges KeywordInsights clustering with the Semantic Layer.
 * 
 * GOVERNANCE:
 * - Clusters define semantic demand, NOT page permissions
 * - See data/seo/page-registry.ts for page creation permissions
 * - Approved clusters = existing pages
 * - Future clusters = semantic demand without page permission
 * 
 * DO NOT:
 * - Assume clusters automatically create pages
 * - Modify without checking page-registry.ts
 * - Add clusters from rejected semantic categories
 */

import { KeywordCluster } from './types';

/**
 * ${serviceId.charAt(0).toUpperCase() + serviceId.slice(1)} approved keyword clusters
 * These map to existing approved pages
 */
export const ${serviceId.toUpperCase()}_CLUSTERS: KeywordCluster[] = [
${approvedClusters.map((cluster, index) => `  // CLUSTER ${index + 1}: ${cluster.primaryKeyword}
  {
    slug: '${cluster.slug}',
    primaryKeyword: '${cluster.primaryKeyword}',
    secondaryKeywords: [
${cluster.secondaryKeywords.map(kw => `      '${kw}'`).join(',\n')}
    ],
    commercialIntent: '${cluster.commercialIntent}',
    status: 'approved'${cluster.notes ? `,\n    notes: '${cluster.notes}'` : ''}
  }`).join(',\n\n')}
];

/**
 * Future category clusters
 * Semantic demand identified but no page permission yet
 */
export const ${serviceId.toUpperCase()}_FUTURE_CLUSTERS: KeywordCluster[] = [
${futureClusters.map((cluster, index) => `  // FUTURE ${index + 1}: ${cluster.primaryKeyword}
  {
    slug: '${cluster.slug}',
    primaryKeyword: '${cluster.primaryKeyword}',
    secondaryKeywords: [
${cluster.secondaryKeywords.map(kw => `      '${kw}'`).join(',\n')}
    ],
    commercialIntent: '${cluster.commercialIntent}',
    status: 'future'${cluster.notes ? `,\n    notes: '${cluster.notes}'` : ''}
  }`).join(',\n\n')}
];

/**
 * Helper: Get cluster by slug
 */
export function get${serviceId.charAt(0).toUpperCase() + serviceId.slice(1)}Cluster(slug: string): KeywordCluster | undefined {
  return ${serviceId.toUpperCase()}_CLUSTERS.find(cluster => cluster.slug === slug);
}

/**
 * Helper: Get all approved cluster slugs
 */
export function getApproved${serviceId.charAt(0).toUpperCase() + serviceId.slice(1)}ClusterSlugs(): string[] {
  return ${serviceId.toUpperCase()}_CLUSTERS
    .filter(cluster => cluster.status === 'approved')
    .map(cluster => cluster.slug);
}

/**
 * Helper: Get all primary keywords (for cannibalization checks)
 */
export function get${serviceId.charAt(0).toUpperCase() + serviceId.slice(1)}ClusterPrimaryKeywords(): string[] {
  return ${serviceId.toUpperCase()}_CLUSTERS.map(cluster => cluster.primaryKeyword);
}
`;
}

/**
 * Write cluster file to disk
 */
function writeClusterFile(serviceId: string, content: string): void {
  const targetPath = path.join(
    __dirname,
    '..',
    'data',
    'seo',
    `${serviceId}-clusters.ts`
  );
  
  // Backup existing file
  if (fs.existsSync(targetPath)) {
    const backupPath = targetPath.replace('.ts', `.backup-${Date.now()}.ts`);
    fs.copyFileSync(targetPath, backupPath);
    console.log(`📋 Backed up existing file to: ${path.basename(backupPath)}`);
  }
  
  fs.writeFileSync(targetPath, content, 'utf-8');
  console.log(`✅ Updated: ${targetPath}`);
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function importKeywordInsights(
  serviceId: string,
  projectId: string
): Promise<ImportResult> {
  console.log('🚀 KeywordInsights Importer');
  console.log('========================\n');
  console.log(`Service: ${serviceId}`);
  console.log(`Project ID: ${projectId}\n`);
  
  // Validate service
  if (!['electricista', 'fontanero'].includes(serviceId)) {
    throw new Error(`Invalid service: ${serviceId}. Must be 'electricista' or 'fontanero'`);
  }
  
  // Fetch clusters from API
  const rawClusters = await fetchClusters(projectId);
  console.log(`📦 Fetched ${rawClusters.length} clusters from KeywordInsights\n`);
  
  // Normalize and classify clusters
  console.log('🔄 Normalizing clusters...');
  const normalizedClusters = rawClusters.map(cluster => 
    normalizeCluster(cluster, serviceId)
  );
  
  // Count by classification
  const existingCount = normalizedClusters.filter(c => c.pageMapping === 'existing').length;
  const futureCount = normalizedClusters.filter(c => c.pageMapping === 'future').length;
  const blockedCount = normalizedClusters.filter(c => c.pageMapping === 'blocked').length;
  
  console.log(`\n📊 Cluster Classification:`);
  console.log(`   ✅ Existing pages: ${existingCount}`);
  console.log(`   🔮 Future categories: ${futureCount}`);
  console.log(`   🚫 Blocked: ${blockedCount}`);
  
  // Generate cluster file
  console.log(`\n📝 Generating cluster file...`);
  const fileContent = generateClusterFile(serviceId, normalizedClusters);
  
  // Write to disk
  writeClusterFile(serviceId, fileContent);
  
  console.log(`\n✅ Import complete!`);
  console.log(`\n📁 Updated: data/seo/${serviceId}-clusters.ts`);
  console.log(`\n⚠️  IMPORTANT:`);
  console.log(`   - Clusters have been imported`);
  console.log(`   - NO pages were created`);
  console.log(`   - NO routes were modified`);
  console.log(`   - Page count unchanged`);
  console.log(`\n📋 Next steps:`);
  console.log(`   1. Review data/seo/${serviceId}-clusters.ts`);
  console.log(`   2. Run: npm run validate:semantic`);
  console.log(`   3. Run: npm run build`);
  
  return {
    service: serviceId,
    totalClusters: normalizedClusters.length,
    existingPageClusters: existingCount,
    futureCategoryClusters: futureCount,
    blockedClusters: blockedCount,
    imported: normalizedClusters
  };
}

// ============================================================================
// CLI EXECUTION
// ============================================================================

const args = process.argv.slice(2);
const serviceIndex = args.indexOf('--service');
const projectIndex = args.indexOf('--project-id');

if (serviceIndex === -1 || projectIndex === -1) {
  console.error('❌ Missing required arguments');
  console.log('\nUsage:');
  console.log('  npm run import:keywords -- --service <electricista|fontanero> --project-id <id>');
  console.log('\nExample:');
  console.log('  npm run import:keywords -- --service electricista --project-id abc123');
  process.exit(1);
}

const service = args[serviceIndex + 1];
const projectId = args[projectIndex + 1];

importKeywordInsights(service, projectId)
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Import failed:', error.message);
    process.exit(1);
  });
