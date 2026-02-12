import { z } from 'zod';

export const createRequestSchema = z.object({
    service_id: z.string().uuid('Invalid service ID'),
    preferred_date: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
    preferred_time: z
        .string()
        .regex(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format')
        .optional(),
    description: z
        .string()
        .max(1000, 'Description must be at most 1000 characters')
        .optional(),
    location_address: z
        .string()
        .min(5, 'Address must be at least 5 characters')
        .max(255, 'Address must be at most 255 characters'),
    location_lat: z.number().min(-90).max(90).optional(),
    location_lng: z.number().min(-180).max(180).optional(),
});

export const updateRequestSchema = z.object({
    status: z.enum([
        'pending',
        'confirmed',
        'in_progress',
        'completed',
        'cancelled',
        'rescheduled',
        'rejected',
    ]),
    rejection_reason: z.string().optional(),
    proposed_alternate_date: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
        .optional(),
    proposed_alternate_time: z
        .string()
        .regex(/^\d{2}:\d{2}$/, 'Time must be in HH:MM format')
        .optional(),
});
