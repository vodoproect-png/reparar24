import type { LucideIcon } from "lucide-react"
import { Star, CheckCircle2, Users, ShieldCheck, MapPin } from "lucide-react"
import Image from "next/image"

interface Review {
  name: string
  quote: string
}

interface TrustItem {
  /** Optional Lucide icon; when omitted a custom node (e.g. Google "G") is used */
  icon?: LucideIcon
  node?: "google"
  title: string
  description: string
  showStars?: boolean
}

const reviews: Review[] = [
  {
    name: "María González",
    quote: "Llegaron en menos de 40 minutos y solucionaron el problema al instante. Muy profesionales.",
  },
  {
    name: "Carlos Martínez",
    quote: "Detectaron la fuga rápidamente y dejaron todo perfecto. Servicio impecable.",
  },
  {
    name: "Ana Pérez",
    quote: "Presupuesto claro y sin sorpresas. Muy recomendable.",
  },
  {
    name: "Javier López",
    quote: "Servicio muy rápido y puntual. Recomendable al 100%.",
  },
]

const trustItems: TrustItem[] = [
  { node: "google", title: "4.9/5", description: "Google Reviews", showStars: true },
  { icon: Users, title: "500+", description: "reseñas verificadas" },
  { icon: ShieldCheck, title: "24/7", description: "Servicio disponible en Valencia" },
  { icon: MapPin, title: "Valencia", description: "Cobertura local" },
]

function StarRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1 ${className}`} aria-label="5 de 5 estrellas" role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-5 w-5 fill-[#FBBF24] text-[#FBBF24]" strokeWidth={0} aria-hidden="true" />
      ))}
    </div>
  )
}

function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18A13.7 13.7 0 0 1 10.96 24c0-1.45.25-2.86.69-4.18v-5.7H4.34A21.98 21.98 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  )
}

export default function OpinionesClientesV1() {
  return (
    <section className="w-full bg-[#F4F7FC] px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-[1280px]">
        {/* Top rating area */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center gap-4">
              <Image
                src="/icons/opiniones-3d-star.webp"
                alt=""
                aria-hidden="true"
                width={96}
                height={96}
                loading="lazy"
                className="h-20 w-20 sm:h-24 sm:w-24"
              />
              <span className="text-5xl font-extrabold tracking-tight text-[#2563EB] sm:text-6xl">4.9/5</span>
            </div>

          {/* Heading */}
          <h2 className="mt-4 text-balance text-center text-4xl font-extrabold leading-tight text-[#0F2D75] sm:text-5xl lg:text-[56px]">
            Lo Que Dicen Nuestros Clientes
          </h2>

          {/* Subtitle */}
          <p className="mx-auto mt-4 max-w-2xl text-balance text-center text-lg text-[#5B6B8C] sm:text-xl">
            Más de 500 clientes satisfechos en Valencia
          </p>
        </div>

        {/* Reviews grid */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="flex w-full flex-col rounded-[28px] border border-[#EAF0F9] bg-white px-6 py-7 shadow-[0_20px_45px_-24px_rgba(15,45,117,0.25)] transition-shadow duration-300 hover:shadow-[0_28px_55px_-22px_rgba(15,45,117,0.35)]"
            >
              <StarRow />

              {/* Name */}
              <h3 className="mt-4 text-lg font-bold leading-snug text-[#0F2D75]">{review.name}</h3>

              {/* Quote */}
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[#5B6B8C]">
                {`"${review.quote}"`}
              </p>

              {/* Verified */}
              <div className="mt-6 flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 fill-[#22C55E] text-white" strokeWidth={2} aria-hidden="true" />
                <span className="text-sm font-semibold text-[#3F4D6B]">Cliente verificado</span>
              </div>
            </div>
          ))}
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
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#2563EB] shadow-[0_6px_14px_-8px_rgba(37,99,235,0.6)]">
                    {item.node === "google" ? (
                      <GoogleG />
                    ) : Icon ? (
                      <Icon className="h-[22px] w-[22px]" strokeWidth={2.25} aria-hidden="true" />
                    ) : null}
                  </span>
                  <div>
                    <p className="text-xl font-extrabold leading-tight text-[#0F2D75]">{item.title}</p>
                    <p className="mt-0.5 text-sm leading-snug text-[#5B6B8C]">{item.description}</p>
                    {item.showStars && <StarRow className="mt-1.5 [&_svg]:h-3.5 [&_svg]:w-3.5" />}
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
