import { createClient } from '@/lib/supabase/server';
import { getAuthUser } from '@/lib/auth';
import { getStripe } from '@/lib/stripe';
import { createPaymentIntentSchema } from '@/lib/validations/payment';
import {
    successResponse,
    errorResponse,
    validateBody,
    isErrorResponse,
} from '@/lib/api-utils';

/**
 * POST /api/payments/create-intent — Create a Stripe PaymentIntent for a service request.
 */
export async function POST(request: Request) {
    const supabase = await createClient();

    // 1. Auth
    const { error: authError, user, profile } = await getAuthUser(supabase);
    if (authError) return authError;

    // 2. Validate Body
    const body = await validateBody(request, createPaymentIntentSchema);
    if (isErrorResponse(body)) return body;

    const { request_id, amount, currency } = body;

    // 3. Verify the service request exists and belongs to this customer
    const { data: serviceRequest, error: reqError } = await supabase
        .from('service_requests')
        .select('*, service:services(name)')
        .eq('id', request_id)
        .single();

    if (reqError || !serviceRequest) {
        return errorResponse('Service request not found', 404);
    }

    if (serviceRequest.customer_id !== user!.id) {
        return errorResponse('Not authorized to pay for this request', 403);
    }

    // 4. Create Stripe PaymentIntent
    try {
        const paymentIntent = await getStripe().paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to paisa/cents
            currency: currency || 'pkr',
            metadata: {
                request_id,
                customer_id: user!.id,
                provider_id: serviceRequest.provider_id,
            },
        });

        // 5. Save payment record in DB
        const { data: payment, error: paymentError } = await supabase
            .from('payments')
            .insert({
                request_id,
                customer_id: user!.id,
                provider_id: serviceRequest.provider_id,
                amount,
                currency: currency || 'pkr',
                status: 'pending',
                stripe_payment_intent_id: paymentIntent.id,
            })
            .select()
            .single();

        if (paymentError) {
            return errorResponse(paymentError.message, 500);
        }

        return successResponse(
            {
                payment,
                client_secret: paymentIntent.client_secret,
            },
            201
        );
    } catch (err: any) {
        return errorResponse(err.message || 'Stripe error', 500);
    }
}
