import { z } from 'zod';

export const createReviewSchema = z.object({
    request_id: z.string().uuid('Invalid request ID'),
    rating: z.number().int().min(1).max(5),
    comment: z.string().max(1000).optional(),
});
