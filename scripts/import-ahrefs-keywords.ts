#!/usr/bin/env ts-node
/**
 * Ahrefs Keyword Importer (DRY-RUN MODE)
 * 
 * PURPOSE:
 * Imports keyword data from Ahrefs API for SEO research.
 * This is a READ-ONLY tool that saves raw API responses to .tmp/ahrefs/
 * WITHOUT modifying any production files, routes, or semantic layer.
 * 
 * CRITICAL SAFETY:
 * - DRY-RUN ONLY: Does not modify data/seo, routes, sitemap, or page-registry
 * - Saves raw API responses to .tmp/ahrefs/{timestamp}-{seed}.json
 * - Does NOT create pages, clusters, or semantic maps
 * - Does NOT log API keys or secrets
 * - Requires --dry-run flag (safety measure for v1)
 * 
 * WORKFLOW:
 * 1. Load AHREFS_API_KEY from .env.local
 * 2. Fetch keyword data from Ahrefs API for given seed keyword
 * 3. Save raw JSON response to .tmp/ahrefs/
 * 4. Display summary (keyword count, output path)
 * 5. Exit without touching production files
 * 
 * USAGE:
 * npm run import:ahrefs -- --seed "electricista urgente valencia" --limit 100 --dry-run
 * 
 * OPTIONS:
 * --seed     Seed keyword to fetch data for (required)
 * --limit    Max number of keywords to fetch (default: 100)
 * --dry-run  Required flag - emphasizes this is read-only operation
 * --help     Show usage information
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const dotenv = require('dotenv');

// ============================================================================
// CONFIGURATION
// ============================================================================

// Load environment variables from .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath, quiet: true });
}

// Ahrefs API Configuration
// Reference: https://docs.ahrefs.com/api-v3
// Note: Exact endpoint may vary - using Keywords Explorer "matching-terms" endpoint
// Adjust AHREFS_ENDPOINT if needed based on available API access level
const AHREFS_API_KEY = process.env.AHREFS_API_KEY;
const AHREFS_COUNTRY = process.env.AHREFS_COUNTRY || 'es';
const AHREFS_BASE_URL = 'https://api.ahrefs.com/v3';
const AHREFS_ENDPOINT = '/keywords-explorer/matching-terms';
const AHREFS_SELECT_FIELDS = 'keyword,volume,difficulty,cpc,traffic_potential';

// ============================================================================
// TYPES
// ============================================================================

interface AhrefsImportOptions {
  seed: string;
  limit: number;
  dryRun: boolean;
}

interface AhrefsImportResult {
  source: string;
  seed: string;
  country: string;
  limit: number;
  fetchedAt: string;
  endpoint: string;
  raw: any;
  keywordCount?: number;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Slugify a string for filesystem-safe filenames
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[áàäâã]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöôõ]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/[^a-z0-9-]/g, '')
    .substring(0, 50); // Limit filename length
}

/**
 * Ensure output directory exists
 */
function ensureOutputDirectory(): string {
  const outputDir = path.join(__dirname, '..', '.tmp', 'ahrefs');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`📁 Created output directory: .tmp/ahrefs/`);
  }
  
  return outputDir;
}

/**
 * Generate output filename with timestamp
 */
function generateOutputFilename(seed: string): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0] + '-' + 
                     new Date().toISOString().replace(/[:.]/g, '-').split('T')[1].substring(0, 8);
  const slugifiedSeed = slugify(seed);
  return `${timestamp}-${slugifiedSeed}.json`;
}

// ============================================================================
// API INTEGRATION
// ============================================================================

/**
 * Fetch keyword data from Ahrefs API
 */
