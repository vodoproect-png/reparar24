import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowRight,
  Droplets,
  Flame,
  Gauge,
  Home,
  Snowflake,
  Wrench,
  Zap,
} from 'lucide-react'
import { type Locale } from '@/lib/i18n/config'
import { cities } from '@/data/cities'
import { services } from '@/data/services'
import { generateFAQSchema, generateLocalBusinessSchema } from '@/lib/seo/schema'
import { getCityServiceLinks } from '@/lib/linking/internal'
import { getPhoneDisplay, getWhatsAppMessage } from '@/lib/config/contact'
import { getCityHubSEOContent } from '@/data/city-hub-seo-content'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileStickyCTA from '@/components/conversion/MobileStickyCTA'
import { Breadcrumbs, generateBreadcrumbSchema } from '@/components/navigation/Breadcrumbs'
import { ServiceHeroV2 } from '@/components/ds/ServiceHeroV2'
import { TrustSignalsV1 } from '@/components/ds/TrustSignalsV1'
import { ProcessStepsV3 } from '@/components/ds/ProcessStepsV3'
import { PricingSectionV1 } from '@/components/ds/PricingSectionV1'
import OpinionesClientesV1 from '@/components/ds/OpinionesClientesV1'
import FaqSectionV2 from '@/components/ds/FaqSectionV2'
import SeoContentSectionV1 from '@/components/ds/SeoContentSectionV1'
import { TrustCtaBlueV1 } from '@/components/ds/TrustCtaBlueV1'
import { cityHubToHeroProps } from '@/lib/adapters/hero-adapter'
import { fitMetaDescription, fitSeoTitle } from '@/lib/seo/meta-length'
import { getDefaultOGImage, OG_IMAGE_DIMENSIONS } from '@/lib/seo/og-image-mapper'

const serviceCardMeta = {
  fontanero: {
    icon: Wrench,
    badge: 'Urgencias y reparaciones',
    short: 'Fugas, grifos, cisternas, termos, instalaciones y mantenimiento de fontaneria.',
    accent: 'bg-blue-50 text-blue-700',
  },
  electricista: {
    icon: Zap,
    badge: 'Instalaciones y averias',
    short: 'Cuadros electricos, enchufes, iluminacion, revisiones y averias urgentes.',
    accent: 'bg-indigo-50 text-indigo-700',
  },
  desatascos: {
    icon: Droplets,
    badge: 'Saneamiento urgente',
    short: 'Tuberias, WC, fregaderos, arquetas, bajantes y camion cuba cuando procede.',
    accent: 'bg-cyan-50 text-cyan-700',
  },
  'aire-acondicionado': {
    icon: Snowflake,
    badge: 'Climatizacion',
    short: 'Instalacion, reparacion, mantenimiento, gas, split, conductos y bomba de calor.',
    accent: 'bg-sky-50 text-sky-700',
  },
  calefaccion: {
    icon: Flame,
    badge: 'Calderas y radiadores',
    short: 'Reparacion de calderas, radiadores, mantenimiento y sistemas de calefaccion.',
    accent: 'bg-orange-50 text-orange-700',
  },
  'limpieza-tuberias': {
    icon: Gauge,
    badge: 'Mantenimiento tecnico',
    short: 'Camara, arquetas, bajantes, colectores, comunidades, empresas y alta presion.',
    accent: 'bg-emerald-50 text-emerald-700',
  },
} as const

function getCityHubTrustSignals(cityName: string) {
  return {
    badge: 'Garantias Reparar24',
    title: `Servicios del hogar en ${cityName} con garantia`,
    subtitle: 'Un unico equipo para coordinar reparaciones urgentes y trabajos programados sin mezclar presupuestos ni oficios.',
    stats: [
      { icon: 'Clock' as const, color: 'blue' as const, headline: '30-60 min', description: `Respuesta orientativa en ${cityName} segun zona y disponibilidad` },
      { icon: 'ShieldCheck' as const, color: 'green' as const, headline: '24/7/365', description: 'Atencion continua para urgencias del hogar' },
      { icon: 'Shield' as const, color: 'orange' as const, headline: '600.000€ RC', description: 'Seguro de responsabilidad civil profesional' },
      { icon: 'Award' as const, color: 'purple' as const, headline: '6 meses', description: 'Garantia por escrito en reparaciones' },
    ],
    bottomItems: [
      { icon: 'UserCheck' as const, label: 'Tecnicos certificados' },
      { icon: 'FileText' as const, label: 'Factura disponible' },
      { icon: 'Tag' as const, label: 'Presupuesto previo' },
    ],
  }
}

