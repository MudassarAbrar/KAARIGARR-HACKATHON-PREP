import { createClient } from '@/lib/supabase/server';
import { getAuthUser } from '@/lib/auth';
import { updateRequestSchema } from '@/lib/validations/request';
import {
    successResponse,
    errorResponse,
    validateBody,
    isErrorResponse,
} from '@/lib/api-utils';
import { sendEmail, statusUpdateEmail } from '@/lib/email';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const supabase = await createClient();
    const { id } = await params;

    // 1. Auth Check
    const { error: authError } = await getAuthUser(supabase);
    if (authError) return authError;

    // 2. Fetch Request (RLS ensures only involved parties see it)
    const { data, error } = await supabase
        .from('service_requests')
        .select(`
      *,
      service:services(*),
      customer:profiles!service_requests_customer_id_fkey(*),
      provider:profiles!service_requests_provider_id_fkey(*)
    `)
        .eq('id', id)
        .single();

    if (error || !data) {
        return errorResponse('Request not found', 404);
    }

    return successResponse(data);
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const supabase = await createClient();
    const { id } = await params;

    // 1. Auth Check
    const { error: authError, user } = await getAuthUser(supabase);
    if (authError) return authError;

    // 2. Fetch Current Status & Roles
    const { data: currentRequest, error: fetchError } = await supabase
        .from('service_requests')
        .select('status, customer_id, provider_id, service:services(name)')
        .eq('id', id)
        .single();

    if (fetchError || !currentRequest) {
        return errorResponse('Request not found', 404);
    }

    // 3. Validate Body
    const body = await validateBody(request, updateRequestSchema);
    if (isErrorResponse(body)) return body;

    const { status: newStatus, rejection_reason } = body;
    const currentStatus = currentRequest.status;
    const isProvider = user!.id === currentRequest.provider_id;
    const isCustomer = user!.id === currentRequest.customer_id;

    // 4. Validate State Transitions
    let isValidTransition = false;
    let errorMsg = 'Invalid status transition';

    if (isProvider) {
        // Provider Transitions
        if (currentStatus === 'requested' && newStatus === 'pending') isValidTransition = true; // Accept
        if (currentStatus === 'requested' && newStatus === 'rejected') isValidTransition = true; // Reject
        if (currentStatus === 'pending' && newStatus === 'in_progress') isValidTransition = true; // Start
        if (currentStatus === 'in_progress' && newStatus === 'completed') isValidTransition = true; // Complete
        // Provider generally cannot cancel after accepting, but can reject initially
    } else if (isCustomer) {
        // Customer Transitions
        if (currentStatus === 'requested' && newStatus === 'cancelled') isValidTransition = true; // Cancel
        // Customer generally cannot progress to 'completed' etc.
    }

    if (!isValidTransition) {
        return errorResponse(
            `Invalid transition from '${currentStatus}' to '${newStatus}' for your role`,
            400
        );
    }

    // 5. Update Request
    const updateData: any = { status: newStatus };

    if (newStatus === 'rejected') {
        if (!rejection_reason) return errorResponse('Rejection reason is required', 400);
        updateData.rejection_reason = rejection_reason;
    }

    if (newStatus === 'completed') {
        updateData.completed_at = new Date().toISOString();
    }

    if (newStatus === 'cancelled') {
        updateData.cancelled_at = new Date().toISOString();
    }

    const { data, error } = await supabase
        .from('service_requests')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        return errorResponse(error.message, 400);
    }

    // 6. Send email notification to customer on status change (non-blocking)
    try {
        const { data: customerProfile } = await supabase
            .from('profiles')
            .select('first_name')
            .eq('id', currentRequest.customer_id)
            .single();

        const serviceName = (currentRequest as any).service?.name || 'Service';
        const emailContent = statusUpdateEmail(
            customerProfile?.first_name || 'Customer',
            serviceName,
            newStatus
        );
        // Note: Full email delivery requires customer email from auth system
    } catch {
        // Email failure should not block the response
    }

    return successResponse(data);
}
