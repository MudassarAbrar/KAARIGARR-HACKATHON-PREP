import { createClient } from '@/lib/supabase/server';
import { successResponse, errorResponse } from '@/lib/api-utils';

/**
 * GET /api/providers — Search/browse service providers.
 * Query params: city, search (name), verified, lat, lng, radius (km)
 */
export async function GET(request: Request) {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    const city = searchParams.get('city');
    const search = searchParams.get('search');
    const verified = searchParams.get('verified');
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const radius = searchParams.get('radius'); // in km

    // If lat/lng/radius provided, use Haversine RPC
    if (lat && lng && radius) {
        const { data, error } = await supabase.rpc('search_providers_by_location', {
            user_lat: parseFloat(lat),
            user_lng: parseFloat(lng),
            radius_km: parseFloat(radius),
        });

        if (error) {
            return errorResponse(error.message, 500);
        }

        return successResponse(data);
    }

    // Standard query
    let query = supabase
        .from('profiles')
        .select(`
            id, first_name, last_name, business_name, avatar_url,
            bio, city, service_area, latitude, longitude,
            average_rating, total_reviews, is_verified, phone
        `)
        .eq('role', 'provider')
        .eq('status', 'active')
        .order('average_rating', { ascending: false });

    if (city) {
        query = query.ilike('city', `%${city}%`);
    }

    if (search) {
        query = query.or(
            `business_name.ilike.%${search}%,first_name.ilike.%${search}%,last_name.ilike.%${search}%`
        );
    }

    if (verified === 'true') {
        query = query.eq('is_verified', true);
    }

    const { data, error } = await query;

    if (error) {
        return errorResponse(error.message, 500);
    }

    return successResponse(data);
}
