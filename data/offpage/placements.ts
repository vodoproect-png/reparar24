import type { AnchorType } from './anchor-policy'
import type { LinkAttribute, ProspectType } from './prospects'

export type PlacementStatus = 'planned' | 'requested' | 'published' | 'indexed' | 'lost' | 'rejected'

export type OffpagePlacement = {
  id: string
  prospectId?: string
  domain: string
  pageUrl: string
  targetUrl: string
  anchor: string
  anchorType: AnchorType
  linkAttribute: LinkAttribute
  type: ProspectType
  status: PlacementStatus
  publishedAt?: string
  lastCheckedAt?: string
  priceEur?: number
  notes: string
}

export const offpagePlacements: OffpagePlacement[] = []
