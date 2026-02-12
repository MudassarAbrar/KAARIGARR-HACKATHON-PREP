import { createClient } from '@/lib/supabase/server';
import { loginSchema } from '@/lib/validations/auth';
import {
    successResponse,
    errorResponse,
    validateBody,
    isErrorResponse,
} from '@/lib/api-utils';

export async function POST(request: Request) {
    const body = await validateBody(request, loginSchema);
    if (isErrorResponse(body)) return body;

    const { email, password } = body;
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return errorResponse(error.message, 401);
    }

    // Fetch the user's profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

    return successResponse({
        user: {
            id: data.user.id,
            email: data.user.email,
            role: profile?.role ?? 'customer',
        },
        profile,
        session: {
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
            expires_at: data.session.expires_at,
        },
    });
}
