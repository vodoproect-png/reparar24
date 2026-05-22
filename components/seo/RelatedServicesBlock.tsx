/**
 * Related Services Block Component
 * 
 * Purpose: Contextual internal linking between related services
 * - Improves semantic relationships
 * - Distributes PageRank naturally
 * - Enhances user navigation
 * - GEO-neutral (no city mentions)
 * 
 * SEO Benefits:
 * - Natural internal linking
 * - Related service discovery
 * - Semantic clustering
 * - User intent coverage
 */

import React from 'react'
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

/**
 * Service relationship mapping
 * Each service lists contextually related services with rationale
 */
const serviceRelationships: Record<string, RelatedService[]> = {
  fontanero: [
    {
      name: 'Desatascos',
      slug: 'desatascos',
      icon: '🚰',
      relation: 'Servicio complementario',
      description: 'Si tu problema incluye tuberías atascadas o desagües obstruidos'
    },
    {
      name: 'Calefacción',
      slug: 'calefaccion',
      icon: '🔥',
      relation: 'Servicios relacionados',
      description: 'Para reparación de calderas y sistemas de calefacción'
    }
  ],
  electricista: [
    {
      name: 'Aire Acondicionado',
      slug: 'aire-acondicionado',
      icon: '❄️',
      relation: 'Instalación eléctrica',
      description: 'Para instalación eléctrica de aires acondicionados'
    },
    {
      name: 'Calefacción',
      slug: 'calefaccion',
      icon: '🔥',
      relation: 'Conexión eléctrica',
      description: 'Para conexión eléctrica de sistemas de calefacción'
    }
  ],
  desatascos: [
    {
      name: 'Fontanería',
      slug: 'fontanero',
      icon: '🔧',
      relation: 'Servicio complementario',
      description: 'Para reparación de tuberías tras desatascos complejos'
    }
  ],
  'aire-acondicionado': [
    {
      name: 'Electricidad',
      slug: 'electricista',
      icon: '⚡',
      relation: 'Instalación eléctrica',
      description: 'Para instalación eléctrica y cuadros de aire acondicionado'
    }
  ],
  calefaccion: [
    {
      name: 'Fontanería',
      slug: 'fontanero',
      icon: '🔧',
      relation: 'Sistema de tuberías',
      description: 'Para reparación del sistema de tuberías de calefacción'
    },
    {
      name: 'Electricidad',
      slug: 'electricista',
      icon: '⚡',
      relation: 'Conexión eléctrica',
      description: 'Para instalación eléctrica de calderas y termostatos'
    }
  ]
}

export function RelatedServicesBlock({ currentServiceId, locale }: RelatedServicesBlockProps) {
  const relatedServices = serviceRelationships[currentServiceId] || []
  
  if (relatedServices.length === 0) {
    return null
  }

  return (
    <section className="related-services-block bg-gray-50 rounded-lg p-6 my-8">
      <h3 className="text-xl font-semibold text-neutral-900 mb-4">
        Servicios Relacionados
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {relatedServices.map((service) => (
          <Link
            key={service.slug}
            href={`/${service.slug}`}
            className="flex items-start gap-4 bg-white rounded-lg p-4 hover:shadow-md transition-shadow border border-gray-200"
          >
            <span className="text-3xl flex-shrink-0">{service.icon}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-neutral-900">{service.name}</h4>
                <span className="text-xs text-primary-600 font-medium">
                  {service.relation}
                </span>
              </div>
              <p className="text-sm text-neutral-600">
                {service.description}
              </p>
            </div>
            <span className="text-primary-600 text-xl flex-shrink-0">→</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
