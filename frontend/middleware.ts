import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected route patterns
const protectedRoutes = {
  customer: ['/dashboard'],
  provider: ['/provider'],
  admin: ['/admin'],
};

// Define public routes that should redirect authenticated users
const authRoutes = ['/auth'];

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('karigar_session');
  const { pathname } = request.nextUrl;

  // Parse session if exists
  let user = null;
  if (sessionCookie?.value) {
    try {
      user = JSON.parse(sessionCookie.value);
    } catch {
      // Invalid session cookie, treat as unauthenticated
      user = null;
    }
  }

  const isAuthenticated = !!user;

  // Check if trying to access auth routes while authenticated
  if (isAuthenticated && authRoutes.some(route => pathname.startsWith(route))) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    } else if (user.role === 'provider') {
      return NextResponse.redirect(new URL('/provider/dashboard', request.url));
    } else {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // Check customer protected routes
  if (pathname.startsWith('/dashboard') && !pathname.startsWith('/dashboard/')) {
    if (!isAuthenticated) {
      const url = new URL('/auth', request.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
  }

  // Check customer dashboard sub-routes
  if (pathname.startsWith('/dashboard/')) {
    if (!isAuthenticated) {
      const url = new URL('/auth', request.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
    // Ensure only customers can access customer dashboard
    if (user && user.role !== 'customer' && user.role !== 'admin') {
      return NextResponse.redirect(new URL('/provider/dashboard', request.url));
    }
  }

  // Check provider protected routes
  if (pathname.startsWith('/provider')) {
    if (!isAuthenticated) {
      const url = new URL('/auth', request.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
    // Ensure only providers can access provider routes
    if (user && user.role !== 'provider' && user.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // Check admin protected routes
  if (pathname.startsWith('/admin')) {
    if (!isAuthenticated) {
      const url = new URL('/auth', request.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
    // Ensure only admins can access admin routes
    if (user && user.role !== 'admin') {
      return NextResponse.redirect(
        new URL(user.role === 'provider' ? '/provider/dashboard' : '/dashboard', request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/provider/:path*',
    '/admin/:path*',
    '/auth',
  ],
};
