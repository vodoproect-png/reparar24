export type AnchorType =
  | 'brand'
  | 'naked_url'
  | 'generic'
  | 'partial_commercial'
  | 'exact_commercial'
  | 'local_brand'
  | 'image_alt'

export type OffpageRiskMode = 'conservative' | 'balanced' | 'aggressiveManaged'

export type AnchorPolicyRule = {
  type: AnchorType
  minPercent: number
  maxPercent: number
  examples: string[]
  notes: string
}

export const offpageRiskMode: OffpageRiskMode = 'aggressiveManaged'

export const anchorPolicy: AnchorPolicyRule[] = [
  {
    type: 'brand',
    minPercent: 35,
    maxPercent: 50,
    examples: ['Reparar24', 'ATG S.L.', 'Reparar 24'],
    notes: 'Primary safe anchor class. Use on most outreach and PR placements.',
  },
  {
    type: 'naked_url',
    minPercent: 15,
    maxPercent: 25,
    examples: ['https://reparar24.es', 'reparar24.es'],
    notes: 'Keeps profile natural for citations and directories.',
  },
  {
    type: 'generic',
    minPercent: 10,
    maxPercent: 20,
    examples: ['ver servicio', 'más información', 'contactar', 'sitio web'],
    notes: 'Useful for citations, partner pages and button links.',
  },
  {
    type: 'local_brand',
    minPercent: 10,
    maxPercent: 20,
    examples: ['Reparar24 en Valencia', 'servicio Reparar24 Valencia'],
    notes: 'Good fit for local mentions and city/district pages.',
  },
  {
    type: 'partial_commercial',
    minPercent: 8,
    maxPercent: 18,
    examples: ['fontaneros en Valencia', 'servicio de desatascos', 'electricistas 24h'],
    notes: 'Allowed on relevant pages after scoring.',
  },
  {
    type: 'exact_commercial',
    minPercent: 0,
    maxPercent: 5,
    examples: ['fontanero urgente Valencia', 'electricista 24 horas Valencia'],
    notes: 'Use rarely, only on strong contextual placements.',
  },
  {
    type: 'image_alt',
    minPercent: 0,
    maxPercent: 5,
    examples: ['Reparar24 servicio urgente', 'técnico Reparar24'],
    notes: 'For logos, badges and image citations.',
  },
]

export const targetUrlPriority = [
  '/',
  '/fontanero',
  '/electricista',
  '/desatascos',
  '/aire-acondicionado',
  '/calefaccion',
  '/limpieza-tuberias',
]

export const prohibitedPatterns = [
  'casino',
  'betting',
  'adult',
  'crypto spam',
  'essay',
  'loan spam',
  'sitewide footer',
  'hacked',
  'pbn footprint',
  'auto-generated directory',
]
