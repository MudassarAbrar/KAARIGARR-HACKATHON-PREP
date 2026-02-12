import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@karigar.com';

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

/**
 * Send a transactional email via Resend.
 * Fails silently in development if RESEND_API_KEY is not set.
 */
export async function sendEmail({ to, subject, html }: EmailOptions) {
    if (!process.env.RESEND_API_KEY) {
        console.warn('[Email] RESEND_API_KEY not set, skipping email.');
        return null;
    }

    try {
        const { data, error } = await resend.emails.send({
            from: fromEmail,
            to,
            subject,
            html,
        });

        if (error) {
            console.error('[Email] Send error:', error);
            return null;
        }

        console.log('[Email] Sent:', data?.id);
        return data;
    } catch (err) {
        console.error('[Email] Exception:', err);
        return null;
    }
}

// ── Template Helpers ──────────────────────────────────────────────

export function newRequestEmail(providerName: string, serviceName: string, date: string) {
    return {
        subject: `New Service Request: ${serviceName}`,
        html: `
      <div style="font-family: sans-serif; max-width:600px; margin:0 auto;">
        <h2 style="color:#2563eb;">New Request Received 🎉</h2>
        <p>Hi ${providerName},</p>
        <p>A customer has requested your service <strong>${serviceName}</strong> on <strong>${date}</strong>.</p>
        <p>Log in to your Karigar dashboard to accept or decline.</p>
        <hr/>
        <p style="color:#6b7280;font-size:12px;">— Karigar Team</p>
      </div>
    `,
    };
}

export function statusUpdateEmail(
    customerName: string,
    serviceName: string,
    status: string
) {
    const statusMessages: Record<string, string> = {
        confirmed: '✅ Your request has been <strong>confirmed</strong> by the provider!',
        rejected: '❌ Your request has been <strong>declined</strong>.',
        in_progress: '🔧 Your service is now <strong>in progress</strong>.',
        completed: '🎉 Your service has been marked as <strong>completed</strong>!',
        cancelled: '⚠️ Your request has been <strong>cancelled</strong>.',
        rescheduled: '📅 Your request has been <strong>rescheduled</strong>.',
    };

    return {
        subject: `Karigar: Request ${status.replace('_', ' ')} — ${serviceName}`,
        html: `
      <div style="font-family: sans-serif; max-width:600px; margin:0 auto;">
        <h2 style="color:#2563eb;">Booking Update</h2>
        <p>Hi ${customerName},</p>
        <p>${statusMessages[status] || `Your request status changed to <strong>${status}</strong>.`}</p>
        <p>Service: <strong>${serviceName}</strong></p>
        <p>Log in to your <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}">Karigar dashboard</a> for details.</p>
        <hr/>
        <p style="color:#6b7280;font-size:12px;">— Karigar Team</p>
      </div>
    `,
    };
}
