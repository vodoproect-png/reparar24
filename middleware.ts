import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, defaultLocale } from '@/lib/i18n/config'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hostname = request.headers.get('host') || ''
  
  // Anti-index protection for Vercel preview domains
  const isVercelDomain = hostname.includes('vercel.app')
  
  // Check if pathname starts with /es/ or is /es
  // These should 301 redirect to root-level Spanish URLs
  if (pathname.startsWith('/es/') || pathname === '/es') {
    const newPath = pathname === '/es' ? '/' : pathname.replace(/^\/es/, '')
    const url = request.nextUrl.clone()
    url.pathname = newPath
    
    const response = NextResponse.redirect(url, 301) // Permanent redirect
    
    if (isVercelDomain) {
      response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    }
    
    return response
  }
  
  // Check if pathname has /en/ or /ru/ prefix
  const hasNonSpanishLocale = pathname.startsWith('/en/') || pathname === '/en' ||
                                pathname.startsWith('/ru/') || pathname === '/ru'
  
  if (hasNonSpanishLocale) {
    // EN and RU URLs are fine - they keep their prefix
    const response = NextResponse.next()
    
    if (isVercelDomain) {
      response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    }
    
    return response
  }
  
  // For root-level paths (Spanish URLs without /es prefix)
  // Rewrite to /es/... internally so pages still work
  const url = request.nextUrl.clone()
  url.pathname = `/es${pathname}`
  
  const response = NextResponse.rewrite(url)
  
  if (isVercelDomain) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$|api).*)',
  ],
}
