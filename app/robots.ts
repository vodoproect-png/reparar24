import { MetadataRoute } from 'next'
import { isProduction, PRODUCTION_URL } from '@/lib/config/environment'

/**
 * STRICT ENVIRONMENT-AWARE ROBOTS.TXT
 * 
 * CRITICAL: Absolute separation between production and preview.
 * 
 * Production (reparar24.es ONLY):
 * - Allow all Spanish content
 * - Disallow EN/RU (rollback), API, admin
 * - Include sitemap reference
 * 
 * Preview/Staging/Local (*.vercel.app, localhost):
 * - Disallow EVERYTHING with single directive
 * - NO sitemap
 * - NO additional rules
 * - NO allow directives
 * - MINIMAL output only
 */
export default function robots(): MetadataRoute.Robots {
  const isProd = isProduction()
  
  // ===== PREVIEW/STAGING/LOCAL: STRICT LOCKDOWN =====
  // Output ONLY: User-agent: * / Disallow: /
  if (!isProd) {
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
    }
  }
  
  // ===== PRODUCTION ONLY: FULL DIRECTIVES =====
  // This branch executes ONLY on reparar24.es
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
