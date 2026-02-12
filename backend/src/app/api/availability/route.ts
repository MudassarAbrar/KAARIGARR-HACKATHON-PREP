import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth';
import { bulkAvailabilitySchema } from '@/lib/validations/availability';
import {
    successResponse,
    errorResponse,
    validateBody,
    isErrorResponse,
} from '@/lib/api-utils';

/**
 * POST /api/availability — Set provider's weekly schedule (bulk upsert).
 * Replaces all existing availability for the provider.
 */
export async function POST(request: Request) {
    const supabase = await createClient();

    // 1. Auth & Role Check
    const { error: authError, user } = await requireRole(supabase, ['provider']);
    if (authError) return authError;

    // 2. Validate Body
    const body = await validateBody(request, bulkAvailabilitySchema);
    if (isErrorResponse(body)) return body;

    const { schedule } = body;

    // 3. Delete existing availability
    const { error: deleteError } = await supabase
        .from('availability')
        .delete()
        .eq('provider_id', user!.id);

    if (deleteError) {
        return errorResponse(deleteError.message, 500);
    }

    // 4. Insert new schedule
    const rows = schedule.map((slot) => ({
        provider_id: user!.id,
        day_of_week: slot.day_of_week,
        start_time: slot.start_time,
        end_time: slot.end_time,
        is_available: slot.is_available,
    }));

    const { data, error } = await supabase
        .from('availability')
        .insert(rows)
        .select();

    if (error) {
        return errorResponse(error.message, 400);
    }

    return successResponse(data, 201);
}
