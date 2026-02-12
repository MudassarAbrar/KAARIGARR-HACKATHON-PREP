import { createClient } from '@/lib/supabase/server';
import { getAuthUser } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/api-utils';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ requestId: string }> }
) {
    const supabase = await createClient();
    const { requestId } = await params;

    // 1. Auth Check
    const { error: authError, user } = await getAuthUser(supabase);
    if (authError) return authError;

    // 2. Verify Involvement
    // Optimization: We can just query messages with an OR filter on participation
    // But strict verification via request look up is safer/cleaner.
    const { data: serviceRequest, error: requestError } = await supabase
        .from('service_requests')
        .select('customer_id, provider_id')
        .eq('id', requestId)
        .single();

    if (requestError || !serviceRequest) {
        return errorResponse('Service request not found', 404);
    }

    const isParticipant = (user!.id === serviceRequest.customer_id) || (user!.id === serviceRequest.provider_id);
    if (!isParticipant) {
        return errorResponse('Unauthorized to view this conversation', 403);
    }

    // 3. Fetch Messages
    const { data, error } = await supabase
        .from('messages')
        .select(`
            id,
            sender_id,
            receiver_id,
            content,
            created_at,
            is_read
        `)
        .eq('request_id', requestId)
        .order('created_at', { ascending: true });

    if (error) {
        return errorResponse(error.message, 500);
    }

    return successResponse(data);
}
