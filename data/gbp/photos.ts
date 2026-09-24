export type GbpPhotoTask = {
  id: string
  category: 'logo' | 'cover' | 'exterior' | 'team' | 'vehicle' | 'service' | 'work'
  title: string
  description: string
  suggestedFile?: string
  priority: 'high' | 'medium' | 'low'
}

export const gbpPhotoPlan: GbpPhotoTask[] = [
  {
    id: 'logo',
    category: 'logo',
    title: 'Logo Reparar24',
    description: 'Square logo for GBP identity.',
    priority: 'high',
  },
  {
    id: 'cover-branded-technician-van',
    category: 'cover',
    title: 'Tecnico Reparar24 con vehiculo rotulado',
    description:
      'Cover image with branded technician, branded van and visible home repair context.',
    suggestedFile: 'public/images/homepage/reparar24-branded-technician-van.webp',
    priority: 'high',
  },
  {
    id: 'fontaneria-service',
    category: 'service',
    title: 'Servicio de fontaneria',
    description: 'Technician working on faucet, leak or plumbing installation.',
    priority: 'high',
  },
  {
    id: 'electricidad-service',
    category: 'service',
    title: 'Servicio de electricidad',
    description: 'Technician checking electrical panel, outlet or installation.',
    priority: 'high',
  },
  {
    id: 'desatascos-service',
    category: 'service',
    title: 'Servicio de desatascos',
    description: 'Drain cleaning equipment, pipe inspection or sanitation service.',
    priority: 'medium',
  },
  {
    id: 'clima-service',
    category: 'service',
    title: 'Servicio de climatizacion',
    description: 'Air conditioning installation or maintenance image.',
    priority: 'medium',
  },
]
