import Link from 'next/link'
import type { Locale } from '@/lib/i18n/config'

interface RelatedService {
  name: string
  slug: string
  icon: string
  relation: string
  description: string
}

interface RelatedServicesBlockProps {
  currentServiceId: string
  locale: Locale
}

const serviceRelationships: Record<string, RelatedService[]> = {
  fontanero: [
    {
      name: 'Desatascos',
      slug: 'desatascos',
      icon: '🚰',
      relation: 'Servicio complementario',
      description: 'Si tu problema incluye tuberías atascadas o desagües obstruidos',
    },
    {
      name: 'Calefacción',
      slug: 'calefaccion',
      icon: '🔥',
      relation: 'Servicios relacionados',
      description: 'Para reparación de calderas y sistemas de calefacción',
    },
  ],
  electricista: [
    {
      name: 'Aire Acondicionado',
      slug: 'aire-acondicionado',
      icon: '❄️',
      relation: 'Instalación eléctrica',
      description: 'Para instalación eléctrica de aires acondicionados',
    },
    {
      name: 'Calefacción',
      slug: 'calefaccion',
      icon: '🔥',
      relation: 'Conexión eléctrica',
      description: 'Para conexión eléctrica de sistemas de calefacción',
    },
  ],
  desatascos: [
    {
      name: 'Fontanería',
      slug: 'fontanero',
      icon: '🔧',
      relation: 'Servicio complementario',
      description: 'Para reparación de tuberías tras desatascos complejos',
    },
  ],
  'aire-acondicionado': [
    {
      name: 'Calefacción',
      slug: 'calefaccion',
      icon: '🔥',
      relation: 'Climatización anual',
      description: 'Bombas de calor reversibles: frío en verano y calor en invierno',
    },
    {
      name: 'Electricidad',
      slug: 'electricista',
      icon: '⚡',
      relation: 'Instalación eléctrica',
      description: 'Para instalación eléctrica y cuadros de aire acondicionado',
    },
  ],
  calefaccion: [
    {
      name: 'Aire Acondicionado',
      slug: 'aire-acondicionado',
      icon: '❄️',
      relation: 'Climatización anual',
      description: 'Sistemas reversibles: calefacción en invierno y refrigeración en verano',
    },
    {
      name: 'Fontanería',
      slug: 'fontanero',
      icon: '🔧',
      relation: 'Sistema de tuberías',
      description: 'Para reparación del sistema de tuberías de calefacción',
    },
    {
      name: 'Electricidad',
      slug: 'electricista',
      icon: '⚡',
      relation: 'Conexión eléctrica',
      description: 'Para instalación eléctrica de calderas y termostatos',
    },
  ],
}

export function RelatedServicesBlock(props: RelatedServicesBlockProps) {
  const { currentServiceId } = props
  void props.locale

  const relatedServices = serviceRelationships[currentServiceId] || []

  if (!relatedServices.length) {
    return null
  }

  return (
    <section className="related-services-block my-8 rounded-lg bg-gray-50 p-6">
      <h3 className="mb-4 text-xl font-semibold text-neutral-900">Servicios relacionados</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {relatedServices.map((service) => (
          <Link
            key={service.slug}
            href={`/${service.slug}`}
            className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
          >
            <span className="flex-shrink-0 text-3xl">{service.icon}</span>
            <div className="flex-1">
              <div className="mb-1 flex items-center gap-2">
                <h4 className="font-semibold text-neutral-900">{service.name}</h4>
                <span className="text-xs font-medium text-primary-600">{service.relation}</span>
              </div>
              <p className="text-sm text-neutral-600">{service.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
