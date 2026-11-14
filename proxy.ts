import createMiddleware from 'next-intl/middleware'

import { routing } from '@/i18n/routing'

// Serves Ukrainian pages from unprefixed URLs (rewrites / to /uk internally)
// and redirects /uk/... to the unprefixed URL
export default createMiddleware(routing)

export const config = {
  // Skip API routes, Next/Vercel internals and files with an extension (images, sitemap.xml, …)
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
}
