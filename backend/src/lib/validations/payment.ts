import { z } from 'zod';

export const createPaymentIntentSchema = z.object({
    request_id: z.string().uuid(),
    amount: z.number().positive('Amount must be positive'),
    currency: z.string().length(3).default('pkr'),
});
