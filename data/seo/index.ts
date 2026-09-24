/**
 * SEO Semantic Layer - Central Barrel Export
 * 
 * PURPOSE:
 * This file provides a central import point for all Reparar24 semantic layer data.
 * It allows automation scripts, SEO Engine, Content Engine, and future Cline tasks
 * to import all semantic data from a single location.
 * 
 * USAGE:
 * ```typescript
 * import {
 *   // Types
 *   SemanticMap,
 *   SeoMap,
 *   KeywordCluster,
 *   
 *   // Electricista
 *   ELECTRICISTA_SEMANTIC_MAP,
 *   ELECTRICISTA_SEO_MAP,
 *   ELECTRICISTA_CLUSTERS,
 *   getElectricistaKeywords,
 *   getApprovedElectricistaChildren,
 *   
 *   // Fontanero
 *   FONTANERO_SEMANTIC_MAP,
 *   FONTANERO_SEO_MAP,
 *   FONTANERO_CLUSTERS,
 *   getFontaneroKeywords,
 *   getApprovedFontaneroChildren,
 * } from '@/data/seo';
 * ```
 * 
 * GOVERNANCE:
 * - This file only exports existing semantic layer files
 * - It does NOT connect to routes, pages, or components
 * - It does NOT affect build output or page generation
 * - It is a pure data export layer
 * 
 * DO NOT:
 * - Import this file in routing logic (yet)
 * - Import this file in page generation (yet)
 * - Import this file in metadata generation (yet)
 * - Use this to auto-generate pages without explicit approval
 */

// ============================================================================
// TYPES
// ============================================================================

export type {
  SemanticStatus,
  PageType,
  ChildServiceDefinition,
  FutureCategoryDefinition,
  SemanticMap,
  SeoTemplate,
  SeoMap,
  CommercialIntent,
  KeywordCluster,
  MapValidationResult,
} from './types';

// ============================================================================
// ELECTRICISTA - SEMANTIC MAP
// ============================================================================

export {
  ELECTRICISTA_SEMANTIC_MAP,
  getElectricistaKeywords,
  getApprovedElectricistaChildren,
} from './electricista-semantic-map';

// ============================================================================
// ELECTRICISTA - SEO MAP
// ============================================================================

export {
  ELECTRICISTA_SEO_MAP,
  getElectricistaSeoTemplate,
  validateElectricistaSeoMap,
} from './electricista-seo-map';

// ============================================================================
// ELECTRICISTA - KEYWORD CLUSTERS
// ============================================================================

export {
  ELECTRICISTA_CLUSTERS,
  ELECTRICISTA_FUTURE_CLUSTERS,
  getElectricistaCluster,
  getApprovedElectricistaClusterSlugs,
  getElectricistaClusterPrimaryKeywords,
  validateClusterAlignment as validateElectricistaClusterAlignment,
} from './electricista-clusters';

// ============================================================================
// FONTANERO - SEMANTIC MAP
// ============================================================================

export {
  FONTANERO_SEMANTIC_MAP,
  getFontaneroKeywords,
  getApprovedFontaneroChildren,
} from './fontanero-semantic-map';

// ============================================================================
// FONTANERO - SEO MAP
// ============================================================================

export {
  FONTANERO_SEO_MAP,
  getFontaneroSeoTemplate,
  validateFontaneroSeoMap,
} from './fontanero-seo-map';

// ============================================================================
// FONTANERO - KEYWORD CLUSTERS
// ============================================================================

export {
  FONTANERO_CLUSTERS,
  FONTANERO_FUTURE_CLUSTERS,
  getFontaneroCluster,
  getApprovedFontaneroClusterSlugs,
  getFontaneroClusterPrimaryKeywords,
  validateClusterAlignment as validateFontaneroClusterAlignment,
} from './fontanero-clusters';

// ============================================================================
// FUTURE EXPANSION
// ============================================================================

/**
 * When adding new services to the Semantic Layer:
 * 
 * 1. Create service-specific files following the existing pattern:
 *    - {service}-semantic-map.ts
 *    - {service}-seo-map.ts
 *    - {service}-clusters.ts
 * 
 * 2. Add exports to this file in a new section
 * 
 * 3. Update future automation scripts to consume the new exports
 * 
 * Example for future "Cerrajero" service:
 * 
 * export {
 *   CERRAJERO_SEMANTIC_MAP,
 *   getCerrajeroKeywords,
 *   getApprovedCerrajeroChildren,
 * } from './cerrajero-semantic-map';
 * 
 * export {
 *   CERRAJERO_SEO_MAP,
 *   getCerrajeroSeoTemplate,
 *   validateCerrajeroSeoMap,
 * } from './cerrajero-seo-map';
 * 
 * export {
 *   CERRAJERO_CLUSTERS,
 *   CERRAJERO_FUTURE_CLUSTERS,
 *   getCerrajeroCluster,
 *   getApprovedCerrajeroClusterSlugs,
 *   getCerrajeroClusterPrimaryKeywords,
 *   validateCerrajeroClusterAlignment,
 * } from './cerrajero-clusters';
 */
