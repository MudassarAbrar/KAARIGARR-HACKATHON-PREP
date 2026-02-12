import { createClient } from '@/lib/supabase/server';
import {
    successResponse,
    errorResponse,
} from '@/lib/api-utils';

/**
 * GET /api/providers/[id] — Get full provider profile with services.
 */
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const supabase = await createClient();
    const { id } = await params;

    // 1. Fetch Provider Profile
    const { data: provider, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .eq('role', 'provider')
        .single();

    if (profileError || !provider) {
        return errorResponse('Provider not found', 404);
    }

    // 2. Fetch Provider's Services
    const { data: services } = await supabase
        .from('services')
        .select(`
            *,
            category:service_categories(name, slug)
        `)
        .eq('provider_id', id)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

    // 3. Fetch Provider's Reviews
    const { data: reviews } = await supabase
        .from('reviews')
        .select(`
            id, rating, comment, created_at,
            customer:profiles!reviews_customer_id_fkey(first_name, last_name, avatar_url)
        `)
        .eq('provider_id', id)
        .order('created_at', { ascending: false })
        .limit(10);

    // 4. Fetch Provider's Availability
    const { data: availability } = await supabase
        .from('availability')
        .select('*')
        .eq('provider_id', id)
        .order('day_of_week', { ascending: true });

    return successResponse({
        ...provider,
        services: services || [],
        reviews: reviews || [],
        availability: availability || [],
    });
}
