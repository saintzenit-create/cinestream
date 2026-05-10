import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(
  request: NextRequest
) {

  const adminPassword =
    request.cookies.get(
      'admin-auth'
    )?.value;

  const isAdminPage =
    request.nextUrl.pathname.startsWith(
      '/admin'
    );

  const isLoginPage =
    request.nextUrl.pathname ===
    '/admin/login';

  if (
    isAdminPage &&
    !isLoginPage &&
    adminPassword !== 'clitoreadmin'
  ) {

    return NextResponse.redirect(
      new URL(
        '/admin/login',
        request.url
      )
    );

  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};