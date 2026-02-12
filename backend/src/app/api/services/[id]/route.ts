import { createClient } from '@/lib/supabase/server';
import { getAuthUser } from '@/lib/auth';
import { updateServiceSchema } from '@/lib/validations/service';
import {
    successResponse,
    errorResponse,
    validateBody,
    isErrorResponse,
} from '@/lib/api-utils';

// Helper to check ownership
async function checkOwnership(supabase: any, serviceId: string, userId: string): Promise<boolean> {
    const { data, error } = await supabase
        .from('services')
        .select('provider_id')
        .eq('id', serviceId)
        .single();

    if (error || !data) return false;
    return data.provider_id === userId;
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const supabase = await createClient();
    const { id } = await params;

    const { data, error } = await supabase
        .from('services')
        .select(`
      *,
      category:service_categories(*),
      provider:profiles(*)
    `)
        .eq('id', id)
        .single();

    if (error) {
        return errorResponse('Service not found', 404);
    }

    return successResponse(data);
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const supabase = await createClient();
    const { id } = await params;

    // 1. Auth Check
    const { error: authError, user } = await getAuthUser(supabase);
    if (authError) return authError;

    // 2. Ownership Check
    const isOwner = await checkOwnership(supabase, id, user!.id);
    // Note: RLS also enforces this, but an explicit check provides a cleaner 403 response
    // instead of a generic "error" or 0 rows updated.
    if (!isOwner) {
        return errorResponse('You can only update your own services', 403);
    }

    // 3. Validate Body
    const body = await validateBody(request, updateServiceSchema);
    if (isErrorResponse(body)) return body;

    const { name, category_id, description, base_price, price_unit, is_active } = body;

    // 4. Update Service
    const { data, error } = await supabase
        .from('services')
        .update({
            name,
            category_id,
            description,
            base_price,
            price_unit: price_unit as 'per_hour' | 'per_job' | 'per_unit' | undefined,
            is_active,
        })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        return errorResponse(error.message, 400);
    }

    return successResponse(data);
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const supabase = await createClient();
    const { id } = await params;

    // 1. Auth Check
    const { error: authError, user } = await getAuthUser(supabase);
    if (authError) return authError;

    // 2. Ownership Check
    const isOwner = await checkOwnership(supabase, id, user!.id);
    if (!isOwner) {
        return errorResponse('You can only delete your own services', 403);
    }

    // 3. Delete Service
    const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

    if (error) {
        return errorResponse(error.message, 400);
    }

    return successResponse({ message: 'Service deleted successfully' });
}
