"use client"

import type { ReactNode } from "react"
import {
  Activity,
  ArrowRight,
  Award,
  Cable,
  Car,
  ClipboardCheck,
  Clock,
  CreditCard,
  Construction,
  Droplets,
  Fan,
  Flame,
  Gauge,
  Lightbulb,
  MessageCircle,
  Phone,
  Power,
  Search,
  ShieldAlert,
  ShieldCheck,
  ShowerHead,
  Snowflake,
  Toilet,
  Tv,
  Waves,
  Wifi,
  Wrench,
  Zap,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import { serviceIconMap } from "./service-icons"

const ICONS = {
  Activity,
  Award,
  Cable,
  Car,
  ClipboardCheck,
  Clock,
  CreditCard,
  Construction,
  Droplets,
  Fan,
  Flame,
  Gauge,
  Lightbulb,
  Power,
  Search,
  ShieldAlert,
  ShieldCheck,
  ShowerHead,
  Snowflake,
  Toilet,
  Tv,
  Waves,
  Wifi,
  Wrench,
  Zap,
}

export type DirectoryIconName = keyof typeof ICONS

const BITMAP_SERVICE_ICONS: Record<string, string> = {
  "reparacion-fugas": "/assets/service-icons-3d-test/reparacion-fugas.webp",
  "cambio-reparacion-grifos": "/assets/service-icons-3d-test/cambio-reparacion-grifos.webp",
  "reparacion-cisternas": "/assets/service-icons-3d-test/reparacion-cisternas.webp",
  "desatascos": "/assets/service-icons-3d-test/desatascos.webp",
  "instalaciones": "/assets/service-icons-3d-test/instalaciones.webp",
  "instalacion-cambio-inodoros": "/assets/service-icons-3d-test/instalacion-cambio-inodoros.webp",
  "cambio-banera-por-ducha": "/assets/service-icons-3d-test/cambio-banera-por-ducha.webp",
  "sustitucion-tuberias": "/assets/service-icons-3d-test/sustitucion-tuberias.webp",
  "calentadores-termos": "/assets/service-icons-3d-test/calentadores-termos.webp",
  "grupos-presion-agua": "/assets/service-icons-3d-test/grupos-presion-agua.webp",
  "descalcificadores-osmosis": "/assets/service-icons-3d-test/descalcificadores-osmosis.webp",
  "mantenimiento": "/assets/service-icons-3d-test/mantenimiento.webp",
  "instalacion-lavabos": "/assets/service-icons-3d-test/instalacion-lavabos.webp",
  "mamparas-ducha": "/assets/service-icons-3d-test/mamparas-ducha.webp",
  "bajantes": "/assets/service-icons-3d-test/bajantes.webp",
  "reparacion-duchas": "/assets/service-icons-3d-test/reparacion-duchas.webp",
  "urgencias-electricas": "/assets/service-icons-3d-test/urgencias-electricas.webp",
  "averias-electricas": "/assets/service-icons-3d-test/averias-electricas.webp",
  "instalaciones-electricas": "/assets/service-icons-3d-test/instalaciones-electricas.webp",
  "cuadros-electricos": "/assets/service-icons-3d-test/cuadros-electricos.webp",
  "enchufes-interruptores": "/assets/service-icons-3d-test/enchufes-interruptores.webp",
  "puesta-tierra": "/assets/service-icons-3d-test/puesta-tierra.webp",
  "iluminacion-led": "/assets/service-icons-3d-test/iluminacion-led.webp",
  "pequenos-trabajos-electricos": "/assets/service-icons-3d-test/pequenos-trabajos-electricos.webp",
  "cargador-coche-electrico": "/assets/service-icons-3d-test/cargador-coche-electrico.webp",
  "domotica": "/assets/service-icons-3d-test/domotica.webp",
  "videoportero-portero-automatico": "/assets/service-icons-3d-test/videoportero-portero-automatico.webp",
  "mantenimiento-electrico": "/assets/service-icons-3d-test/mantenimiento-electrico.webp",
  "revision-electrica": "/assets/service-icons-3d-test/revision-electrica.webp",
  "desatasco-tuberias": "/assets/service-icons-3d-test/desatascos.webp",
  "desatascar-fregadero": "/assets/service-icons-3d-test/instalacion-lavabos.webp",
  "desatascar-wc": "/assets/service-icons-3d-test/instalacion-cambio-inodoros.webp",
  "desatascar-lavabo-ducha": "/assets/service-icons-3d-test/reparacion-duchas.webp",
  "camion-cuba": "/assets/service-icons-3d-test/grupos-presion-agua.webp",
  "limpieza-fosas-septicas": "/assets/service-icons-3d-test/bajantes.webp",
  "instalacion-aire-acondicionado": "/assets/service-icons-3d-clima/instalacion-aire-acondicionado.png",
  "reparacion-aire-acondicionado": "/assets/service-icons-3d-clima/reparacion-aire-acondicionado.png",
  "mantenimiento-aire-acondicionado": "/assets/service-icons-3d-clima/mantenimiento-aire-acondicionado.png",
  "carga-gas-aire-acondicionado": "/assets/service-icons-3d-clima/carga-gas-aire-acondicionado.png",
  "aire-acondicionado-conductos": "/assets/service-icons-3d-clima/aire-acondicionado-conductos.png",
  "instalacion-split": "/assets/service-icons-3d-clima/instalacion-split.png",
  "bomba-calor": "/assets/service-icons-3d-clima/bomba-calor.png",
  "aire-acondicionado-cassette-techo": "/assets/service-icons-3d-clima/aire-acondicionado-cassette-techo.png",
  "preinstalacion-aire-acondicionado": "/assets/service-icons-3d-clima/preinstalacion-aire-acondicionado.png",
  "limpieza-conductos-aire-acondicionado": "/assets/service-icons-3d-clima/limpieza-conductos-aire-acondicionado.png",
  "empresa-climatizacion": "/assets/service-icons-3d-clima/empresa-climatizacion.png",
  "reparacion-calderas": "/assets/service-icons-3d-calefaccion/reparacion-calderas.png",
  "mantenimiento-calderas": "/assets/service-icons-3d-calefaccion/mantenimiento-calderas.png",
  "radiadores-calefaccion": "/assets/service-icons-3d-calefaccion/radiadores-calefaccion.png",
  "instalacion-calefaccion": "/assets/service-icons-3d-calefaccion/instalacion-calefaccion.png",
  "suelo-radiante": "/assets/service-icons-3d-calefaccion/suelo-radiante.png",
  "calefaccion-central-comunidades": "/assets/service-icons-3d-calefaccion/calefaccion-central-comunidades.png",
  "termostatos-valvulas": "/assets/service-icons-3d-calefaccion/termostatos-valvulas.png",
  "aerotermia-calefaccion": "/assets/service-icons-3d-calefaccion/aerotermia-calefaccion.png",
  "inspeccion-camara-tuberias": "/assets/service-icons-3d-limpieza-tuberias/inspeccion-camara-tuberias.webp",
  "limpieza-arquetas-colectores": "/assets/service-icons-3d-limpieza-tuberias/limpieza-arquetas-colectores.webp",
  "limpieza-bajantes": "/assets/service-icons-3d-limpieza-tuberias/limpieza-bajantes.webp",
  "limpieza-tuberias-comunidades": "/assets/service-icons-3d-limpieza-tuberias/limpieza-tuberias-comunidades.webp",
  "limpieza-tuberias-empresas": "/assets/service-icons-3d-limpieza-tuberias/limpieza-tuberias-empresas.webp",
  "limpieza-alta-presion-camion-cuba": "/assets/service-icons-3d-limpieza-tuberias/limpieza-alta-presion-camion-cuba.webp",
}

const SERVICE_TITLE_SLUGS: Record<string, string> = {
  "Puesta a Tierra": "puesta-tierra",
  "Videoportero y Portero Automático": "videoportero-portero-automatico",
}

export type DirectoryServiceItem = {
  icon: DirectoryIconName
  title: string
  description: string
  href?: string
  featured?: boolean
  status?: "available" | "consult"
}

export type DirectoryServiceGroup = {
  id: string
  label: string
  icon: DirectoryIconName
  services: DirectoryServiceItem[]
}

export type DirectoryTrustItem = {
  icon: DirectoryIconName
  label: string
}

export interface ServicesDirectoryV2Props {
  badge?: string
  title: string
  subtitle?: string
  groups: DirectoryServiceGroup[]
  trustItems?: DirectoryTrustItem[]
  phoneHref: string
  phoneLabel: string
  whatsappHref: string
  whatsappLabel?: string
  searchPlaceholder?: string
  summaryCountLabel?: string
  summaryDescription?: string
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

function getServiceSlug(href?: string) {
  if (!href) return ""
  const cleanHref = href.split("?")[0]?.split("#")[0] ?? ""
  return cleanHref.split("/").filter(Boolean).pop() ?? ""
}

function getServiceIcon(service: DirectoryServiceItem) {
  const slug = getServiceSlug(service.href) || SERVICE_TITLE_SLUGS[service.title] || ""
  return serviceIconMap[slug]
}

function getBitmapServiceIcon(service: DirectoryServiceItem) {
  const slug = getServiceSlug(service.href) || SERVICE_TITLE_SLUGS[service.title] || ""
  return BITMAP_SERVICE_ICONS[slug]
}

export function ServicesDirectoryV2({
  badge,
  title,
  subtitle,
  groups,
  trustItems = [],
  phoneHref,
  phoneLabel,
  whatsappHref,
  whatsappLabel = "WhatsApp",
  searchPlaceholder = "Buscar servicio",
  summaryCountLabel,
  summaryDescription,
}: ServicesDirectoryV2Props) {
  const [activeGroup, setActiveGroup] = useState(groups[0]?.id ?? "")
  const [query, setQuery] = useState("")

  const serviceCount = groups.reduce((count, group) => count + group.services.length, 0)
  const featuredServices = groups
    .flatMap((group) => group.services)
    .filter((service) => service.featured)
    .slice(0, 3)
  const crawlableServices = groups.flatMap((group) =>
    group.services
      .filter((service) => service.status !== "consult" && service.href)
      .map((service) => ({
        title: service.title,
        href: service.href as string,
        groupLabel: group.label,
      }))
  )

  const visibleGroups = useMemo(() => {
    const normalizedQuery = normalizeText(query.trim())
    const scopedGroups = normalizedQuery
      ? groups
      : groups.filter((group) => group.id === activeGroup)

    return scopedGroups
      .map((group) => ({
        ...group,
        services: normalizedQuery
          ? group.services.filter((service) => {
              const searchable = `${service.title} ${service.description}`
              return normalizeText(searchable).includes(normalizedQuery)
            })
          : group.services,
      }))
      .filter((group) => group.services.length > 0)
  }, [activeGroup, groups, query])

  if (!groups.length || serviceCount === 0) return null

  return (
    <section data-sticky-cta-trigger className="overflow-hidden bg-[#F6F8FC] px-3 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl min-w-0">
        <div className="mb-5 grid gap-4 sm:mb-7 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            {badge ? (
              <span className="inline-flex rounded-full bg-[#E7EFFD] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#2563EB] sm:px-4 sm:text-xs">
                {badge}
              </span>
            ) : null}
            <h2 className="mt-3 max-w-4xl text-pretty text-2xl font-extrabold leading-tight text-[#102A6B] sm:mt-4 sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-3 max-w-3xl text-pretty text-sm leading-relaxed text-[#4A5B7D] sm:mt-4 sm:text-lg">
                {subtitle}
              </p>
            ) : null}
          </div>

          {trustItems.length ? (
            <div className="-mx-3 flex gap-2 overflow-x-auto px-3 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 lg:justify-end">
              {trustItems.slice(0, 4).map((item) => {
                const Icon = ICONS[item.icon]
                return (
                  <span
                    key={item.label}
                    className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md border border-[#DDE6F5] bg-white px-3 py-2 text-xs font-bold text-[#102A6B] sm:text-sm"
                  >
                    <Icon className="h-4 w-4 text-[#2563EB]" strokeWidth={2.25} />
                    {item.label}
                  </span>
                )
              })}
            </div>
          ) : null}
        </div>

        <div className="max-w-full overflow-hidden rounded-md border border-[#DDE6F5] bg-white shadow-[0_26px_70px_-42px_rgba(15,45,117,0.45)]">
          <div className="grid min-w-0 gap-0 lg:grid-cols-[0.72fr_1.28fr]">
            <aside className="border-b border-[#E7EDF7] bg-[#FBFCFF] p-3 sm:p-6 lg:border-b-0 lg:border-r">
              <div className="min-w-0 rounded-md border border-[#DDE6F5] bg-white p-3 sm:p-4">
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#2563EB] sm:text-sm">
                  {summaryCountLabel ?? `${serviceCount} servicios`}
                </p>
                <p className="mt-2 min-w-0 text-xs leading-relaxed text-[#4A5B7D] sm:text-sm">
                  {summaryDescription ?? "Servicios habituales para vivienda, local o comunidad."}
                </p>
                <div className="mt-3 grid min-w-0 grid-cols-1 gap-2 sm:mt-4">
                  <a
                    href={phoneHref}
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[#2563EB] px-3 py-2.5 text-xs font-extrabold text-white transition-colors hover:bg-[#1D4ED8] sm:min-h-12 sm:px-4 sm:py-3 sm:text-sm"
                  >
                    <Phone className="h-4 w-4" strokeWidth={2.5} />
                    {phoneLabel}
                  </a>
                  <a
                    href={whatsappHref}
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-[#BFE7D0] bg-[#F0FDF4] px-3 py-2.5 text-xs font-extrabold text-[#15803D] transition-colors hover:bg-[#DCFCE7] sm:min-h-12 sm:px-4 sm:py-3 sm:text-sm"
                  >
                    <MessageCircle className="h-4 w-4" strokeWidth={2.5} />
                    {whatsappLabel}
                  </a>
                </div>
              </div>

              {featuredServices.length ? (
                <div className="mt-4 hidden gap-2 sm:grid">
                  {featuredServices.map((service) => {
                    return (
                      <ServiceAction
                        key={service.title}
                        service={service}
                        whatsappHref={whatsappHref}
                        compact
                      />
                    )
                  })}
                </div>
              ) : null}
            </aside>

            <div className="min-w-0 p-3 sm:p-6">
              <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
                <label className="relative block">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4A5B7D]" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={searchPlaceholder}
                    className="h-11 w-full rounded-md border border-[#DDE6F5] bg-white pl-11 pr-4 text-sm font-semibold text-[#102A6B] outline-none transition-colors placeholder:text-[#64748B] focus:border-[#2563EB] sm:h-12"
                    type="search"
                  />
                </label>
                <p className="hidden text-sm font-bold text-[#4A5B7D] sm:block">
                  {visibleGroups.reduce((count, group) => count + group.services.length, 0)} resultados
                </p>
              </div>

              <div className="-mx-3 mt-3 flex max-w-[calc(100vw-1.5rem)] gap-2 overflow-x-auto px-3 pb-2 sm:mx-0 sm:mt-4 sm:max-w-full sm:px-0">
                {groups.map((group) => {
                  const Icon = ICONS[group.icon]
                  const isActive = activeGroup === group.id && !query.trim()
                  return (
                    <button
                      key={group.id}
                      type="button"
                      onClick={() => {
                        setQuery("")
                        setActiveGroup(group.id)
                      }}
                      className={`inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-md border px-3 text-xs font-extrabold transition-colors sm:px-4 sm:text-sm ${
                        isActive
                          ? "border-[#2563EB] bg-[#E7EFFD] text-[#102A6B]"
                          : "border-[#DDE6F5] bg-white text-[#4A5B7D] hover:border-[#BFD2F3] hover:text-[#102A6B]"
                      }`}
                    >
                      <Icon className="h-4 w-4" strokeWidth={2.25} />
                      {group.label}
                    </button>
                  )
                })}
              </div>

              <div className="mt-4 grid gap-4 sm:mt-5 sm:gap-5">
                {visibleGroups.map((group) => {
                  const Icon = ICONS[group.icon]
                  return (
                    <div key={group.id}>
                      <div className="mb-3 flex items-center gap-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#E7EFFD] text-[#2563EB]">
                          <Icon className="h-5 w-5" strokeWidth={2.25} />
                        </span>
                        <h3 className="text-lg font-extrabold leading-tight text-[#102A6B] sm:text-xl">
                          {group.label}
                        </h3>
                      </div>
                      <div className="grid gap-2 sm:gap-3 md:grid-cols-2">
                        {group.services.map((service) => {
                          return (
                            <ServiceAction
                              key={service.title}
                              service={service}
                              whatsappHref={whatsappHref}
                            />
                          )
                        })}
                      </div>
                    </div>
                  )
                })}

                {!visibleGroups.length ? (
                  <div className="rounded-md border border-[#DDE6F5] bg-[#FBFCFF] p-5 text-center sm:p-6">
                    <p className="text-base font-extrabold text-[#102A6B]">No hemos encontrado ese servicio.</p>
                    <p className="mt-2 text-sm text-[#4A5B7D]">Escríbenos por WhatsApp y revisamos tu caso.</p>
                  </div>
                ) : null}

                {crawlableServices.length ? (
                  <nav
                    aria-label="Todos los servicios disponibles"
                    className="mt-2 border-t border-[#E7EDF7] pt-4"
                  >
                    <p className="text-xs font-extrabold uppercase tracking-wider text-[#4A5B7D]">
                      Todos los servicios
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {crawlableServices.map((service) => (
                        <Link
                          key={`${service.groupLabel}-${service.href}`}
                          href={service.href}
                          className="inline-flex min-h-11 items-center rounded-md border border-[#DDE6F5] bg-[#FBFCFF] px-3 py-2 text-xs font-bold text-[#102A6B] transition-colors hover:border-[#BFD2F3] hover:bg-[#E7EFFD] hover:text-[#2563EB]"
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  </nav>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceAction({
  service,
  whatsappHref,
  compact = false,
}: {
  service: DirectoryServiceItem
  whatsappHref: string
  compact?: boolean
}) {
  const isLinked = service.status !== "consult" && Boolean(service.href)
  const bitmapIcon = getBitmapServiceIcon(service)
  const isClimaBitmapIcon = bitmapIcon?.includes("service-icons-3d-clima")
  const isCalefaccionBitmapIcon = bitmapIcon?.includes("service-icons-3d-calefaccion")
  const CustomIcon = getServiceIcon(service)
  const FallbackIcon = ICONS[service.icon]
  const icon: ReactNode = bitmapIcon ? (
    <Image
      src={bitmapIcon}
      alt={`Icono 3D de ${service.title}`}
      width={56}
      height={56}
      className={`h-full w-full object-cover ${isClimaBitmapIcon || isCalefaccionBitmapIcon ? "scale-[1.16]" : ""}`}
      sizes="56px"
    />
  ) : CustomIcon ? (
    <CustomIcon size={25} aria-label={service.title} />
  ) : (
    <FallbackIcon className="h-5 w-5" strokeWidth={2.25} aria-label={service.title} />
  )
  const className = `group flex h-full w-full ${compact ? "min-h-[88px]" : "min-h-[104px] sm:min-h-[116px]"} min-w-0 items-start gap-3 rounded-md border border-[#E7EDF7] bg-white p-3 transition-all duration-200 hover:border-[#BFD2F3] hover:shadow-[0_18px_44px_-30px_rgba(15,45,117,0.55)] sm:p-4`
  const content = (
    <>
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#F1F6FF] text-[#2563EB] sm:h-12 sm:w-12 ${bitmapIcon ? "shadow-[0_10px_24px_-18px_rgba(15,45,117,0.45)]" : ""}`}>
        {icon}
      </span>
      <span className="flex min-w-0 max-w-full flex-1 flex-col overflow-hidden">
        <span className="max-w-full break-words text-[15px] font-extrabold leading-snug text-[#102A6B] sm:text-base">{service.title}</span>
        {!compact ? (
          <span className="mt-2 max-w-full break-words text-[13px] leading-relaxed text-[#4A5B7D] sm:text-sm">{service.description}</span>
        ) : null}
        <span className="mt-3 inline-flex items-center gap-2 text-xs font-extrabold text-[#2563EB] sm:text-sm">
          {isLinked ? "Ver servicio" : "Consultar"}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.5} />
        </span>
      </span>
    </>
  )

  if (isLinked && service.href) {
    return (
      <Link href={service.href} className={className}>
        {content}
      </Link>
    )
  }

  return (
    <a href={whatsappHref} className={className}>
      {content}
    </a>
  )
}

export default ServicesDirectoryV2
