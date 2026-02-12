import { z } from 'zod';

export const createServiceSchema = z.object({
    name: z
        .string()
        .min(3, 'Name must be at least 3 characters')
        .max(100, 'Name must be at most 100 characters')
        .trim(),
    category_id: z.string().uuid('Invalid category ID'),
    description: z
        .string()
        .max(1000, 'Description must be at most 1000 characters')
        .optional(),
    base_price: z.number().min(0, 'Price must be non-negative'),
    price_unit: z.enum(['per_hour', 'per_job', 'per_unit'], {
        message: 'Invalid price unit. Must be per_hour, per_job, or per_unit',
    }),
});

export const updateServiceSchema = createServiceSchema.partial().extend({
    is_active: z.boolean().optional(),
});
