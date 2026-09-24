import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { BookOpen, FileText, ShieldCheck } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Breadcrumbs, generateBreadcrumbSchema } from '@/components/navigation/Breadcrumbs'
import type { Locale } from '@/lib/i18n/config'
import { BLOG_ARTICLE_BRIEFS, BLOG_CATEGORIES, getBlogCategory } from '@/data/blog'
import { getBlogCategorySeo } from '@/data/blog/category-seo'
import TrustCtaBlueV1 from '@/components/ds/TrustCtaBlueV1'
import BlogSearch, { type BlogSearchArticle } from '@/components/blog/BlogSearch'
import { fitMetaDescription, fitSeoTitle } from '@/lib/seo/meta-length'

type BlogCategoryParams = Promise<{
  locale: Locale
  categorySlug: string
}>

const categoryMetaDescriptions: Record<string, string> = {
  fontaneria:
    'Guías de fontanería para entender fugas, cisternas, grifos, averías frecuentes y costes antes de llamar a un técnico.',
  electricidad:
    'Guías de electricidad para revisar diferencial, cortocircuitos, seguridad en vivienda, averías frecuentes y precios.',
  desatascos:
    'Guías de desatascos para distinguir atascos en tuberías, WC, arquetas, bajantes y cuándo pedir camión cuba.',
  climatizacion:
    'Guías de aire acondicionado sobre averías, mantenimiento, instalación de split, conductos y señales antes de llamar.',
  calefaccion:
    'Guías de calefacción para calderas, radiadores, presión del circuito, mantenimiento y seguridad en la vivienda.',
  saneamiento:
    'Guías de limpieza de tuberías para arquetas, bajantes, cámara CCTV, olores y mantenimiento en comunidades.',
}

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

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((category) => ({
    locale: 'es',
    categorySlug: category.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: BlogCategoryParams
}): Promise<Metadata> {
  const { categorySlug } = await params
  const category = getBlogCategory(categorySlug)

  if (!category) return {}
  const metaTitle = fitSeoTitle(`${category.title} | Reparar24`)
  const metaDescription = fitMetaDescription(categoryMetaDescriptions[category.slug] ?? category.description)

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical: `https://reparar24.es/blog/${category.slug}` },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `https://reparar24.es/blog/${category.slug}`,
      siteName: 'Reparar24',
      locale: 'es_ES',
      type: 'website',
      images: [
        {
          url: '/images/blog/blog-hero-reparar24.jpg',
          width: 1200,
          height: 630,
          alt: `Guías técnicas de ${category.title.toLowerCase()} en Reparar24`,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  }
}

export default async function BlogCategoryPage({
  params,
}: {
  params: BlogCategoryParams
}) {
  const { locale, categorySlug } = await params
  const category = getBlogCategory(categorySlug)

  if (!category) {
    notFound()
  }

  const categoryArticles = BLOG_ARTICLE_BRIEFS.filter((article) => article.categorySlug === category.slug)
  const publishedCount = categoryArticles.filter((article) => article.status === 'published').length
  const categorySeo = getBlogCategorySeo(category.slug)
  const breadcrumbItems = [
    { name: 'Inicio', url: '/' },
    { name: 'Guías', url: '/blog' },
    { name: category.title, url: `/blog/${category.slug}` },
  ]
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header locale={locale} />
      <Breadcrumbs items={breadcrumbItems} />
      <main>
        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pb-10 pt-3 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF1FF] px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-[#2563EB]">
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                Guías por servicio
              </span>
              <h1 className="mt-5 text-pretty text-5xl font-extrabold leading-[1.04] text-[#0F2D75] md:text-6xl">
                {category.title}
              </h1>
              <p className="mt-5 max-w-3xl text-xl leading-relaxed text-[#5B6B8C]">
                {category.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-[#F5F8FD] px-4 py-2 text-sm font-extrabold text-[#0F2D75]">
                  {categoryArticles.length} guías
                </span>
                <span className="rounded-full bg-[#F5F8FD] px-4 py-2 text-sm font-extrabold text-[#0F2D75]">
                  {publishedCount} publicadas
                </span>
                <span className="rounded-full bg-[#EAF7EF] px-4 py-2 text-sm font-extrabold text-[#137A3D]">
                  Sin canibalizar servicios
                </span>
              </div>
            </div>

            <aside className="overflow-hidden rounded-[28px] border border-[#DCE7F7] bg-[#F5F8FD] shadow-[0_28px_60px_-42px_rgba(15,45,117,0.45)]">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/images/blog/blog-hero-reparar24.jpg"
                  alt={`Tecnico de Reparar24 revisando guías de ${category.title.toLowerCase()}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="grid gap-3 p-5 sm:grid-cols-2">
                {[
                  { icon: FileText, label: 'Biblioteca práctica' },
                  { icon: ShieldCheck, label: 'Servicio conectado' },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="rounded-2xl bg-white p-4">
                      <Icon className="h-5 w-5 text-[#22A45D]" aria-hidden="true" />
                      <p className="mt-2 text-sm font-extrabold text-[#0F2D75]">
                        {item.label}
                      </p>
                    </div>
                  )
                })}
              </div>
            </aside>
          </div>
        </section>

        <BlogSearch
          articles={searchArticles}
          categories={BLOG_CATEGORIES}
          activeCategorySlug={category.slug}
        />
        {categorySeo ? (
          <section className="bg-[#F5F8FD] px-4 py-14 sm:px-6">
            <div className="mx-auto max-w-[980px] rounded-[28px] border border-[#DCE7F7] bg-white p-6 shadow-[0_26px_55px_-42px_rgba(15,45,117,0.45)] sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF1FF] px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-[#2563EB]">
                <FileText className="h-4 w-4" aria-hidden="true" />
                Biblioteca tecnica
              </span>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#0F2D75] sm:text-4xl">
                {categorySeo.heading}
              </h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-[#31415F]">
                {categorySeo.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {categorySeo.targetKeywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full bg-[#F5F8FD] px-3 py-1.5 text-xs font-extrabold text-[#5B6B8C]"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </section>
        ) : null}
        <TrustCtaBlueV1 />
      </main>
      <Footer locale={locale} />
    </>
  )
}
