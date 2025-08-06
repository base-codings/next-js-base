import { routing } from '@/i18n/routing'
import createMiddleware from 'next-intl/middleware'

import { type NextRequest, NextResponse } from 'next/server'

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl
  if (pathname.includes('/profile')) {
    if (!token) {
      return NextResponse.redirect(new URL(`/`, request.url))
    }
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: [
    '/',
    '/(de|en)/:path*',
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    // "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
