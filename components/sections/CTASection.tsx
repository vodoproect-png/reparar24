import type { Locale } from '@/lib/i18n/config'

interface CTASectionProps {
  locale: Locale
}

export default function CTASection({ locale }: CTASectionProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Necesitas un Profesional Ahora?
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-primary-50">
            Estamos disponibles 24/7 para atender tus emergencias. 
            Respuesta rápida garantizada en toda España.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:+34641688524" 
              className="bg-accent-500 hover:bg-accent-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-200 inline-block shadow-lg hover:shadow-xl"
            >
              📞 Llamar al 900 000 000
            </a>
            <a 
              href="https://wa.me/34641688524" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-200 inline-block shadow-lg hover:shadow-xl"
            >
              💬 WhatsApp
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl mb-3">🕐</div>
              <h3 className="font-bold text-xl mb-2">Disponibilidad 24/7</h3>
              <p className="text-primary-100">
                Servicio de emergencias disponible todos los días del año
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="font-bold text-xl mb-2">Presupuesto Gratuito</h3>
              <p className="text-primary-100">
                Sin compromiso y con precios transparentes
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="font-bold text-xl mb-2">Garantía de Calidad</h3>
              <p className="text-primary-100">
                Todos nuestros trabajos incluyen garantía
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
