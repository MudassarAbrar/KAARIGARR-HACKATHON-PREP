import { createClient } from '@/lib/supabase/server';
import { successResponse, errorResponse } from '@/lib/api-utils';

export async function GET(request: Request) {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('active_only') !== 'false'; // Default to true

    let query = supabase
        .from('service_categories')
        .select('*')
        .order('name');

    if (activeOnly) {
        query = query.eq('is_active', true);
    }

    const { data, error } = await query;

    if (error) {
        return errorResponse(error.message, 500);
    }

    return successResponse(data);
}
