"use client"

import Link from 'next/link'
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  ClipboardCheck,
  Search,
  ShieldAlert,
  SlidersHorizontal,
  Wrench,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { BlogCategory, BlogIntent } from '@/data/blog'
import BlogTechnicalCardVisual from './BlogTechnicalCardVisual'

export interface BlogSearchArticle {
  slug: string
  categorySlug: string
  title: string
  h1: string
  description: string
  intent: BlogIntent
  primaryKeyword: string
  secondaryKeywords: string[]
}

interface BlogSearchProps {
  articles: BlogSearchArticle[]
  categories: BlogCategory[]
  activeCategorySlug?: string
}

const intentMeta: Record<BlogIntent, { label: string; icon: LucideIcon }> = {
  diagnosis: { label: 'Diagnostico', icon: Search },
  maintenance: { label: 'Mantenimiento', icon: ClipboardCheck },
  cost: { label: 'Costes', icon: Banknote },
  safety: { label: 'Seguridad', icon: ShieldAlert },
  selection: { label: 'Decision', icon: SlidersHorizontal },
  prevention: { label: 'Prevencion', icon: CheckCircle2 },
}

export default function BlogSearch({
  articles,
  categories,
  activeCategorySlug,
}: BlogSearchProps) {
  const [query, setQuery] = useState('')
  const [categorySlug, setCategorySlug] = useState(activeCategorySlug ?? 'all')

  const categoryBySlug = useMemo(() => {
    return new Map(categories.map((category) => [category.slug, category]))
  }, [categories])

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return articles.filter((article) => {
      const matchesCategory = categorySlug === 'all' || article.categorySlug === categorySlug
      if (!matchesCategory) return false

      if (!normalizedQuery) return true

      const haystack = [
        article.title,
        article.h1,
        article.description,
        article.primaryKeyword,
        ...article.secondaryKeywords,
      ].join(' ').toLowerCase()

      return haystack.includes(normalizedQuery)
    })
  }, [articles, categorySlug, query])

  return (
    <section className="bg-[#F5F8FD] px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-extrabold uppercase tracking-wide text-[#2563EB] shadow-sm">
              <Search className="h-4 w-4" aria-hidden="true" />
              Biblioteca tecnica
            </span>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight text-[#0F2D75]">
              Encuentra la guia adecuada
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-[#5B6B8C]">
            Filtra por servicio o busca por averia. Cada guia esta conectada con una pagina
            comercial responsable para mantener claro el siguiente paso.
          </p>
        </div>

        <div className="rounded-[28px] border border-[#DCE7F7] bg-white p-4 shadow-[0_28px_70px_-44px_rgba(15,45,117,0.45)] sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
            <label className="relative block">
              <span className="sr-only">Buscar guias</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#5B6B8C]" aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por fuga, diferencial, caldera, atasco..."
                className="h-16 w-full rounded-2xl border border-[#DCE7F7] bg-[#F8FBFF] pl-12 pr-4 text-base font-semibold text-[#0F2D75] outline-none transition placeholder:text-[#8A98B4] focus:border-[#2563EB] focus:bg-white"
              />
            </label>
            <label className="block">
              <span className="sr-only">Filtrar por categoria</span>
              <select
                value={categorySlug}
                onChange={(event) => setCategorySlug(event.target.value)}
                className="h-16 w-full rounded-2xl border border-[#DCE7F7] bg-[#F8FBFF] px-4 text-base font-extrabold text-[#0F2D75] outline-none transition focus:border-[#2563EB] focus:bg-white"
              >
                <option value="all">Todas las categorias</option>
                {categories.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.title}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-5 flex flex-col gap-3 border-t border-[#E4ECFA] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-bold text-[#5B6B8C]">
              {filteredArticles.length} guias encontradas
            </p>
            {query || categorySlug !== (activeCategorySlug ?? 'all') ? (
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setCategorySlug(activeCategorySlug ?? 'all')
                }}
                className="w-fit text-sm font-extrabold text-[#2563EB]"
              >
                Limpiar filtros
              </button>
            ) : null}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredArticles.map((article) => {
              const category = categoryBySlug.get(article.categorySlug)
              const IntentIcon = intentMeta[article.intent].icon

              return (
                <Link
                  key={`${article.categorySlug}/${article.slug}`}
                  href={`/blog/${article.categorySlug}/${article.slug}`}
                  className="group flex min-h-[260px] overflow-hidden rounded-[22px] border border-[#E4ECFA] bg-white transition hover:-translate-y-0.5 hover:border-[#2563EB] hover:bg-[#F8FBFF] hover:shadow-[0_22px_45px_-34px_rgba(37,99,235,0.65)]"
                >
                  <BlogTechnicalCardVisual slug={article.slug} icon={IntentIcon} />

                  <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <span className="rounded-full bg-[#F5F8FD] px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-[#5B6B8C]">
                        {intentMeta[article.intent].label}
                      </span>
                    </div>

                    <p className="mt-4 text-xs font-extrabold uppercase tracking-wide text-[#2563EB]">
                      {category?.title ?? article.categorySlug}
                    </p>
                    <h3 className="mt-2 text-2xl font-extrabold leading-tight text-[#0F2D75]">
                      {article.title}
                    </h3>
                    <p className="mt-3 flex-1 text-base leading-relaxed text-[#5B6B8C]">
                      {article.description}
                    </p>

                    <div className="mt-5 rounded-2xl bg-[#F5F8FD] px-4 py-3">
                      <p className="line-clamp-2 text-sm font-bold leading-relaxed text-[#31415F]">
                        {article.primaryKeyword}
                      </p>
                    </div>

                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#2563EB]">
                      Leer guia
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>

          {!filteredArticles.length ? (
            <div className="mt-6 rounded-2xl bg-[#F5F8FD] p-8 text-center">
              <Wrench className="mx-auto h-8 w-8 text-[#2563EB]" aria-hidden="true" />
              <p className="mt-3 text-base font-bold text-[#0F2D75]">
                No hay guias con esos filtros todavia.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
