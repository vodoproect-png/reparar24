import { type Locale } from '@/lib/i18n/config'
import { getPhoneHref, getPhoneDisplay, getWhatsAppHref, getEmail, getBusinessAddress } from '@/lib/config/contact'
import { getCompanyInfo } from '@/lib/config/company'
import { generateLocalBusinessSchema, generateOrganizationSchema } from '@/lib/seo/schema'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PaymentInfo from '@/components/business/PaymentInfo'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contacto - Reparar24 | Torrent, Valencia',
  description: 'Contacta con Reparar24 en Torrent, Valencia. Teléfono 641 688 524. Servicio 24 horas de fontanería, electricidad y reparaciones. WhatsApp disponible.',
  alternates: {
    canonical: 'https://reparar24.es/contacto',
  },
}

export async function generateStaticParams() {
  // SPANISH-ONLY PRODUCTION: Only generate Spanish pages
  const locales: Locale[] = ['es']
  return locales.map((locale) => ({ locale }))
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const address = getBusinessAddress()
  
  const localBusinessSchema = generateLocalBusinessSchema({
    name: 'Reparar24',
    description: 'Servicios profesionales de fontanería, electricidad y reparaciones 24 horas en Valencia',
  })

  const organizationSchema = generateOrganizationSchema()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      
      <Header locale={locale} />
      
      <main>
        {/* Contact Hero */}
        <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contacto</h1>
            <p className="text-xl text-primary-50 max-w-2xl">
              Estamos disponibles 24 horas para atenderte. Llámanos o envíanos un WhatsApp.
            </p>
          </div>
        </section>

        {/* Primary Contact CTAs */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Phone CTA */}
              <a
                href={getPhoneHref()}
                className="flex items-center justify-center gap-4 p-8 bg-gradient-to-br from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white rounded-xl shadow-lg transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <div className="text-left">
                  <div className="text-sm font-medium mb-1">Llamar Ahora</div>
                  <div className="text-2xl font-bold">{getPhoneDisplay()}</div>
                  <div className="text-sm text-accent-100">Atención 24/7</div>
                </div>
              </a>

              {/* WhatsApp CTA */}
              <a
                href={getWhatsAppHref('Hola, necesito información sobre sus servicios')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-4 p-8 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl shadow-lg transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <div className="text-left">
                  <div className="text-sm font-medium mb-1">WhatsApp</div>
                  <div className="text-2xl font-bold">{getPhoneDisplay()}</div>
                  <div className="text-sm text-green-100">Respuesta rápida</div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Business Information */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              
              {/* Company Info */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Reparar24</h2>
                <div className="space-y-6">
                  
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Dirección</h3>
                      <p className="text-gray-700 leading-relaxed">
                        {address.streetAddress}<br />
                        {address.postalCode} {address.addressLocality}<br />
                        {address.addressRegion}, {address.addressCountry}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Teléfono</h3>
                      <a href={getPhoneHref()} className="text-primary-600 hover:text-primary-700 font-semibold text-xl">
                        {getPhoneDisplay()}
                      </a>
                      <p className="text-gray-600 text-sm mt-1">Disponible 24 horas, 365 días</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Email</h3>
                      <a href={`mailto:${getEmail()}`} className="text-primary-600 hover:text-primary-700 font-semibold">
                        {getEmail()}
                      </a>
                      <p className="text-gray-600 text-sm mt-1">Respuesta en 24 horas</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Service Info & Hours */}
              <div className="space-y-8">
                
                {/* Working Hours */}
                <div className="card">
                  <h3 className="text-2xl font-bold mb-4">Horario de Atención</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span className="font-medium">Emergencias 24h</span>
                      <span className="text-green-600 font-semibold flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Disponible
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span className="font-medium">Lunes - Viernes</span>
                      <span className="text-gray-700">08:00 - 20:00</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span className="font-medium">Sábados</span>
                      <span className="text-gray-700">09:00 - 14:00</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span className="font-medium">Domingos y Festivos</span>
                      <span className="text-gray-700">Solo urgencias</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                    ℹ️ Atención telefónica 24/7 para urgencias. Presupuestos y consultas horario comercial.
                  </p>
                </div>

                {/* Coverage Area */}
                <div className="card bg-gradient-to-br from-primary-50 to-blue-50">
                  <h3 className="text-2xl font-bold mb-4">Zona de Cobertura</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Valencia y provincia</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Torrent y alrededores</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Servicios en toda España</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-700 mt-4">
                    Tiempo de llegada estimado: 30-60 minutos en Valencia ciudad
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Trust & Expertise Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Por Qué Confiar en Reparar24</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="card flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Profesionales Certificados</h3>
                    <p className="text-gray-600 text-sm">
                      Todos nuestros técnicos están debidamente cualificados y asegurados
                    </p>
                  </div>
                </div>

                <div className="card flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Respuesta Rápida</h3>
                    <p className="text-gray-600 text-sm">
                      Llegamos en 30-60 minutos en urgencias en Valencia y alrededores
                    </p>
                  </div>
                </div>

                <div className="card flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Garantía de Servicio</h3>
                    <p className="text-gray-600 text-sm">
                      Todos nuestros trabajos incluyen garantía por escrito
                    </p>
                  </div>
                </div>

                <div className="card flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Presupuesto Transparente</h3>
                    <p className="text-gray-600 text-sm">
                      Sin sorpresas. Presupuesto claro antes de empezar cualquier trabajo
                    </p>
                  </div>
                </div>

              </div>

              {/* Local Expertise */}
              <div className="card mt-8 bg-gradient-to-br from-blue-50 to-primary-50">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🏆</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Expertos Locales en Valencia</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Con sede en <strong>Torrent, Valencia</strong>, conocemos perfectamente las instalaciones
                      típicas de la zona, los problemas más comunes y las soluciones más efectivas. 
                      Nuestra experiencia local nos permite ofrecer un servicio más rápido y eficiente.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Map/Location Section */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Nuestra Ubicación</h2>
              
              <div className="card">
                <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-6 relative overflow-hidden">
                  {/* Map Placeholder - Can embed Google Maps iframe here */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-gray-600 font-medium">Torrent, Valencia</p>
                      <p className="text-sm text-gray-500 mt-1">Calle Navas de Tolosa, 9</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <a
                    href="https://maps.google.com/?q=Calle+Navas+de+Tolosa+9+Torrent+Valencia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Ver en Google Maps
                  </a>
                  
                  <a
                    href={getPhoneHref()}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-accent-500 hover:bg-accent-600 text-white rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Llamar Ahora
                  </a>
                  
                  <a
                    href={getWhatsAppHref('Hola, ¿cómo puedo llegar a su ubicación?')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Payment & Legal Information */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Información Empresarial y de Pago</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Payment Information */}
                <PaymentInfo locale={locale} />
                
                {/* Legal Information */}
                <div className="card bg-gradient-to-br from-gray-50 to-blue-50">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {locale === 'es' ? 'Información Legal' : locale === 'en' ? 'Legal Information' : 'Юридическая информация'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {locale === 'es' ? 'Empresa registrada en España' : locale === 'en' ? 'Company registered in Spain' : 'Компания зарегистрирована в Испании'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <span className="text-sm font-semibold text-gray-600 block mb-2">
                        {locale === 'es' ? 'Nombre Legal' : locale === 'en' ? 'Legal Name' : 'Юридическое название'}
                      </span>
                      <p className="font-semibold text-gray-900">{getCompanyInfo().legalName}</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <span className="text-sm font-semibold text-gray-600 block mb-2">
                        {locale === 'es' ? 'CIF' : locale === 'en' ? 'Tax ID (CIF)' : 'Налоговый номер (CIF)'}
                      </span>
                      <p className="font-mono text-lg font-semibold text-gray-900">{getCompanyInfo().cif}</p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <span className="text-sm font-semibold text-gray-600 block mb-2">
                        {locale === 'es' ? 'Domicilio Social' : locale === 'en' ? 'Registered Address' : 'Юридический адрес'}
                      </span>
                      <p className="text-gray-900 leading-relaxed">
                        {getBusinessAddress().streetAddress}<br />
                        {getBusinessAddress().postalCode} {getBusinessAddress().addressLocality}<br />
                        {getBusinessAddress().addressRegion}, {getBusinessAddress().addressCountry}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                    <p className="text-sm text-gray-700">
                      {locale === 'es' ? '📋 Empresa local con sede en Torrent, Valencia. Registrada y autorizada para servicios de fontanería, electricidad y reparaciones.' : 
                       locale === 'en' ? '📋 Local company based in Torrent, Valencia. Registered and authorized for plumbing, electrical and repair services.' :
                       '📋 Местная компания в Торренте, Валенсия. Зарегистрирована для сантехнических, электрических и ремонтных услуг.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Necesitas Ayuda Urgente?</h2>
            <p className="text-xl text-primary-50 mb-8 max-w-2xl mx-auto">
              Estamos disponibles 24 horas, 7 días a la semana. No dudes en contactarnos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={getPhoneHref()}
                className="btn-primary bg-accent-500 hover:bg-accent-600 text-lg px-8 py-4"
              >
                📞 Llamar {getPhoneDisplay()}
              </a>
              <a
                href={getWhatsAppHref('Hola, necesito ayuda urgente')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-green-500 hover:bg-green-600 text-lg px-8 py-4"
              >
                💬 WhatsApp Inmediato
              </a>
            </div>
          </div>
        </section>

      </main>
      
      <Footer locale={locale} />
    </>
  )
}
