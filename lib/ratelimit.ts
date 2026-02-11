/**
 * Rate Limiting Configuration for Karigar
 * 
 * This module provides rate limiting functionality using Upstash Redis.
 * It prevents API abuse, brute force attacks, and DDoS attempts.
 * 
 * Setup:
 * 1. Install: npm install @upstash/ratelimit @upstash/redis
 * 2. Create Upstash Redis: https://upstash.com
 * 3. Add credentials to .env.local:
 *    - UPSTASH_REDIS_REST_URL
 *    - UPSTASH_REDIS_REST_TOKEN
 */

import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

// ============================================================================
// RATE LIMITERS
// ============================================================================

/**
 * Login/Register Rate Limiter
 * Prevents brute force attacks on authentication endpoints
 * Limit: 5 requests per 15 minutes per IP
 */
export const loginRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '15 m'),
  analytics: true,
  prefix: '@ratelimit/login',
})

/**
 * Password Reset Rate Limiter
 * Prevents password reset email spam
 * Limit: 3 requests per 1 hour per IP
 */
export const passwordResetRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1 h'),
  analytics: true,
  prefix: '@ratelimit/password-reset',
})

/**
 * Service Request Rate Limiter
 * Prevents spam service requests
 * Limit: 10 requests per 1 hour per user
 */
export const serviceRequestRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 h'),
  analytics: true,
  prefix: '@ratelimit/service-request',
})

/**
 * Review Submission Rate Limiter
 * Prevents fake review spam
 * Limit: 5 reviews per 1 hour per user
 */
export const reviewRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 h'),
  analytics: true,
  prefix: '@ratelimit/review',
})

/**
 * File Upload Rate Limiter
 * Prevents storage abuse
 * Limit: 10 uploads per 1 hour per user
 */
export const fileUploadRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 h'),
  analytics: true,
  prefix: '@ratelimit/file-upload',
})

/**
 * General API Rate Limiter
 * General protection for all API endpoints
 * Limit: 100 requests per 15 minutes per IP
 */
export const apiRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '15 m'),
  analytics: true,
  prefix: '@ratelimit/api',
})

/**
 * Public Browse Rate Limiter
 * Allows legitimate browsing while preventing scraping
 * Limit: 1000 requests per 1 hour per IP
 */
export const browseRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(1000, '1 h'),
  analytics: true,
  prefix: '@ratelimit/browse',
})

/**
 * Admin Actions Rate Limiter
 * Rate limit for admin operations
 * Limit: 50 requests per 15 minutes per admin user
 */
export const adminRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(50, '15 m'),
  analytics: true,
  prefix: '@ratelimit/admin',
})

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
  retryAfter: number
  pending: Promise<unknown>
}

/**
 * Check rate limit for a given identifier
 * 
 * @param identifier - Unique identifier (IP address, user ID, etc.)
 * @param ratelimit - Rate limiter instance to use
 * @returns Rate limit check result
 * 
 * @example
 * const { success, retryAfter } = await checkRateLimit(ip, loginRateLimit)
 * if (!success) {
 *   return Response.json({ error: 'Too many attempts' }, { status: 429 })
 * }
 */
export async function checkRateLimit(
  identifier: string,
  ratelimit: Ratelimit
): Promise<RateLimitResult> {
  const result = await ratelimit.limit(identifier)

  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
    retryAfter: Math.ceil((result.reset - Date.now()) / 1000), // Convert to seconds
    pending: result.pending,
  }
}

/**
 * Get IP address from request headers
 * Checks multiple headers to find the real IP
 * 
 * @param headers - Request headers
 * @returns IP address or 'anonymous' if not found
 */
export function getIPAddress(headers: Headers): string {
  // Check common headers for IP address
  const forwardedFor = headers.get('x-forwarded-for')
  const realIP = headers.get('x-real-ip')
  const cfConnectingIP = headers.get('cf-connecting-ip') // Cloudflare

  // x-forwarded-for can contain multiple IPs, get the first one
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  if (realIP) {
    return realIP
  }

  if (cfConnectingIP) {
    return cfConnectingIP
  }

  return 'anonymous'
}

/**
 * Create rate limit response with proper headers
 * 
 * @param retryAfter - Seconds until rate limit resets
 * @param limit - Total request limit
 * @param message - Error message to display
 * @returns Response object with 429 status
 */
