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
import { createNotification } from '@/lib/notifications';

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

    // 2. Fetch Current Status & Roles & Service Name
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

    const { status: newStatus, rejection_reason, proposed_alternate_date, proposed_alternate_time } = body;
    const currentStatus = currentRequest.status;
    const isProvider = user!.id === currentRequest.provider_id;
    const isCustomer = user!.id === currentRequest.customer_id;

    // 4. Validate State Transitions
    let isValidTransition = false;

    if (isProvider) {
        // Provider Transitions
        // requested -> pending (accepted) OR rejected
        if (currentStatus === 'requested' && newStatus === 'pending') isValidTransition = true;
        if (currentStatus === 'requested' && newStatus === 'rejected') isValidTransition = true;
        // pending -> confirmed
        if (currentStatus === 'pending' && newStatus === 'confirmed') isValidTransition = true;
        // confirmed -> in_progress
        if (currentStatus === 'confirmed' && newStatus === 'in_progress') isValidTransition = true;
        // pending -> in_progress (skip confirmed for quick jobs)
        if (currentStatus === 'pending' && newStatus === 'in_progress') isValidTransition = true;
        // in_progress -> completed
        if (currentStatus === 'in_progress' && newStatus === 'completed') isValidTransition = true;
        // requested/pending/confirmed -> rescheduled (propose alternate time)
        if (['requested', 'pending', 'confirmed'].includes(currentStatus) && newStatus === 'rescheduled') isValidTransition = true;
        // rescheduled -> confirmed (after customer accepts reschedule)
        if (currentStatus === 'rescheduled' && newStatus === 'confirmed') isValidTransition = true;
    } else if (isCustomer) {
        // Customer Transitions
        // requested -> cancelled
        if (currentStatus === 'requested' && newStatus === 'cancelled') isValidTransition = true;
        // pending -> cancelled (cancel after accepted but before work starts)
        if (currentStatus === 'pending' && newStatus === 'cancelled') isValidTransition = true;
        // confirmed -> cancelled
        if (currentStatus === 'confirmed' && newStatus === 'cancelled') isValidTransition = true;
        // rescheduled -> confirmed (customer accepts reschedule)
        if (currentStatus === 'rescheduled' && newStatus === 'confirmed') isValidTransition = true;
        // rescheduled -> cancelled (customer rejects reschedule)
        if (currentStatus === 'rescheduled' && newStatus === 'cancelled') isValidTransition = true;
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

    if (newStatus === 'rescheduled') {
        if (!proposed_alternate_date) return errorResponse('Proposed alternate date is required for rescheduling', 400);
        updateData.proposed_alternate_date = proposed_alternate_date;
        updateData.proposed_alternate_time = proposed_alternate_time || null;
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

    // 6. Send Notification
    // We notify the OTHER party.
    let notificationMessage = '';
    let recipientId = '';
    const serviceName = currentRequest.service ? (currentRequest.service as any).name : 'Service';

    if (isProvider) {
        recipientId = currentRequest.customer_id;
        if (newStatus === 'pending') {
            notificationMessage = `Your request for '${serviceName}' has been accepted!`;
        } else if (newStatus === 'rejected') {
            notificationMessage = `Your request for '${serviceName}' was declined. Reason: ${rejection_reason}`;
        } else if (newStatus === 'confirmed') {
            notificationMessage = `Your request for '${serviceName}' has been confirmed!`;
        } else if (newStatus === 'rescheduled') {
            notificationMessage = `Your request for '${serviceName}' has been rescheduled. Please check the new proposed time.`;
        } else if (newStatus === 'in_progress') {
            notificationMessage = `Work started on '${serviceName}'.`;
        } else if (newStatus === 'completed') {
            notificationMessage = `Work completed for '${serviceName}'. Please leave a review!`;
        }
    } else if (isCustomer) {
        recipientId = currentRequest.provider_id;
        if (newStatus === 'cancelled') {
            notificationMessage = `Request for '${serviceName}' was cancelled by the customer.`;
        } else if (newStatus === 'confirmed') {
            notificationMessage = `The customer accepted the rescheduled time for '${serviceName}'.`;
        }
    }

    if (recipientId && notificationMessage) {
        createNotification({
            userId: recipientId,
            type: 'status_update',
            title: 'Update on your Service Request',
            message: notificationMessage,
            relatedEntityId: id,
        });
    }

    // 7. Send status-update email to the other party (non-blocking)
    try {
        if (recipientId) {
            const { createAdminClient } = await import('@/lib/supabase/admin');
            const adminClient = createAdminClient();
            const { data: { user: recipientUser } } = await adminClient.auth.admin.getUserById(recipientId);

            if (recipientUser?.email) {
                const { data: recipientProfile } = await supabase
                    .from('profiles')
                    .select('first_name')
                    .eq('id', recipientId)
                    .single();

                const emailContent = statusUpdateEmail(
                    recipientProfile?.first_name || 'User',
                    serviceName,
                    newStatus
                );
                await sendEmail({ to: recipientUser.email, ...emailContent });
            }
        }
    } catch {
        // Email failure should not block the response
    }

    return successResponse(data);
}
