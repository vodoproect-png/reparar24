import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Fragment } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  Phone,
  ShieldAlert,
  Sparkles,
} from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Breadcrumbs, generateBreadcrumbSchema } from '@/components/navigation/Breadcrumbs'
import type { Locale } from '@/lib/i18n/config'
import { BLOG_ARTICLE_BRIEFS, getBlogArticle, getBlogCategory } from '@/data/blog'
import { BLOG_AUTHOR, BLOG_PUBLISHER_ID, getBlogArticleEntities } from '@/data/blog/entities'
import { getDiagnosticScenario } from '@/data/diagnostics'
import DiagnosticWidget from '@/components/diagnostics/DiagnosticWidget'
import TrustCtaBlueV1 from '@/components/ds/TrustCtaBlueV1'
import { fitMetaDescription, fitSeoTitle } from '@/lib/seo/meta-length'

const formatSpanishDate = (date: string) =>
  new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))

type BlogArticleParams = Promise<{
  locale: Locale
  categorySlug: string
  articleSlug: string
}>

export function generateStaticParams() {
  return BLOG_ARTICLE_BRIEFS.filter(
    (article) => article.status === 'published' && article.indexing === 'index'
  ).map((article) => ({
    locale: 'es',
    categorySlug: article.categorySlug,
    articleSlug: article.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: BlogArticleParams
}): Promise<Metadata> {
  const { categorySlug, articleSlug } = await params
  const article = getBlogArticle(categorySlug, articleSlug)

  if (!article || article.status !== 'published' || article.indexing !== 'index') return {}

  const shouldIndex = article.status === 'published' && article.indexing === 'index'
  const publishedTime = article.publishedAt
    ? new Date(article.publishedAt).toISOString()
    : undefined
  const modifiedTime = (article.updatedAt ?? article.publishedAt)
    ? new Date(article.updatedAt ?? article.publishedAt ?? '').toISOString()
    : undefined
  const metaTitle = fitSeoTitle(article.h1)
  const metaDescription = fitMetaDescription(article.description)

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: `https://reparar24.es/blog/${categorySlug}/${articleSlug}`,
    },
    robots: {
      index: shouldIndex,
      follow: true,
      googleBot: { index: shouldIndex, follow: true },
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `https://reparar24.es/blog/${categorySlug}/${articleSlug}`,
      siteName: 'Reparar24',
      locale: 'es_ES',
      type: 'article',
      images: ['/images/blog/blog-hero-reparar24.jpg'],
      publishedTime,
      modifiedTime,
    },
  }
}

