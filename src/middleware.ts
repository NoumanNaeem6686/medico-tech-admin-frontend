import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const loginToken = request.cookies.get('login');
  console.log("🚀 ~ middleware ~ loginToken:", loginToken)
  const protectedRoutes = ['/auth/signin', '/'];
  const nonProtected = ['/auth/signin'];

  if (!protectedRoutes.includes(path) && !loginToken) {
    return NextResponse.redirect(new URL('/auth/signin', request.nextUrl));
  }
  if (nonProtected.includes(path) && loginToken) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
}

export const config = {
  matcher: [
    '/all-blogs',
    '/customer-history',
    '/psychics-table',
    '/add-psychics',
    '/product',
    '/packages',
    '/profile',
    '/settings',
    '/auth/signup',
    '/free-minutes'
  ]
};
