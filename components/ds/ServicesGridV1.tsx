import type { LucideIcon } from "lucide-react"
import { ArrowRight } from "lucide-react"
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
  const hasManyServices = services.length > 8

  return (
    <section data-sticky-cta-trigger className="bg-[#F6F8FC] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[28px] border border-[#DDE6F5] bg-white shadow-[0_26px_70px_-42px_rgba(15,45,117,0.45)]">
          <div className="grid gap-0 lg:grid-cols-[0.78fr_1.22fr]">
            {/* Header / directory context */}
            <div className="flex flex-col justify-between border-b border-[#E7EDF7] bg-[#F9FBFE] p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <div>
                {badge ? (
                  <span className="inline-flex w-fit rounded-full bg-[#E7EFFD] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                    {badge}
                  </span>
                ) : null}
                {title ? (
                  <h2 className="mt-5 max-w-xl text-pretty text-3xl font-extrabold leading-tight tracking-tight text-[#102A6B] sm:text-4xl">
                    {title}
                  </h2>
                ) : null}
                {subtitle ? (
                  <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-[#4A5B7D] sm:text-lg">
                    {subtitle}
                  </p>
                ) : null}
              </div>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {trustItems.slice(0, 4).map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.title} className="flex items-center gap-3 rounded-2xl border border-[#E7EDF7] bg-white px-4 py-3">
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.iconBg}`}>
                        <Icon className={`h-5 w-5 ${item.iconColor}`} strokeWidth={2.25} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-extrabold leading-tight text-[#102A6B]">{item.title}</span>
                        <span className="block text-xs leading-tight text-[#4A5B7D]">{item.subtitle}</span>
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Scalable service directory */}
            <div className="p-4 sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-4 px-1">
                <p className="text-sm font-bold uppercase tracking-wider text-[#4A5B7D]">
                  {services.length} servicios disponibles
                </p>
                {hasManyServices ? (
                  <p className="hidden text-sm font-medium text-[#4A5B7D] sm:block">Desplaza para ver todos</p>
                ) : null}
              </div>

              <div className={hasManyServices ? "max-h-[680px] overflow-y-auto pr-2" : ""}>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {services.map((service) => {
                    const Icon = service.icon
                    return (
                      <Link
                        key={service.title}
                        href={service.href}
                        className="group flex min-h-[132px] items-start gap-4 rounded-2xl border border-[#E7EDF7] bg-white p-4 shadow-[0_12px_30px_-24px_rgba(15,45,117,0.45)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#BFD2F3] hover:shadow-[0_24px_48px_-28px_rgba(15,45,117,0.55)]"
                      >
                        <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${service.iconBg}`}>
                          <Icon className={`h-6 w-6 ${service.iconColor}`} strokeWidth={2.25} />
                        </span>
                        <span className="flex min-w-0 flex-1 flex-col">
                          <span className="text-lg font-extrabold leading-snug text-[#102A6B]">{service.title}</span>
                          <span className="mt-2 text-sm leading-relaxed text-[#4A5B7D]">{service.description}</span>
                          <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#2563EB]">
                            Ver servicio
                            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.5} />
                          </span>
                        </span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesGridV1
