import { createClient } from '@/lib/supabase/server';
import { updatePasswordSchema } from '@/lib/validations/auth';
import {
    successResponse,
    errorResponse,
    validateBody,
    isErrorResponse,
} from '@/lib/api-utils';

export async function POST(request: Request) {
    const body = await validateBody(request, updatePasswordSchema);
    if (isErrorResponse(body)) return body;

    const { password } = body;
    const supabase = await createClient();

    // This only works when the user has a valid session
    // (e.g., from clicking the reset password link)
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
        return errorResponse(error.message, error.status ?? 400);
    }

    return successResponse({ message: 'Password updated successfully' });
}
