import type { Locale } from '@/lib/i18n/config'
import { getPhoneHref, getPhoneDisplay } from '@/lib/config/contact'

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

export default function ProcessSection(props: ProcessSectionProps) {
  const {
    serviceName = 'nuestro servicio',
    customSteps,
  } = props

  void props.locale

  const defaultSteps: ProcessStep[] = [
    {
      number: 1,
      title: 'Contacto inmediato',
      description: 'Llámanos o escríbenos por WhatsApp. Atención 24/7 para emergencias.',
      icon: '📞',
    },
    {
      number: 2,
      title: 'Diagnóstico profesional',
      description: 'Un técnico certificado acude en 30-60 minutos para evaluar el problema.',
      icon: '🔍',
    },
    {
      number: 3,
      title: 'Presupuesto transparente',
      description: 'Te explicamos el problema y damos un presupuesto claro sin sorpresas.',
      icon: '💶',
    },
    {
      number: 4,
      title: 'Reparación garantizada',
      description: 'Realizamos la reparación con herramientas profesionales y garantía de trabajo.',
      icon: '🔧',
    },
  ]

  const steps = customSteps || defaultSteps

  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
            ¿Cómo funciona {serviceName}?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Proceso simple y transparente. Desde el contacto hasta la reparación,
            garantizamos profesionalidad y rapidez.
          </p>
        </div>

        <div className="mb-12 hidden gap-8 lg:grid lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-12 z-0 h-1 w-full bg-primary-200" />
              )}

              <div className="relative z-10 text-center">
                <div className="icon-circle mx-auto mb-4 bg-primary-600 text-3xl text-white">
                  {step.icon}
                </div>
                <div className="mb-3 inline-block rounded-full bg-primary-600 px-3 py-1 text-sm font-bold text-white">
                  Paso {step.number}
                </div>
                <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-12 space-y-6 lg:hidden">
          {steps.map((step) => (
            <div key={step.number} className="card-flat">
              <div className="flex items-start gap-4">
                <div className="icon-circle flex-shrink-0 bg-primary-600 text-white">
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className="mb-2 inline-block rounded bg-primary-600 px-2 py-1 text-xs font-bold text-white">
                    Paso {step.number}
                  </div>
                  <h3 className="mb-2 text-lg font-bold">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="mb-4 text-lg font-semibold">¿Listo para resolver tu problema?</p>
          <a href={getPhoneHref()} className="btn-primary inline-flex">
            📞 Llamar ahora - {getPhoneDisplay()}
          </a>
        </div>
      </div>
    </section>
  )
}
