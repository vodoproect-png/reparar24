import type { ChildPageServiceSlug } from '@/data/service-child-page-content'
import type { DiagnosticScenarioId } from '@/data/diagnostics'

export type BlogArticleStatus = 'planned' | 'draft' | 'ready' | 'published'
export type BlogIndexingPolicy = 'noindex' | 'index'
export type BlogIntent = 'diagnosis' | 'maintenance' | 'cost' | 'safety' | 'selection' | 'prevention'
export type BlogSemanticStatus = 'candidate' | 'approved'
export type BlogOriginalityStatus = 'unchecked' | 'internal-passed' | 'external-passed'
export type BlogDiagnosticPlacement = 'after-hero' | 'after-heading'

export interface BlogArticleSection {
  heading: string
  paragraphs: string[]
}

export interface BlogArticleFaq {
  question: string
  answer: string
}

export interface BlogCategory {
  slug: string
  title: string
  description: string
  serviceSlug: ChildPageServiceSlug
}

export interface BlogArticleBrief {
  slug: string
  categorySlug: string
  serviceSlug: ChildPageServiceSlug
  title: string
  h1: string
  description: string
  intent: BlogIntent
  status: BlogArticleStatus
  indexing: BlogIndexingPolicy
  semanticStatus?: BlogSemanticStatus
  semanticClusterId?: string
  originalityStatus?: BlogOriginalityStatus
  publishedAt?: string
  updatedAt?: string
  primaryKeyword: string
  secondaryKeywords: string[]
  commercialOwner: string
  supportLinks?: string[]
  outline: string[]
  bodySections?: BlogArticleSection[]
  diagnosticScenarioId?: DiagnosticScenarioId
  diagnosticPlacement?: BlogDiagnosticPlacement
  diagnosticPlacementAfterHeading?: string
  faq?: BlogArticleFaq[]
  llmAnswer: string
}
