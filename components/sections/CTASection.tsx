import type { Locale } from '@/lib/i18n/config'
import { getPhoneHref, getPhoneDisplay, getWhatsAppHref } from '@/lib/config/contact'

interface CTASectionProps {
  locale: Locale
}

export default function CTASection(props: CTASectionProps) {
  void props.locale

  return (
    <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-20 text-white">
      <div className="container-custom">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            ¿Necesitas un profesional ahora?
          </h2>
          <p className="mb-8 text-xl text-primary-50 md:text-2xl">
            Estamos disponibles 24/7 para atender tus emergencias. Respuesta rápida garantizada en toda España.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href={getPhoneHref()}
              className="inline-block rounded-lg bg-accent-500 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-200 hover:bg-accent-600 hover:shadow-xl"
            >
              📞 Llamar al {getPhoneDisplay()}
            </a>
            <a
              href={getWhatsAppHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg bg-green-500 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-200 hover:bg-green-600 hover:shadow-xl"
            >
              💬 WhatsApp
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 text-left md:grid-cols-3">
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <div className="mb-3 text-4xl">🕐</div>
              <h3 className="mb-2 text-xl font-bold">Disponibilidad 24/7</h3>
              <p className="text-primary-100">Servicio de emergencias disponible todos los días del año</p>
            </div>
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <div className="mb-3 text-4xl">💶</div>
              <h3 className="mb-2 text-xl font-bold">Presupuesto gratuito</h3>
              <p className="text-primary-100">Sin compromiso y con precios transparentes</p>
            </div>
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <div className="mb-3 text-4xl">✓</div>
              <h3 className="mb-2 text-xl font-bold">Garantía de calidad</h3>
              <p className="text-primary-100">Todos nuestros trabajos incluyen garantía</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
