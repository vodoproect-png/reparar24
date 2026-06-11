import Link from 'next/link'
import type { City } from '@/data/cities'
import type { Service } from '@/data/services'
import type { Locale } from '@/lib/i18n/config'
import { getDistrictLinks } from '@/lib/linking/internal'

interface DistrictLinksBlockProps {
  service: Service
  city: City
  locale: Locale
}

/**
 * DistrictLinksBlock - Internal linking to district pages
 * 
 * Purpose: Links from city pages to their district pages for internal SEO
 * Usage: Fontanero city pages only (not on district or hub pages)
 * 
 * Design: Clean cards grid following Design System V1 styling
 */
export default function DistrictLinksBlock({ service, city, locale }: DistrictLinksBlockProps) {
  const districtLinks = getDistrictLinks(city, service, locale)

  return (
    <section className="w-full bg-white px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-[1280px]">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-balance text-3xl font-extrabold leading-tight text-[#0F2D75] sm:text-4xl lg:text-[42px]">
            Fontaneros por zonas en {city.name}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-[#5B6B8C] sm:text-lg">
            Elige tu zona para ver el servicio de fontanería disponible en tu distrito.
          </p>
        </div>

        {/* District Links Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {districtLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative overflow-hidden rounded-xl border-2 border-[#E2E8F0] bg-white p-6 transition-all duration-300 hover:border-[#0F2D75] hover:shadow-lg"
            >
              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#0F2D75] text-2xl transition-transform duration-300 group-hover:scale-110">
                  📍
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-[#0F2D75] group-hover:text-[#FF6B35] transition-colors duration-300">
                    {link.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#5B6B8C] line-clamp-2">
                    {link.description}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="text-[#0F2D75] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Optional helper text */}
        <p className="mt-8 text-center text-sm text-[#5B6B8C]">
          Servicio profesional de fontanería disponible en todos los distritos de {city.name}
        </p>
      </div>
    </section>
  )
}
