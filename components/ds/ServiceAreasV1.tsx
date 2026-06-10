"use client"

import { MapPin, Clock, ShieldCheck, Phone } from "lucide-react"
import { useState, useEffect, useRef } from "react"

interface ZoneCard {
  image: string
  alt: string
  city: string
  description: string
}

const zones: ZoneCard[] = [
  {
    image: "/cities/torrent.png",
    alt: "Torre medieval y casco histórico de Torrent, Valencia",
    city: "Fontanero en Torrent",
    description: "Fontaneros expertos en Torrent. Atención rápida, 24/7 y sin compromiso.",
  },
  {
    image: "/cities/paterna.png",
    alt: "Torre árabe de Paterna sobre el casco antiguo, Valencia",
    city: "Fontanero en Paterna",
    description: "Servicio de fontanería en Paterna. Profesionales locales a tu disposición.",
  },
  {
    image: "/cities/mislata.png",
    alt: "Plaza y edificios del centro urbano de Mislata, Valencia",
    city: "Fontanero en Mislata",
    description: "Fontaneros en Mislata. Solucionamos averías y reformas de fontanería.",
  },
  {
    image: "/cities/sagunto.png",
    alt: "Castillo en lo alto del cerro sobre el pueblo de Sagunto, Valencia",
    city: "Fontanero en Sagunto",
    description: "Atención rápida en Sagunto. Reparaciones, instalaciones y mantenimiento.",
  },
  {
    image: "/cities/gandia.png",
    alt: "Playa de Gandía con palmeras y mar Mediterráneo, Valencia",
    city: "Fontanero en Gandía",
    description: "Fontaneros en Gandía. Soluciones eficaces para tu hogar o negocio.",
  },
  {
    image: "/cities/burjassot.png",
    alt: "Plaza histórica de Burjassot, Valencia",
    city: "Fontanero en Burjassot",
    description: "Servicio de fontanería en Burjassot. Calidad, rapidez y garantía.",
  },
]

