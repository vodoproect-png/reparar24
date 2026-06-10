import type { LucideIcon } from "lucide-react"
import {
  Phone,
  MessageCircle,
  Star,
  Clock,
  ShieldCheck,
  Check,
  Droplets,
  Waves,
  Flame,
  Wrench,
} from "lucide-react"
import Image from "next/image"

type CTA = {
  label: string
  sublabel?: string
  href: string
}

type TrustCard = {
  icon: LucideIcon
  title: string
  subtitle: string
}

type QuickChip = {
  icon: LucideIcon
  label: string
  href?: string
  active?: boolean
}

type Highlight = {
  label: string
}

export type ServiceHeroV2Props = {
  eyebrow?: string
  title: string
  titleHighlight?: string
  subtitle?: string
  phoneCta: CTA
  whatsappCta: CTA
  trustCards?: TrustCard[]
  quickChips?: QuickChip[]
  highlights?: Highlight[]
  image: {
    src: string
    alt: string
  }
  compactImage?: boolean
}

export function ServiceHeroV2({
  eyebrow,
  title,
  titleHighlight,
  subtitle,
  phoneCta,
  whatsappCta,
  trustCards = [],
  quickChips = [],
  highlights = [],
  image,
  compactImage = false,
}: ServiceHeroV2Props) {
  // Adjust grid layout for long titles
  const gridClasses = compactImage
    ? "grid items-center gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-10"
    : "grid items-center gap-6 lg:grid-cols-2 lg:gap-10"
    
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 pt-2 pb-6 sm:px-6 lg:px-8">
        <div className={gridClasses}>
          {/* Left: copy + CTAs */}
          <div className="flex flex-col">
            {eyebrow ? (
              <span className="mb-3 inline-flex w-fit items-center rounded-full bg-primary-600/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary-600">
                {eyebrow}
              </span>
            ) : null}

            <h1 className="text-pretty text-5xl font-extrabold leading-[1] tracking-tight text-primary-900 sm:text-6xl lg:text-7xl xl:text-8xl">
              {title}
              {titleHighlight ? (
                <>
                  {" "}
                  <span className="text-primary-600">{titleHighlight}</span>
                </>
              ) : null}
            </h1>

            {subtitle ? (
              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-gray-600 sm:text-lg">
                {subtitle}
              </p>
            ) : null}

            {/* CTAs */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={phoneCta.href}
                className="inline-flex flex-1 items-center justify-center gap-3 rounded-xl bg-orange-500 px-6 py-4 text-white shadow-sm transition-colors hover:bg-orange-600 sm:flex-initial"
              >
                <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span className="flex flex-col items-start leading-tight">
                  <span className="text-base font-bold">{phoneCta.label}</span>
                  {phoneCta.sublabel ? (
                    <span className="text-xs font-medium text-white/90">{phoneCta.sublabel}</span>
                  ) : null}
                </span>
              </a>

              <a
                href={whatsappCta.href}
                className="inline-flex flex-1 items-center justify-center gap-3 rounded-xl bg-green-500 px-6 py-4 text-white shadow-sm transition-colors hover:bg-green-600 sm:flex-initial"
              >
                <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span className="flex flex-col items-start leading-tight">
                  <span className="text-base font-bold">{whatsappCta.label}</span>
                  {whatsappCta.sublabel ? (
                    <span className="text-xs font-medium text-white/90">{whatsappCta.sublabel}</span>
                  ) : null}
                </span>
              </a>
            </div>

            {/* Trust mini cards */}
            {trustCards.length > 0 ? (
              <div className="mt-8 grid grid-cols-3 gap-3">
                {trustCards.map((card, i) => {
                  const Icon = card.icon
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white px-3 py-3 shadow-sm"
                    >
                      <Icon className="h-5 w-5 shrink-0 text-primary-600" aria-hidden="true" />
                      <span className="flex flex-col leading-tight">
                        <span className="text-xs font-bold text-gray-900 sm:text-sm">{card.title}</span>
                        <span className="text-xs text-gray-600">{card.subtitle}</span>
                      </span>
                    </div>
                  )
                })}
              </div>
            ) : null}

            {/* Quick service chips */}
            {quickChips.length > 0 ? (
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold text-gray-900">¿Qué necesitas?</span>
                <div className="flex flex-wrap gap-2">
                  {quickChips.map((chip, i) => {
                    const Icon = chip.icon
                    const isActive = chip.active || false
                    const baseClasses = "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition-colors"
                    const activeClasses = isActive
                      ? "border-primary-600 bg-primary-600 text-white hover:bg-primary-700"
                      : "border-gray-200 bg-white text-gray-900 hover:border-primary-400 hover:bg-primary-50"
                    
                    if (chip.href) {
                      return (
                        <a
                          key={i}
                          href={chip.href}
                          className={`${baseClasses} ${activeClasses}`}
                        >
                          <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-primary-600"}`} aria-hidden="true" />
                          {chip.label}
                        </a>
                      )
                    }
                    
                    return (
                      <button
                        key={i}
                        type="button"
                        className={`${baseClasses} ${activeClasses}`}
                      >
                        <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-primary-600"}`} aria-hidden="true" />
                        {chip.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : null}
          </div>

          {/* Right: image + floating checklist */}
          <div className="relative">
            <div className="relative aspect-[16/11] overflow-hidden rounded-2xl sm:aspect-[16/10] lg:aspect-auto lg:min-h-[600px]">
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>

            {/* Floating trust checklist card */}
            {highlights.length > 0 ? (
              <div className="mt-4 rounded-2xl bg-primary-600 p-5 shadow-lg lg:absolute lg:bottom-5 lg:right-5 lg:mt-0 lg:max-w-[280px]">
                <ul className="flex flex-col gap-3">
                  {highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500">
                        <Check className="h-4 w-4 text-white" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-semibold text-white">{h.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

// Export icons for use in adapter
export {
  Phone,
  MessageCircle,
  Star,
  Clock,
  ShieldCheck,
  Check,
  Droplets,
  Waves,
  Flame,
  Wrench,
}
