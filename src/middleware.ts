import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const loginToken = request.cookies.get('login');
  const protectedRoutes = ['/'];
  const nonProtected = ['/auth/signin'];

  if (!protectedRoutes.includes(path) && !loginToken) {
    return NextResponse.redirect(new URL('/auth/signin', request.nextUrl));
  }
  if (nonProtected.includes(path) && loginToken) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  }
}

export const config = {
  matcher: [
    '/dashboard/contact',
    '/dashboard',
    '/dashboard/audit',
    '/dashboard/all-blogs',

  ]
};
