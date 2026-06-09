import type { LucideIcon } from "lucide-react"
import { Star, Check, ShieldCheck, FileText, XCircle } from "lucide-react"
import Image from "next/image"

type PriceColor = "blue" | "orange" | "green" | "red"

interface PricingPlan {
  title: string
  price: string
  color: PriceColor
  iconSrc: string
  features: string[]
  featured?: boolean
}

interface TrustItem {
  icon: LucideIcon
  title: string
  description: string
}

const plans: PricingPlan[] = [
  {
    title: "Diagnóstico",
    price: "49€",
    color: "blue",
    iconSrc: "/icons/pricing-3d-01-diagnostico.webp",
    features: ["Inspección inicial", "Evaluación profesional", "Presupuesto detallado", "Sin compromiso"],
  },
  {
    title: "Reparación de fugas",
    price: "79€",
    color: "orange",
    iconSrc: "/icons/process-3d-03-reparacion.webp",
    features: ["Localización de fuga", "Reparación inmediata", "Materiales incluidos", "Garantía 2 años"],
    featured: true,
  },
  {
    title: "Desatascos",
    price: "89€",
    color: "green",
    iconSrc: "/icons/pricing-3d-03-desatascos.webp",
    features: ["Cocina", "Baño", "Bajantes", "Equipos profesionales"],
  },
  {
    title: "Urgencias 24/7",
    price: "99€",
    color: "red",
    iconSrc: "/icons/pricing-3d-04-urgencias.webp",
    features: ["Atención inmediata", "Noches y festivos", "Llegada 30-60 min", "Servicio prioritario"],
  },
]

const trustItems: TrustItem[] = [
  { icon: ShieldCheck, title: "Presupuesto cerrado", description: "antes de empezar" },
  { icon: FileText, title: "Factura disponible", description: "al finalizar el trabajo" },
  { icon: ShieldCheck, title: "Garantía", description: "hasta 2 años" },
  { icon: XCircle, title: "Sin costes ocultos", description: "ni suplementos" },
]

const colorStyles: Record<
  PriceColor,
  { accent: string; check: string; divider: string }
> = {
  blue: { accent: "text-[#0F2D75]", check: "text-[#1F2937]", divider: "bg-[#E5E7EB]" },
  orange: { accent: "text-[#0F2D75]", check: "text-[#1F2937]", divider: "bg-[#E5E7EB]" },
  green: { accent: "text-[#0F2D75]", check: "text-[#1F2937]", divider: "bg-[#E5E7EB]" },
  red: { accent: "text-[#0F2D75]", check: "text-[#1F2937]", divider: "bg-[#E5E7EB]" },
}

export function PricingSectionV1() {
  return (
    <section className="w-full bg-[#F4F7FC] px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-[1280px]">
        {/* Eyebrow */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#E4EDFB] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#2563EB]">
            <Star className="h-3.5 w-3.5 fill-current" strokeWidth={2.5} aria-hidden="true" />
            Precios transparentes
          </span>
        </div>

        {/* Heading */}
        <h2 className="mt-6 text-balance text-center text-4xl font-extrabold leading-tight text-[#0F2D75] sm:text-5xl lg:text-[56px]">
          Precios Transparentes
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mt-4 max-w-2xl text-balance text-center text-lg text-[#5B6B8C] sm:text-xl">
          Sin sorpresas ni costes ocultos
        </p>

        {/* Pricing cards */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => {
            const styles = colorStyles[plan.color]
            return (
              <div key={plan.title} className="relative flex">
                {/* Featured badge */}
                {plan.featured && (
                  <span className="absolute left-1/2 top-0 z-10 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full bg-[#F59E0B] px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-[0_8px_18px_-8px_rgba(245,158,11,0.7)]">
                    <Star className="h-3.5 w-3.5 fill-current" strokeWidth={2.5} aria-hidden="true" />
                    Más solicitada
                  </span>
                )}

                {/* Card */}
                <div
                  className={[
                    "flex w-full flex-col items-center rounded-[28px] border bg-white px-6 pb-7 text-center transition-shadow duration-300",
                    plan.featured
                      ? "border-[#F8C988] bg-[#FFFBF5] pt-9 shadow-[0_28px_55px_-22px_rgba(245,158,11,0.4)]"
                      : "border-[#EAF0F9] pt-7 shadow-[0_20px_45px_-24px_rgba(15,45,117,0.25)] hover:shadow-[0_28px_55px_-22px_rgba(15,45,117,0.35)]",
                  ].join(" ")}
                >
                  {/* 3D icon (clipped into a circle) */}
                  <div className="h-[112px] w-[112px] overflow-hidden rounded-full relative">
                    <Image
                      src={plan.iconSrc || "/placeholder.svg"}
                      alt=""
                      aria-hidden="true"
                      width={112}
                      height={112}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 text-xl font-bold leading-snug text-[#0F2D75]">{plan.title}</h3>

                  {/* Desde label with dividers */}
                  <div className="mt-3 flex w-full items-center gap-3">
                    <span className={`h-px flex-1 ${styles.divider}`} aria-hidden="true" />
                    <span className={`text-sm font-semibold ${styles.accent}`}>Desde</span>
                    <span className={`h-px flex-1 ${styles.divider}`} aria-hidden="true" />
                  </div>

                  {/* Price */}
                  <p className={`mt-2 text-5xl font-extrabold tracking-tight ${styles.accent}`}>{plan.price}</p>

                  {/* Separator */}
                  <span className="mt-5 h-px w-full bg-[#EEF2F8]" aria-hidden="true" />

                  {/* Features */}
                  <ul className="mt-5 flex w-full flex-col gap-3 text-left">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check className={`h-5 w-5 flex-shrink-0 ${styles.check}`} strokeWidth={2.5} aria-hidden="true" />
                        <span className="text-[15px] leading-snug text-[#3F4D6B]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom trust bar */}
        <div className="mt-8 rounded-[28px] border border-[#DCE7F7] bg-[#EEF4FD] px-6 py-7 shadow-[0_16px_40px_-26px_rgba(15,45,117,0.4)] sm:px-9 sm:py-8">
          <div className="grid grid-cols-1 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {trustItems.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className={[
                    "flex items-center gap-4 px-2",
                    index !== 0 ? "lg:border-l lg:border-[#D6E2F4] lg:pl-6" : "",
                    index % 2 !== 0 ? "sm:border-l sm:border-[#D6E2F4] sm:pl-6 lg:pl-6" : "",
                  ].join(" ")}
                >
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#E1ECFD] text-[#2563EB] shadow-[0_6px_14px_-8px_rgba(37,99,235,0.6)]">
                    <Icon className="h-[22px] w-[22px]" strokeWidth={2.25} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[15px] font-bold leading-tight text-[#0F2D75]">{item.title}</p>
                    <p className="mt-0.5 text-sm leading-snug text-[#5B6B8C]">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-center text-sm text-[#8A97B1]">
          Precios orientativos. Cada caso es único y se presupuestará según la evaluación.
        </p>
      </div>
    </section>
  )
}

export default PricingSectionV1
