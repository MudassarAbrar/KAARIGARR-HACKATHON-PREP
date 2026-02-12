import { createClient } from '@/lib/supabase/server';
import { getAuthUser } from '@/lib/auth';
import {
    successResponse,
    errorResponse,
    validateBody,
    isErrorResponse,
} from '@/lib/api-utils';
import { z } from 'zod';

const ADMIN_ROLES = ['admin'] as const;

const createCategorySchema = z.object({
    name: z.string().min(2).max(100).trim(),
    slug: z.string().min(2).max(100).trim().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
    description: z.string().max(500).optional().nullable(),
    icon_url: z.string().url().optional().nullable(),
    is_active: z.boolean().optional(),
});

const updateCategorySchema = createCategorySchema.partial();

/**
 * POST /api/categories — Create a new service category (admin only).
 */
export async function POST(request: Request) {
    const supabase = await createClient();

    // 1. Auth & Admin Check
    const { error: authError, profile } = await getAuthUser(supabase);
    if (authError) return authError;

    if (!profile || !ADMIN_ROLES.includes(profile.role as any)) {
        return errorResponse('Admin access required', 403);
    }

    // 2. Validate Body
    const body = await validateBody(request, createCategorySchema);
    if (isErrorResponse(body)) return body;

    // 3. Create Category
    const { data, error } = await supabase
        .from('service_categories')
        .insert(body)
        .select()
        .single();

    if (error) {
        if (error.code === '23505') {
            return errorResponse('Category with this name or slug already exists', 409);
        }
        return errorResponse(error.message, 500);
    }

    return successResponse(data, 201);
}
