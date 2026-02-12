import { createClient } from '@/lib/supabase/server';
import { getAuthUser } from '@/lib/auth';
import {
    successResponse,
    errorResponse,
} from '@/lib/api-utils';

export async function GET() {
    const supabase = await createClient();
    const { user, error: authError } = await getAuthUser(supabase);

    if (authError) return authError;

    const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        return errorResponse(error.message, 500);
    }

    return successResponse(data);
}