async function fetchAhrefsKeywords(options: AhrefsImportOptions): Promise<any> {
  if (!AHREFS_API_KEY) {
    throw new Error(
      '❌ AHREFS_API_KEY not found in environment.\n' +
      '   Add it to .env.local:\n' +
      '   AHREFS_API_KEY=your_api_key_here\n' +
      '   Get your API key from: https://app.ahrefs.com/account/api-keys'
    );
  }

  console.log('🔌 Connecting to Ahrefs API...');
  console.log(`   Seed: "${options.seed}"`);
  console.log(`   Country: ${AHREFS_COUNTRY}`);
  console.log(`   Limit: ${options.limit}`);
  console.log(`   Endpoint: ${AHREFS_ENDPOINT}\n`);

  // Build request URL. Ahrefs matching-terms requires `keywords` and `select`.
  const params = new URLSearchParams({
    keywords: options.seed,
    country: AHREFS_COUNTRY,
    limit: options.limit.toString(),
    select: AHREFS_SELECT_FIELDS,
  });

  const url = `${AHREFS_BASE_URL}${AHREFS_ENDPOINT}?${params.toString()}`;

  return new Promise((resolve, reject) => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${AHREFS_API_KEY}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(url, requestOptions, (res: any) => {
      let data = '';

      res.on('data', (chunk: any) => {
        data += chunk;
      });

      res.on('end', () => {
        // Handle HTTP errors
        if (res.statusCode !== 200) {
          const errorBody = data.substring(0, 200); // Show first 200 chars, avoid leaking secrets
          
          if (res.statusCode === 401 || res.statusCode === 403) {
            reject(new Error(
              `❌ Authentication failed (${res.statusCode}).\n` +
              '   Your API key may be invalid or you may not have API access.\n' +
              '   Check your key at: https://app.ahrefs.com/account/api-keys'
            ));
          } else if (res.statusCode === 429) {
            reject(new Error(
              `❌ Rate limit exceeded (429).\n` +
              '   Please wait before making more requests.\n' +
              '   Check your Ahrefs API rate limits.'
            ));
          } else {
            reject(new Error(
              `❌ API request failed with status ${res.statusCode}.\n` +
              `   Error: ${errorBody}`
            ));
          }
          return;
        }

        // Parse JSON response
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (parseError) {
          reject(new Error(
            '❌ Failed to parse API response as JSON.\n' +
            `   Response: ${data.substring(0, 200)}...`
          ));
        }
      });
    });

    req.on('error', (error: any) => {
      reject(new Error(
        `❌ Network error while fetching from Ahrefs API.\n` +
        `   Error: ${error.message}`
      ));
    });

    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error('❌ Request timeout (30s). API did not respond in time.'));
    });

    req.end();
  });
}

/**
 * Count keywords in API response
 * Tries to extract keyword count from various possible response structures
 */
function countKeywords(apiResponse: any): number | undefined {
  // Try common response structures
  if (apiResponse.keywords && Array.isArray(apiResponse.keywords)) {
    return apiResponse.keywords.length;
  }
  if (apiResponse.data && Array.isArray(apiResponse.data)) {
    return apiResponse.data.length;
  }
  if (apiResponse.results && Array.isArray(apiResponse.results)) {
    return apiResponse.results.length;
  }
  if (apiResponse.items && Array.isArray(apiResponse.items)) {
    return apiResponse.items.length;
  }
  
  // Can't determine count from structure
  return undefined;
}

// ============================================================================
// FILE OUTPUT
// ============================================================================

/**
 * Save import result to .tmp/ahrefs/
 */
