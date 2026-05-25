import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isProductionHostname } from '@/lib/config/environment'
import { getVercelPreviewPlaceholderHTML } from '@/app/vercel-preview-placeholder'

/**
 * SPANISH-ONLY PRODUCTION MIDDLEWARE + VERCEL PREVIEW LOCKDOWN
 * 
 * Strategic Decision: Reparar24 is Spanish-only until Spanish SEO architecture is complete.
 * 
 * Routing Rules:
 * 1. Spanish uses root-level URLs: /, /fontanero, /fontanero/madrid, etc.
 * 2. /es/* redirects 301 to /* (canonical enforcement)
 * 3. /en/* redirects 301 to Spanish equivalent (rollback)
 * 4. /ru/* redirects 301 to Spanish equivalent (rollback)
 * 
 * SEO Protection & Duplicate Content Prevention:
 * - Production (reparar24.es): FULLY INDEXABLE - Serves full application
 * - Preview (*.vercel.app): MINIMAL PLACEHOLDER ONLY - No production content
 * 
 * Preview domains serve a minimal placeholder page to prevent:
 * - Duplicate content issues
 * - Accidental indexing of preview URLs
 * - Confusion between production and preview
 * 
 * Multilingual implementation postponed. EN/RU pages are incomplete.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hostname = request.headers.get('host')
  const isProduction = isProductionHostname(hostname)

  // === VERCEL PREVIEW LOCKDOWN: Serve minimal placeholder ===
  // For ANY *.vercel.app domain, serve placeholder instead of production content
  // This prevents duplicate content and ensures only reparar24.es is indexed
  if (hostname && hostname.endsWith('.vercel.app')) {
    // Allow static assets and API routes to pass through
    if (
      pathname.startsWith('/_next/') ||
      pathname.startsWith('/api/') ||
      pathname.match(/\.(ico|png|jpg|jpeg|gif|webp|svg|css|js)$/)
    ) {
      const response = NextResponse.next()
      response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet')
      return response
    }

    // For all other requests on vercel.app: serve placeholder
    const placeholderHTML = getVercelPreviewPlaceholderHTML()
    return new NextResponse(placeholderHTML, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet',
        'Cache-Control': 'no-store, must-revalidate',
      },
    })
  }

  // === SPANISH CANONICAL ENFORCEMENT ===
  
  // Redirect /es to /
  if (pathname === '/es') {
    return NextResponse.redirect(new URL('/', request.url), { status: 301 })
  }

  // Redirect /es/* to /* (maintain canonical Spanish URLs)
  if (pathname.startsWith('/es/')) {
    const newPath = pathname.replace('/es/', '/')
    return NextResponse.redirect(new URL(newPath, request.url), { status: 301 })
  }

  // === MULTILINGUAL ROLLBACK: REDIRECT EN/RU TO SPANISH ===
  
  // Redirect /en to /
  if (pathname === '/en') {
    return NextResponse.redirect(new URL('/', request.url), { status: 301 })
  }

  // Redirect /en/* to Spanish equivalent
  if (pathname.startsWith('/en/')) {
    const spanishPath = pathname.replace('/en/', '/')
    return NextResponse.redirect(new URL(spanishPath, request.url), { status: 301 })
  }

  // Redirect /ru to /
  if (pathname === '/ru') {
    return NextResponse.redirect(new URL('/', request.url), { status: 301 })
  }

  // Redirect /ru/* to Spanish equivalent
  if (pathname.startsWith('/ru/')) {
    const spanishPath = pathname.replace('/ru/', '/')
    return NextResponse.redirect(new URL(spanishPath, request.url), { status: 301 })
  }

  // === EXCLUDE SEO & STATIC FILES FROM REWRITING ===
  
  // Let these pass through directly (do NOT rewrite to /es/*)
  if (
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt' ||
    pathname === '/manifest.webmanifest' ||
    pathname.startsWith('/icon') ||
    pathname.startsWith('/apple-icon') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/')
  ) {
    return NextResponse.next()
  }

  // === SPANISH CONTENT SERVING ===
  
  // For root-level paths: Rewrite internally to /es/* 
  // (User sees /, app router serves from /es/)
  if (
    pathname === '/' ||
    !pathname.match(/\.(ico|png|jpg|jpeg|gif|webp|svg)$/)
  ) {
    // Rewrite to /es/* internally
    const url = request.nextUrl.clone()
    url.pathname = `/es${pathname === '/' ? '' : pathname}`
    const response = NextResponse.rewrite(url)
    
    // === PREVIEW PROTECTION: Block indexing on non-production ===
    if (!isProduction) {
      response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet')
    }
    
    return response
  }

  // All other routes pass through
  const response = NextResponse.next()
  
  // === PREVIEW PROTECTION: Block indexing on non-production ===
  if (!isProduction) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet')
  }
  
  return response
}

/**
 * Configure which routes the middleware should run on
 * Exclude Next.js internal routes and static assets
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (*.svg, *.png, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