export default async function BlogArticlePage({
  params,
}: {
  params: BlogArticleParams
}) {
  const { locale, categorySlug, articleSlug } = await params
  const article = getBlogArticle(categorySlug, articleSlug)
  const category = getBlogCategory(categorySlug)

  if (!article || !category || article.status !== 'published' || article.indexing !== 'index') {
    notFound()
  }

  const breadcrumbItems = [
    { name: 'Inicio', url: '/' },
    { name: 'Guías', url: '/blog' },
    { name: category.title, url: `/blog/${category.slug}` },
    { name: article.title, url: `/blog/${category.slug}/${article.slug}` },
  ]
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems)
  const showUpdatedAt = Boolean(
    article.publishedAt &&
      article.updatedAt &&
      article.updatedAt !== article.publishedAt
  )
  const articleEntities = getBlogArticleEntities(article, category)
  const diagnosticScenario = getDiagnosticScenario(article.diagnosticScenarioId)
  const showDiagnosticAfterHero =
    Boolean(diagnosticScenario) && article.diagnosticPlacement === 'after-hero'
  const showDiagnosticAfterHeading =
    Boolean(diagnosticScenario) && article.diagnosticPlacement === 'after-heading'
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `https://reparar24.es/blog/${category.slug}/${article.slug}#article`,
    headline: article.h1,
    description: article.description,
    mainEntityOfPage: `https://reparar24.es/blog/${category.slug}/${article.slug}`,
    inLanguage: 'es-ES',
    author: {
      '@type': 'Organization',
      '@id': BLOG_AUTHOR.id,
      name: BLOG_AUTHOR.name,
      url: BLOG_AUTHOR.url,
      description: BLOG_AUTHOR.description,
    },
    publisher: {
      '@type': 'Organization',
      '@id': BLOG_PUBLISHER_ID,
      name: 'Reparar24',
      url: 'https://reparar24.es',
    },
    ...(article.publishedAt ? { datePublished: article.publishedAt } : {}),
    dateModified: article.updatedAt ?? article.publishedAt ?? new Date().toISOString().slice(0, 10),
    image: 'https://reparar24.es/images/blog/blog-hero-reparar24.jpg',
    about: articleEntities.about,
    mentions: articleEntities.mentions,
  }
  const faqSchema = article.faq?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: article.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}
      <Header locale={locale} />
      <Breadcrumbs items={breadcrumbItems} />
      <main>
        <article>
          <section className="bg-white">
            <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pb-10 pt-3 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF1FF] px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-[#2563EB]">
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  Guía Reparar24
                </span>
                <h1 className="mt-5 text-pretty text-5xl font-extrabold leading-[1.04] text-[#0F2D75] md:text-6xl">
                  {article.h1}
                </h1>
                <p className="mt-5 max-w-3xl text-xl leading-relaxed text-[#5B6B8C]">
                  {article.description}
                </p>
                {article.publishedAt ? (
                  <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold text-[#5B6B8C]">
                    <span>Publicado: {formatSpanishDate(article.publishedAt)}</span>
                    {showUpdatedAt ? (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>Actualizado: {formatSpanishDate(article.updatedAt!)}</span>
                      </>
                    ) : null}
                  </div>
                ) : null}
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="rounded-full bg-[#F5F8FD] px-4 py-2 text-sm font-extrabold text-[#0F2D75]">
                    {category.title}
                  </span>
                  <span className="rounded-full bg-[#F5F8FD] px-4 py-2 text-sm font-extrabold text-[#0F2D75]">
                    {article.intent}
                  </span>
                  <span className="rounded-full bg-[#EAF7EF] px-4 py-2 text-sm font-extrabold text-[#137A3D]">
                    Originalidad verificada
                  </span>
                </div>
              </div>

              <aside className="overflow-hidden rounded-[28px] border border-[#DCE7F7] bg-[#F5F8FD] shadow-[0_28px_60px_-42px_rgba(15,45,117,0.45)]">
                <div className="relative aspect-[16/10]">
                  <Image
                    src="/images/blog/blog-hero-reparar24.jpg"
                    alt="Tecnico de Reparar24 con tablet junto a furgoneta de servicio para guías tecnicas"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="grid gap-3 p-5 sm:grid-cols-2">
                  {['Respuesta práctica', 'Servicio conectado'].map((label) => (
                    <div key={label} className="rounded-2xl bg-white p-4">
                      <CheckCircle2 className="h-5 w-5 text-[#22A45D]" aria-hidden="true" />
                      <p className="mt-2 text-sm font-extrabold text-[#0F2D75]">{label}</p>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </section>

          <section className="bg-[#F5F8FD] px-4 py-14 sm:px-6">
            {showDiagnosticAfterHero && diagnosticScenario ? (
              <div className="mx-auto mb-8 max-w-[1280px]">
                <DiagnosticWidget scenario={diagnosticScenario} />
              </div>
            ) : null}

            <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[0.68fr_0.32fr]">
              <div className="space-y-8">
                <section className="overflow-hidden rounded-[28px] border border-[#BFD2F5] bg-white shadow-[0_24px_55px_-36px_rgba(37,99,235,0.6)]">
                  <div className="border-b border-[#E4ECFA] bg-[#0F2D75] px-6 py-5 text-white sm:px-8">
                    <span className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide">
                      <Sparkles className="h-4 w-4" aria-hidden="true" />
                      Respuesta práctica resumida
                    </span>
                  </div>
                  <div className="p-6 sm:p-8">
                    <p className="text-2xl font-extrabold leading-relaxed text-[#0F2D75]">
                      {article.llmAnswer}
                    </p>
                  </div>
                </section>

                <section className="rounded-[28px] border border-[#DCE7F7] bg-white p-6 sm:p-8">
                  <h2 className="text-3xl font-extrabold text-[#0F2D75]">En esta guia</h2>
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {article.outline.map((item, index) => (
                      <div key={item} className="rounded-2xl border border-[#E4ECFA] bg-[#FBFDFF] p-5">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF1FF] text-sm font-extrabold text-[#2563EB]">
                          {index + 1}
                        </span>
                        <h3 className="mt-3 text-lg font-extrabold text-[#0F2D75]">{item}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-[#5B6B8C]">
                          Punto clave para entender el problema y decidir el siguiente paso.
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-[28px] border border-orange-200 bg-orange-50 p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-orange-600">
                      <AlertTriangle className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="text-2xl font-extrabold text-[#0F2D75]">Evita esto</h2>
                      <p className="mt-2 text-base leading-relaxed text-[#5B6B8C]">
                        No conviertas una comprobación doméstica en una reparación improvisada. Si hay
                        agua activa, olor a quemado, rebose o riesgo para la vivienda, corta la maniobra
                        y llama a un tecnico.
                      </p>
                    </div>
                  </div>
                </section>

                <div className="space-y-6">
                  {article.bodySections?.map((section, index) => (
                    <Fragment key={section.heading}>
                      <section className="grid gap-5 rounded-[28px] border border-[#DCE7F7] bg-white p-6 sm:p-8 md:grid-cols-[72px_1fr]">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF1FF] text-xl font-extrabold text-[#2563EB]">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <div>
                          <h2 className="text-3xl font-extrabold leading-tight text-[#0F2D75]">
                            {section.heading}
                          </h2>
                          <div className="mt-5 space-y-4 text-lg leading-relaxed text-[#31415F]">
                            {section.paragraphs.map((paragraph) => (
                              <p key={paragraph}>{paragraph}</p>
                            ))}
                          </div>
                        </div>
                      </section>
                      {showDiagnosticAfterHeading &&
                      diagnosticScenario &&
                      section.heading === article.diagnosticPlacementAfterHeading ? (
                        <DiagnosticWidget scenario={diagnosticScenario} />
                      ) : null}
                    </Fragment>
                  ))}
                </div>

                <section className="rounded-[28px] border border-[#DCE7F7] bg-white p-6 sm:p-8">
                  <h2 className="text-3xl font-extrabold text-[#0F2D75]">
                    Cuando conviene llamar a Reparar24
                  </h2>
                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {['No puedes aislar la causa', 'El problema vuelve a repetirse', 'Hay riesgo de dano mayor'].map((item) => (
                      <div key={item} className="rounded-2xl bg-[#F5F8FD] p-5">
                        <CheckCircle2 className="h-6 w-6 text-[#22A45D]" aria-hidden="true" />
                        <p className="mt-3 text-base font-extrabold leading-snug text-[#0F2D75]">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {article.faq?.length ? (
                  <section className="rounded-[28px] border border-[#BFD2F5] bg-white p-6 sm:p-8">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#EAF1FF] px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-[#2563EB]">
                      <FileText className="h-4 w-4" aria-hidden="true" />
                      FAQ
                    </span>
                    <h2 className="mt-4 text-3xl font-extrabold text-[#0F2D75]">
                      Preguntas frecuentes
                    </h2>
                    <div className="mt-6 space-y-4">
                      {article.faq.map((item) => (
                        <div key={item.question} className="rounded-2xl border border-[#E4ECFA] bg-[#F8FBFF] p-5">
                          <h3 className="text-lg font-extrabold text-[#0F2D75]">
                            {item.question}
                          </h3>
                          <p className="mt-2 text-base leading-relaxed text-[#5B6B8C]">
                            {item.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null}
              </div>

              <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
                <section className="rounded-[24px] border border-[#DCE7F7] bg-white p-6 shadow-[0_20px_45px_-34px_rgba(15,45,117,0.35)]">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF4E8] text-orange-600">
                    <ShieldAlert className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 text-2xl font-extrabold text-[#0F2D75]">Si es urgente, no esperes</h2>
                  <p className="mt-3 text-base leading-relaxed text-[#5B6B8C]">
                    Si hay fuga activa, olor a quemado, rebose, falta total de servicio o riesgo
                    para la vivienda, contacta con un tecnico.
                  </p>
                  <a
                    href="tel:+34642310813"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-4 text-base font-extrabold text-white transition hover:bg-orange-600"
                  >
                    <Phone className="h-5 w-5" aria-hidden="true" />
                    642 310 813
                  </a>
                </section>

                <section className="rounded-[24px] border border-[#DCE7F7] bg-white p-6">
                  <h2 className="text-2xl font-extrabold text-[#0F2D75]">Servicio relacionado</h2>
                  <p className="mt-3 text-base leading-relaxed text-[#5B6B8C]">
                    Esta guia apoya una pagina comercial concreta y no sustituye el diagnostico
                    de un tecnico.
                  </p>
                  <Link
                    href={article.commercialOwner}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-4 text-base font-extrabold text-white transition hover:bg-[#1D4FD7]"
                  >
                    Ver servicio
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Link>
                </section>

                <section className="rounded-[24px] border border-[#DCE7F7] bg-white p-6">
                  <h2 className="text-xl font-extrabold text-[#0F2D75]">Consultas relacionadas</h2>
                  <ul className="mt-4 space-y-3">
                    {[article.primaryKeyword, ...article.secondaryKeywords].slice(0, 5).map((keyword) => (
                      <li key={keyword} className="rounded-2xl bg-[#F5F8FD] px-4 py-3 text-sm font-bold text-[#31415F]">
                        {keyword}
                      </li>
                    ))}
                  </ul>
                </section>
              </aside>
            </div>
          </section>
        </article>
        <TrustCtaBlueV1 />
      </main>
      <Footer locale={locale} />
    </>
  )
}
