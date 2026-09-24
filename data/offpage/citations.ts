export type CitationStatus = 'todo' | 'submitted' | 'verified' | 'rejected' | 'needs-update'

export type CitationTarget = {
  id: string
  platform: string
  url: string
  country: string
  priority: 'high' | 'medium' | 'low'
  status: CitationStatus
  notes: string
}

export const citationNap = {
  businessName: 'ATG S.L.',
  tradeName: 'Reparar24',
  website: 'https://reparar24.es',
  phone: '+34 642 310 813',
  address: 'Calle Navas de Tolosa, 9, 46901 Torrent, Valencia, España',
}

export const citationTargets: CitationTarget[] = [
  {
    id: 'google-business-profile',
    platform: 'Google Business Profile',
    url: 'https://www.google.com/business/',
    country: 'ES',
    priority: 'high',
    status: 'todo',
    notes: 'Main local entity profile and review engine.',
  },
  {
    id: 'bing-places',
    platform: 'Bing Places',
    url: 'https://www.bingplaces.com/',
    country: 'ES',
    priority: 'high',
    status: 'todo',
    notes: 'Secondary search/map presence.',
  },
  {
    id: 'apple-business-connect',
    platform: 'Apple Business Connect',
    url: 'https://businessconnect.apple.com/',
    country: 'ES',
    priority: 'high',
    status: 'todo',
    notes: 'Important for iOS map discovery.',
  },
  {
    id: 'paginas-amarillas',
    platform: 'Páginas Amarillas',
    url: 'https://www.paginasamarillas.es/',
    country: 'ES',
    priority: 'medium',
    status: 'todo',
    notes: 'Spanish local business citation.',
  },
]
