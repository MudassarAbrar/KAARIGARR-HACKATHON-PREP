import { createClient } from '@/lib/supabase/server';
import { getAuthUser } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/api-utils';

export async function GET(request: Request) {
    const supabase = await createClient();

    // 1. Auth & Admin Check (role-based)
    const { error: authError, profile } = await getAuthUser(supabase);
    if (authError) return authError;

    if (!profile || profile.role !== 'admin') {
        return errorResponse('Admin access required', 403);
    }

    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role'); // Filter by role
    const search = searchParams.get('search'); // Filter by name/email

    let query = supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

    if (role) {
        query = query.eq('role', role);
    }

    if (search) {
        // ILIKE search on first_name, last_name, or business_name
        query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,business_name.ilike.%${search}%`);
    }

    const page = Math.max(1, Number(searchParams.get('page')) || 1);
    const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit')) || 50));
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error } = await query;

    if (error) {
        return errorResponse(error.message, 500);
    }

    return successResponse(data);
}