function getCityHubProcess(cityName: string) {
  return {
    badge: 'Proceso transparente',
    title: 'Como coordinamos la reparacion',
    subtitle: `En ${cityName} filtramos el problema y enviamos el perfil tecnico adecuado para evitar visitas innecesarias.`,
    steps: [
      {
        number: '01',
        color: 'blue' as const,
        title: 'Nos cuentas la averia',
        description: 'Llamas o escribes por WhatsApp indicando ciudad, urgencia y sintomas principales.',
        iconSrc: '/icons/process-3d-01-contacto.webp',
      },
      {
        number: '02',
        color: 'green' as const,
        title: 'Asignamos servicio',
        description: 'Identificamos si necesitas fontaneria, electricidad, desatascos, clima, calefaccion o limpieza.',
        iconSrc: '/icons/process-3d-02-valoracion.webp',
      },
      {
        number: '03',
        color: 'orange' as const,
        title: 'Tecnico adecuado',
        description: 'Coordinamos visita urgente o programada con presupuesto antes de empezar.',
        iconSrc: '/icons/process-3d-03-reparacion.webp',
      },
      {
        number: '04',
        color: 'purple' as const,
        title: 'Factura y garantia',
        description: 'Cerramos el trabajo con explicacion clara, factura disponible y garantia por escrito.',
        iconSrc: '/icons/process-3d-04-garantia.webp',
      },
    ],
    trustItems: [
      { icon: 'ShieldCheck' as const, title: 'Sin sorpresas', description: 'Presupuesto explicado antes de intervenir' },
      { icon: 'Clock' as const, title: 'Prioridad urgente', description: 'Atencion rapida cuando hay riesgo real' },
      { icon: 'UserRound' as const, title: 'Equipo coordinado', description: 'Derivamos cada caso al oficio correcto' },
      { icon: 'FileText' as const, title: 'Documentacion', description: 'Factura disponible para particulares y empresas' },
    ],
  }
}

function getCityHubPricing() {
  return {
    badge: 'Precios orientativos',
    title: 'Presupuesto segun servicio',
    subtitle: 'Cada reparacion depende del oficio, horario, acceso, materiales y complejidad del trabajo.',
    pricingPlans: [
      {
        title: 'Diagnostico',
        price: '49€',
        color: 'blue' as const,
        iconSrc: '/icons/pricing-3d-01-diagnostico.webp',
        features: ['Revision inicial', 'Orientacion profesional', 'Presupuesto previo', 'Sin compromiso'],
      },
      {
        title: 'Reparaciones',
        price: '79€',
        color: 'orange' as const,
        iconSrc: '/icons/process-3d-03-reparacion.webp',
        features: ['Fontaneria', 'Electricidad', 'Climatizacion', 'Garantia por escrito'],
        featured: true,
      },
      {
        title: 'Desatascos',
        price: '89€',
        color: 'green' as const,
        iconSrc: '/icons/pricing-3d-03-desatascos.webp',
        features: ['WC y fregaderos', 'Tuberias', 'Arquetas', 'Equipo profesional'],
      },
      {
        title: 'Urgencias',
        price: '99€',
        color: 'red' as const,
        iconSrc: '/icons/pricing-3d-04-urgencias.webp',
        features: ['Atencion prioritaria', 'Noches y festivos', '30-60 min segun zona', 'Coordinacion inmediata'],
      },
    ],
    featuredBadgeText: 'Habitual',
    fromLabel: 'Desde',
    trustItems: [
      { icon: 'ShieldCheck' as const, title: 'Presupuesto', description: 'antes de empezar' },
      { icon: 'FileText' as const, title: 'Factura', description: 'disponible al finalizar' },
      { icon: 'ShieldCheck' as const, title: 'Garantia', description: 'por escrito' },
      { icon: 'XCircle' as const, title: 'Sin costes ocultos', description: 'alcance explicado' },
    ],
    disclaimer: 'Precios orientativos. El importe final se confirma segun diagnostico, horario, acceso y materiales.',
  }
}

