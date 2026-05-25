import { MetadataRoute } from 'next'
import { services } from '@/data/services'
import { cities } from '@/data/cities'
import { locales } from '@/lib/i18n/config'
import { getLocalizedServiceSlug, type ServiceId } from '@/lib/i18n/slugs'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://reparar24.es'
  const sitemapEntries: MetadataRoute.Sitemap = []

  // MULTILINGUAL INDEXATION FREEZE: Only Spanish ('es') in sitemap
  // /en/* and /ru/* pages contain broken Spanish content
  // Excluded from sitemap until proper translations exist
  const indexableLocales = locales.filter(locale => locale === 'es')

  indexableLocales.forEach((locale) => {
    // Spanish (es) uses root-level URLs without prefix
    // EN and RU keep their prefixes
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

    // Fontanero child service pages (specialized services)
    const fontaneroChildServices = [
      'reparacion-fugas',
      'desatascos',
      'instalaciones',
      'sustitucion-tuberias',
      'calentadores-termos',
      'mantenimiento'
    ]
    fontaneroChildServices.forEach((childSlug) => {
      sitemapEntries.push({
        url: `${baseUrl}${localePrefix}/fontanero/${childSlug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.85,
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

    // Service + City pages - NOW USES LOCALIZED SLUGS
    services.forEach((service) => {
      cities.forEach((city) => {
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
