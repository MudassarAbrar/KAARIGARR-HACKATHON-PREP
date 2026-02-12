import { createClient } from '@/lib/supabase/server';
import { signupSchema } from '@/lib/validations/auth';
import {
    successResponse,
    errorResponse,
    validateBody,
    isErrorResponse,
} from '@/lib/api-utils';

export async function POST(request: Request) {
    const body = await validateBody(request, signupSchema);
    if (isErrorResponse(body)) return body;

    const { email, password, first_name, last_name, role } = body;
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                first_name,
                last_name,
                role,
            },
        },
    });

    if (error) {
        return errorResponse(error.message, error.status ?? 400);
    }

    // After signup, update the profile role if provider
    // (trigger creates profile with default 'customer' role)
    if (role === 'provider' && data.user) {
        const { error: profileError } = await supabase
            .from('profiles')
            .update({ role, first_name, last_name })
            .eq('id', data.user.id);

        if (profileError) {
            // Non-fatal — profile trigger should have created it
            console.warn('Profile update after signup failed:', profileError.message);
        }
    }

    return successResponse(
        {
            user: data.user
                ? {
                    id: data.user.id,
                    email: data.user.email,
                    role,
                }
                : null,
            message: data.user?.email_confirmed_at
                ? 'Account created successfully'
                : 'Check your email to confirm your account',
        },
        201
    );
}
