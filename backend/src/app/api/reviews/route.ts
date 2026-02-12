import { createClient } from '@/lib/supabase/server';
import { requireRole } from '@/lib/auth';
import { createReviewSchema } from '@/lib/validations/review';
import {
    successResponse,
    errorResponse,
    validateBody,
    isErrorResponse,
} from '@/lib/api-utils';

export async function GET(request: Request) {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    const service_id = searchParams.get('service_id');
    const provider_id = searchParams.get('provider_id');

    let query = supabase
        .from('reviews')
        .select(`
            id, rating, comment, created_at,
            customer:profiles!reviews_customer_id_fkey(first_name, last_name, avatar_url),
            request:service_requests!reviews_request_id_fkey(
                service:services(name)
            )
        `)
        .order('created_at', { ascending: false });

    if (service_id) {
        query = query.eq('service_id', service_id);
    } else if (provider_id) {
        query = query.eq('provider_id', provider_id);
    } else {
        query = query.limit(20);
    }

    const { data, error } = await query;

    if (error) {
        return errorResponse(error.message, 500);
    }

    return successResponse(data);
}

export async function POST(request: Request) {
    const supabase = await createClient();

    // 1. Auth Check
    const { error: authError, user } = await requireRole(supabase, ['customer']);
    if (authError) return authError;

    // 2. Validate Body
    const body = await validateBody(request, createReviewSchema);
    if (isErrorResponse(body)) return body;

    const { request_id, rating, comment } = body;

    // 3. Verify Request Eligibility
    // Check if review already exists
    const { data: existingReview, error: reviewCheckError } = await supabase
        .from('reviews')
        .select('id')
        .eq('request_id', request_id)
        .maybeSingle();

    if (reviewCheckError) {
        return errorResponse(reviewCheckError.message, 500);
    }

    if (existingReview) {
        return errorResponse('You have already reviewed this service', 400);
    }

    // Fetch request details
    const { data: serviceRequest, error: requestError } = await supabase
        .from('service_requests')
        .select('customer_id, provider_id, service_id, status')
        .eq('id', request_id)
        .single();

    if (requestError || !serviceRequest) {
        return errorResponse('Service request not found', 404);
    }

    if (serviceRequest.customer_id !== user!.id) {
        return errorResponse('Unauthorized to review this request', 403);
    }

    if (serviceRequest.status !== 'completed') {
        return errorResponse('Service must be completed before reviewing', 400);
    }

    // 4. Create Review
    const { data, error } = await supabase
        .from('reviews')
        .insert({
            request_id,
            customer_id: user!.id,
            provider_id: serviceRequest.provider_id,
            // service_id removed as it's not in table
            rating,
            comment,
        })
        .select()
        .single();

    if (error) {
        return errorResponse(error.message, 500);
    }

    // Fix #10: Update provider stats (average_rating, total_reviews)
    const { data: allReviews } = await supabase
        .from('reviews')
        .select('rating')
        .eq('provider_id', serviceRequest.provider_id);

    if (allReviews && allReviews.length > 0) {
        const totalReviews = allReviews.length;
        const avgRating = allReviews.reduce((sum: number, r: any) => sum + r.rating, 0) / totalReviews;

        await supabase
            .from('profiles')
            .update({
                average_rating: Math.round(avgRating * 100) / 100,
                total_reviews: totalReviews,
            })
            .eq('id', serviceRequest.provider_id);
    }

    return successResponse(data, 201);
}
