"use client"

import type { LucideIcon } from "lucide-react"
import {
  Waves,
  Droplet,
  Wrench,
  Flame,
  Check,
  ArrowRight,
  Phone,
  ShieldCheck,
  Clock,
  Star,
  Award,
  Home,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"

type AccentColor = "blue" | "cyan" | "orange" | "green"

interface RelatedServiceCard {
  icon: LucideIcon
  title: string
  description: string
  color: AccentColor
  bullets: string[]
  ctaLabel?: string
}

interface TrustBadge {
  icon: LucideIcon
  title: string
  subtitle: string
}

interface CtaButtons {
  whatsappLabel: string
  callLabel: string
}

export interface RelatedServicesV1Props {
  badge?: string
  title?: string
  description?: string
  cards?: RelatedServiceCard[]
  ctaTitle?: string
  ctaText?: string
  cta?: CtaButtons
  trustBadges?: TrustBadge[]
}

/* Accent color maps — soft icon tiles + matching outline strokes */
const accentMap: Record<AccentColor, { iconBg: string; iconText: string; bullet: string }> = {
  blue: { iconBg: "bg-[#E4EDFB]", iconText: "text-[#2563EB]", bullet: "text-[#2563EB]" },
  cyan: { iconBg: "bg-[#DDF2F5]", iconText: "text-[#0891B2]", bullet: "text-[#0891B2]" },
  orange: { iconBg: "bg-[#FCEFDD]", iconText: "text-[#EA8A0C]", bullet: "text-[#EA8A0C]" },
  green: { iconBg: "bg-[#E3F5EC]", iconText: "text-[#16A34A]", bullet: "text-[#16A34A]" },
}

/* ---------- Defaults (fontanero example — fully overridable via props) ---------- */
const defaultCards: RelatedServiceCard[] = [
  {
    icon: Waves,
    title: "Desatascos",
    description: "Eliminamos atascos en tuberías, desagües y bajantes.",
    color: "blue",
    bullets: [
      "Atascos en fregaderos y lavabos",
      "Atascos en bañeras y duchas",
      "Atascos en W.C. y bidés",
      "Limpieza de tuberías y arquetas",
    ],
  },
  {
    icon: Droplet,
    title: "Reparación de fugas",
    description: "Detectamos y reparamos fugas de agua sin romper.",
    color: "cyan",
    bullets: [
      "Fugas de agua ocultas",
      "Fugas en tuberías y grifos",
      "Fugas en cisternas y sanitarios",
      "Detección con tecnología avanzada",
    ],
  },
  {
    icon: Wrench,
    title: "Sustitución de tuberías",
    description: "Cambiamos tuberías antiguas por nuevas y más eficientes.",
    color: "orange",
    bullets: [
      "Tubería multicapa Pex-Al-Pex",
      "Sustitución sin obra innecesaria",
      "Mejora de presión y caudal",
      "Cumplimiento normativa CTE-HS",
    ],
  },
  {
    icon: Flame,
    title: "Calentadores y termos",
    description: "Instalación, reparación y mantenimiento de equipos.",
    color: "green",
    bullets: [
      "Calentadores de gas estancos",
      "Termos eléctricos 50-100L",
      "Revisión y mantenimiento",
      "Instalación segura y eficiente",
    ],
  },
]

const defaultTrustBadges: TrustBadge[] = [
  { icon: ShieldCheck, title: "Profesionales", subtitle: "cualificados" },
  { icon: Clock, title: "Atención 24/7", subtitle: "365 días al año" },
  { icon: Star, title: "Más de 15 años", subtitle: "de experiencia" },
  { icon: Award, title: "Garantía por escrito", subtitle: "en todos los trabajos" },
  { icon: Home, title: "Trabajamos en toda", subtitle: "Valencia y alrededores" },
]

export default function RelatedServicesV1({
  badge = "Servicios Relacionados",
  title = "Soluciones relacionadas con fontanería",
  description = "Servicios que suelen ir junto a una reparación de fontanería.",
  cards = defaultCards,
  ctaTitle = "¿No estás seguro de qué servicio necesitas?",
  ctaText = "Cuéntanos tu problema y te asesoramos sin compromiso.",
  cta = { whatsappLabel: "WhatsApp", callLabel: "Llamar ahora  641 688 524" },
  trustBadges = defaultTrustBadges,
}: RelatedServicesV1Props) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

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
      setCurrentSlide(prev => Math.min(prev + 1, cards.length - 1))
    } else {
      // Swipe right - previous slide
      setCurrentSlide(prev => Math.max(prev - 1, 0))
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  return (
    <section className="w-full bg-white px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#2563EB]">{badge}</span>
          <span className="mt-3 h-1 w-10 rounded-full bg-[#2563EB]" aria-hidden="true" />
          <h2 className="mt-5 text-pretty text-3xl font-extrabold leading-tight text-[#0F2D75] sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#5B6B8C]">{description}</p>
        </div>

        {/* Service cards - Mobile Carousel / Desktop Grid */}
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
              {cards.map((card) => {
                const Icon = card.icon
                const accent = accentMap[card.color]
                return (
                  <div
                    key={card.title}
                    className="flex w-[85%] flex-shrink-0 flex-col rounded-[24px] border border-[#EAF0F9] bg-white p-6 shadow-[0_20px_45px_-24px_rgba(15,45,117,0.25)]"
                  >
                    {/* Icon tile */}
                    <span
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl ${accent.iconBg} ${accent.iconText}`}
                    >
                      <Icon className="h-7 w-7" strokeWidth={2} aria-hidden="true" />
                    </span>

                    {/* Title + description */}
                    <h3 className="mt-5 text-xl font-bold leading-snug text-[#0F2D75]">{card.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-[#5B6B8C]">{card.description}</p>

                    {/* Divider */}
                    <span className="mt-5 h-px w-full bg-[#EEF2F9]" aria-hidden="true" />

                    {/* Bullets */}
                    <ul className="mt-5 flex flex-col gap-3">
                      {card.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2.5 text-[15px] leading-snug text-[#3F4D68]">
                          <Check className={`mt-0.5 h-[18px] w-[18px] shrink-0 ${accent.bullet}`} strokeWidth={3} aria-hidden="true" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Footer (visual only) */}
                    <span
                      className={`mt-6 inline-flex items-center gap-1.5 text-sm font-bold ${accent.bullet}`}
                      aria-hidden="true"
                    >
                      {card.ctaLabel ?? "Más información"}
                      <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Pagination Dots */}
            <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Navegación de servicios">
              {cards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "w-8 bg-[#2563EB]"
                      : "w-2.5 bg-[#D1D5DB] hover:bg-[#9CA3AF]"
                  }`}
                  aria-label={`Ir a servicio ${index + 1}`}
                  aria-selected={index === currentSlide}
                  role="tab"
                />
              ))}
            </div>
          </div>

          {/* Desktop Grid (>= 768px) */}
          <div className="hidden sm:grid grid-cols-2 items-stretch gap-4 lg:grid-cols-4">
            {cards.map((card) => {
              const Icon = card.icon
              const accent = accentMap[card.color]
              return (
                <div
                  key={card.title}
                  className="group flex flex-col rounded-[24px] border border-[#EAF0F9] bg-white p-6 shadow-[0_20px_45px_-24px_rgba(15,45,117,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_55px_-22px_rgba(15,45,117,0.4)]"
                >
                  {/* Icon tile */}
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${accent.iconBg} ${accent.iconText} transition-transform duration-300 group-hover:scale-105`}
                  >
                    <Icon className="h-7 w-7" strokeWidth={2} aria-hidden="true" />
                  </span>

                  {/* Title + description */}
                  <h3 className="mt-5 text-xl font-bold leading-snug text-[#0F2D75]">{card.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#5B6B8C]">{card.description}</p>

                  {/* Divider */}
                  <span className="mt-5 h-px w-full bg-[#EEF2F9]" aria-hidden="true" />

                  {/* Bullets */}
                  <ul className="mt-5 flex flex-col gap-3">
                    {card.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5 text-[15px] leading-snug text-[#3F4D68]">
                        <Check className={`mt-0.5 h-[18px] w-[18px] shrink-0 ${accent.bullet}`} strokeWidth={3} aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Footer (visual only) */}
                  <span
                    className={`mt-6 inline-flex items-center gap-1.5 text-sm font-bold ${accent.bullet}`}
                    aria-hidden="true"
                  >
                    {card.ctaLabel ?? "Más información"}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.5} />
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA panel */}
        <div className="mt-6 flex flex-col gap-6 rounded-[28px] bg-[#EEF4FE] px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10">
          <div className="flex items-center gap-5">
            <span className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#D8E5FC] text-[#2563EB] sm:flex">
              <Phone className="h-7 w-7" strokeWidth={2} aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-xl font-bold leading-snug text-[#0F2D75] sm:text-2xl">{ctaTitle}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-[#5B6B8C]">{ctaText}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-[#2563EB] bg-white px-6 py-3.5 text-base font-bold text-[#2563EB] transition-colors duration-200 hover:bg-[#F2F6FF]"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {cta.whatsappLabel}
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#2563EB] px-6 py-3.5 text-base font-bold text-white shadow-[0_14px_30px_-12px_rgba(37,99,235,0.7)] transition-colors duration-200 hover:bg-[#1D4FD1]"
            >
              <Phone className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
              {cta.callLabel}
            </button>
          </div>
        </div>

        {/* Trust badges row */}
        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-6 rounded-[24px] bg-[#F6F8FC] px-6 py-7 sm:grid-cols-3 lg:grid-cols-5 lg:px-8">
          {trustBadges.map((badgeItem) => {
            const Icon = badgeItem.icon
            return (
              <div key={badgeItem.title} className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E4EDFB] text-[#2563EB]">
                  <Icon className="h-[22px] w-[22px]" strokeWidth={2} aria-hidden="true" />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-bold text-[#0F2D75]">{badgeItem.title}</p>
                  <p className="text-[13px] text-[#5B6B8C]">{badgeItem.subtitle}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* Inline WhatsApp glyph (no external icon dependency) */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}