function getCityHubReviews(cityName: string) {
  return {
    rating: '4.8/5',
    title: `Opiniones de clientes en ${cityName}`,
    subtitle: 'Valoraciones de usuarios que necesitaban resolver averias del hogar con rapidez y presupuesto claro.',
    reviews: [
      {
        name: 'Cliente particular',
        quote: `Me orientaron por telefono y enviaron el tecnico adecuado en ${cityName}. El presupuesto quedo claro antes de empezar.`,
        verified: true,
      },
      {
        name: 'Administrador de finca',
        quote: 'Necesitabamos coordinar varios oficios para una comunidad. Respuesta ordenada, factura y explicacion tecnica.',
        verified: true,
      },
      {
        name: 'Local comercial',
        quote: 'Atendieron la urgencia sin cerrar el negocio mas tiempo del necesario. Buena comunicacion por WhatsApp.',
        verified: true,
      },
    ],
    trustItems: [
      { icon: 'Users' as const, title: '4.8/5', description: 'Opiniones de clientes', showStars: true },
      { icon: 'Users' as const, title: '2.500+', description: 'Clientes atendidos' },
      { icon: 'ShieldCheck' as const, title: '24/7', description: 'Urgencias y programados' },
      { icon: 'MapPin' as const, title: cityName, description: 'Cobertura por zonas' },
    ],
    verifiedLabel: 'Cliente atendido',
  }
}

function getCityHubSeoSection(cityName: string, seoText: string, semanticOwnership: string[], areas: string[]) {
  return {
    badge: 'SEO local',
    title: `Reparaciones del hogar y servicios tecnicos en ${cityName}`,
    intro: seoText.split('\n\n'),
    localCoverage: {
      title: `Cobertura en ${cityName}`,
      description: `Atendemos las principales zonas de ${cityName} y derivamos cada caso a la pagina especifica del servicio cuando existe una busqueda mas concreta.`,
    },
    benefitsTitle: 'Por que esta pagina existe',
    benefits: [
      'Agrupa la intencion de servicios profesionales por ciudad.',
      'Evita mezclar consultas generales con paginas de oficio concretas.',
      'Ayuda al usuario a elegir rapido el servicio correcto.',
      'Deriva a paginas hijas cuando la necesidad ya esta clara.',
    ],
    serviceAreasTitle: `Zonas principales de ${cityName}`,
    serviceAreas: areas,
    serviceAreasCtaLabel: 'Ver servicios',
    keywordsTitle: 'Intenciones cubiertas',
    keywordTags: semanticOwnership,
    phone: {
      label: 'Llamar ahora',
      number: getPhoneDisplay(),
    },
  }
}

export async function generateStaticParams() {
  const params: { locale: Locale; citySlug: string }[] = []
  const locales: Locale[] = ['es']

  locales.forEach((locale) => {
    cities.forEach((city) => {
      params.push({ locale, citySlug: city.slug })
    })
  })

  return params
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; citySlug: string }> }) {
  const { citySlug } = await params
  const city = cities.find((c) => c.slug === citySlug)
  if (!city) return {}
  const metaTitle = fitSeoTitle(`Servicios Profesionales en ${city.name} | Reparaciones 24h | Reparar24`)
  const metaDescription = fitMetaDescription(
    `Servicios profesionales en ${city.name}: fontaneria, electricidad, desatascos, climatizacion, calefaccion y limpieza de tuberias. Presupuesto previo y urgencias 24h.`
  )
  const ogDescription = fitMetaDescription(
    `Reparaciones del hogar en ${city.name}: fontaneria, electricidad, desatascos, climatizacion y mas.`
  )
  const ogImage = getDefaultOGImage()

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: [
      `servicios profesionales ${city.name}`,
      `reparaciones del hogar ${city.name}`,
      `servicios 24 horas ${city.name}`,
      `fontanero ${city.name}`,
      `electricista ${city.name}`,
      `desatascos ${city.name}`,
      `aire acondicionado ${city.name}`,
      `calefaccion ${city.name}`,
      `limpieza de tuberias ${city.name}`,
    ],
    alternates: {
      canonical: `https://reparar24.es/servicios/${city.slug}`,
    },
    openGraph: {
      title: `Servicios Profesionales en ${city.name} | Reparar24`,
      description: ogDescription,
      url: `https://reparar24.es/servicios/${city.slug}`,
      siteName: 'Reparar24',
      locale: 'es_ES',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: OG_IMAGE_DIMENSIONS.width,
          height: OG_IMAGE_DIMENSIONS.height,
          alt: `Servicios profesionales Reparar24 en ${city.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Servicios Profesionales en ${city.name} | Reparar24`,
      description: ogDescription,
      images: [ogImage],
    },
  }
}

