import { z } from 'zod';

export const sendMessageSchema = z.object({
    request_id: z.string().uuid('Invalid request ID'),
    content: z.string().min(1, 'Message cannot be empty').max(2000, 'Message too long'),
});
