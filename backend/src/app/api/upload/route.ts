import { createClient } from '@/lib/supabase/server';
import { getAuthUser } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/api-utils';
import { z } from 'zod';

const uploadSchema = z.object({
    filename: z.string().min(1),
    contentType: z.string().min(1), // e.g. "image/jpeg"
});

export async function POST(request: Request) {
    const supabase = await createClient();

    // 1. Auth Check
    const { error: authError, user } = await getAuthUser(supabase);
    if (authError) return authError;

    // 2. Validate Body
    const body = await request.json().catch(() => null);
    if (!body) return errorResponse('Invalid JSON body', 400);

    const validation = uploadSchema.safeParse(body);
    if (!validation.success) {
        return errorResponse('Invalid payload', 400, validation.error.message);
    }

    const { filename, contentType } = validation.data;

    // 3. Generate Path
    // Organize by user_id/timestamp-filename to prevent collisions
    const timestamp = Date.now();
    const safeFilename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    const path = `${user!.id}/${timestamp}-${safeFilename}`;

    // 4. Generate Signed Upload URL
    // Requires "Authenticated users can upload" policy (which we added)
    const { data, error } = await supabase
        .storage
        .from('uploads')
        .createSignedUploadUrl(path);

    if (error) {
        return errorResponse(error.message, 500);
    }

    // 5. Construct Public URL (for referencing in DB)
    const { data: publicUrlData } = supabase
        .storage
        .from('uploads')
        .getPublicUrl(path);

    return successResponse({
        signedUrl: data.signedUrl,
        token: data.token, // Sometimes needed depending on client
        path: data.path,
        publicUrl: publicUrlData.publicUrl
    });
}
