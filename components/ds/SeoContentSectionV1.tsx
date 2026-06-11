import type { LucideIcon } from "lucide-react"
import {
  Zap,
  Droplets,
  Wrench,
  Flame,
  ShowerHead,
  Gauge,
  MapPin,
  Clock,
  ShieldCheck,
  Users,
  Check,
  ArrowRight,
  Phone,
  FileText,
  BadgeCheck,
  Receipt,
  Umbrella,
} from "lucide-react"

type AccentColor = "blue" | "green" | "orange" | "red" | "purple" | "cyan"

interface ServiceCard {
  icon: LucideIcon
  title: string
  color: AccentColor
  bullets: string[]
  ctaLabel?: string
}

interface TrustStat {
  icon: LucideIcon
  label: string
  value: string
}

interface FooterTrustItem {
  icon: LucideIcon
  title: string
  subtitle: string
}

interface LocalCoverage {
  title: string
  description: string
}

interface PhoneCta {
  label: string
  number: string
}

export interface SeoContentSectionV1Props {
  badge?: string
  title?: string
  intro?: string[]
  serviceCards?: ServiceCard[]
  localCoverage?: LocalCoverage
  trustStats?: TrustStat[]
  benefitsTitle?: string
  benefits?: string[]
  serviceAreasTitle?: string
  serviceAreas?: string[]
  serviceAreasCtaLabel?: string
  keywordsTitle?: string
  keywordTags?: string[]
  phone?: PhoneCta
  footerTrustItems?: FooterTrustItem[]
  footnote?: string
}

/* Accent color maps — soft backgrounds + matching foreground per card */
const accentMap: Record<
  AccentColor,
  { iconBg: string; iconText: string; bullet: string; cta: string }
> = {
  blue: { iconBg: "bg-[#E4EDFB]", iconText: "text-[#2563EB]", bullet: "text-[#2563EB]", cta: "text-[#2563EB]" },
  green: { iconBg: "bg-[#E3F5EC]", iconText: "text-[#16A34A]", bullet: "text-[#16A34A]", cta: "text-[#16A34A]" },
  orange: { iconBg: "bg-[#FCEFDD]", iconText: "text-[#EA8A0C]", bullet: "text-[#EA8A0C]", cta: "text-[#EA8A0C]" },
  red: { iconBg: "bg-[#FCE6E6]", iconText: "text-[#DC2626]", bullet: "text-[#DC2626]", cta: "text-[#DC2626]" },
  purple: { iconBg: "bg-[#EEE8FB]", iconText: "text-[#7C3AED]", bullet: "text-[#7C3AED]", cta: "text-[#7C3AED]" },
  cyan: { iconBg: "bg-[#DDF2F5]", iconText: "text-[#0891B2]", bullet: "text-[#0891B2]", cta: "text-[#0891B2]" },
}

