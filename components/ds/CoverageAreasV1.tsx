import type { City } from '@/data/cities'
import type { Service } from '@/data/services'

interface CoverageAreasV1Props {
  service: Service
  city: City
}

/**
 * CoverageAreasV1 - Local coverage trust signal
 *
 * Purpose: Communicates which neighborhoods/districts a service+city page
 * covers without creating separate doorway pages per district. Replaces the
 * previous DistrictLinksBlock (which linked to now-removed district pages).
 *
 * SEO rationale: GSC + DataForSEO data showed no independent search demand
 * at district granularity for these services (near-zero 3-word volume for
 * "{service} {district} {city}"), so district-level content is consolidated
 * here as text rather than split across dozens of thin duplicate pages.
 */
export default function CoverageAreasV1({ service, city }: CoverageAreasV1Props) {
  if (!city.districts?.length) return null

  return (
    <section className="w-full bg-white px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-8 text-center">
          <h2 className="text-balance text-3xl font-extrabold leading-tight text-[#0F2D75] sm:text-4xl lg:text-[42px]">
            {service.name} en toda {city.name}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-[#5B6B8C] sm:text-lg">
            Cubrimos {city.name} y sus zonas, incluidas {city.districts.map((d) => d.name).join(', ')}.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {city.districts.map((district) => (
            <span
              key={district.id}
              className="rounded-full border border-[#E2E8F0] bg-[#F4F7FC] px-4 py-2 text-sm font-medium text-[#0F2D75]"
            >
              📍 {district.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
