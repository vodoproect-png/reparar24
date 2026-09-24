import type { AnchorType } from './anchor-policy'

export type ProspectType =
  | 'citation'
  | 'local_directory'
  | 'niche_blog'
  | 'local_media'
  | 'partner'
  | 'supplier'
  | 'guest_post'
  | 'resource_page'
  | 'competitor_backlink'
  | 'sponsorship'

export type LinkAttribute = 'follow' | 'nofollow' | 'sponsored' | 'ugc' | 'unknown'

export type ProspectStatus =
  | 'new'
  | 'scored'
  | 'approved'
  | 'outreach'
  | 'negotiating'
  | 'placed'
  | 'rejected'
  | 'monitor'

export type OffpageProspect = {
  id: string
  domain: string
  url?: string
  type: ProspectType
  country: string
  language: string
  serviceFocus: string[]
  targetUrl: string
  preferredAnchorType: AnchorType
  linkAttribute: LinkAttribute
  priceEur?: number
  contact?: string
  source: 'manual' | 'dataforseo' | 'competitor' | 'citation-builder'
  status: ProspectStatus
  notes: string
  metrics?: {
    domainRank?: number
    organicTraffic?: number
    referringDomains?: number
    outboundLinks?: number
    spamSignals?: number
  }
}

export const offpageProspects: OffpageProspect[] = [
  {
    id: 'seed-google-business-profile',
    domain: 'google.com',
    type: 'citation',
    country: 'ES',
    language: 'es',
    serviceFocus: ['brand', 'local'],
    targetUrl: '/',
    preferredAnchorType: 'brand',
    linkAttribute: 'nofollow',
    source: 'manual',
    status: 'approved',
    notes: 'Core local entity profile. Keep NAP, services, photos and reviews updated.',
  },
  {
    id: 'seed-bing-places',
    domain: 'bingplaces.com',
    type: 'citation',
    country: 'ES',
    language: 'es',
    serviceFocus: ['brand', 'local'],
    targetUrl: '/',
    preferredAnchorType: 'naked_url',
    linkAttribute: 'nofollow',
    source: 'manual',
    status: 'approved',
    notes: 'Secondary local entity profile.',
  },
  {
    id: 'seed-local-valencia-media',
    domain: 'local-valencia-media.example',
    type: 'local_media',
    country: 'ES',
    language: 'es',
    serviceFocus: ['fontanero', 'electricista', 'desatascos', 'clima'],
    targetUrl: '/',
    preferredAnchorType: 'local_brand',
    linkAttribute: 'unknown',
    source: 'manual',
    status: 'new',
    notes: 'Replace with real Valencia media prospects after competitor backlink collection.',
  },
]
