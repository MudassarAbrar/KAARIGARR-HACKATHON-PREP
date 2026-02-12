import { createClient } from '@/lib/supabase/server';
import { getAuthUser } from '@/lib/auth';
import { successResponse } from '@/lib/api-utils';

export async function GET() {
    const supabase = await createClient();
    const { error, user, profile } = await getAuthUser(supabase);

    if (error) return error;

    return successResponse({
        user: {
            id: user!.id,
            email: user!.email,
        },
        profile,
    });
}