/* ---------- Defaults (neutral fallback — fully overridable via props) ---------- */
export function SeoContentSectionV1(props: SeoContentSectionV1Props = {}) {
  // Early return if no content provided - strict conditional rendering
  if (!props.title && !props.serviceCards && !props.localCoverage) return null

  const {
    badge,
    title,
    intro,
    serviceCards,
    localCoverage,
    trustStats,
    benefitsTitle,
    benefits,
    serviceAreasTitle,
    serviceAreas,
    serviceAreasCtaLabel,
    keywordsTitle,
    keywordTags,
    phone,
    footerTrustItems,
    footnote,
  } = props

  const telHref = phone ? `tel:+34${phone.number.replace(/\s+/g, "")}` : undefined

  return (
    <section className="w-full bg-[#F4F7FC] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-[1100px]">
        {/* 1 + 2 + 3 — Header */}
        <div className="flex flex-col items-center text-center">
          {badge ? (
            <span className="inline-flex items-center gap-2 rounded-full bg-[#E4EDFB] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              <Zap className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
              {badge}
            </span>
          ) : null}
          <h2 className="mt-6 text-balance text-3xl font-extrabold leading-tight text-[#0F2D75] sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          {intro?.length ? (
            <div className="mx-auto mt-4 flex max-w-[900px] flex-col gap-3">
              {intro.map((paragraph, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "text-pretty text-lg font-medium leading-relaxed text-[#3A4A6B] sm:text-xl"
                      : "text-pretty text-[15px] leading-relaxed text-[#5B6B8C]"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}
        </div>

        {/* 4 — Service cards grid */}
        {serviceCards?.length ? (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCards.map((card) => {
              const Icon = card.icon
              const accent = accentMap[card.color]
              return (
                <div
                  key={card.title}
                  className="flex flex-col rounded-[24px] border border-[#EAF0F9] bg-white p-6 shadow-[0_20px_45px_-24px_rgba(15,45,117,0.25)] transition-shadow duration-300 hover:shadow-[0_28px_55px_-22px_rgba(15,45,117,0.35)]"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${accent.iconBg} ${accent.iconText}`}
                    >
                      <Icon className="h-6 w-6" strokeWidth={2.25} aria-hidden="true" />
                    </span>
                    <h3 className="text-lg font-bold leading-tight text-[#0F2D75]">{card.title}</h3>
                  </div>

                  <ul className="mt-5 flex flex-col gap-3">
                    {card.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-2.5 text-[15px] leading-snug text-[#5B6B8C]">
                        <Check className={`h-4 w-4 flex-shrink-0 ${accent.bullet}`} strokeWidth={3} aria-hidden="true" />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {card.ctaLabel ? (
                    <a
                      href="#contacto"
                      className={`group mt-5 inline-flex items-center gap-1.5 text-sm font-bold ${accent.cta}`}
                    >
                      {card.ctaLabel}
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      />
                    </a>
                  ) : null}
                </div>
              )
            })}
          </div>
        ) : null}

        {/* 5 — Local coverage bar */}
        {localCoverage ? (
          <div className="mt-3 flex flex-col gap-6 rounded-[28px] border border-[#EAF0F9] bg-white px-6 py-7 shadow-[0_20px_45px_-24px_rgba(15,45,117,0.25)] sm:px-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:text-left">
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#E1ECFD] text-[#2563EB] shadow-[0_8px_18px_-10px_rgba(37,99,235,0.7)]">
                <MapPin className="h-6 w-6" strokeWidth={2.25} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-extrabold leading-tight text-[#0F2D75]">{localCoverage.title}</h3>
                <p className="mt-1 max-w-xl text-[15px] leading-relaxed text-[#5B6B8C]">{localCoverage.description}</p>
              </div>
            </div>

            {trustStats?.length ? (
              <div className="grid grid-cols-3 gap-4 sm:gap-8 lg:flex-shrink-0">
                {trustStats.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.label} className="flex flex-col items-center text-center">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E1ECFD] text-[#2563EB]">
                        <Icon className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
                      </span>
                      <span className="mt-2 text-sm font-bold leading-tight text-[#0F2D75]">{stat.label}</span>
                      <span className="text-xs leading-tight text-[#5B6B8C]">{stat.value}</span>
                    </div>
                  )
                })}
              </div>
            ) : null}
          </div>
        ) : null}

        {/* 6 + 7 — SEO information grid */}
        {(benefits?.length || serviceAreas?.length || keywordTags?.length) ? (
          <div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Column 1 — benefits + CTA card */}
            {benefits?.length ? (
              <div className="flex flex-col rounded-[28px] border border-[#EAF0F9] bg-white p-7 shadow-[0_20px_45px_-24px_rgba(15,45,117,0.25)]">
                <h3 className="text-xl font-extrabold leading-tight text-[#0F2D75]">{benefitsTitle}</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5 text-[15px] leading-snug text-[#3A4A6B]">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#2563EB]" strokeWidth={3} aria-hidden="true" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                {phone ? (
                  <a
                    href={telHref}
                    className="mt-6 flex items-center gap-4 rounded-2xl bg-[#EEF4FE] px-5 py-4 transition-colors duration-200 hover:bg-[#E0EBFD]"
                  >
                    <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-white shadow-[0_10px_22px_-8px_rgba(37,99,235,0.8)]">
                      <Phone className="h-6 w-6" strokeWidth={2.25} aria-hidden="true" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-semibold text-[#5B6B8C]">{phone.label}</span>
                      <span className="text-xl font-extrabold leading-tight text-[#0F2D75]">{phone.number}</span>
                    </span>
                  </a>
                ) : null}
              </div>
            ) : null}

            {/* Column 2 — service areas */}
            {serviceAreas?.length ? (
              <div className="flex flex-col rounded-[28px] border border-[#EAF0F9] bg-white p-7 shadow-[0_20px_45px_-24px_rgba(15,45,117,0.25)]">
                <h3 className="text-xl font-extrabold leading-tight text-[#0F2D75]">{serviceAreasTitle}</h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {serviceAreas.map((area) => (
                    <li key={area} className="flex items-center gap-2.5 text-[15px] leading-snug text-[#3A4A6B]">
                      <MapPin className="h-4 w-4 flex-shrink-0 text-[#2563EB]" strokeWidth={2.5} aria-hidden="true" />
                      {area}
                    </li>
                  ))}
                </ul>
                {serviceAreasCtaLabel ? (
                  <a
                    href="#contacto"
                    className="group mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#2563EB]"
                  >
                    {serviceAreasCtaLabel}
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                  </a>
                ) : null}
              </div>
            ) : null}

            {/* Column 3 — keyword tags */}
            {keywordTags?.length ? (
              <div className="flex flex-col rounded-[28px] border border-[#EAF0F9] bg-white p-7 shadow-[0_20px_45px_-24px_rgba(15,45,117,0.25)]">
                <h3 className="text-xl font-extrabold leading-tight text-[#0F2D75]">{keywordsTitle}</h3>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {keywordTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#EEF2F9] px-3.5 py-1.5 text-[13px] font-semibold text-[#3A4A6B]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        {/* 8 — Trust footer bar */}
        {footerTrustItems?.length ? (
          <div className="mt-3 grid grid-cols-1 gap-6 rounded-[28px] bg-[#E9F0FB] px-6 py-7 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
            {footerTrustItems.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="flex items-center gap-3">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-white text-[#2563EB] shadow-[0_8px_18px_-12px_rgba(37,99,235,0.7)]">
                    <Icon className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-sm font-extrabold text-[#0F2D75]">{item.title}</span>
                    <span className="text-[13px] text-[#5B6B8C]">{item.subtitle}</span>
                  </span>
                </div>
              )
            })}
          </div>
        ) : null}

        {/* 9 — SEO footnote */}
        {footnote ? (
          <p className="mx-auto mt-3 max-w-[900px] text-center text-[13px] italic leading-relaxed text-[#8A97B0]">
            {footnote}
          </p>
        ) : null}
      </div>
    </section>
  )
}

export default SeoContentSectionV1
