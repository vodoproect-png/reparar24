import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  Clock,
  FileText,
  ShieldCheck,
} from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs'
import type { Locale } from '@/lib/i18n/config'
import { BLOG_ARTICLE_BRIEFS, BLOG_CATEGORIES } from '@/data/blog'
import TrustCtaBlueV1 from '@/components/ds/TrustCtaBlueV1'
import BlogSearch, { type BlogSearchArticle } from '@/components/blog/BlogSearch'
import { ServiceHeroV2 } from '@/components/ds/ServiceHeroV2'

export const metadata: Metadata = {
  title: 'Guías de reparación del hogar | Blog Reparar24',
  description: 'Guías prácticas sobre fontanería, electricidad, desatascos, aire acondicionado, calefacción y limpieza de tuberías conectadas con servicio profesional.',
  alternates: {
    canonical: 'https://reparar24.es/blog',
  },
  openGraph: {
    title: 'Guías de reparación del hogar | Blog Reparar24',
    description: 'Guías prácticas sobre fontanería, electricidad, desatascos, climatización, calefacción y saneamiento conectadas con servicio profesional.',
    url: 'https://reparar24.es/blog',
    siteName: 'Reparar24',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: '/images/blog/blog-hero-reparar24.jpg',
        width: 1200,
        height: 630,
        alt: 'Técnico de Reparar24 junto a furgoneta para guías de reparación del hogar',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

const featuredArticles = BLOG_ARTICLE_BRIEFS.filter((article) => article.status === 'published').slice(0, 3)

const searchArticles: BlogSearchArticle[] = BLOG_ARTICLE_BRIEFS.map((article) => ({
  slug: article.slug,
  categorySlug: article.categorySlug,
  title: article.title,
  h1: article.h1,
  description: article.description,
  intent: article.intent,
  primaryKeyword: article.primaryKeyword,
  secondaryKeywords: article.secondaryKeywords,
}))

const categoryVisuals: Record<string, { src: string; alt: string }> = {
  fontaneria: {
    src: '/images/blog/category-icons/fontaneria.svg',
    alt: 'Icono 3D de tuberia, gota y herramienta para guia de fontaneria',
  },
  electricidad: {
    src: '/images/blog/category-icons/electricidad.svg',
    alt: 'Icono 3D de cuadro electrico y rayo para guia de electricidad',
  },
  desatascos: {
    src: '/images/blog/category-icons/desatascos.svg',
    alt: 'Icono 3D de sifon y gota para guia de desatascos',
  },
  climatizacion: {
    src: '/images/blog/category-icons/climatizacion.svg',
    alt: 'Icono 3D de aire acondicionado y flujo de aire para guia de climatizacion',
  },
  calefaccion: {
    src: '/images/blog/category-icons/calefaccion.svg',
    alt: 'Icono 3D de caldera y calor para guia de calefaccion',
  },
  saneamiento: {
    src: '/images/blog/category-icons/saneamiento.svg',
    alt: 'Icono 3D de camara de inspeccion y tuberia para guia de limpieza de tuberias',
  },
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params

  return (
    <>
      <Header locale={locale} />
      <Breadcrumbs
        items={[
          { name: 'Inicio', url: '/' },
          { name: 'Guías', url: '/blog' },
        ]}
      />
      <main>
        <ServiceHeroV2
          eyebrow="Guías Reparar24"
          title="Guías técnicas para reparar"
          titleHighlight="con criterio"
          subtitle="Respuestas claras sobre fontanería, electricidad, desatascos, climatización, calefacción y saneamiento, siempre conectadas con el servicio profesional adecuado."
          phoneCta={{
            label: 'Llamar ahora',
            sublabel: '642 310 813',
            href: 'tel:+34642310813',
          }}
          whatsappCta={{
            label: 'WhatsApp',
            sublabel: 'Consulta rapida',
            href: 'https://wa.me/34642310813?text=Hola%2C%20he%20leido%20una%20guia%20de%20Reparar24%20y%20necesito%20ayuda.',
          }}
          trustCards={[
            { icon: FileText, title: `${BLOG_ARTICLE_BRIEFS.length}`, subtitle: 'guías' },
            { icon: ShieldCheck, title: '100%', subtitle: 'prácticas' },
            { icon: Clock, title: '24/7', subtitle: 'ayuda' },
          ]}
          highlights={[
            { label: 'Diagnostico claro' },
            { label: 'Sin sustituir al tecnico' },
            { label: 'Enlace al servicio correcto' },
            { label: 'Consejos antes de llamar' },
          ]}
          image={{
            src: '/images/blog/blog-hero-reparar24.jpg',
            alt: 'Tecnico de Reparar24 con tablet junto a furgoneta de servicio para guías tecnicas del hogar',
          }}
          compactImage
        />

        {featuredArticles.length ? (
          <section className="bg-white px-4 pb-12 sm:px-6">
            <div className="mx-auto max-w-[1280px] rounded-[28px] border border-[#DCE7F7] bg-[#F5F8FD] p-5 shadow-[0_28px_60px_-42px_rgba(15,45,117,0.42)] sm:p-7">
              <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <span className="text-sm font-extrabold uppercase tracking-wide text-[#2563EB]">
                    Primera ola editorial
                  </span>
                  <h2 className="mt-2 text-3xl font-extrabold text-[#0F2D75]">
                    Guías listas para consultar
                  </h2>
                </div>
                <p className="max-w-md text-sm font-semibold leading-relaxed text-[#5B6B8C]">
                  Textos largos, semantica aprobada y originalidad externa verificada antes de publicar.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {featuredArticles.map((article) => (
                  <Link
                    key={`${article.categorySlug}/${article.slug}`}
                    href={`/blog/${article.categorySlug}/${article.slug}`}
                    className="group rounded-[22px] border border-[#E4ECFA] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#2563EB]"
                  >
                    <span className="inline-flex rounded-full bg-[#EAF1FF] px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-[#2563EB]">
                      {article.intent}
                    </span>
                    <h3 className="mt-4 text-xl font-extrabold leading-tight text-[#0F2D75]">
                      {article.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#5B6B8C]">
                      {article.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#2563EB]">
                      Revisar guia
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <BlogSearch articles={searchArticles} categories={BLOG_CATEGORIES} />

        <section className="bg-white px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-[1280px]">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF1FF] px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-[#2563EB]">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  Mapa editorial
                </span>
                <h2 className="mt-4 text-4xl font-extrabold leading-tight text-[#0F2D75]">
                  Guías por servicio
                </h2>
              </div>
              <p className="max-w-xl text-base leading-relaxed text-[#5B6B8C]">
                Cada categoria agrupa dudas informacionales y envia la intencion comercial a su
                servicio principal para evitar canibalizacion.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {BLOG_CATEGORIES.map((category) => {
                const categoryArticles = BLOG_ARTICLE_BRIEFS.filter(
                  (article) => article.categorySlug === category.slug
                )
                const visual = categoryVisuals[category.slug]

                return (
                  <Link
                    key={category.slug}
                    href={`/blog/${category.slug}`}
                    className="group rounded-[24px] border border-[#DCE7F7] bg-white p-6 shadow-[0_20px_45px_-34px_rgba(15,45,117,0.35)] transition hover:-translate-y-0.5 hover:border-[#2563EB]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      {visual ? (
                        <Image
                          src={visual.src}
                          alt={visual.alt}
                          width={72}
                          height={72}
                          className="h-[72px] w-[72px] object-contain"
                        />
                      ) : null}
                      <span className="rounded-full bg-[#F5F8FD] px-3 py-1 text-xs font-extrabold text-[#5B6B8C]">
                        {categoryArticles.length} guías
                      </span>
                    </div>
                    <h3 className="mt-5 text-2xl font-extrabold text-[#0F2D75]">{category.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-[#5B6B8C]">
                      {category.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#2563EB]">
                      Ver categoria
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
        <section className="bg-[#F5F8FD] px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-[980px] rounded-[28px] border border-[#DCE7F7] bg-white p-6 shadow-[0_26px_55px_-42px_rgba(15,45,117,0.45)] sm:p-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF1FF] px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-[#2563EB]">
              <FileText className="h-4 w-4" aria-hidden="true" />
              Guías prácticas
            </span>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#0F2D75] sm:text-4xl">
              Blog de reparaciones del hogar conectado con servicio profesional
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-[#31415F]">
              <p>
                El blog de Reparar24 reune guías de reparacion del hogar pensadas para
                entender una averia antes de tomar una decision. Aqui agrupamos dudas
                frecuentes sobre fontanería, electricidad, desatascos, aire acondicionado,
                calefacción y limpieza de tuberías, siempre con un enfoque práctico: qué
                puedes revisar con seguridad, qué señales indican urgencia y cuándo conviene
                pedir ayuda profesional.
              </p>
              <p>
                Cada guia informativa esta conectada con su servicio correspondiente para no
                mezclar intenciones. Si buscas como actuar ante una fuga de agua, una cisterna
                que pierde, un diferencial que salta, un atasco, una caldera que falla o un
                aire acondicionado que no enfria, encontraras una explicacion clara y una salida
                directa hacia el equipo tecnico adecuado. El objetivo no es sustituir una visita
                profesional, sino ayudarte a describir mejor el problema, evitar manipulaciones
                peligrosas y solicitar un presupuesto con mas contexto.
              </p>
              <p>
                Publicamos contenidos a partir de semantica aprobada y consultas reales de
                usuarios. Por eso las guías separan diagnostico, mantenimiento, costes,
                prevencion y decisiones de contratacion. Esta arquitectura permite que el blog
                crezca sin competir con las paginas comerciales principales y que cada articulo
                refuerce la autoridad tematica de Reparar24 en servicios urgentes y mantenimiento
                tecnico para viviendas, locales y comunidades.
              </p>
            </div>
          </div>
        </section>
        <TrustCtaBlueV1 />
      </main>
      <Footer locale={locale} />
    </>
  )
}
