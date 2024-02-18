import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
  const session = request.cookies.get('session');

  const isOnAuth = request.nextUrl.pathname.startsWith('/login');

  if (!session) {
    if (isOnAuth) return NextResponse.next();
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isOnAuth) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