function saveImportResult(options: AhrefsImportOptions, apiResponse: any): string {
  const outputDir = ensureOutputDirectory();
  const filename = generateOutputFilename(options.seed);
  const outputPath = path.join(outputDir, filename);

  const result: AhrefsImportResult = {
    source: 'ahrefs',
    seed: options.seed,
    country: AHREFS_COUNTRY,
    limit: options.limit,
    fetchedAt: new Date().toISOString(),
    endpoint: AHREFS_ENDPOINT,
    raw: apiResponse,
    keywordCount: countKeywords(apiResponse)
  };

  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf-8');
  
  return outputPath;
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function importAhrefsKeywords(options: AhrefsImportOptions): Promise<void> {
  console.log('🚀 Ahrefs Keyword Importer (DRY-RUN MODE)');
  console.log('=========================================\n');

  // Validate dry-run flag
  if (!options.dryRun) {
    throw new Error(
      '❌ --dry-run flag is required.\n' +
      '   This ensures you understand this is a read-only operation.\n' +
      '   Usage: npm run import:ahrefs -- --seed "keyword" --limit 100 --dry-run'
    );
  }

  // Fetch keyword data from Ahrefs API
  let apiResponse: any;
  try {
    apiResponse = await fetchAhrefsKeywords(options);
    console.log('✅ API request successful!\n');
  } catch (error: any) {
    throw error; // Re-throw to be caught by CLI handler
  }

  // Save raw response to .tmp/ahrefs/
  const outputPath = saveImportResult(options, apiResponse);
  const relativeOutputPath = path.relative(process.cwd(), outputPath);

  // Display summary
  console.log('📊 Import Summary:');
  console.log('==================');
  console.log(`   Seed keyword: "${options.seed}"`);
  console.log(`   Country: ${AHREFS_COUNTRY}`);
  console.log(`   Requested limit: ${options.limit}`);
  
  const keywordCount = countKeywords(apiResponse);
  if (keywordCount !== undefined) {
    console.log(`   Keywords received: ${keywordCount}`);
  } else {
    console.log(`   Keywords received: (check output file for structure)`);
  }
  
  console.log(`\n✅ Saved to: ${relativeOutputPath}`);
  
  console.log(`\n⚠️  IMPORTANT - DRY-RUN MODE:`);
  console.log(`   ✅ Raw API data saved to .tmp/ahrefs/`);
  console.log(`   ✅ NO production files modified`);
  console.log(`   ✅ NO semantic maps updated`);
  console.log(`   ✅ NO clusters created`);
  console.log(`   ✅ NO pages generated`);
  console.log(`   ✅ NO routes changed`);
  
  console.log(`\n📋 Next steps:`);
  console.log(`   1. Review: ${relativeOutputPath}`);
  console.log(`   2. Analyze keyword data structure`);
  console.log(`   3. Plan semantic map integration (manual step)`);
  console.log(`   4. Do NOT commit API keys to git`);
}

// ============================================================================
// CLI INTERFACE
// ============================================================================

function showHelp(): void {
  console.log('🔧 Ahrefs Keyword Importer - Help');
  console.log('===================================\n');
  console.log('DESCRIPTION:');
  console.log('  Fetch keyword data from Ahrefs API and save raw responses');
  console.log('  to .tmp/ahrefs/ without modifying production files.\n');
  console.log('USAGE:');
  console.log('  npm run import:ahrefs -- --seed "keyword" --limit 100 --dry-run\n');
  console.log('OPTIONS:');
  console.log('  --seed <keyword>   Seed keyword to fetch data for (required)');
  console.log('  --limit <number>   Max keywords to fetch (default: 100)');
  console.log('  --dry-run          Required flag - read-only operation');
  console.log('  --help             Show this help message\n');
  console.log('EXAMPLES:');
  console.log('  npm run import:ahrefs -- --seed "electricista urgente valencia" --limit 100 --dry-run');
  console.log('  npm run import:ahrefs -- --seed "fontanero madrid" --limit 50 --dry-run\n');
  console.log('ENVIRONMENT:');
  console.log('  Requires AHREFS_API_KEY in .env.local');
  console.log('  Optional: AHREFS_COUNTRY (default: es)\n');
  console.log('OUTPUT:');
  console.log('  .tmp/ahrefs/{timestamp}-{slugified-seed}.json\n');
}

function parseArgs(): AhrefsImportOptions | null {
  const args = process.argv.slice(2);

  // Check for help flag
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return null;
  }

  // Parse arguments
  const seedIndex = args.indexOf('--seed');
  const limitIndex = args.indexOf('--limit');
  const dryRunFlag = args.includes('--dry-run');

  // Validate required arguments
  if (seedIndex === -1 || !args[seedIndex + 1]) {
    console.error('❌ Missing required argument: --seed\n');
    showHelp();
    process.exit(1);
  }

  const seed = args[seedIndex + 1];
  const limit = limitIndex !== -1 && args[limitIndex + 1] 
    ? parseInt(args[limitIndex + 1], 10) 
    : 100;

  // Validate limit
  if (isNaN(limit) || limit < 1 || limit > 10000) {
    console.error('❌ Invalid --limit value. Must be between 1 and 10000.\n');
    process.exit(1);
  }

  return {
    seed,
    limit,
    dryRun: dryRunFlag
  };
}

// ============================================================================
// ENTRY POINT
// ============================================================================

const options = parseArgs();

if (options) {
  importAhrefsKeywords(options)
    .then(() => {
      console.log('\n✅ Import completed successfully!\n');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n' + error.message);
      console.error('\n❌ Import failed.\n');
      process.exit(1);
    });
}
