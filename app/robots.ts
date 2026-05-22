import { MetadataRoute } from 'next'

/**
 * SPANISH-ONLY PRODUCTION ROBOTS.TXT
 * 
 * Reparar24 is Spanish-only. EN/RU routes redirect to Spanish but we disallow
 * them in robots.txt for clarity (though middleware 301s them anyway).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/en/',   // Multilingual rollback: English not indexable
          '/ru/',   // Multilingual rollback: Russian not indexable
        ],
      },
    ],
    sitemap: 'https://reparar24.es/sitemap.xml',
  }
}
