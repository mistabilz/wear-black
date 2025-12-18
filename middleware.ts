import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect old locale routes to non-locale routes
  if (pathname.startsWith('/en/') || pathname.startsWith('/fr/')) {
    const newPath = pathname.replace(/^\/(en|fr)/, '') || '/'
    return NextResponse.redirect(new URL(newPath, request.url))
  }

  // Redirect root locale paths
  if (pathname === '/en' || pathname === '/fr') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all pathnames except:
    // - api routes
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
}

