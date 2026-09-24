export type GbpService = {
  id: string
  category: string
  name: string
  url: string
  description: string
  priceHint: string
  priority: 'high' | 'medium' | 'low'
}

export const gbpServices: GbpService[] = [
  {
    id: 'fontanero-urgente',
    category: 'Fontaneria',
    name: 'Fontanero urgente 24 horas',
    url: 'https://reparar24.es/fontanero',
    description:
      'Reparacion urgente de fugas, grifos, cisternas, termos e instalaciones de fontaneria con presupuesto previo.',
    priceHint: 'Desde 49 EUR',
    priority: 'high',
  },
  {
    id: 'electricista-urgente',
    category: 'Electricidad',
    name: 'Electricista urgente 24 horas',
    url: 'https://reparar24.es/electricista',
    description:
      'Averias electricas, cuadros, diferenciales, enchufes, revisiones e instalaciones con tecnicos certificados.',
    priceHint: 'Desde 59 EUR',
    priority: 'high',
  },
  {
    id: 'desatascos',
    category: 'Desatascos',
    name: 'Desatascos y saneamiento',
    url: 'https://reparar24.es/desatascos',
    description:
      'Desatascos de tuberias, fregaderos, WC, arquetas, bajantes, camion cuba y saneamiento profesional.',
    priceHint: 'Presupuesto previo',
    priority: 'high',
  },
  {
    id: 'aire-acondicionado',
    category: 'Climatizacion',
    name: 'Aire acondicionado',
    url: 'https://reparar24.es/aire-acondicionado',
    description:
      'Instalacion, reparacion y mantenimiento de aire acondicionado, split, conductos y carga de gas.',
    priceHint: 'Desde 79 EUR',
    priority: 'medium',
  },
  {
    id: 'calefaccion',
    category: 'Calefaccion',
    name: 'Calefaccion y calderas',
    url: 'https://reparar24.es/calefaccion',
    description:
      'Reparacion de calderas, radiadores, mantenimiento, purgado y revision de sistemas de calefaccion.',
    priceHint: 'Desde 59 EUR',
    priority: 'medium',
  },
  {
    id: 'limpieza-tuberias',
    category: 'Limpieza de tuberias',
    name: 'Limpieza preventiva de tuberias',
    url: 'https://reparar24.es/limpieza-tuberias',
    description:
      'Limpieza industrial y preventiva de tuberias, bajantes, arquetas y colectores para comunidades y empresas.',
    priceHint: 'Desde 150 EUR',
    priority: 'medium',
  },
]
