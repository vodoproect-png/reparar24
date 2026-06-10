import { Phone, ShieldCheck, Zap } from "lucide-react"

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

const trustItems = [
  { icon: ShieldCheck, label: "Sin compromiso" },
  { icon: Zap, label: "Respuesta inmediata" },
  { icon: ShieldCheck, label: "Disponible 24/7" },
]

export function TrustCtaBlueV1({
  phoneHref = "tel:+34641688524",
  whatsappHref = "https://wa.me/34641688524",
}: {
  phoneHref?: string
  whatsappHref?: string
}) {
  return (
    <section className="w-full bg-[#F4F7FC] px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-[1100px]">
        <div className="relative overflow-hidden rounded-[28px] border border-[#DCE7F7] bg-[#EAF1FD] px-6 py-8 shadow-[0_24px_55px_-30px_rgba(15,45,117,0.45)] sm:px-10 sm:py-10">
          <div className="flex items-center justify-between gap-6">
            {/* Left 3D icon */}
            <div className="hidden shrink-0 lg:block">
              <div className="relative flex h-32 w-32 items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-[#DCE7FB]" aria-hidden="true" />
                <img
                  src="/icons/process-3d-01-contacto.png"
                  alt=""
                  aria-hidden="true"
                  className="relative h-28 w-28 object-contain drop-shadow-[0_18px_28px_rgba(15,45,117,0.28)]"
                />
              </div>
            </div>

            {/* Center content */}
            <div className="flex min-w-0 flex-1 flex-col items-center text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#D6E4FB] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
                Servicio 24/7 en Valencia
              </span>

              <h2 className="mt-4 text-balance text-2xl font-extrabold leading-tight text-[#0F2D75] sm:text-3xl lg:text-4xl">
                ¿Listo para Resolver Tu Problema?
              </h2>

              <p className="mt-2 max-w-xl text-pretty text-sm text-[#5B6B8C] sm:text-base">
                Más de 15 años de experiencia. Presupuesto gratuito. Garantía de 2 años.
              </p>

              {/* Buttons */}
              <div className="mt-5 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
                <a
                  href={phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#2563EB] px-7 py-3.5 text-base font-bold text-white shadow-[0_14px_30px_-12px_rgba(37,99,235,0.8)] transition-colors hover:bg-[#1D4FD7]"
                >
                  <Phone className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
                  Llamar Ahora
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#22A45D] px-7 py-3.5 text-base font-bold text-white shadow-[0_14px_30px_-12px_rgba(34,164,93,0.8)] transition-colors hover:bg-[#1C8C4F]"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  WhatsApp
                </a>
              </div>

              {/* Trust items */}
              <ul className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:gap-7">
                {trustItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.label} className="flex items-center gap-2 text-sm font-medium text-[#475569]">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D6E4FB] text-[#2563EB]">
                        <Icon className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
                      </span>
                      {item.label}
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Right 3D icon */}
            <div className="hidden shrink-0 lg:block">
              <div className="relative flex h-32 w-32 items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-[#DCE7FB]" aria-hidden="true" />
                <img
                  src="/icons/garantias-3d-shield.png"
                  alt=""
                  aria-hidden="true"
                  className="relative h-28 w-28 object-contain drop-shadow-[0_18px_28px_rgba(15,45,117,0.28)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustCtaBlueV1
