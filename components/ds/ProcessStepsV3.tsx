import type { LucideIcon } from "lucide-react"
import { Wrench, ShieldCheck, Clock, UserRound, FileText } from "lucide-react"
import Image from "next/image"

type StepColor = "blue" | "green" | "orange" | "purple"

interface ProcessStep {
  number: string
  color: StepColor
  title: string
  description: string
  /** Path to the 3D rendered icon image */
  iconSrc: string
}

interface TrustItem {
  icon: LucideIcon
  title: string
  description: string
}

const steps: ProcessStep[] = [
  {
    number: "01",
    color: "blue",
    title: "Contactas con nosotros",
    description: "Llámanos o escríbenos por WhatsApp. Cuéntanos tu problema y te asesoramos al instante.",
    iconSrc: "/icons/process-3d-01-contacto.webp",
  },
  {
    number: "02",
    color: "green",
    title: "Valoramos tu caso",
    description: "Evaluamos la avería y te damos un presupuesto claro y sin compromiso.",
    iconSrc: "/icons/process-3d-02-valoracion.webp",
  },
  {
    number: "03",
    color: "orange",
    title: "Reparamos el problema",
    description: "Nuestros fontaneros certificados se desplazan y reparan de forma rápida y eficiente.",
    iconSrc: "/icons/process-3d-03-reparacion.webp",
  },
  {
    number: "04",
    color: "purple",
    title: "Garantía y tranquilidad",
    description: "Te ofrecemos garantía de 2 años en todas nuestras reparaciones para tu total tranquilidad.",
    iconSrc: "/icons/process-3d-04-garantia.webp",
  },
]

const trustItems: TrustItem[] = [
  {
    icon: ShieldCheck,
    title: "Sin sorpresas",
    description: "Presupuesto cerrado antes de empezar",
  },
  {
    icon: Clock,
    title: "Rápidos y eficientes",
    description: "Llegamos en 30-60 min a toda Valencia",
  },
  {
    icon: UserRound,
    title: "Profesionales certificados",
    description: "Fontaneros expertos con años de experiencia",
  },
  {
    icon: FileText,
    title: "Factura disponible",
    description: "Recibes tu factura al finalizar el trabajo",
  },
]

const numberBadgeStyles: Record<StepColor, string> = {
  blue: "border-[#DCE8FC] bg-white text-[#2563EB]",
  green: "border-[#D6F2E1] bg-white text-[#22C55E]",
  orange: "border-[#FCE6C8] bg-white text-[#F59E0B]",
  purple: "border-[#E7DCFB] bg-white text-[#8B5CF6]",
}

export function ProcessStepsV3() {
  return (
    <section className="w-full bg-[#F4F7FC] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-[1280px]">
        {/* Eyebrow */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#E4EDFB] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#2563EB]">
            <Wrench className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
            Proceso transparente
          </span>
        </div>

        {/* Heading */}
        <h2 className="mt-6 text-balance text-center text-4xl font-extrabold leading-tight text-[#0F2D75] sm:text-5xl lg:text-[56px]">
          ¿Cómo Trabajamos?
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mt-4 max-w-2xl text-balance text-center text-lg text-[#5B6B8C] sm:text-xl">
          Proceso transparente en 4 pasos. Sin complicaciones, sin sorpresas.
        </p>

        {/* Steps */}
        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-2">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1
            return (
              <div key={step.number} className="relative">
                {/* Dotted connector to the next card (desktop only) */}
                {!isLast && (
                  <span
                    className="absolute right-[-1rem] top-[8.5rem] hidden h-px w-8 border-t-2 border-dashed border-[#9FC0F5] lg:block"
                    aria-hidden="true"
                  />
                )}

                {/* Number badge */}
                <div className="relative z-10 flex justify-center">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full border text-base font-extrabold shadow-[0_6px_16px_-8px_rgba(15,45,117,0.4)] ${numberBadgeStyles[step.color]}`}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Card */}
                <div className="-mt-6 flex h-full flex-col items-center rounded-[28px] border border-[#EAF0F9] bg-white px-6 pb-5 pt-7 text-center shadow-[0_20px_45px_-24px_rgba(15,45,117,0.25)] transition-shadow duration-300 hover:shadow-[0_28px_55px_-22px_rgba(15,45,117,0.35)]">
                  {/* 3D icon (clipped into a circle) */}
                  <div className="h-[112px] w-[112px] overflow-hidden rounded-full relative">
                    <Image
                      src={step.iconSrc || "/placeholder.svg"}
                      alt=""
                      aria-hidden="true"
                      width={112}
                      height={112}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="mt-5 text-xl font-bold leading-snug text-[#0F2D75]">{step.title}</h3>

                  {/* Description */}
                  <p className="mt-2.5 max-w-[16rem] text-[15px] leading-relaxed text-[#5B6B8C]">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom trust bar */}
        <div className="mt-3 rounded-[28px] border border-[#DCE7F7] bg-[#EEF4FD] px-6 py-7 shadow-[0_16px_40px_-26px_rgba(15,45,117,0.4)] sm:px-9 sm:py-8">
          <div className="grid grid-cols-1 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {trustItems.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className={[
                    "flex items-start gap-4 px-2",
                    index !== 0 ? "lg:border-l lg:border-[#D6E2F4] lg:pl-6" : "",
                    index % 2 !== 0 ? "sm:border-l sm:border-[#D6E2F4] sm:pl-6 lg:pl-6" : "",
                  ].join(" ")}
                >
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#E1ECFD] text-[#2563EB] shadow-[0_6px_14px_-8px_rgba(37,99,235,0.6)]">
                    <Icon className="h-[22px] w-[22px]" strokeWidth={2.25} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[15px] font-bold leading-tight text-[#0F2D75]">{item.title}</p>
                    <p className="mt-1 text-sm leading-snug text-[#5B6B8C]">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessStepsV3
