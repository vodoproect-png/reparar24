import { MetadataRoute } from 'next'
import { PRODUCTION_URL } from '@/lib/config/environment'

/**
 * STRICT ENVIRONMENT-AWARE ROBOTS.TXT
 * 
 * CRITICAL: Absolute separation between production and preview.
 * 
 * Production (reparar24.es ONLY):
 * - Allow all Spanish content
 * - Disallow API and admin
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
  // robots.txt is generated at build time, so it must not depend on request-time
  // hostname detection. Preview domains are protected by middleware before this
  // route is reached; the production artifact should always expose crawlable
  // directives for reparar24.es.
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
        ],
      },
      {
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-SearchBot',
          'Claude-User',
          'PerplexityBot',
          'Perplexity-User',
          'Googlebot',
        ],
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
        ],
      },
    ],
    sitemap: `${PRODUCTION_URL}/sitemap.xml`,
  }
}
