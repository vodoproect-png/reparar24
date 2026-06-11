import type { LucideIcon } from "lucide-react"
import {
  Droplet,
  Waves,
  Construction,
  Flame,
  Wrench,
  Toilet,
  Clock,
  ShieldCheck,
  Award,
  CreditCard,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

type Service = {
  icon: LucideIcon
  iconBg: string
  iconColor: string
  title: string
  description: string
  href: string
}

type TrustItem = {
  icon: LucideIcon
  iconBg: string
  iconColor: string
  title: string
  subtitle: string
}

export interface ServicesGridV1Props {
  badge?: string
  title?: string
  subtitle?: string
  services?: Service[]
  trustItems?: TrustItem[]
}

export function ServicesGridV1({
  badge,
  title,
  subtitle,
  services,
  trustItems,
}: ServicesGridV1Props = {}) {
  // Strict conditional rendering - no fallback content in production
  if (!services?.length || !trustItems?.length) return null
  return (
    <section className="bg-[#fafbfc] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <span className="rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-600">
            {badge}
          </span>
          <h2 className="mt-5 text-pretty text-4xl font-extrabold tracking-tight text-[#1a2b5e] sm:text-5xl lg:text-6xl">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-pretty text-lg text-slate-500 sm:text-xl">
            {subtitle}
          </p>
        </div>

        {/* Service cards */}
        {services && services.length > 0 && (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="rounded-2xl border border-slate-100 bg-white p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-md"
              >
                <div className="flex items-start gap-5">
                  <div
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${service.iconBg}`}
                  >
                    <Icon className={`h-7 w-7 ${service.iconColor}`} strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1a2b5e]">{service.title}</h3>
                    <p className="mt-2 text-pretty leading-relaxed text-slate-500">{service.description}</p>
                  </div>
                </div>
                <Link
                  href={service.href}
                  className="mt-5 inline-flex items-center gap-2 text-base font-semibold text-blue-600 transition-colors hover:text-blue-700"
                >
                  Ver servicio
                  <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                </Link>
              </div>
            )
          })}
        </div>
        )}

        {/* Trust bar */}
        {trustItems && trustItems.length > 0 && (
        <div className="mt-4 rounded-2xl border border-slate-100 bg-white px-6 py-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {trustItems.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className={`flex items-center gap-4 lg:px-6 ${
                    index !== 0 ? "lg:border-l lg:border-slate-100" : ""
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.iconBg}`}
                  >
                    <Icon className={`h-6 w-6 ${item.iconColor}`} strokeWidth={2} />
                  </div>
                  <div>
                    <p className="font-bold text-[#1a2b5e]">{item.title}</p>
                    <p className="text-sm text-slate-500">{item.subtitle}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        )}
      </div>
    </section>
  )
}

export default ServicesGridV1
