import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware for canonical locale routing
 * 
 * Spanish (es) is the default locale and uses root-level URLs without prefix.
 * This middleware:
 * 1. REWRITES root-level URLs (/, /fontanero, etc.) to /es/* internally
 * 2. REDIRECTS explicit /es/* requests to /* with 301 to maintain canonical URLs
 * 
 * English (/en/*) and Russian (/ru/*) pass through unchanged.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect explicit /es to / (permanent 301) - prevents direct /es access
  if (pathname === '/es') {
    return NextResponse.redirect(new URL('/', request.url), { status: 301 })
  }

  // Redirect explicit /es/* to /* (permanent 301) - maintains canonical URLs
  if (pathname.startsWith('/es/')) {
    const newPath = pathname.replace('/es/', '/')
    return NextResponse.redirect(new URL(newPath, request.url), { status: 301 })
  }

  // For root-level paths that could be Spanish content:
  // Rewrite internally to /es/* so App Router can handle them
  // This makes / serve /es/ content, /fontanero serve /es/fontanero, etc.
  if (
    pathname === '/' ||
    (!pathname.startsWith('/en/') && 
     !pathname.startsWith('/ru/') &&
     !pathname.startsWith('/_next/') &&
     !pathname.startsWith('/api/') &&
     !pathname.match(/\.(ico|png|jpg|jpeg|gif|webp|svg)$/))
  ) {
    // Rewrite root-level URL to /es/* internally (user sees /, app sees /es/)
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