export function ServiceAreasV1() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const hasShownHint = useRef(false)

  // Onboarding hint animation - subtle nudge on first render
  useEffect(() => {
    if (hasShownHint.current || !carouselRef.current) return
    if (window.innerWidth >= 768) return // Only on mobile

    hasShownHint.current = true
    const carousel = carouselRef.current

    // Subtle nudge: move left a bit, then back
    const nudgeLeft = setTimeout(() => {
      carousel.style.transition = "transform 0.4s ease-out"
      carousel.style.transform = "translateX(-20px)"
    }, 300)

    const nudgeBack = setTimeout(() => {
      carousel.style.transition = "transform 0.4s ease-out"
      carousel.style.transform = "translateX(0)"
    }, 700)

    return () => {
      clearTimeout(nudgeLeft)
      clearTimeout(nudgeBack)
    }
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const minSwipeDistance = 50

    if (Math.abs(distance) < minSwipeDistance) return

    if (distance > 0) {
      // Swipe left - next slide
      setCurrentSlide(prev => Math.min(prev + 1, zones.length - 1))
    } else {
      // Swipe right - previous slide
      setCurrentSlide(prev => Math.max(prev - 1, 0))
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  return (
    <section className="w-full bg-[#F4F7FC] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#E4EDFB] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#2563EB]">
            <MapPin className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
            Zonas donde trabajamos
          </span>
          <h2 className="mt-6 text-balance text-4xl font-extrabold leading-tight text-[#0F2D75] sm:text-5xl lg:text-[56px]">
            Fontanero cerca de ti
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-[#5B6B8C] sm:text-xl">
            Ofrecemos servicio de fontanería profesional en Valencia y principales ciudades cercanas. Llegamos
            rápidamente a tu zona.
          </p>
        </div>

        {/* Zone Cards - Mobile Carousel / Desktop Grid */}
        <div className="mt-4">
          {/* Mobile Carousel (< 768px) */}
          <div className="sm:hidden overflow-hidden">
            <div
              ref={carouselRef}
              className="flex gap-4 transition-transform duration-300 ease-out"
              style={{
                transform: `translateX(-${currentSlide * 88}%)`,
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {zones.map((zone) => (
                <div
                  key={zone.city}
                  className="w-[85%] flex-shrink-0 flex flex-col overflow-hidden rounded-[24px] border border-[#EAF0F9] bg-white shadow-[0_20px_45px_-24px_rgba(15,45,117,0.25)]"
                >
                  {/* City image (primary visual) */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#E1ECFD]">
                    <img
                      src={zone.image || "/placeholder.svg"}
                      alt={zone.alt}
                      loading="lazy"
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="flex flex-col px-6 pb-4 pt-3.5">
                    {/* Title */}
                    <h3 className="text-xl font-bold leading-tight text-[#0F2D75]">{zone.city}</h3>

                    {/* Description */}
                    <p className="mt-1 text-[15px] leading-snug text-[#5B6B8C]">{zone.description}</p>

                    {/* Footer: response time only (NO CTA - informational) */}
                    <div className="mt-3 flex items-center border-t border-[#EEF2F9] pt-3">
                      <span className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB]">
                        <Clock className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
                        30-60 min
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Navegación de zonas">
              {zones.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "w-8 bg-[#2563EB]"
                      : "w-2.5 bg-[#D1D5DB] hover:bg-[#9CA3AF]"
                  }`}
                  aria-label={`Ir a zona ${index + 1}`}
                  aria-selected={index === currentSlide}
                  role="tab"
                />
              ))}
            </div>
          </div>

          {/* Desktop Grid (>= 768px) - NO CHANGES */}
          <div className="hidden sm:grid grid-cols-2 gap-4 lg:grid-cols-3">
            {zones.map((zone) => (
              <div
                key={zone.city}
                className="flex flex-col overflow-hidden rounded-[24px] border border-[#EAF0F9] bg-white shadow-[0_20px_45px_-24px_rgba(15,45,117,0.25)] transition-shadow duration-300 hover:shadow-[0_28px_55px_-22px_rgba(15,45,117,0.35)]"
              >
                {/* City image (primary visual) */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#E1ECFD]">
                  <img
                    src={zone.image || "/placeholder.svg"}
                    alt={zone.alt}
                    loading="lazy"
                    className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
                  />
                </div>

                <div className="flex flex-col px-6 pb-4 pt-3.5">
                  {/* Title */}
                  <h3 className="text-xl font-bold leading-tight text-[#0F2D75]">{zone.city}</h3>

                  {/* Description */}
                  <p className="mt-1 text-[15px] leading-snug text-[#5B6B8C]">{zone.description}</p>

                  {/* Footer: response time only (NO CTA - informational) */}
                  <div className="mt-3 flex items-center border-t border-[#EEF2F9] pt-3">
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB]">
                      <Clock className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
                      30-60 min
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom trust bar */}
        <div className="mt-4 flex flex-col items-center gap-6 rounded-[28px] border border-[#EAF0F9] bg-white px-6 py-7 shadow-[0_20px_45px_-24px_rgba(15,45,117,0.25)] sm:px-8 lg:flex-row lg:justify-between">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:text-left">
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#E1ECFD] text-[#2563EB] shadow-[0_8px_18px_-10px_rgba(37,99,235,0.7)]">
              <ShieldCheck className="h-6 w-6" strokeWidth={2.25} aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-lg font-extrabold leading-tight text-[#0F2D75]">
                Cobertura en Valencia y alrededores
              </h3>
              <p className="mt-1 text-[15px] leading-relaxed text-[#5B6B8C]">
                Si tu ciudad no aparece en la lista, consúltanos. Cubrimos toda el área metropolitana de Valencia.
              </p>
            </div>
          </div>

          <a
            href="tel:+34641688524"
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl border-2 border-[#2563EB] px-6 py-3.5 text-base font-bold text-[#2563EB] transition-colors duration-200 hover:bg-[#2563EB] hover:text-white sm:w-auto lg:flex-shrink-0"
          >
            <Phone className="h-5 w-5 flex-shrink-0" strokeWidth={2.25} aria-hidden="true" />
            Llámanos ahora
          </a>
        </div>
      </div>
    </section>
  )
}

export default ServiceAreasV1
