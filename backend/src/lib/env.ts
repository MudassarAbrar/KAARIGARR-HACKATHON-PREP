/**
 * Environment variable validation.
 *
 * Import this at the top of any server-side entry point to fail fast
 * if required environment variables are missing.
 *
 * Usage:
 *   import { env } from '@/lib/env';
 *   // env.SUPABASE_SERVICE_ROLE_KEY  ← typed and guaranteed to exist
 */

function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(
            `❌ Missing required environment variable: ${name}\n` +
            `   → Check your .env.local file or deployment config.`
        );
    }
    return value;
}

function optionalEnv(name: string, fallback: string): string {
    return process.env[name] || fallback;
}

/** Validated, typed environment variables. */
export const env = {
    // ── Supabase ──────────────────────────────────────────────
    NEXT_PUBLIC_SUPABASE_URL: requireEnv('NEXT_PUBLIC_SUPABASE_URL'),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    SUPABASE_SERVICE_ROLE_KEY: requireEnv('SUPABASE_SERVICE_ROLE_KEY'),

    // ── Stripe ────────────────────────────────────────────────
    STRIPE_SECRET_KEY: optionalEnv('STRIPE_SECRET_KEY', ''),
    STRIPE_PUBLISHABLE_KEY: optionalEnv('STRIPE_PUBLISHABLE_KEY', ''),
    STRIPE_WEBHOOK_SECRET: optionalEnv('STRIPE_WEBHOOK_SECRET', ''),

    // ── Email (Resend) ────────────────────────────────────────
    RESEND_API_KEY: optionalEnv('RESEND_API_KEY', ''),
    RESEND_FROM_EMAIL: optionalEnv('RESEND_FROM_EMAIL', 'noreply@karigar.com'),

    // ── App ───────────────────────────────────────────────────
    NEXT_PUBLIC_APP_URL: optionalEnv('NEXT_PUBLIC_APP_URL', 'http://localhost:3001'),
    FRONTEND_URL: optionalEnv('FRONTEND_URL', 'http://localhost:3000'),
    NODE_ENV: optionalEnv('NODE_ENV', 'development'),
} as const;

/** Type-safe env accessor */
export type Env = typeof env;
