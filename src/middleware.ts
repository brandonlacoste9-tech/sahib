import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { rewriteLegacyPath } from './lib/legacy-path';

const intl = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const nextPath = rewriteLegacyPath(request.nextUrl.pathname);
  if (nextPath) {
    const url = request.nextUrl.clone();
    url.pathname = nextPath;
    return NextResponse.redirect(url, 308);
  }
  return intl(request);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
