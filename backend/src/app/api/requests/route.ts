import { createClient } from '@/lib/supabase/server';
import { requireRole, getAuthUser } from '@/lib/auth';
import { createRequestSchema } from '@/lib/validations/request';
import {
    successResponse,
    errorResponse,
    validateBody,
    isErrorResponse,
} from '@/lib/api-utils';
import { sendEmail, newRequestEmail } from '@/lib/email';
import { createNotification } from '@/lib/notifications';

export async function GET(request: Request) {
    const supabase = await createClient();
    const { user, error: authError } = await getAuthUser(supabase);

    if (authError) return authError;

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = Math.max(1, Number(searchParams.get('page')) || 1);
    const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit')) || 20));
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // RLS ensures users only see their own requests (as customer or provider)
    let query = supabase
        .from('service_requests')
        .select(`
      *,
      service:services(id, name, base_price, price_unit),
      customer:profiles!service_requests_customer_id_fkey(id, first_name, last_name, avatar_url),
      provider:profiles!service_requests_provider_id_fkey(id, first_name, last_name, avatar_url, business_name)
    `)
        .order('created_at', { ascending: false })
        .range(from, to);

    if (status) {
        query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
        return errorResponse(error.message, 500);
    }

    return successResponse(data);
}

export async function POST(request: Request) {
    const supabase = await createClient();

    // 1. Auth & Role Check (Only customers can create requests)
    const { error: authError, user } = await requireRole(supabase, ['customer']);
    if (authError) return authError;

    // 2. Validate Body
    const body = await validateBody(request, createRequestSchema);
    if (isErrorResponse(body)) return body;

    const {
        service_id,
        preferred_date,
        preferred_time,
        description,
        location_address,
        location_lat,
        location_lng,
    } = body;

    // 3. Verify Service Exists & is Active
    const { data: service, error: serviceError } = await supabase
        .from('services')
        .select('id, provider_id, is_active, name')
        .eq('id', service_id)
        .single();

    if (serviceError || !service) {
        return errorResponse('Service not found', 404);
    }

    if (!service.is_active) {
        return errorResponse('This service is currently unavailable', 400);
    }

    // Prevent booking own service
    if (service.provider_id === user!.id) {
        return errorResponse('You cannot book your own service', 400);
    }

    // Fix #12: Validate provider availability for the requested day
    if (preferred_date) {
        const requestDate = new Date(preferred_date);
        const dayOfWeek = requestDate.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat

        const { data: availability } = await supabase
            .from('availability')
            .select('start_time, end_time, is_available')
            .eq('provider_id', service.provider_id)
            .eq('day_of_week', dayOfWeek);

        if (availability && availability.length > 0) {
            const isAvailable = availability.some((slot: any) => {
                if (!slot.is_available) return false;
                if (preferred_time) {
                    return preferred_time >= slot.start_time && preferred_time <= slot.end_time;
                }
                return true; // If no specific time, just check day availability
            });

            if (!isAvailable) {
                return errorResponse(
                    'Provider is not available at the requested date/time. Please choose a different time.',
                    400
                );
            }
        }
    }

    // 4. Create Request
    const { data, error } = await supabase
        .from('service_requests')
        .insert({
            customer_id: user!.id,
            provider_id: service.provider_id,
            service_id,
            preferred_date,
            preferred_time,
            description,
            location_address,
            location_lat, // Optional
            location_lng, // Optional
            status: 'requested',
        })
        .select()
        .single();

    if (error) {
        return errorResponse(error.message, 400);
    }

    // 5. Send email notification to provider (async, non-blocking)
    try {
        const { data: providerProfile } = await supabase
            .from('profiles')
            .select('first_name')
            .eq('id', service.provider_id)
            .single();

        // Fetch provider's email from auth.users via admin client
        const { createAdminClient } = await import('@/lib/supabase/admin');
        const adminClient = createAdminClient();
        const { data: { user: providerUser } } = await adminClient.auth.admin.getUserById(service.provider_id);

        if (providerUser?.email) {
            const emailContent = newRequestEmail(
                providerProfile?.first_name || 'Provider',
                service.name || 'Service',
                preferred_date
            );
            await sendEmail({
                to: providerUser.email,
                ...emailContent,
            });
        }
    } catch {
        // Email failure should not block the response
    }

    // Fix #11: Create in-app notification for provider
    createNotification({
        userId: service.provider_id,
        type: 'new_request',
        title: 'New Service Request',
        message: `You have a new request for "${service.name}" on ${preferred_date}`,
        relatedEntityId: data.id,
    });

    return successResponse(data, 201);
}