export function createRateLimitResponse(
  retryAfter: number,
  limit: number,
  message?: string
): Response {
  return Response.json(
    {
      error: message || 'Too many requests. Please try again later.',
      retryAfter,
      limit,
    },
    {
      status: 429,
      headers: {
        'X-RateLimit-Limit': String(limit),
        'X-RateLimit-Remaining': '0',
        'Retry-After': String(retryAfter),
        'Content-Type': 'application/json',
      },
    }
  )
}

// ============================================================================
// FALLBACK RATE LIMITER (No External Service)
// ============================================================================

/**
 * Simple in-memory rate limiter for local development
 * WARNING: This is NOT suitable for production with multiple servers
 * Use Upstash Redis for production
 */

interface RateLimitRecord {
  count: number
  resetTime: number
}

const inMemoryStore: Map<string, RateLimitRecord> = new Map()

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, record] of inMemoryStore.entries()) {
    if (now > record.resetTime) {
      inMemoryStore.delete(key)
    }
  }
}, 5 * 60 * 1000)

/**
 * Simple rate limiter using in-memory storage
 * Use only for development or single-server deployments
 * 
 * @param identifier - Unique identifier
 * @param limit - Maximum number of requests
 * @param windowMs - Time window in milliseconds
 * @returns Rate limit check result
 */
export function simpleRateLimit(
  identifier: string,
  limit: number,
  windowMs: number
): {
  success: boolean
  remaining: number
  retryAfter: number
} {
  const now = Date.now()
  const record = inMemoryStore.get(identifier)

  // Clean expired entry
  if (record && now > record.resetTime) {
    inMemoryStore.delete(identifier)
  }

  // Check if limit exceeded
  if (!inMemoryStore.has(identifier)) {
    inMemoryStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    })
    return { success: true, remaining: limit - 1, retryAfter: 0 }
  }

  const currentRecord = inMemoryStore.get(identifier)!

  if (currentRecord.count >= limit) {
    return {
      success: false,
      remaining: 0,
      retryAfter: Math.ceil((currentRecord.resetTime - now) / 1000),
    }
  }

  // Increment count
  currentRecord.count++
  inMemoryStore.set(identifier, currentRecord)

  return {
    success: true,
    remaining: limit - currentRecord.count,
    retryAfter: 0,
  }
}

// ============================================================================
// MIDDLEWARE HELPER
// ============================================================================

/**
 * Apply rate limiting to API routes
 * Use in Next.js API route handlers
 * 
 * @example
 * import { applyRateLimit, loginRateLimit } from '@/lib/ratelimit'
 * 
 * export async function POST(req: NextRequest) {
 *   const rateLimitResult = await applyRateLimit(req, loginRateLimit)
 *   if (!rateLimitResult.success) {
 *     return rateLimitResult.response
 *   }
 *   
 *   // Continue with request handling...
 * }
 */
export async function applyRateLimit(
  request: Request,
  ratelimit: Ratelimit,
  identifier?: string
): Promise<{
  success: boolean
  response?: Response
  remaining?: number
}> {
  const headers = new Headers(request.headers)
  const id = identifier || getIPAddress(headers)

  const { success, limit, remaining, retryAfter } = await checkRateLimit(
    id,
    ratelimit
  )

  if (!success) {
    return {
      success: false,
      response: createRateLimitResponse(retryAfter, limit),
    }
  }

  return {
    success: true,
    remaining,
  }
}

// ============================================================================
// LOGGING & ANALYTICS
// ============================================================================

/**
 * Log rate limit events for monitoring
 * Useful for detecting abuse patterns
 */
export function logRateLimitEvent(
  identifier: string,
  endpoint: string,
  success: boolean,
  remaining: number
): void {
  if (!success) {
    console.warn(`[RATE LIMIT] ${endpoint} - ${identifier} - BLOCKED`)
  }

  // In production, send to monitoring service (Sentry, DataDog, etc.)
  if (process.env.NODE_ENV === 'production' && !success) {
    // Example: Send to monitoring
    // Sentry.captureMessage(`Rate limit exceeded: ${endpoint}`, {
    //   tags: { identifier, endpoint },
    // })
  }
}

/**
 * Get rate limit status for a specific identifier
 * Useful for showing users their remaining requests
 */
export async function getRateLimitStatus(
  identifier: string,
  ratelimit: Ratelimit
): Promise<{
  limit: number
  remaining: number
  resetAt: Date
}> {
  const { limit, remaining, reset } = await checkRateLimit(identifier, ratelimit)

  return {
    limit,
    remaining,
    resetAt: new Date(reset),
  }
}
