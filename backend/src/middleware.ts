import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { rateLimiter } from '@/lib/ratelimit';

export async function middleware(request: NextRequest) {
    // 1. Rate Limiting
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : (request as any).ip || '127.0.0.1';
    const path = request.nextUrl.pathname;

    // Strict limit for Auth routes (100 req / 15 min) - Increased for Dev/Demo
    if (path.startsWith('/api/auth')) {
        const isAllowed = rateLimiter.check(ip + '_auth', 100, 15 * 60 * 1000);
        if (!isAllowed) {
            return new NextResponse(
                JSON.stringify({ success: false, error: 'Too many login attempts. Please try again later.' }),
                { status: 429, headers: { 'Content-Type': 'application/json' } }
            );
        }
    }

    // General limit for API routes (100 req / 1 min)
    if (path.startsWith('/api')) {
        const isAllowed = rateLimiter.check(ip + '_api', 100, 60 * 1000);
        if (!isAllowed) {
            return new NextResponse(
                JSON.stringify({ success: false, error: 'Too many requests. Please slow down.' }),
                { status: 429, headers: { 'Content-Type': 'application/json' } }
            );
        }
    }

    // 2. Auth Session Management
    return await updateSession(request);
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
