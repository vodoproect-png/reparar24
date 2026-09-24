/**
 * Semantic Layer Types for Reparar24
 * 
 * PURPOSE:
 * These types define the foundation for semantic SEO architecture.
 * They separate business logic (semantic structure) from presentation (SEO templates).
 * 
 * CRITICAL: SEMANTIC MAP ≠ PAGE PERMISSIONS
 * - Semantic Map: Defines keyword demand and semantic relationships
 * - SEO Map: Defines how services are presented to users and search engines
 * - Page Registry: Controls which pages are ALLOWED to exist (ONLY source of page permissions)
 * 
 * AUTOMATION CONSUMPTION:
 * These types are consumed by scripts to:
 * - Optimize content for existing pages
 * - Validate semantic relationships before deployment
 * - Prevent keyword cannibalization at build time
 * - Identify future semantic expansion opportunities
 * 
 * GOVERNANCE:
 * - Semantic clusters do NOT authorize page creation
 * - Page permissions controlled by page-registry.ts ONLY
 */

/**
 * Semantic status for clusters and categories
 */
export type SemanticStatus = 
  | 'approved'    // Semantic territory approved (does NOT authorize page creation)
  | 'candidate'   // Semantic territory candidate for future consideration
  | 'future'      // Planned semantic territory (not yet developed)
  | 'rejected';   // Evaluated and rejected (no pages will be created)

/**
 * Page type in the GEO hierarchy
 */
export type PageType = 
  | 'hub'         // Service hub (e.g., /electricista)
  | 'child'       // Child service (e.g., /electricista/urgencias-electricas)
  | 'city'        // City-level page (e.g., /electricista/madrid)
  | 'district';   // District-level page (e.g., /electricista/madrid/centro)

/**
 * Page status - whether page exists in production
 */
export type PageStatus = 'existing' | 'future' | 'blocked';

/**
 * Existing page target definition
 * Represents a semantic cluster that ALREADY has a page in production
 */
export interface ExistingPageTarget {
  /** URL slug for the existing page */
  slug: string;
  
  /** Primary keyword this page owns (prevents cannibalization) */
  primaryKeyword: string;
  
  /** Semantic approval status (typically 'approved' for existing pages) */
  status: SemanticStatus;
  
  /** Page status indicator */
  pageStatus: 'existing';
  
  /** Optional: Related keywords this page may target (secondary) */
  relatedKeywords?: string[];
  
  /** Optional: Notes about semantic boundaries */
  semanticNotes?: string;
}

/**
 * @deprecated Legacy name for ExistingPageTarget
 * Use ExistingPageTarget instead for clarity
 */
export type ChildServiceDefinition = ExistingPageTarget;

/**
 * Future semantic candidate definition
 * Represents market demand that does NOT have a page yet
 * Creating pages requires explicit approval and page-registry.ts update
 */
export interface FutureCategoryCandidate {
  /** Potential slug (if page were to be created) */
  slug: string;
  
  /** Target keyword representing market demand */
  keyword: string;
  
  /** Current status (typically 'candidate' or 'future') */
  status: SemanticStatus;
  
  /** Optional: Related keywords in this semantic cluster */
  relatedKeywords?: string[];
  
  /** Optional: Notes about why it's future/candidate */
  notes?: string;
  
  /** Optional: Commercial viability assessment */
  commercialViability?: 'high' | 'medium' | 'low';
  
  /** Optional: Market demand level */
  marketDemand?: 'high' | 'medium' | 'low' | 'growing';
}

/**
 * @deprecated Legacy name for FutureCategoryCandidate
 * Use FutureCategoryCandidate instead for clarity
 */
export type FutureCategoryDefinition = FutureCategoryCandidate;

/**
 * Rejected cluster definition
 * Represents keyword demand that will NEVER have a page
 * (e.g., products, jobs, informational queries without service intent)
 */
export interface RejectedCluster {
  /** Keyword representing non-service demand */
  keyword: string;
  
