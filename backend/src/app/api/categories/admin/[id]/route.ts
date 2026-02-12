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

const updateCategorySchema = z.object({
    name: z.string().min(2).max(100).trim().optional(),
    slug: z.string().min(2).max(100).trim().regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens').optional(),
    description: z.string().max(500).optional().nullable(),
    icon_url: z.string().url().optional().nullable(),
    is_active: z.boolean().optional(),
});

/**
 * PATCH /api/categories/admin/[id] — Update a service category (admin only).
 */
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const supabase = await createClient();
    const { id } = await params;

    // 1. Auth & Admin Check
    const { error: authError, profile } = await getAuthUser(supabase);
    if (authError) return authError;

    if (!profile || !ADMIN_ROLES.includes(profile.role as any)) {
        return errorResponse('Admin access required', 403);
    }

    // 2. Validate Body
    const body = await validateBody(request, updateCategorySchema);
    if (isErrorResponse(body)) return body;

    // 3. Update Category
    const { data, error } = await supabase
        .from('service_categories')
        .update(body)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        if (error.code === 'PGRST116') {
            return errorResponse('Category not found', 404);
        }
        return errorResponse(error.message, 500);
    }

    return successResponse(data);
}

/**
 * DELETE /api/categories/admin/[id] — Delete a service category (admin only).
 */
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const supabase = await createClient();
    const { id } = await params;

    // 1. Auth & Admin Check
    const { error: authError, profile } = await getAuthUser(supabase);
    if (authError) return authError;

    if (!profile || !ADMIN_ROLES.includes(profile.role as any)) {
        return errorResponse('Admin access required', 403);
    }

    // 2. Check for dependent services
    const { count } = await supabase
        .from('services')
        .select('*', { count: 'exact', head: true })
        .eq('category_id', id);

    if (count && count > 0) {
        return errorResponse(
            `Cannot delete category: ${count} service(s) still reference it. Deactivate instead.`,
            409
        );
    }

    // 3. Delete Category
    const { error } = await supabase
        .from('service_categories')
        .delete()
        .eq('id', id);

    if (error) {
        return errorResponse(error.message, 500);
    }

    return successResponse({ message: 'Category deleted' });
}
