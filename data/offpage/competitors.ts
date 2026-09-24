export type OffpageCompetitor = {
  domain: string
  market: 'valencia' | 'spain'
  services: string[]
  notes: string
}

export const offpageCompetitors: OffpageCompetitor[] = [
  {
    domain: 'habitissimo.es',
    market: 'spain',
    services: ['fontanero', 'electricista', 'desatascos', 'clima'],
    notes: 'Aggregator benchmark for category and city backlinks.',
  },
  {
    domain: 'cronoshare.com',
    market: 'spain',
    services: ['fontanero', 'electricista', 'clima'],
    notes: 'Aggregator with many long-tail service pages.',
  },
  {
    domain: 'zaask.es',
    market: 'spain',
    services: ['fontanero', 'electricista', 'limpieza'],
    notes: 'Useful for service marketplace donor discovery.',
  },
  {
    domain: 'urgenciasfontanerosvalencia.es',
    market: 'valencia',
    services: ['fontanero', 'desatascos'],
    notes: 'Local direct competitor pattern.',
  },
  {
    domain: 'electricistasvalencia24h.com',
    market: 'valencia',
    services: ['electricista'],
    notes: 'Local electricista competitor pattern.',
  },
]