export default async function CityPage({ params }: { params: Promise<{ locale: Locale; citySlug: string }> }) {
  const { locale, citySlug } = await params
  const city = cities.find((c) => c.slug === citySlug)

  if (!city) notFound()

  const cityHubContent = getCityHubSEOContent(citySlug)

  if (!cityHubContent) notFound()

  const breadcrumbItems = [
    { name: 'Inicio', url: '/' },
    { name: `Servicios en ${city.name}`, url: `/servicios/${city.slug}` },
  ]
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems)
  const localBusinessSchema = generateLocalBusinessSchema({
    name: `Reparar24 - Servicios en ${city.name}`,
    description: `Servicios profesionales 24 horas en ${city.name}`,
    city,
    url: `https://reparar24.es/servicios/${city.slug}`,
  })

  const faqSchema = generateFAQSchema({ questions: cityHubContent.faqs })

  const serviceLinks = getCityServiceLinks(city, services, locale)
  const whatsappMessage = getWhatsAppMessage({
    city: city.name,
    problem: 'necesito ayuda con una reparacion del hogar',
    locale,
  })
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header locale={locale} />
      <Breadcrumbs items={breadcrumbItems} />
      <main>
        <ServiceHeroV2 {...cityHubToHeroProps(city, locale, cityHubContent)} />
        <MobileStickyCTA phone="34642310813" whatsappMessage={whatsappMessage} />

        <section id="servicios" data-sticky-cta-trigger className="bg-[#F4F7FC] px-4 py-8 sm:px-6">
          <div className="mx-auto max-w-[1280px] rounded-[32px] border border-[#DCE8FC] bg-white p-5 shadow-[0_20px_50px_-24px_rgba(15,45,117,0.18)] sm:p-7">
            <div className="mb-7 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#E4EDFB] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                  <Home className="h-4 w-4" aria-hidden="true" />
                  {services.length} servicios en {city.name}
                </span>
                <h2 className="mt-5 text-balance text-4xl font-extrabold leading-tight text-[#0F2D75] sm:text-5xl">
                  Elige el servicio que necesitas
                </h2>
                <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#4A5B7D]">
                  Accede a la pagina optimizada de cada servicio en {city.name}: urgencias, trabajos programados, precios orientativos y cobertura por zona.
                </p>
              </div>
              <div className="rounded-[18px] border border-[#DCE8FC] bg-[#F7FAFF] px-5 py-4 text-sm font-semibold text-[#334155]">
                <span className="block text-[#2563EB]">{city.districts.length} zonas principales</span>
                <span>{city.province} - {city.population.toLocaleString('es-ES')} habitantes</span>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {serviceLinks.map((link) => {
                const service = services.find((item) => link.href.includes(`/${item.slug}`)) ?? services.find((item) => link.title.startsWith(item.name))
                const meta = service ? serviceCardMeta[service.slug as keyof typeof serviceCardMeta] : serviceCardMeta.fontanero
                const Icon = meta.icon

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex gap-5 rounded-[22px] border border-[#DCE8FC] bg-white p-5 shadow-[0_18px_40px_-30px_rgba(15,45,117,0.35)] transition hover:-translate-y-1 hover:border-[#2563EB] hover:shadow-[0_26px_54px_-30px_rgba(37,99,235,0.5)]"
                  >
                    <span className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-[18px] ${meta.accent}`}>
                      <Icon className="h-8 w-8" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="text-xs font-extrabold uppercase tracking-wide text-[#2563EB]">
                        {meta.badge}
                      </span>
                      <span className="mt-1 block text-2xl font-extrabold leading-tight text-[#0F2D75]">
                        {link.title}
                      </span>
                      <span className="mt-3 block text-base leading-relaxed text-[#4A5B7D]">
                        {meta.short}
                      </span>
                      <span className="mt-4 inline-flex items-center gap-2 text-base font-extrabold text-[#2563EB]">
                        Ver servicio
                        <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <TrustSignalsV1 {...getCityHubTrustSignals(city.name)} />
        <ProcessStepsV3 {...getCityHubProcess(city.name)} />
        <PricingSectionV1 {...getCityHubPricing()} />
        <OpinionesClientesV1 {...getCityHubReviews(city.name)} />
        <FaqSectionV2 faqs={cityHubContent.faqs} />
        <SeoContentSectionV1
          {...getCityHubSeoSection(
            city.name,
            cityHubContent.seoText,
            cityHubContent.semanticOwnership,
            city.districts.map((district) => district.name)
          )}
        />
        <TrustCtaBlueV1 />
      </main>
      <Footer locale={locale} />
    </>
  )
}
