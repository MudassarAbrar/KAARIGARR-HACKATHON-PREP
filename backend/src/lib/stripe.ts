import Stripe from 'stripe';

export const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, {
        typescript: true,
    })
    : null;

/**
 * Get the Stripe instance, throwing a clear error if it's not configured.
 * Use this in payment routes instead of importing `stripe` directly.
 */
export function getStripe(): Stripe {
    if (!stripe) {
        throw new Error(
            'Stripe is not configured. Set STRIPE_SECRET_KEY in your environment.'
        );
    }
    return stripe;
}
