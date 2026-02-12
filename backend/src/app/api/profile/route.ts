import { createClient } from '@/lib/supabase/server';
import { getAuthUser } from '@/lib/auth';
import {
    successResponse,
    errorResponse,
    validateBody,
    isErrorResponse,
} from '@/lib/api-utils';
import { z } from 'zod';

const updateProfileSchema = z.object({
    first_name: z.string().min(1).max(50).trim().optional(),
    last_name: z.string().min(1).max(50).trim().optional(),
    phone: z.string().max(20).optional().nullable(),
    avatar_url: z.string().url().optional().nullable(),
    business_name: z.string().max(100).optional().nullable(),
    bio: z.string().max(500).optional().nullable(),
    service_area: z.string().max(100).optional().nullable(),
    city: z.string().max(100).optional().nullable(),
    latitude: z.number().min(-90).max(90).optional().nullable(),
    longitude: z.number().min(-180).max(180).optional().nullable(),
});

/**
 * GET /api/profile — Get current user's profile.
 */
export async function GET() {
    const supabase = await createClient();
    const { error: authError, user, profile } = await getAuthUser(supabase);
    if (authError) return authError;

    return successResponse({
        user: { id: user!.id, email: user!.email },
        profile,
    });
}

/**
 * PATCH /api/profile — Update current user's profile.
 */
export async function PATCH(request: Request) {
    const supabase = await createClient();

    // 1. Auth Check
    const { error: authError, user } = await getAuthUser(supabase);
    if (authError) return authError;

    // 2. Validate Body
    const body = await validateBody(request, updateProfileSchema);
    if (isErrorResponse(body)) return body;

    // 3. Filter out undefined fields (only update what's provided)
    const updateData: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(body)) {
        if (value !== undefined) {
            updateData[key] = value;
        }
    }

    if (Object.keys(updateData).length === 0) {
        return errorResponse('No fields to update', 400);
    }

    updateData.updated_at = new Date().toISOString();

    // 4. Update Profile
    const { data, error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user!.id)
        .select()
        .single();

    if (error) {
        return errorResponse(error.message, 500);
    }

    return successResponse(data);
}
