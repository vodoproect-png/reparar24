import type { LucideIcon } from "lucide-react"
import { ShieldCheck, FileText, ShieldPlus, Wrench, ClipboardCheck, Clock } from "lucide-react"

interface GuaranteeCard {
  icon: LucideIcon
  title: string
  description: string
}

const cards: GuaranteeCard[] = [
  {
    icon: ShieldCheck,
    title: "Garantía hasta 2 años",
    description: "Respaldamos nuestros trabajos con garantía escrita de hasta 2 años.",
  },
  {
    icon: FileText,
    title: "Factura disponible",
    description: "Emitimos factura de todos nuestros servicios.",
  },
  {
    icon: ShieldPlus,
    title: "Seguro RC 600.000€",
    description: "Cobertura de responsabilidad civil para máxima tranquilidad.",
  },
  {
    icon: Wrench,
    title: "Técnicos certificados",
    description: "Profesionales cualificados y en formación continua.",
  },
  {
    icon: ClipboardCheck,
    title: "Presupuesto previo",
    description: "Presupuesto claro antes de comenzar cualquier trabajo.",
  },
  {
    icon: Clock,
    title: "Atención 24/7",
    description: "Disponibles todos los días para urgencias y asistencia.",
  },
]

export function GuaranteesCertificationsV1() {
  return (
    <section className="w-full bg-[#F4F7FC] px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#E4EDFB] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#2563EB]">
            <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
            Garantías y certificaciones
          </span>
          <h2 className="mt-6 text-balance text-4xl font-extrabold leading-tight text-[#0F2D75] sm:text-5xl lg:text-[56px]">
            Tu tranquilidad está garantizada
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-[#5B6B8C] sm:text-xl">
            Trabajamos con los más altos estándares de calidad para ofrecerte seguridad, confianza y resultados
            duraderos.
          </p>
        </div>

        {/* 2-column layout */}
        <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-12">
          {/* Left: single large 3D shield */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative flex aspect-square w-full max-w-[420px] items-center justify-center">
              <div
                className="absolute inset-6 rounded-full bg-[#E8EFFB]"
                aria-hidden="true"
              />
              <img
                src="/icons/garantias-3d-shield.png"
                alt="Escudo de garantía con lista de verificación"
                className="relative h-full w-full object-contain drop-shadow-[0_30px_45px_rgba(15,45,117,0.25)]"
              />
            </div>
          </div>

          {/* Right: 3x2 grid of trust cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => {
              const Icon = card.icon
              return (
                <div
                  key={card.title}
                  className="flex flex-col items-center rounded-[24px] border border-[#EAF0F9] bg-white px-5 pb-6 pt-7 text-center shadow-[0_20px_45px_-24px_rgba(15,45,117,0.25)] transition-shadow duration-300 hover:shadow-[0_28px_55px_-22px_rgba(15,45,117,0.35)]"
                >
                  {/* Icon circle */}
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E1ECFD] text-[#2563EB] shadow-[0_8px_18px_-10px_rgba(37,99,235,0.7)]">
                    <Icon className="h-6 w-6" strokeWidth={2.25} aria-hidden="true" />
                  </span>

                  {/* Title */}
                  <h3 className="mt-4 text-lg font-bold leading-snug text-[#0F2D75]">{card.title}</h3>

                  {/* Description */}
                  <p className="mt-2 text-[15px] leading-relaxed text-[#5B6B8C]">{card.description}</p>

                  {/* Accent underline */}
                  <span className="mt-4 h-1 w-8 rounded-full bg-[#F97316]" aria-hidden="true" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default GuaranteesCertificationsV1
