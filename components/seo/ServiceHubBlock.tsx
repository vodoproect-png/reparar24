import Link from 'next/link'
import { type Locale } from '@/lib/i18n/config'

interface ServiceCard {
  title: string
  slug: string
  description: string
  trust: string
  icon: string
}

interface ServiceHubBlockProps {
  serviceSlug: string
  locale: Locale
  title?: string
  intro?: string
  cards: ServiceCard[]
}

/**
 * ServiceHubBlock - Premium service hub section showing specialized child services
 * 
 * Creates a visual/SEO foundation for future child service pages with:
 * - Semantic HTML structure
 * - Internal linking architecture
 * - AI-safe content pattern
 * - Responsive grid layout (3 cols desktop, 2 tablet, 1 mobile)
 * - Premium trust-focused design
 * 
 * @param serviceSlug - Parent service slug (e.g., 'fontanero')
 * @param locale - Current locale
 * @param title - Section title
 * @param intro - Section introduction
 * @param cards - Array of child service cards
 */
export function ServiceHubBlock({
  serviceSlug,
  locale,
  title = 'Servicios Especializados',
  intro,
  cards
}: ServiceHubBlockProps) {
  return (
    <section className="py-16 bg-white" aria-labelledby="service-hub-title">
      <div className="container-custom">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 
            id="service-hub-title"
            className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900"
          >
            {title}
          </h2>
          {intro && (
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
              {intro}
            </p>
          )}
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const href = `/${serviceSlug}/${card.slug}`
            
            return (
              <Link
                key={index}
                href={href}
                className="group block h-full"
              >
                <article className="h-full bg-white rounded-xl border-2 border-gray-200 hover:border-primary-400 transition-all duration-300 hover:shadow-lg p-6 flex flex-col">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-primary-100 text-3xl mb-4 group-hover:bg-primary-200 transition-colors">
                    {card.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-700 text-base leading-relaxed mb-4 flex-grow">
                    {card.description}
                  </p>

                  {/* Trust Line */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <span className="text-green-500">✓</span>
                    <span>{card.trust}</span>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center text-primary-600 font-semibold group-hover:text-primary-700 transition-colors">
                    <span>Ver servicio</span>
                    <svg 
                      className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
