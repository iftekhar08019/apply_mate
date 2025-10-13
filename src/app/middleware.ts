import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow NextAuth API routes to pass through without authentication check
  // This is critical for OAuth callbacks to work
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Redirect to login if not authenticated
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    // Preserve the original URL as callbackUrl
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Protect dashboard routes but NOT /api/auth routes
  matcher: [
    '/dashboard/:path*',
    // Add other protected routes here if needed
  ],
};
