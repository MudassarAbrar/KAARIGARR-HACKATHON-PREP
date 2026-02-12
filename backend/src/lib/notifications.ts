import { createAdminClient } from '@/lib/supabase/admin';

type NotificationType = 'new_request' | 'status_update' | 'review' | 'payment' | 'message' | 'info';

/**
 * Create an in-app notification for a user.
 * Uses admin client to bypass RLS (server-side insert).
 * Non-blocking — fire-and-forget to avoid slowing API responses.
 */
export async function createNotification({
    userId,
    type,
    title,
    message,
    relatedEntityId,
}: {
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    relatedEntityId?: string;
}): Promise<void> {
    try {
        const supabase = createAdminClient();
        await supabase.from('notifications').insert({
            user_id: userId,
            type,
            title,
            message,
            related_entity_id: relatedEntityId || null,
        });
    } catch (err) {
        console.error('[Notification] Failed to create notification:', err);
    }
}
