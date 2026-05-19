import type { Locale } from '@/lib/i18n/config'

interface ProcessStep {
  number: number
  title: string
  description: string
  icon: string
}

interface ProcessSectionProps {
  locale: Locale
  serviceName?: string
  customSteps?: ProcessStep[]
}

/**
 * Reusable SEO section showing service process
 * 
 * Features:
 * - HowTo schema ready
 * - Trust-building
 * - Conversion-oriented
 * - Customizable per service
 * 
 * Usage:
 * - Service pages
 * - Landing pages
 * - District pages
 */
export default function ProcessSection({
  locale,
  serviceName = 'nuestro servicio',
  customSteps,
}: ProcessSectionProps) {
  const defaultSteps: ProcessStep[] = [
    {
      number: 1,
      title: 'Contacto Inmediato',
      description: 'Llámanos o escríbenos por WhatsApp. Atención 24/7 para emergencias.',
      icon: '📞',
    },
    {
      number: 2,
      title: 'Diagnóstico Profesional',
      description: 'Un técnico certificado acude en 30-60 minutos para evaluar el problema.',
      icon: '🔍',
    },
    {
      number: 3,
      title: 'Presupuesto Transparente',
      description: 'Te explicamos el problema y damos un presupuesto claro sin sorpresas.',
      icon: '💰',
    },
    {
      number: 4,
      title: 'Reparación Garantizada',
      description: 'Realizamos la reparación con herramientas profesionales y garantía de trabajo.',
      icon: '🔧',
    },
  ]

  const steps = customSteps || defaultSteps

  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            ¿Cómo Funciona {serviceName}?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Proceso simple y transparente. Desde el contacto hasta la reparación, 
            garantizamos profesionalidad y rapidez.
          </p>
        </div>

        {/* Desktop: 4-column grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="absolute top-12 left-1/2 w-full h-1 bg-primary-200 z-0" />
              )}
              
              <div className="relative z-10 text-center">
                {/* Icon circle */}
                <div className="icon-circle mx-auto mb-4 bg-primary-600 text-white text-3xl">
                  {step.icon}
                </div>
                
                {/* Step number */}
                <div className="inline-block bg-primary-600 text-white font-bold px-3 py-1 rounded-full mb-3 text-sm">
                  Paso {step.number}
                </div>
                
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Stack */}
        <div className="lg:hidden space-y-6 mb-12">
          {steps.map((step) => (
            <div key={step.number} className="card-flat">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="icon-circle flex-shrink-0 bg-primary-600 text-white">
                  {step.icon}
                </div>
                
                <div className="flex-1">
                  <div className="inline-block bg-primary-600 text-white font-bold px-2 py-1 rounded text-xs mb-2">
                    Paso {step.number}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-lg font-semibold mb-4">
            ¿Listo para resolver tu problema?
          </p>
          <a
            href="tel:+34641688524"
            className="btn-primary inline-flex"
          >
            📞 Llamar Ahora - 900 000 000
          </a>
        </div>
      </div>
    </section>
  )
}
