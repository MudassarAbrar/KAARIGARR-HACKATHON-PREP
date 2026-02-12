import { createClient } from '@/lib/supabase/server';
import { getAuthUser } from '@/lib/auth';
import {
    successResponse,
    errorResponse,
} from '@/lib/api-utils';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const supabase = await createClient();
    const { user, error: authError } = await getAuthUser(supabase);
    if (authError) return authError;

    const { id } = await params;

    const { data, error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', id)
        .eq('user_id', user.id) // Ensure ownership
        .select()
        .single();

    if (error) {
        return errorResponse(error.message, 500);
    }

    return successResponse(data);
}
