import { createClient } from '@/lib/supabase/server';
import { getAuthUser } from '@/lib/auth';
import { successResponse, errorResponse } from '@/lib/api-utils';

export async function GET(request: Request) {
    const supabase = await createClient();

    // 1. Auth & Admin Check (role-based)
    const { error: authError, profile } = await getAuthUser(supabase);
    if (authError) return authError;

    if (!profile || profile.role !== 'admin') {
        return errorResponse('Admin access required', 403);
    }

    // 2. Fetch Stats (Parallel)
    const [
        { count: totalUsers },
        { count: totalProviders },
        { count: totalCustomers },
        { count: totalRequests },
        { count: completedRequests },
        { count: activeRequests }
    ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'provider'),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'customer'),
        supabase.from('service_requests').select('*', { count: 'exact', head: true }),
        supabase.from('service_requests').select('*', { count: 'exact', head: true }).eq('status', 'completed'),
        supabase.from('service_requests').select('*', { count: 'exact', head: true }).in('status', ['requested', 'pending', 'in_progress'])
    ]);

    // 3. Revenue Calculation (Approximate)
    // Detailed calculation requires joining services and requests.
    // For now, let's just get completed requests with service details.
    const { data: revenueData } = await supabase
        .from('service_requests')
        .select(`
            id,
            service:services(base_price)
        `)
        .eq('status', 'completed');

    let totalRevenue = 0;
    if (revenueData) {
        totalRevenue = revenueData.reduce((acc, curr) => {
            const price = (curr.service as any)?.base_price || 0;
            return acc + price;
        }, 0);
    }

    const stats = {
        users: {
            total: totalUsers || 0,
            providers: totalProviders || 0,
            customers: totalCustomers || 0
        },
        requests: {
            total: totalRequests || 0,
            completed: completedRequests || 0,
            active: activeRequests || 0
        },
        revenue: {
            total: totalRevenue,
            currency: 'PKR' // Assuming
        }
    };

    return successResponse(stats);
}
