/**
 * Commercial CTA Component
 * 
 * Strong conversion-focused call-to-action
 * Multi-channel: Phone + WhatsApp
 * 
 * Used in: /fontanero master template
 * Future: Template for all service pages
 */

interface CommercialCTAProps {
  title?: string
  subtitle?: string
  variant?: 'primary' | 'secondary'
  showWhatsApp?: boolean
}

export function CommercialCTA({ 
  title = '¿Necesitas un Fontanero Profesional?',
  subtitle = 'Atención inmediata 24/7. Presupuesto gratuito sin compromiso.',
  variant = 'primary',
  showWhatsApp = true
}: CommercialCTAProps) {
  const phone = '+34641688524'
  const whatsappMessage = encodeURIComponent('Hola, necesito un fontanero profesional. ¿Pueden ayudarme?')
  
  const bgClass = variant === 'primary' 
    ? 'bg-gradient-to-br from-primary-600 to-primary-800' 
    : 'bg-gradient-to-br from-accent-500 to-accent-600'

  return (
    <section className={`py-16 ${bgClass} text-white`}>
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl mb-8 text-primary-50">{subtitle}</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={`tel:${phone}`}
              className="btn-primary bg-white text-primary-600 hover:bg-gray-100 w-full sm:w-auto px-8 py-4 text-lg font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              📞 Llamar Ahora
            </a>
            
            {showWhatsApp && (
              <a
                href={`https://wa.me/${phone.replace('+', '')}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-green-500 hover:bg-green-600 w-full sm:w-auto px-8 py-4 text-lg font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                💬 WhatsApp
              </a>
            )}
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-primary-100">
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Sin compromiso
            </span>
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Respuesta inmediata
            </span>
            <span className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Disponible 24/7
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
