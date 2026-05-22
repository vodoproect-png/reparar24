import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * SPANISH-ONLY PRODUCTION MIDDLEWARE
 * 
 * Strategic Decision: Reparar24 is Spanish-only until Spanish SEO architecture is complete.
 * 
 * Routing Rules:
 * 1. Spanish uses root-level URLs: /, /fontanero, /fontanero/madrid, etc.
 * 2. /es/* redirects 301 to /* (canonical enforcement)
 * 3. /en/* redirects 301 to Spanish equivalent (rollback)
 * 4. /ru/* redirects 301 to Spanish equivalent (rollback)
 * 
 * Multilingual implementation postponed. EN/RU pages are incomplete.
 */
export function middleware(request: NextRequest) {
  const { pathname } =request.nextUrl

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

  // === SPANISH CONTENT SERVING ===
  
  // For root-level paths: Rewrite internally to /es/* 
  // (User sees /, app router serves from /es/)
  if (
    pathname === '/' ||
    (!pathname.startsWith('/_next/') &&
     !pathname.startsWith('/api/') &&
     !pathname.match(/\.(ico|png|jpg|jpeg|gif|webp|svg)$/))
  ) {
    // Rewrite to /es/* internally
    const url = request.nextUrl.clone()
    url.pathname = `/es${pathname === '/' ? '' : pathname}`
    return NextResponse.rewrite(url)
  }

  // All other routes pass through
  return NextResponse.next()
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
