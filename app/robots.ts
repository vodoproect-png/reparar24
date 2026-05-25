import { MetadataRoute } from 'next'
import { isProduction, PRODUCTION_URL } from '@/lib/config/environment'

/**
 * ENVIRONMENT-AWARE ROBOTS.TXT
 * 
 * Production (reparar24.es): 
 * - Allow all Spanish content
 * - Disallow EN/RU (rollback), API, admin
 * 
 * Preview (*.vercel.app):
 * - Disallow everything
 * - Prevents accidental indexing of staging environments
 */
export default function robots(): MetadataRoute.Robots {
  const isProd = isProduction()
  
  // PREVIEW/STAGING: Block everything
  if (!isProd) {
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
      // Sitemap still points to production (for reference)
      sitemap: `${PRODUCTION_URL}/sitemap.xml`,
    }
  }
  
  // PRODUCTION: Allow Spanish content, disallow EN/RU
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
    sitemap: `${PRODUCTION_URL}/sitemap.xml`,
  }
}
