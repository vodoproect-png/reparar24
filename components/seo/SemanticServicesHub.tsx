/**
 * Semantic Services Hub Component
 * 
 * Purpose: SEO-focused semantic clustering for fontanería services
 * - Strengthens topical authority
 * - Improves internal linking structure
 * - Enhances crawl paths
 * - Zero UX disruption
 * 
 * Design: Matches Reparar24 design system exactly
 * - Current colors, spacing, shadows
 * - Current typography system
 * - Responsive 3x3 grid → mobile stack
 * - Premium minimal aesthetic
 * 
 * ISOLATION: Can be disabled/removed without affecting other sections
 * 
 * SEO Benefits:
 * - Semantic service clustering
 * - Internal authority distribution
 * - Improved crawlability
 * - Enhanced topical relevance
 */

import React from 'react'
import Link from 'next/link'

interface ServiceCard {
  title: string
  items: string[]
  href?: string
  comingSoon?: boolean
}

interface SemanticServicesHubProps {
  /** Service ID to customize the hub (e.g., 'fontanero') */
  serviceId?: string
  /** Enable/disable the component (for easy rollback) */
  enabled?: boolean
}

/**
 * Service card configurations for fontanería cluster
 * Only active links to existing pages - no placeholder URLs
 * Future pages marked as "comingSoon"
 */
const fontaneriaServices: ServiceCard[] = [
  {
    title: 'Desatascos',
    items: ['WC y fregaderos', 'Bajantes', 'Servicio urgente'],
    href: '/desatascos'
  },
  {
    title: 'Detección de fugas',
    items: ['Fugas ocultas', 'Fugas en pared', 'Diagnóstico rápido'],
    comingSoon: true
  },
  {
    title: 'Agua caliente',
    items: ['Termos eléctricos', 'Calentadores', 'Reparación rápida'],
    comingSoon: true
  },
  {
    title: 'Tuberías',
    items: ['PVC y cobre', 'Sustitución', 'Reparaciones'],
    comingSoon: true
  },
  {
    title: 'Presión de agua',
    items: ['Baja presión', 'Bombas', 'Diagnóstico'],
    comingSoon: true
  },
  {
    title: 'Humedades',
    items: ['Filtraciones', 'Humedad pared', 'Inspección'],
    comingSoon: true
  },
  {
    title: 'Instalaciones',
    items: ['Radiadores', 'Calderas', 'Tuberías nuevas'],
    comingSoon: true
  },
  {
    title: 'Mantenimiento',
    items: ['Revisiones', 'Prevención', 'Servicio anual'],
    comingSoon: true
  },
  {
    title: 'Fontanero urgente',
    items: ['24 horas', 'Atención inmediata', 'Emergencias'],
    comingSoon: true
  }
]

export function SemanticServicesHub({ 
  serviceId = 'fontanero', 
  enabled = true 
}: SemanticServicesHubProps) {
  // Easy disable mechanism for rollback
  if (!enabled) {
    return null
  }

  // Currently only configured for fontanero
  // Can be extended for other services in the future
  if (serviceId !== 'fontanero') {
    return null
  }

  const services = fontaneriaServices

  return (
    <section 
      className="py-16 bg-white" 
      aria-labelledby="semantic-services-heading"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 
            id="semantic-services-heading" 
            className="text-3xl font-bold mb-4 text-gray-900"
          >
            Servicios de fontanería
          </h2>
          <p className="text-lg text-gray-600">
            Soluciones profesionales para todo tipo de problemas de fontanería.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const isClickable = !!service.href
            
            const cardContent = (
              <>
                {/* Header with title and badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3 flex-1">
                    {/* SVG Icon Circle */}
                    <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                      <svg 
                        className="w-5 h-5 text-primary-600" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                        />
                      </svg>
                    </div>
                    <h3 className={`text-lg font-bold text-gray-900 ${isClickable ? 'group-hover:text-primary-600' : ''} transition-colors`}>
                      {service.title}
                    </h3>
                  </div>
                  
                  {/* Coming Soon Badge */}
                  {service.comingSoon && (
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded whitespace-nowrap">
                      Próximamente
                    </span>
                  )}
                </div>

                {/* Service Items */}
                <ul className="space-y-2 flex-1">
                  {service.items.map((item, itemIndex) => (
                    <li 
                      key={itemIndex}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <span 
                        className="text-primary-500 mt-0.5 flex-shrink-0" 
                        aria-hidden="true"
                      >
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Hover Arrow Indicator (only for clickable) */}
                {isClickable && (
                  <div className="mt-4 flex items-center text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                    <span>Ver más</span>
                    <span className="ml-1 group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
                  </div>
                )}
              </>
            )
            
            // Render as Link or div based on href presence
            if (isClickable && service.href) {
              return (
                <Link
                  key={index}
                  href={service.href}
                  className="bg-white rounded-xl border-2 border-gray-100 p-6 flex flex-col h-full group hover:border-primary-200 hover:shadow-md cursor-pointer transition-all duration-300"
                  aria-label={`Ir a ${service.title}`}
                >
                  {cardContent}
                </Link>
              )
            }
            
            return (
              <div
                key={index}
                className="bg-white rounded-xl border-2 border-gray-100 p-6 flex flex-col h-full opacity-75 transition-all duration-300"
              >
                {cardContent}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/**
 * USAGE NOTES:
 * 
 * Integration:
 * ```tsx
 * import { SemanticServicesHub } from '@/components/seo/SemanticServicesHub'
 * 
 * // In your page component:
 * <SemanticServicesHub serviceId="fontanero" enabled={true} />
 * ```
 * 
 * Quick Disable:
 * ```tsx
 * <SemanticServicesHub enabled={false} />
 * ```
 * 
 * Complete Removal:
 * - Simply remove the import and component call
 * - No other sections are affected
 * - Zero side effects
 * 
 * SEO Considerations:
 * - Uses semantic HTML (section, h2, h3, ul, li)
 * - Proper heading hierarchy (h2 → h3)
 * - Accessible links with aria-labels
 * - Crawlable internal links
 * - No keyword stuffing
 * - Natural content flow
 */
