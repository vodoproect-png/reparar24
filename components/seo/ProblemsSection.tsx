import type { Locale } from '@/lib/i18n/config'
import type { Problem } from '@/data/problems'
import { getPhoneHref, getPhoneDisplay, getWhatsAppHref } from '@/lib/config/contact'

interface ProblemsSectionProps {
  problems: Problem[]
  serviceSlug: string
  citySlug?: string
  locale: Locale
  title?: string
  showCTA?: boolean
}

export default function ProblemsSection(props: ProblemsSectionProps) {
  const {
    problems,
    title = 'Problemas comunes',
    showCTA = true,
  } = props

  void props.serviceSlug
  void props.citySlug
  void props.locale

  if (!problems.length) return null

  return (
    <section className="section bg-gray-50">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl">{title}</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Resolvemos estos problemas de forma rápida y profesional
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                className={`card-flat transition-all duration-300 hover:shadow-lg ${urgencyStyles[problem.urgency]}`}
              >
                <div className="mb-3">
                  <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-bold shadow-sm">
                    {urgencyLabels[problem.urgency]}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-bold text-gray-900">{problem.title}</h3>

                {problem.faqQuestion && (
                  <div className="mb-4">
                    <p className="mb-1 text-sm font-semibold text-gray-700">{problem.faqQuestion}</p>
                    <p className="line-clamp-3 text-sm text-gray-600">{problem.faqAnswer}</p>
                  </div>
                )}

                <div className="mb-4 flex flex-wrap gap-2">
                  {problem.keywords.slice(0, 3).map((keyword) => (
                    <span key={keyword} className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
                      {keyword}
                    </span>
                  ))}
                </div>

                {problem.urgency === 'emergency' && (
                  <a href={getPhoneHref()} className="btn-emergency btn-sm w-full text-center">
                    Llamar urgente
                  </a>
                )}
              </div>
            )
          })}
        </div>

        {showCTA && (
          <div className="text-center">
            <div className="inline-flex flex-col gap-3 sm:flex-row">
              <a href={getPhoneHref()} className="btn-primary">
                📞 Llamar ahora: {getPhoneDisplay()}
              </a>
              <a
                href={getWhatsAppHref('Necesito ayuda con un problema')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                WhatsApp
              </a>
            </div>

            <p className="mt-4 text-sm text-gray-600">
              ⚡ Respuesta en 30-60 minutos · ✓ Profesionales certificados · 🛡️ Garantía de trabajo
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
