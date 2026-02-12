import { createClient } from '@/lib/supabase/server';
import { getAuthUser } from '@/lib/auth';
import { sendMessageSchema } from '@/lib/validations/chat';
import {
    successResponse,
    errorResponse,
    validateBody,
    isErrorResponse,
} from '@/lib/api-utils';

export async function POST(request: Request) {
    const supabase = await createClient();

    // 1. Auth Check
    const { error: authError, user } = await getAuthUser(supabase);
    if (authError) return authError;

    // 2. Validate Body
    const body = await validateBody(request, sendMessageSchema);
    if (isErrorResponse(body)) return body;

    const { request_id, content } = body;

    // 3. Verify Involvement & Determine Receiver
    const { data: serviceRequest, error: requestError } = await supabase
        .from('service_requests')
        .select('customer_id, provider_id, status')
        .eq('id', request_id)
        .single();

    if (requestError || !serviceRequest) {
        return errorResponse('Service request not found', 404);
    }

    // Check if user is part of this request
    const isCustomer = user!.id === serviceRequest.customer_id;
    const isProvider = user!.id === serviceRequest.provider_id;

    if (!isCustomer && !isProvider) {
        return errorResponse('Unauthorized to send message in this chat', 403);
    }

    // Determine receiver
    const receiver_id = isCustomer ? serviceRequest.provider_id : serviceRequest.customer_id;

    // 4. Send Message
    const { data, error } = await supabase
        .from('messages')
        .insert({
            request_id,
            sender_id: user!.id,
            receiver_id,
            content,
            is_read: false
        })
        .select()
        .single();

    if (error) {
        return errorResponse(error.message, 500);
    }

    return successResponse(data, 201);
}