  /** Reason for rejection */
  reason: string;
  
  /** Optional: Additional notes */
  notes?: string;
}

/**
 * Semantic Map - Keyword Demand & Semantic Ownership
 * 
 * CRITICAL: This map defines semantic demand, NOT page permissions.
 * - Documents existing page optimization targets
 * - Identifies future semantic candidates
 * - Rejects non-service clusters
 * 
 * Page creation permissions controlled by page-registry.ts ONLY.
 */
export interface SemanticMap {
  /** Service identifier (matches service slug) */
  serviceId: string;
  
  /** Hub page slug (e.g., 'electricista') */
  hubSlug: string;
  
  /** Primary keyword for hub page */
  hubKeyword: string;
  
  /** Existing page targets (pages that already exist in production) */
  existingPageTargets: ExistingPageTarget[];
  
  /** Future semantic candidates (market demand without pages) */
  futureCategoryCandidates: FutureCategoryCandidate[];
  
  /** Rejected clusters (will never have pages) */
  rejectedClusters: RejectedCluster[];
  
  /** Last updated timestamp */
  lastUpdated: string;
  
  /** Optional: Semantic strategy notes */
  semanticNotes?: string;
  
  // Legacy support (deprecated)
  /** @deprecated Use existingPageTargets instead */
  approvedChildren?: ExistingPageTarget[];
  
  /** @deprecated Use futureCategoryCandidates instead */
  futureCategories?: FutureCategoryCandidate[];
}

/**
 * SEO template configuration for a service/page type
 * Defines HOW content is presented
 */
export interface SeoTemplate {
  /** Title template with placeholders like {city}, {service} */
  titleTemplate: string;
  
  /** Description template with placeholders */
  descriptionTemplate: string;
  
  /** H1 template with placeholders */
  h1Template: string;
  
  /** FAQ topics relevant to this service */
  faqTopics?: string[];
  
  /** Optional: Character limits for validation */
  limits?: {
    titleMax?: number;
    descriptionMax?: number;
  };
}

/**
 * SEO Map - Presentation logic for services
 * Defines HOW approved services are presented in metadata and content
 */
export interface SeoMap {
  /** Service identifier (must match semantic map) */
  serviceId: string;
  
  /** Hub page SEO templates */
  hub: SeoTemplate;
  
  /** Child service SEO templates (keyed by child slug) */
  children: Record<string, SeoTemplate>;
  
  /** City-level template overrides (optional) */
  cityOverrides?: Partial<SeoTemplate>;
  
  /** District-level template overrides (optional) */
  districtOverrides?: Partial<SeoTemplate>;
  
  /** Last updated timestamp */
  lastUpdated: string;
}

/**
 * Commercial intent level for keyword clusters
 */
export type CommercialIntent = 'high' | 'medium' | 'low';

/**
 * Keyword cluster definition
 * Groups related keywords for a specific service/topic
 * Bridge between Ahrefs research and Semantic Layer
 */
export interface KeywordCluster {
  /** URL slug matching the child service */
  slug: string;
  
  /** Primary keyword (main target) */
  primaryKeyword: string;
  
  /** Secondary keywords (strong relevance) */
  secondaryKeywords: string[];
  
  /** Long-tail keywords (specific queries) */
  longTailKeywords?: string[];
  
  /** Commercial intent level */
  commercialIntent: CommercialIntent;
  
  /** Semantic approval status */
  status: SemanticStatus;
  
  /** Optional: Notes about keyword strategy or exclusions */
  notes?: string;
}

/**
 * Validation result for semantic/SEO map consistency
 * Used by automation scripts to ensure maps are in sync
 */
export interface MapValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// ============================================================================
// AI SEO FACTORY - PRODUCTION CONTRACT
// ============================================================================

/**
 * AI SEO Draft Entry (generated by AI)
 * This is the OUTPUT format from scripts/generate-seo-ai.ts
 */
