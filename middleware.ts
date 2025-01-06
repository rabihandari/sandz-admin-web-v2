import { NextRequest, NextResponse } from 'next/server';

const unrestrictedPages = [
  "/privacypolicy"
]

export default async function middleware(request: NextRequest) {
  const session = request.cookies.get('session');

  const isOnAuth = request.nextUrl.pathname.startsWith('/login');

  if (!session) {
    if (!isRestricted(request)) {
      return NextResponse.next();
    }

    if (isOnAuth) return NextResponse.next();
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isOnAuth) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

function isRestricted(request: NextRequest): Boolean {
  for (const unrestrictedPage of unrestrictedPages) {
    if (request.nextUrl.pathname.startsWith(unrestrictedPage)) {
      return false; 
    }
  }
  return true
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
