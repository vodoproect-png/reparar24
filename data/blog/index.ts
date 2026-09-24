import { BLOG_ARTICLE_BRIEFS, BLOG_CATEGORIES } from './topics'
import type { BlogArticleBrief, BlogCategory, BlogIntent } from './types'

export { BLOG_ARTICLE_BRIEFS, BLOG_CATEGORIES }
export type { BlogArticleBrief, BlogCategory, BlogIntent }

export function getBlogCategory(categorySlug: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((category) => category.slug === categorySlug)
}

export function getBlogArticle(categorySlug: string, articleSlug: string): BlogArticleBrief | undefined {
  return BLOG_ARTICLE_BRIEFS.find(
    (article) => article.categorySlug === categorySlug && article.slug === articleSlug
  )
}

export function getPublishedBlogArticles(): BlogArticleBrief[] {
  return BLOG_ARTICLE_BRIEFS.filter(
    (article) => article.status === 'published' && article.indexing === 'index'
  )
}

export function getRelatedBlogArticlesForPath(path: string, limit = 3): BlogArticleBrief[] {
  return getPublishedBlogArticles()
    .filter(
      (article) =>
        article.commercialOwner === path || article.supportLinks?.includes(path)
    )
    .slice(0, limit)
}
