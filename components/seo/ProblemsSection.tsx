import Link from 'next/link'
import type { Locale } from '@/lib/i18n/config'
import type { Problem } from '@/data/problems'

interface ProblemsSectionProps {
  problems: Problem[]
  serviceSlug: string
  citySlug?: string
  locale: Locale
  title?: string
  showCTA?: boolean
}

/**
 * Reusable SEO section for displaying common problems
 * 
 * Features:
 * - Semantic problem clustering
 * - Internal linking opportunities
 * - FAQ schema ready
 * - Conversion-oriented
 * - Mobile-optimized
 * 
 * Usage:
 * - Service pages
 * - City pages
 * - District pages
 * - Problem-intent pages
 */
export default function ProblemsSection({
  problems,
  serviceSlug,
  citySlug,
  locale,
  title = 'Problemas Comunes',
  showCTA = true,
}: ProblemsSectionProps) {
  if (!problems || problems.length === 0) return null

  return (
    <section className="section bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Resolvemos estos problemas de forma rápida y profesional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {problems.map((problem) => {
            const urgencyStyles = {
              emergency: 'border-l-4 border-emergency-600 bg-emergency-50',
              urgent: 'border-l-4 border-accent-600 bg-accent-50',
              normal: 'border-l-4 border-primary-600 bg-white',
            }

            const urgencyLabels = {
              emergency: '🚨 URGENTE',
              urgent: '⚡ Prioritario',
              normal: '✓ Resoluble',
            }

            return (
              <div
                key={problem.id}
                className={`card-flat hover:shadow-lg transition-all duration-300 ${urgencyStyles[problem.urgency]}`}
              >
                {/* Urgency Badge */}
                <div className="mb-3">
                  <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-white shadow-sm">
                    {urgencyLabels[problem.urgency]}
                  </span>
                </div>

                {/* Problem Title */}
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {problem.title}
                </h3>

                {/* FAQ Preview (if available) */}
                {problem.faqQuestion && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      {problem.faqQuestion}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {problem.faqAnswer}
                    </p>
                  </div>
                )}

                {/* Keywords */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {problem.keywords.slice(0, 3).map((keyword, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                {problem.urgency === 'emergency' && (
                  <a
                    href="tel:+34641688524"
                    className="btn-emergency btn-sm w-full text-center"
                  >
                    Llamar Urgente
                  </a>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        {showCTA && (
          <div className="text-center">
            <div className="inline-flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+34641688524"
                className="btn-primary"
              >
                📞 Llamar Ahora: 900 000 000
              </a>
              <a
                href={`https://wa.me/34641688524?text=${encodeURIComponent('Necesito ayuda con un problema')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>
            
            <p className="text-sm text-gray-600 mt-4">
              ⚡ Respuesta en 30-60 minutos • ✓ Profesionales certificados • 🛡️ Garantía de trabajo
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
