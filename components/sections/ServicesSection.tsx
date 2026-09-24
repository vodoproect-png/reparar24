import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, Wrench } from 'lucide-react'
import type { Locale } from '@/lib/i18n/config'
import { services } from '@/data/services'
import { getServiceUrl } from '@/lib/seo/url'

interface ServicesSectionProps {
  locale: Locale
}

const servicePresentation: Record<string, {
  headline: string
  description: string
  image?: string
  imageAlt?: string
  tags: string[]
}> = {
  fontanero: {
    headline: 'Fontaneria urgente y reparaciones',
    description: 'Fugas, grifos, cisternas, termos, instalaciones y revisiones con presupuesto antes de empezar.',
    image: '/assets/service-icons-3d-test/reparacion-fugas.webp',
    imageAlt: 'Icono 3D de reparacion de fugas de agua',
    tags: ['Fugas', 'Grifos', 'Termos'],
  },
  electricista: {
    headline: 'Electricistas certificados',
    description: 'Averias electricas, cuadros, enchufes, iluminacion, revisiones y trabajos de mantenimiento.',
    image: '/assets/service-icons-3d-test/urgencias-electricas.webp',
    imageAlt: 'Icono 3D de urgencias electricas',
    tags: ['Averias', 'Cuadros', 'Enchufes'],
  },
  desatascos: {
    headline: 'Desatascos y saneamiento',
    description: 'Atascos, bajantes, arquetas, tuberias y equipos de alta presion para viviendas y comunidades.',
    image: '/assets/service-icons-3d-test/desatascos.webp',
    imageAlt: 'Icono 3D de desatascos',
    tags: ['Tuberias', 'Arquetas', 'Bajantes'],
  },
  'aire-acondicionado': {
    headline: 'Aire acondicionado',
    description: 'Instalacion, reparacion, mantenimiento, carga de gas y revision de equipos split.',
    tags: ['Split', 'Gas', 'Mantenimiento'],
  },
  calefaccion: {
    headline: 'Calefaccion y calderas',
    description: 'Averias de calefaccion, radiadores, calderas, presion y mantenimiento preventivo.',
    image: '/assets/service-icons-3d-test/calentadores-termos.webp',
    imageAlt: 'Icono 3D de calentadores y termos',
    tags: ['Calderas', 'Radiadores', 'Revision'],
  },
  'limpieza-tuberias': {
    headline: 'Limpieza de tuberias',
    description: 'Limpieza preventiva, malos olores, sedimentos y mantenimiento de redes de saneamiento.',
    image: '/assets/service-icons-3d-test/bajantes.webp',
    imageAlt: 'Icono 3D de bajantes y tuberias',
    tags: ['Mantenimiento', 'Olores', 'Redes'],
  },
}

export default function ServicesSection({ locale }: ServicesSectionProps) {
  return (
    <section id="servicios" className="bg-[#F4F7FC] px-4 py-14 sm:px-6 lg:py-18">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#E4EDFB] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              Servicios Reparar24
            </span>
            <h2 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight text-[#0F2D75] sm:text-5xl">
              Elige el problema y entra directo al servicio correcto
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-[#4A5B7D]">
            Organizamos cada categoria por urgencia, especialidad y garantia para que no tengas que explicar dos veces la misma averia.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const presentation = servicePresentation[service.slug]

            return (
              <Link
                key={service.id}
                href={getServiceUrl(service.slug, locale)}
                className="group flex min-h-[252px] flex-col justify-between rounded-lg border border-[#DCE7F8] bg-white p-5 shadow-[0_18px_45px_-28px_rgba(15,45,117,0.35)] transition hover:-translate-y-1 hover:shadow-[0_24px_55px_-26px_rgba(15,45,117,0.45)]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#F1F6FF]">
                    {presentation?.image ? (
                      <Image
                        src={presentation.image}
                        alt={presentation.imageAlt || presentation.headline}
                        width={54}
                        height={54}
                        className="h-[54px] w-[54px] object-contain"
                      />
                    ) : (
                      <Wrench className="h-8 w-8 text-[#2563EB]" aria-hidden="true" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-2xl font-extrabold leading-tight text-[#0F2D75] transition group-hover:text-[#2563EB]">
                      {presentation?.headline || service.name}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-[#4A5B7D]">
                      {presentation?.description || service.description}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="flex flex-wrap gap-2">
                    {(presentation?.tags || service.benefits.slice(0, 3)).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#DCE7F8] bg-[#F7FAFF] px-3 py-1 text-sm font-semibold text-[#28446F]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-[#E4ECF9] pt-4">
                    <div className="flex items-center gap-4 text-sm font-semibold text-[#28446F]">
                      <span className="inline-flex items-center gap-1.5">
                        <ShieldCheck className="h-4 w-4 text-[#2563EB]" aria-hidden="true" />
                        {service.priceRange}
                      </span>
                    </div>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB] text-white transition group-hover:bg-[#0F2D75]">
                      <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
