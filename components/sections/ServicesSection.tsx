import Link from 'next/link'
import type { Locale } from '@/lib/i18n/config'
import { services } from '@/data/services'

interface ServicesSectionProps {
  locale: Locale
}

export default function ServicesSection({ locale }: ServicesSectionProps) {
  return (
    <section id="servicios" className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Nuestros Servicios</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Profesionales especializados para cada necesidad. Disponibles 24 horas para emergencias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link 
              key={service.id}
              href={`/${locale}/${service.slug}`}
              className="card group hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-600 transition-colors">
                {service.name}
              </h3>
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>
              
              <div className="space-y-2 mb-4">
                {service.benefits.slice(0, 3).map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-2 text-sm">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-primary-600 font-semibold">
                  {service.priceRange}
                </span>
                {service.available24h && (
                  <span className="bg-accent-100 text-accent-700 text-xs font-semibold px-3 py-1 rounded-full">
                    24 Horas
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
