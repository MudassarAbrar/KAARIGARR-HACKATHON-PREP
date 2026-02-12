import { createClient } from '@/lib/supabase/server';
import { successResponse, errorResponse } from '@/lib/api-utils';

export async function POST() {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
        return errorResponse(error.message, 500);
    }

    return successResponse({ message: 'Logged out successfully' });
}
