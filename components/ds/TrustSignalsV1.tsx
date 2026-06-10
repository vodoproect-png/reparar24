import type { LucideIcon } from "lucide-react"
import { Clock, ShieldCheck, Shield, Award, UserCheck, FileText, Tag } from "lucide-react"

type StatColor = "blue" | "green" | "orange" | "purple"

interface TrustStat {
  icon: LucideIcon
  color: StatColor
  headline: string
  description: string
}

interface TrustItem {
  icon: LucideIcon
  label: string
}

const stats: TrustStat[] = [
  {
    icon: Clock,
    color: "blue",
    headline: "30-60 min",
    description: "Llegada garantizada en toda Valencia",
  },
  {
    icon: ShieldCheck,
    color: "green",
    headline: "24/7/365",
    description: "Atención continua todo el año",
  },
  {
    icon: Shield,
    color: "orange",
    headline: "600.000€ RC",
    description: "Seguro de responsabilidad civil profesional",
  },
  {
    icon: Award,
    color: "purple",
    headline: "Garantía 2 años",
    description: "En todas nuestras reparaciones",
  },
]

const trustItems: TrustItem[] = [
  { icon: UserCheck, label: "Fontaneros certificados" },
  { icon: FileText, label: "Factura disponible" },
  { icon: Tag, label: "Presupuesto gratuito" },
]

const badgeStyles: Record<StatColor, string> = {
  blue: "bg-[#E8F1FE] text-[#2563EB]",
  green: "bg-[#E7F8EE] text-[#22C55E]",
  orange: "bg-[#FEF3E2] text-[#F59E0B]",
  purple: "bg-[#F1EBFE] text-[#8B5CF6]",
}

export function TrustSignalsV1() {
  return (
    <section className="w-full px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-[1280px] rounded-[32px] border border-[#E4ECF9] bg-[#F7FAFF] px-6 py-5 shadow-[0_20px_50px_-20px_rgba(15,45,117,0.18)] transition-shadow duration-300 hover:shadow-[0_28px_60px_-20px_rgba(15,45,117,0.28)] sm:px-10 sm:py-6">
        {/* Top row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.headline}
                className={[
                  "flex flex-col items-center px-4 text-center",
                  // vertical dividers between columns on desktop
                  index !== 0 ? "lg:border-l lg:border-[#E1EAF7]" : "",
                  // dividers for 2x2 tablet grid
                  index % 2 !== 0 ? "sm:border-l sm:border-[#E1EAF7] lg:border-l" : "",
                  // vertical breathing room when stacked / wrapped
                  index >= 2 ? "mt-8 sm:mt-8 lg:mt-0" : "mt-8 first:mt-0 sm:mt-0",
                ].join(" ")}
              >
                <span
                  className={`flex h-[72px] w-[72px] items-center justify-center rounded-full ${badgeStyles[stat.color]}`}
                >
                  <Icon className="h-9 w-9" strokeWidth={2} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-pretty text-[26px] font-extrabold leading-[1.15] text-[#0F2D75] sm:text-[27px]">
                  {stat.headline}
                </h3>
                <p className="mt-2.5 max-w-[15rem] text-[15px] font-medium leading-relaxed text-[#4A5B7D]">
                  {stat.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Horizontal divider */}
        <div className="my-7 h-px w-full bg-[#E1EAF7]" />

        {/* Bottom row */}
        <div className="flex flex-col items-center justify-center gap-5 sm:flex-row sm:flex-wrap sm:gap-7">
          {trustItems.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="flex items-center gap-7 sm:gap-7">
                <div className="flex items-center gap-3">
                  <Icon className="h-6 w-6 text-[#2563EB]" strokeWidth={2} aria-hidden="true" />
                  <span className="text-[17px] font-bold text-[#0F2D75]">{item.label}</span>
                </div>
                {index !== trustItems.length - 1 && (
                  <span className="hidden h-2 w-2 rounded-full bg-[#2563EB] sm:inline-block" aria-hidden="true" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TrustSignalsV1
