import { SupabaseClient } from '@supabase/supabase-js';
import { errorResponse } from '@/lib/api-utils';
import type { Database } from '@/lib/database.types';

type UserRole = Database['public']['Enums']['user_role'];

/**
 * Get the currently authenticated user and their profile.
 * Returns a NextResponse error if not authenticated.
 */
export async function getAuthUser(supabase: SupabaseClient<Database>) {
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        return {
            error: errorResponse('Not authenticated', 401),
            user: null,
            profile: null,
        };
    }

    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (profileError || !profile) {
        return {
            error: errorResponse('Profile not found', 404),
            user,
            profile: null,
        };
    }

    return { error: null, user, profile };
}

/**
 * Require the current user to have one of the allowed roles.
 * Returns error response if not authenticated or not authorized.
 */
export async function requireRole(
    supabase: SupabaseClient<Database>,
    allowedRoles: UserRole[]
) {
    const { error, user, profile } = await getAuthUser(supabase);

    if (error) return { error, user: null, profile: null };

    if (!allowedRoles.includes(profile!.role)) {
        return {
            error: errorResponse(
                `Access denied. Required role: ${allowedRoles.join(' or ')}`,
                403
            ),
            user,
            profile,
        };
    }

    return { error: null, user, profile: profile! };
}
