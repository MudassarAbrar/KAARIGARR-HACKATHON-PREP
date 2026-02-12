import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth';
import { createServiceSchema } from '@/lib/validations/service';
import {
    successResponse,
    errorResponse,
    validateBody,
    isErrorResponse,
} from '@/lib/api-utils';

export async function GET(request: Request) {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    const category_id = searchParams.get('category_id');
    const search = searchParams.get('search');
    const min_price = searchParams.get('min_price');
    const max_price = searchParams.get('max_price');
    const city = searchParams.get('city');
    const activeOnly = searchParams.get('active_only') !== 'false';
    const page = Math.max(1, Number(searchParams.get('page')) || 1);
    const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit')) || 20));
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
        .from('services')
        .select(`
      *,
      category:service_categories(*),
      provider:profiles(
        id, first_name, last_name, business_name, avatar_url,
        average_rating, total_reviews, city, is_verified,
        latitude, longitude, service_area
      )
    `)
        .order('created_at', { ascending: false })
        .range(from, to);

    if (activeOnly) {
        query = query.eq('is_active', true);
    }

    if (category_id) {
        query = query.eq('category_id', category_id);
    }

    if (min_price) {
        query = query.gte('base_price', Number(min_price));
    }

    if (max_price) {
        query = query.lte('base_price', Number(max_price));
    }

    if (search) {
        query = query.ilike('name', `%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
        return errorResponse(error.message, 500);
    }

    // Post-query filter: city (Supabase doesn't support filtering nested relations)
    let results = data || [];
    if (city) {
        results = results.filter((s: any) =>
            s.provider?.city?.toLowerCase().includes(city.toLowerCase())
        );
    }

    return successResponse(results);
}

export async function POST(request: Request) {
    const supabase = await createClient();

    // 1. Auth & Role Check
    const { error: authError, user, profile } = await requireRole(supabase, ['provider']);
    if (authError) return authError;

    // 2. Validate Body
    const body = await validateBody(request, createServiceSchema);
    if (isErrorResponse(body)) return body;

    const { name, category_id, description, base_price, price_unit } = body;

    // 3. Create Service
    const { data, error } = await supabase
        .from('services')
        .insert({
            provider_id: user!.id,
            category_id,
            name,
            description,
            base_price,
            price_unit: price_unit as 'per_hour' | 'per_job' | 'per_unit',
        })
        .select()
        .single();

    if (error) {
        return errorResponse(error.message, 400);
    }

    return successResponse(data, 201);
}
