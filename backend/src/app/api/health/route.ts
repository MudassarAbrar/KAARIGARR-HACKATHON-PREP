import { createClient } from '@/lib/supabase/server';
import { env } from '@/lib/env';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const supabase = await createClient();

        // Verify Supabase connection by calling RPC
        const { data, error } = await supabase.rpc('now' as never);

        const isConnectionError =
            error &&
            !error.message?.includes('Could not find') &&
            !error.message?.includes('function') &&
            error.code !== 'PGRST202';

        return NextResponse.json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            environment: env.NODE_ENV,
            supabase: {
                connected: !isConnectionError,
                url: env.NEXT_PUBLIC_SUPABASE_URL ? 'configured' : 'missing',
                ...(data ? { serverTime: data } : {}),
            },
            services: {
                stripe: env.STRIPE_SECRET_KEY ? 'configured' : 'missing',
                resend: env.RESEND_API_KEY ? 'configured' : 'missing',
            },
        });
    } catch (err) {
        return NextResponse.json(
            {
                status: 'error',
                timestamp: new Date().toISOString(),
                message: err instanceof Error ? err.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
