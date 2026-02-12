import { createClient } from '@/lib/supabase/server';
import { resetPasswordSchema } from '@/lib/validations/auth';
import {
    successResponse,
    errorResponse,
    validateBody,
    isErrorResponse,
} from '@/lib/api-utils';
import { env } from '@/lib/env';

export async function POST(request: Request) {
    const body = await validateBody(request, resetPasswordSchema);
    if (isErrorResponse(body)) return body;

    const { email } = body;
    const supabase = await createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${env.FRONTEND_URL}/auth/update-password`,
    });

    if (error) {
        return errorResponse(error.message, 400);
    }

    // Always return success to prevent email enumeration
    return successResponse({
        message: 'If an account exists with that email, a reset link has been sent',
    });
}
