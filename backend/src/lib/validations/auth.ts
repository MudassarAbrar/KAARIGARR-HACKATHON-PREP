import { z } from 'zod';

export const signupSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(72, 'Password must be at most 72 characters'),
    first_name: z
        .string()
        .min(1, 'First name is required')
        .max(50, 'First name must be at most 50 characters')
        .trim(),
    last_name: z
        .string()
        .min(1, 'Last name is required')
        .max(50, 'Last name must be at most 50 characters')
        .trim(),
    role: z.enum(['customer', 'provider']).default('customer'),
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

export const resetPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
});

export const updatePasswordSchema = z.object({
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(72, 'Password must be at most 72 characters'),
});
