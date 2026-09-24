import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import type { City } from '@/data/cities'
import type { Service } from '@/data/services'
import type { Locale } from '@/lib/i18n/config'
import { getDistrictLinks } from '@/lib/linking/internal'

interface DistrictLinksBlockProps {
  service: Service
  city: City
  locale: Locale
  variant?: 'default' | 'compact'
  title?: string
  description?: string
}

/**
 * Internal links from city/hub pages to district landing pages.
 */
export default function DistrictLinksBlock({
  service,
  city,
  locale,
  variant = 'default',
  title,
  description,
}: DistrictLinksBlockProps) {
  const districtLinks = getDistrictLinks(city, service, locale)
  const isCompact = variant === 'compact'

  return (
    <section className={`w-full bg-white px-4 sm:px-6 ${isCompact ? 'py-10' : 'py-16'}`}>
      <div className="mx-auto max-w-[1280px]">
        <div className={`${isCompact ? 'mb-7' : 'mb-12'} text-center`}>
          <h2
            className={`text-balance font-extrabold leading-tight text-[#0F2D75] ${
              isCompact ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-3xl sm:text-4xl lg:text-[42px]'
            }`}
          >
            {title ?? `${service.name} por zonas en ${city.name}`}
          </h2>
          <p
            className={`mx-auto mt-4 max-w-2xl text-balance text-[#4A5B7D] ${
              isCompact ? 'text-sm sm:text-base' : 'text-base sm:text-lg'
            }`}
          >
            {description ?? 'Elige tu zona para ver el servicio disponible en tu distrito.'}
          </p>
        </div>

        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 ${isCompact ? 'gap-3' : 'gap-6'}`}>
          {districtLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group relative overflow-hidden rounded-xl border-2 border-[#E2E8F0] bg-white transition-all duration-300 hover:border-[#0F2D75] hover:shadow-lg ${
                isCompact ? 'p-4' : 'p-6'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`flex shrink-0 items-center justify-center rounded-lg bg-[#0F2D75] text-white transition-transform duration-300 group-hover:scale-110 ${
                    isCompact ? 'h-10 w-10' : 'h-12 w-12'
                  }`}
                >
                  <MapPin className={isCompact ? 'h-5 w-5' : 'h-6 w-6'} aria-hidden="true" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3
                    className={`font-bold text-[#0F2D75] transition-colors duration-300 group-hover:text-[#FF6B35] ${
                      isCompact ? 'text-base' : 'text-lg'
                    }`}
                  >
                    {link.title}
                  </h3>
                  <p className={`mt-1 line-clamp-2 text-[#4A5B7D] ${isCompact ? 'text-xs' : 'text-sm'}`}>
                    {link.description}
                  </p>
                </div>

                <div className="text-[#0F2D75] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-[#4A5B7D]">
          Servicio profesional disponible en todos los distritos de {city.name}
        </p>
      </div>
    </section>
  )
}
