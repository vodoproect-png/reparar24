import Link from 'next/link'
import type { Locale } from '@/lib/i18n/config'
import { cities } from '@/data/cities'

interface CitiesSectionProps {
  locale: Locale
}

export default function CitiesSection({ locale }: CitiesSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Nuestras Ciudades</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Presentes en las principales ciudades de España con profesionales locales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city) => (
            <Link
              key={city.id}
              href={`/${locale}/servicios/${city.slug}`}
              className="group p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:from-primary-50 hover:to-primary-100 transition-all duration-300 shadow-md hover:shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
                {city.name}
              </h3>
              <p className="text-gray-600 text-sm mb-3">{city.province}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-gray-700">
                  <span>👥</span>
                  <span>{city.population.toLocaleString('es-ES')} habitantes</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <span>📍</span>
                  <span>{city.districts.length} distritos</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-primary-600 font-semibold group-hover:underline">
                  Ver servicios en {city.name} →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
