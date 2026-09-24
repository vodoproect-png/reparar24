import { MetadataRoute } from 'next'
import { services } from '@/data/services'
import { cities } from '@/data/cities'
import { locales } from '@/lib/i18n/config'
import { getLocalizedServiceSlug, type ServiceId } from '@/lib/i18n/slugs'
import { PAGE_REGISTRY, getAllowedPageSlugs } from '@/data/seo/page-registry'
import { BLOG_CATEGORIES, getPublishedBlogArticles } from '@/data/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://reparar24.es'
  const sitemapEntries: MetadataRoute.Sitemap = []

  // Spanish-only sitemap. Legacy EN/RU URLs are redirect-only and never listed.
  const indexableLocales = locales.filter(locale => locale === 'es')

  indexableLocales.forEach((locale) => {
    // Spanish (es) uses root-level URLs without prefix.
    const localePrefix = locale === 'es' ? '' : `/${locale}`

    // Homepage
    sitemapEntries.push({
      url: `${baseUrl}${localePrefix}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    })

    // Contact page
    sitemapEntries.push({
      url: `${baseUrl}${localePrefix}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    })

    // Service pages - NOW USES LOCALIZED SLUGS
    services.forEach((service) => {
      const localizedSlug = getLocalizedServiceSlug(service.slug as ServiceId, locale)
      sitemapEntries.push({
        url: `${baseUrl}${localePrefix}/${localizedSlug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      })
    })

    // Child service pages - USES PAGE REGISTRY (production gate)
    // Only include services with allowed child pages in registry
    Object.keys(PAGE_REGISTRY).forEach((serviceId) => {
      const allowedChildSlugs = getAllowedPageSlugs(serviceId)
      
      // Get localized parent slug for the service
      const parentLocalizedSlug = getLocalizedServiceSlug(serviceId as ServiceId, locale)
      
      allowedChildSlugs.forEach((childSlug) => {
        sitemapEntries.push({
          url: `${baseUrl}${localePrefix}/${parentLocalizedSlug}/${childSlug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.85,
        })
      })
    })

    // City pages
    cities.forEach((city) => {
      sitemapEntries.push({
        url: `${baseUrl}${localePrefix}/servicios/${city.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    })

    // Blog articles - only deliberately published/indexable articles
    sitemapEntries.push({
      url: `${baseUrl}${localePrefix}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.65,
    })

    BLOG_CATEGORIES.forEach((category) => {
      sitemapEntries.push({
        url: `${baseUrl}${localePrefix}/blog/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.55,
      })
    })

    getPublishedBlogArticles().forEach((article) => {
      sitemapEntries.push({
        url: `${baseUrl}${localePrefix}/blog/${article.categorySlug}/${article.slug}`,
        lastModified: article.updatedAt
          ? new Date(article.updatedAt)
          : article.publishedAt
            ? new Date(article.publishedAt)
            : new Date(),
        changeFrequency: 'monthly',
        priority: 0.45,
      })
    })

    // Service + City pages - NOW USES LOCALIZED SLUGS
    services.forEach((service) => {
      cities.forEach((city) => {
        if (city.slug === 'valencia') {
          return
        }

        const localizedSlug = getLocalizedServiceSlug(service.slug as ServiceId, locale)
        sitemapEntries.push({
          url: `${baseUrl}${localePrefix}/${localizedSlug}/${city.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        })
      })
    })

    // Service + City + District pages - NOW USES LOCALIZED SLUGS
    services.forEach((service) => {
      cities.forEach((city) => {
        const localizedSlug = getLocalizedServiceSlug(service.slug as ServiceId, locale)
        city.districts.forEach((district) => {
          sitemapEntries.push({
            url: `${baseUrl}${localePrefix}/${localizedSlug}/${city.slug}/${district.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
          })
        })
      })
    })
  })

  return sitemapEntries
}
