import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase/admin';

/**
 * POST /api/webhooks/stripe — Handle Stripe webhook events.
 *
 * This endpoint verifies the Stripe signature and processes:
 *  - payment_intent.succeeded → Update payment status to 'succeeded'
 *  - payment_intent.payment_failed → Update payment status to 'failed'
 */
export async function POST(request: NextRequest) {
    const stripe = getStripe();
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
        return NextResponse.json(
            { error: 'Missing stripe-signature header' },
            { status: 400 }
        );
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        if (webhookSecret && webhookSecret !== 'whsec_PLACEHOLDER') {
            event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
        } else {
            // In development without a real webhook secret, parse the body directly
            event = JSON.parse(body);
            console.warn('[Stripe Webhook] No valid webhook secret — parsing event directly (DEV ONLY)');
        }
    } catch (err: any) {
        console.error('[Stripe Webhook] Signature verification failed:', err.message);
        return NextResponse.json(
            { error: 'Webhook signature verification failed' },
            { status: 400 }
        );
    }

    const supabase = createAdminClient();

    try {
        switch (event.type) {
            case 'payment_intent.succeeded': {
                const paymentIntent = event.data.object;
                const { error } = await supabase
                    .from('payments')
                    .update({
                        status: 'succeeded',
                        stripe_charge_id: paymentIntent.latest_charge || null,
                        updated_at: new Date().toISOString(),
                    })
                    .eq('stripe_payment_intent_id', paymentIntent.id);

                if (error) {
                    console.error('[Stripe Webhook] Failed to update payment:', error.message);
                } else {
                    console.log('[Stripe Webhook] Payment succeeded:', paymentIntent.id);
                }
                break;
            }

            case 'payment_intent.payment_failed': {
                const paymentIntent = event.data.object;
                const { error } = await supabase
                    .from('payments')
                    .update({
                        status: 'failed',
                        updated_at: new Date().toISOString(),
                    })
                    .eq('stripe_payment_intent_id', paymentIntent.id);

                if (error) {
                    console.error('[Stripe Webhook] Failed to update payment:', error.message);
                } else {
                    console.log('[Stripe Webhook] Payment failed:', paymentIntent.id);
                }
                break;
            }

            case 'charge.refunded': {
                const charge = event.data.object;
                const { error } = await supabase
                    .from('payments')
                    .update({
                        status: 'refunded',
                        updated_at: new Date().toISOString(),
                    })
                    .eq('stripe_charge_id', charge.id);

                if (error) {
                    console.error('[Stripe Webhook] Failed to update refund:', error.message);
                } else {
                    console.log('[Stripe Webhook] Charge refunded:', charge.id);
                }
                break;
            }

            default:
                console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
        }
    } catch (err: any) {
        console.error('[Stripe Webhook] Processing error:', err.message);
        return NextResponse.json(
            { error: 'Webhook processing error' },
            { status: 500 }
        );
    }

    return NextResponse.json({ received: true });
}
