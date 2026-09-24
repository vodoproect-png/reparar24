/**
 * District-Level SEO Content
 * 
 * ENTERPRISE DISTRICT SEO ROLLOUT - PHASE 1 PILOT
 * 
 * Governance Rules:
 * - Each district gets UNIQUE content
 * - Minimum 95% uniqueness required
 * - Anti-cannibalization validated
 * - Semantic ownership enforced
 * - AI/LLM optimized
 * 
 * Content Structure:
 * - Unique meta tags (title, description)
 * - Unique bottom SEO text (600-800 chars)
 * - Unique FAQ (3-5 questions)
 */

export interface DistrictSEO {
  serviceId: string
  citySlug: string
  districtSlug: string
  metadata: {
    title: string  // Must include district name
    description: string  // Must include district name
  }
  seoText: string  // 600-800 chars, bottom placement
  faqs: Array<{
    question: string
    answer: string
  }>
  uniquenessScore?: number  // Future: automated validation
  semanticOwnership: string[]  // Keywords owned by this page
}

/**
 * PHASE 1 PILOT: 5 Fontanero Districts
 * 
 * Strategic selection across cities and district types
 */