export interface AISEOEntry {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  faqTopics: string[];
  schemaTopics?: string[];
}

/**
 * FAQ item structure for production content
 */
export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * SEO text block for structured content
 */
export interface SEOTextBlock {
  id: string;
  heading?: string;
  content: string;
  priority?: 'high' | 'medium' | 'low';
}

/**
 * AI Overview optimized block
 */
export interface AIOverviewBlock {
  id: string;
  question: string;
  answer: string;
  keywords?: string[];
}

/**
 * Semantic governance metadata
 * Tracks ownership and validation status
 */
export interface SemanticGovernanceMetadata {
  /** Service family (e.g., 'fontanero', 'electricista') */
  serviceGroup: string;
  
  /** Child service slug (if applicable) */
  childServiceSlug?: string;
  
  /** Primary keyword ownership */
  primaryKeyword: string;
  
  /** Secondary keywords covered */
  secondaryKeywords?: string[];
  
  /** Validation status */
  validated: boolean;
  
  /** Validation timestamp */
  validatedAt?: string;
  
  /** Validation notes */
  validationNotes?: string;
}

/**
 * Optional component/block overrides
 * Allows customization of specific page sections
 */
export interface ComponentOverrides {
  /** Override hero subtitle */
  heroSubtitle?: string;
  
  /** Override trust stats */
  trustStats?: {
    stat: string;
    label: string;
  }[];
  
  /** Override pricing information */
  pricingHints?: string[];
  
  /** Override process steps */
  processSteps?: {
    title: string;
    description: string;
  }[];
  
  /** Override guarantees/certifications */
  guarantees?: string[];
}

/**
 * PRODUCTION SEO ENTRY - Type-Safe Production Contract
 * 
 * This is the STANDARD OUTPUT FORMAT for validated AI SEO content
 * ready for injection into production page templates.
 * 
 * PURPOSE:
 * - Single source of truth for production SEO data
 * - Type-safe contract between AI generation and page rendering
 * - Supports all required metadata, content blocks, and governance
 * 
 * USAGE:
 * 1. AI generates AISEOEntry drafts
 * 2. Human validates and enriches to ProductionSEOEntry
 * 3. Production pages consume ProductionSEOEntry
 * 
 * GOVERNANCE:
 * - Must pass semantic validation before production
 * - Must respect keyword ownership boundaries
 * - Must maintain 95%+ unique content across pages
 */
export interface ProductionSEOEntry {
  // ============================================================================
  // CORE METADATA (Required)
  // ============================================================================
  
  /** Canonical page slug/path (e.g., 'fontanero', 'electricista/urgencias-electricas') */
  slug: string;
  
  /** Meta title (max 60 chars) */
  metaTitle: string;
  
  /** Meta description (max 155 chars) */
  metaDescription: string;
  
  /** H1 heading */
  h1: string;
  
  /** Hero subtitle (optional, displayed below H1) */
  heroSubtitle?: string;
  
  // ============================================================================
  // SEMANTIC GOVERNANCE (Required)
  // ============================================================================
  
  /** Semantic governance metadata */
  governance: SemanticGovernanceMetadata;
  
  // ============================================================================
  // STRUCTURED CONTENT (Required)
  // ============================================================================
  
  /** FAQ items (4-8 recommended) */
  faqItems: FAQItem[];
  
  /** Schema topics for schema.org FAQPage (3-5 recommended) */
  schemaTopics: string[];
  
  /** SEO text blocks for structured content sections */
  seoTextBlocks: SEOTextBlock[];
  
  /** AI Overview optimized blocks (2-4 recommended) */
  aiOverviewBlocks: AIOverviewBlock[];
  
  // ============================================================================
  // OPTIONAL OVERRIDES
  // ============================================================================
  
  /** Optional component/block overrides */
  overrides?: ComponentOverrides;
  
  // ============================================================================
  // METADATA
  // ============================================================================
  
