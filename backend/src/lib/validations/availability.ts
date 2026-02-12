import { z } from 'zod';

export const upsertAvailabilitySchema = z.object({
    day_of_week: z.number().int().min(0).max(6),
    start_time: z.string().regex(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format'),
    end_time: z.string().regex(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format'),
    is_available: z.boolean().optional().default(true),
}).refine((data) => data.start_time < data.end_time, {
    message: 'start_time must be before end_time',
    path: ['end_time'],
});

export const bulkAvailabilitySchema = z.object({
    schedule: z.array(upsertAvailabilitySchema).min(1).max(7),
});
