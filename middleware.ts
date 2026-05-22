import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware for canonical locale routing
 * 
 * Spanish (es) is the default locale and uses root-level URLs without prefix
 * English (/en) and Russian (/ru) keep their prefixes
 * 
 * This middleware redirects any /es/* URLs to /* to maintain canonical Spanish URLs
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect /es to / (permanent 301)
  if (pathname === '/es') {
    return NextResponse.redirect(new URL('/', request.url), { status: 301 })
  }

  // Redirect /es/* to /* (permanent 301)
  if (pathname.startsWith('/es/')) {
    const newPath = pathname.replace('/es/', '/')
    return NextResponse.redirect(new URL(newPath, request.url), { status: 301 })
  }

  // Allow all other routes to proceed normally
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