  /** Last updated timestamp */
  lastUpdated: string;
  
  /** Optional notes for content editors */
  editorNotes?: string;
}

// ============================================================================
// ADAPTER HELPERS
// ============================================================================

/**
 * Convert AISEOEntry (draft) to ProductionSEOEntry skeleton
 * 
 * This adapter helps convert AI-generated drafts into the production format.
 * Human validation and enrichment is still required before production use.
 * 
 * @param draft - AI-generated SEO entry
 * @param serviceGroup - Service family (e.g., 'fontanero', 'electricista')
 * @param childServiceSlug - Child service slug (optional)
 * @returns Partial ProductionSEOEntry (requires completion)
 */
export function aiDraftToProductionSkeleton(
  draft: AISEOEntry,
  serviceGroup: string,
  childServiceSlug?: string
): Partial<ProductionSEOEntry> {
  return {
    slug: draft.slug,
    metaTitle: draft.title,
    metaDescription: draft.metaDescription,
    h1: draft.h1,
    governance: {
      serviceGroup,
      childServiceSlug,
      primaryKeyword: '', // Must be filled manually
      validated: false, // Must be validated before production
    },
    faqItems: draft.faqTopics.map(topic => ({
      question: topic,
      answer: '', // Must be filled manually
    })),
    schemaTopics: draft.schemaTopics || [],
    seoTextBlocks: [], // Must be filled manually
    aiOverviewBlocks: [], // Must be filled manually
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Validate ProductionSEOEntry for completeness
 * 
 * Checks that all required fields are present and meet minimum requirements.
 * 
 * @param entry - Production SEO entry to validate
 * @returns Validation result with errors/warnings
 */
export function validateProductionSEOEntry(
  entry: Partial<ProductionSEOEntry>
): MapValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Required fields
  if (!entry.slug) errors.push('Missing required field: slug');
  if (!entry.metaTitle) errors.push('Missing required field: metaTitle');
  if (!entry.metaDescription) errors.push('Missing required field: metaDescription');
  if (!entry.h1) errors.push('Missing required field: h1');
  if (!entry.governance) errors.push('Missing required field: governance');
  if (!entry.faqItems || entry.faqItems.length === 0) errors.push('Missing required field: faqItems (min 1)');
  if (!entry.schemaTopics || entry.schemaTopics.length === 0) errors.push('Missing required field: schemaTopics (min 1)');
  if (!entry.seoTextBlocks) errors.push('Missing required field: seoTextBlocks');
  if (!entry.aiOverviewBlocks) errors.push('Missing required field: aiOverviewBlocks');
  
  // Governance validation
  if (entry.governance) {
    if (!entry.governance.serviceGroup) errors.push('Missing governance.serviceGroup');
    if (!entry.governance.primaryKeyword) errors.push('Missing governance.primaryKeyword');
    if (!entry.governance.validated) warnings.push('Content not yet validated for production');
  }
  
  // Length validation
  if (entry.metaTitle && entry.metaTitle.length > 60) {
    warnings.push(`metaTitle too long: ${entry.metaTitle.length} chars (max 60)`);
  }
  if (entry.metaDescription && entry.metaDescription.length > 155) {
    warnings.push(`metaDescription too long: ${entry.metaDescription.length} chars (max 155)`);
  }
  
  // Content completeness
  if (entry.faqItems) {
    entry.faqItems.forEach((faq, idx) => {
      if (!faq.question) errors.push(`FAQ ${idx}: missing question`);
      if (!faq.answer) errors.push(`FAQ ${idx}: missing answer`);
    });
  }
  
  if (entry.seoTextBlocks && entry.seoTextBlocks.length === 0) {
    warnings.push('No SEO text blocks provided (recommended: 3-5)');
  }
  
  if (entry.aiOverviewBlocks && entry.aiOverviewBlocks.length === 0) {
    warnings.push('No AI Overview blocks provided (recommended: 2-4)');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}
