import { createClient } from '@/lib/supabase/server';
import { getAuthUser } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/api-utils';

/**
 * GET /api/availability/:providerId — View a provider's schedule (public).
 */
export async function GET(
    request: Request,
    { params }: { params: Promise<{ providerId: string }> }
) {
    const supabase = await createClient();
    const { providerId } = await params;

    // Auth check (any authenticated user can view)
    const { error: authError } = await getAuthUser(supabase);
    if (authError) return authError;

    const { data, error } = await supabase
        .from('availability')
        .select('*')
        .eq('provider_id', providerId)
        .order('day_of_week', { ascending: true });

    if (error) {
        return errorResponse(error.message, 500);
    }

    return successResponse(data);
}
