import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import { getRelatedBlogArticlesForPath } from '@/data/blog'

interface RelatedBlogArticlesProps {
  commercialPath: string
  title?: string
}

export default function RelatedBlogArticles({
  commercialPath,
  title = 'Guías relacionadas',
}: RelatedBlogArticlesProps) {
  const articles = getRelatedBlogArticlesForPath(commercialPath)

  if (!articles.length) return null

  return (
    <section className="bg-white px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF1FF] text-[#2563EB]">
            <BookOpen className="h-5 w-5" aria-hidden="true" />
          </span>
          <h2 className="text-2xl font-extrabold text-[#0F2D75] sm:text-3xl">{title}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={`${article.categorySlug}/${article.slug}`}
              href={`/blog/${article.categorySlug}/${article.slug}`}
              className="group rounded-[20px] border border-[#E4ECFA] bg-white p-6 shadow-[0_20px_45px_-30px_rgba(15,45,117,0.28)] transition hover:-translate-y-0.5 hover:border-[#2563EB]"
            >
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#2563EB]">
                {article.intent}
              </p>
              <h3 className="mt-3 text-xl font-extrabold leading-snug text-[#0F2D75]">
                {article.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-[#4A5B7D]">
                {article.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-base font-extrabold text-[#2563EB]">
                Leer guia
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
