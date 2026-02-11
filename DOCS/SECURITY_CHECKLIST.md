# Security Checklist
## Karigar - Pre-Deployment Security Guide

---

**Version:** 1.0  
**Date:** February 11, 2026  
**Priority:** 🔴 CRITICAL - Must complete before production deployment  

---

## ⚠️ CRITICAL VULNERABILITIES TO PREVENT

This document addresses the three major security vulnerabilities:

1. ✅ **Rate Limiting** - Prevent API abuse and DDoS attacks
2. ✅ **Input Validation** - Stop injection attacks and malicious data
3. ✅ **Exposed API Keys** - Protect sensitive credentials

---

## 📋 Table of Contents

1. [Pre-Deployment Security Checklist](#pre-deployment-security-checklist)
2. [Rate Limiting Implementation](#rate-limiting-implementation)
3. [Input Validation Strategy](#input-validation-strategy)
4. [API Key Protection](#api-key-protection)
5. [Authentication Security](#authentication-security)
6. [Database Security](#database-security)
7. [XSS Prevention](#xss-prevention)
8. [CSRF Protection](#csrf-protection)
9. [SQL Injection Prevention](#sql-injection-prevention)
10. [File Upload Security](#file-upload-security)
11. [Payment Security](#payment-security)
12. [HTTPS & Transport Security](#https-and-transport-security)
13. [Error Handling & Logging](#error-handling-and-logging)
14. [Security Headers](#security-headers)
15. [Dependency Security](#dependency-security)
16. [Security Testing](#security-testing)

---

## 1. Pre-Deployment Security Checklist

### ✅ Essential Security Tasks

| Category | Task | Status | Priority |
|----------|------|--------|----------|
| **🔐 Authentication** | Implement secure password hashing | ⬜ | P0 |
| **🔐 Authentication** | Enable 2FA for admin accounts | ⬜ | P1 |
| **🔐 Authentication** | Set session timeout (30 min) | ⬜ | P0 |
| **🔐 Authentication** | Implement rate limiting on login | ⬜ | P0 |
| **🚫 Rate Limiting** | Apply rate limits to all API endpoints | ⬜ | P0 |
| **🚫 Rate Limiting** | Implement IP-based rate limiting | ⬜ | P0 |
| **🚫 Rate Limiting** | Add CAPTCHA for sensitive actions | ⬜ | P1 |
| **✅ Input Validation** | Validate all user inputs (client + server) | ⬜ | P0 |
| **✅ Input Validation** | Sanitize HTML/script in text fields | ⬜ | P0 |
| **✅ Input Validation** | Validate file uploads (type, size) | ⬜ | P0 |
| **🔑 API Keys** | Remove hardcoded API keys | ⬜ | P0 |
| **🔑 API Keys** | Use environment variables | ⬜ | P0 |
| **🔑 API Keys** | Add .env to .gitignore | ⬜ | P0 |
| **🔑 API Keys** | Rotate exposed keys immediately | ⬜ | P0 |
| **🗄️ Database** | Enable Row Level Security (RLS) | ⬜ | P0 |
| **🗄️ Database** | Use parameterized queries | ⬜ | P0 |
| **🗄️ Database** | Limit database permissions | ⬜ | P0 |
| **🌐 HTTPS** | Force HTTPS on all pages | ⬜ | P0 |
| **🌐 HTTPS** | Set Strict-Transport-Security header | ⬜ | P0 |
| **🛡️ Headers** | Add security headers (CSP, X-Frame) | ⬜ | P0 |
| **🛡️ CSRF** | Implement CSRF tokens | ⬜ | P0 |
| **🛡️ XSS** | Escape user-generated content | ⬜ | P0 |
| **💳 Payments** | Use Stripe secure checkout | ⬜ | P0 |
| **💳 Payments** | Verify webhooks signature | ⬜ | P0 |
| **💳 Payments** | Never store card details | ⬜ | P0 |
| **📁 Files** | Validate file types (whitelist) | ⬜ | P0 |
| **📁 Files** | Scan uploads for malware | ⬜ | P1 |
| **📁 Files** | Limit file size (5MB max) | ⬜ | P0 |
| **🔍 Logging** | Log security events | ⬜ | P1 |
| **🔍 Logging** | Never log sensitive data | ⬜ | P0 |
| **🔍 Monitoring** | Set up error monitoring (Sentry) | ⬜ | P1 |
| **📦 Dependencies** | Audit npm packages (npm audit) | ⬜ | P0 |
| **📦 Dependencies** | Update vulnerable packages | ⬜ | P0 |
| **🧪 Testing** | Security penetration testing | ⬜ | P1 |
| **🧪 Testing** | SQL injection testing | ⬜ | P0 |
| **🧪 Testing** | XSS attack testing | ⬜ | P0 |

**Priority Levels:**
- **P0** = Critical - Must fix before launch
- **P1** = High - Fix within first week
- **P2** = Medium - Fix within first month

---

## 2. Rate Limiting Implementation

### 🚫 Why Rate Limiting is Critical

**Prevents:**
- Brute force attacks on login
- API abuse and spam
- DDoS attacks
- Resource exhaustion
- Scraping/data harvesting

### 2.1 Rate Limiting Strategy

| Endpoint Type | Limit | Window | Reason |
|--------------|-------|--------|--------|
| **Login/Register** | 5 requests | 15 min | Prevent brute force |
| **Password Reset** | 3 requests | 1 hour | Prevent email spam |
| **Service Request** | 10 requests | 1 hour | Prevent spam requests |
| **Review Submission** | 5 requests | 1 hour | Prevent fake reviews |
| **File Upload** | 10 uploads | 1 hour | Prevent abuse |
| **General API** | 100 requests | 15 min | General protection |
| **Public Browse** | 1000 requests | 1 hour | Allow legitimate browsing |

---

### 2.2 Implementation with Vercel Rate Limiting

**Option 1: Upstash Rate Limit (Recommended)**

```bash
# Install
npm install @upstash/ratelimit @upstash/redis
```

```typescript
// lib/ratelimit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Create Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

// Rate limiters for different endpoints
export const loginRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '15 m'),
  analytics: true,
  prefix: '@ratelimit/login',
})

export const apiRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '15 m'),
  analytics: true,
  prefix: '@ratelimit/api',
})

export const serviceRequestRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 h'),
  analytics: true,
  prefix: '@ratelimit/service-request',
})

// Utility function to check rate limit
export async function checkRateLimit(
  identifier: string,
  ratelimit: Ratelimit
) {
  const { success, limit, reset, remaining } = await ratelimit.limit(identifier)
  
  return {
    success,
    limit,
    reset,
    remaining,
    retryAfter: reset - Date.now(),
  }
}
```

**Usage in API Routes:**

```typescript
// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { loginRateLimit, checkRateLimit } from '@/lib/ratelimit'

export async function POST(req: NextRequest) {
  // Get IP address
  const ip = req.ip ?? req.headers.get('x-forwarded-for') ?? 'anonymous'

  // Check rate limit
  const { success, retryAfter } = await checkRateLimit(ip, loginRateLimit)

  if (!success) {
    return NextResponse.json(
      { 
        error: 'Too many login attempts. Please try again later.',
        retryAfter: Math.ceil(retryAfter / 1000), // seconds
      },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': '0',
          'Retry-After': String(Math.ceil(retryAfter / 1000)),
        }
      }
    )
  }

  // Proceed with login logic
  const { email, password } = await req.json()
  // ... authentication logic
}
```

```typescript
// app/api/requests/create/route.ts
import { serviceRequestRateLimit, checkRateLimit } from '@/lib/ratelimit'

export async function POST(req: NextRequest) {
  const userId = req.headers.get('x-user-id') // from auth middleware
  
  // Rate limit by user ID
  const { success, remaining, retryAfter } = await checkRateLimit(
    userId!,
    serviceRequestRateLimit
  )

  if (!success) {
    return NextResponse.json(
      { 
        error: 'You have submitted too many requests. Please wait before submitting again.',
        retryAfter: Math.ceil(retryAfter / 1000),
      },
      { status: 429 }
    )
  }

  // Log remaining requests for user info
  console.log(`User ${userId} has ${remaining} requests remaining`)

  // Proceed with request creation
  // ... business logic
}
```

---

**Option 2: Simple IP-Based Rate Limiting (No External Service)**

```typescript
// lib/simple-ratelimit.ts
interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

export function simpleRateLimit(
  identifier: string,
  limit: number,
  windowMs: number
): { success: boolean; remaining: number; retryAfter: number } {
  const now = Date.now()
  const record = store[identifier]

  // Clean expired entries
  if (record && now > record.resetTime) {
    delete store[identifier]
  }

  // Check if limit exceeded
  if (!store[identifier]) {
    store[identifier] = {
      count: 1,
      resetTime: now + windowMs,
    }
    return { success: true, remaining: limit - 1, retryAfter: 0 }
  }

  if (store[identifier].count >= limit) {
    return {
      success: false,
      remaining: 0,
      retryAfter: store[identifier].resetTime - now,
    }
  }

  // Increment count
  store[identifier].count++
  return {
    success: true,
    remaining: limit - store[identifier].count,
    retryAfter: 0,
  }
}

// Usage
export async function POST(req: NextRequest) {
  const ip = req.ip ?? 'anonymous'
  const { success, retryAfter } = simpleRateLimit(
    ip,
    5, // 5 requests
    15 * 60 * 1000 // per 15 minutes
  )

  if (!success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    )
  }

  // Continue...
}
```

---

### 2.3 Middleware Rate Limiting

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { apiRateLimit, checkRateLimit } from '@/lib/ratelimit'

export async function middleware(req: NextRequest) {
  // Apply rate limiting to API routes
  if (req.nextUrl.pathname.startsWith('/api/')) {
    const ip = req.ip ?? req.headers.get('x-forwarded-for') ?? 'anonymous'
    const { success } = await checkRateLimit(ip, apiRateLimit)

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
```

---

### 2.4 Client-Side Rate Limit Feedback

```tsx
// components/ServiceRequestForm.tsx
'use client'

import { useState } from 'react'

export function ServiceRequestForm() {
  const [error, setError] = useState<string | null>(null)
  const [retryAfter, setRetryAfter] = useState<number | null>(null)

  const handleSubmit = async (data: any) => {
    const response = await fetch('/api/requests', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    if (response.status === 429) {
      const result = await response.json()
      setError(`Too many requests. Please wait ${result.retryAfter} seconds.`)
      setRetryAfter(result.retryAfter)
      
      // Auto-clear error after retry period
      setTimeout(() => {
        setError(null)
        setRetryAfter(null)
      }, result.retryAfter * 1000)
      
      return
    }

    // Handle success
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
          {retryAfter && <span> (Retry in {retryAfter}s)</span>}
        </div>
      )}
      {/* Form fields */}
    </form>
  )
}
```

---

## 3. Input Validation Strategy

### ✅ Why Input Validation is Critical

**Prevents:**
- SQL Injection
- XSS attacks
- Command injection
- Path traversal
- Buffer overflow
- Business logic bypass

### 3.1 Validation Layers

```
┌─────────────────────────────────────┐
│   1. CLIENT-SIDE VALIDATION         │  ← User experience
│      - React Hook Form + Zod        │
│      - Immediate feedback           │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   2. SERVER-SIDE VALIDATION         │  ← Security (REQUIRED)
│      - API route validation         │
│      - Zod schema validation        │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   3. DATABASE VALIDATION            │  ← Data integrity
│      - PostgreSQL constraints       │
│      - Row Level Security           │
└─────────────────────────────────────┘
```

**🚨 CRITICAL RULE:** Never trust client-side validation alone. Always validate on server.

---

### 3.2 Comprehensive Input Validation

**Email Validation:**
```typescript
// lib/validations/common.ts
import { z } from 'zod'

export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Invalid email address')
  .max(255, 'Email too long')
  .toLowerCase()
  .trim()

// Example: user@example.com
```

**Password Validation:**
```typescript
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(100, 'Password too long')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    'Password must contain uppercase, lowercase, number, and special character'
  )

// Example: MyP@ssw0rd
```

**Phone Number Validation:**
```typescript
export const phoneSchema = z
  .string()
  .regex(/^(\+92|0)?[0-9]{10}$/,  'Invalid Pakistani phone number')
  .transform((val) => val.replace(/\s/g, '')) // Remove spaces

// Example: +923001234567 or 03001234567
```

**Name Validation:**
```typescript
export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name too long')
  .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes')
  .trim()

// Example: John Doe or O'Brien
```

**Text/Description Validation:**
```typescript
export const descriptionSchema = z
  .string()
  .min(10, 'Description must be at least 10 characters')
  .max(1000, 'Description too long (max 1000 characters)')
  .trim()
  // Sanitize: Remove script tags
  .transform((val) => val.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ''))
```

**Price Validation:**
```typescript
export const priceSchema = z
  .number()
  .min(0, 'Price cannot be negative')
  .max(1000000, 'Price too high')
  .multipleOf(0.01, 'Price can have at most 2 decimal places')

// Example: 1500.50
```

**URL Validation:**
```typescript
export const urlSchema = z
  .string()
  .url('Invalid URL')
  .max(500, 'URL too long')
  .refine(
    (url) => url.startsWith('https://'),
    'Only HTTPS URLs are allowed'
  )

// Example: https://example.com
```

**Date Validation:**
```typescript
export const futureDateSchema = z
  .date({
    required_error: 'Date is required',
    invalid_type_error: 'Invalid date',
  })
  .refine(
    (date) => date > new Date(),
    'Date must be in the future'
  )
```

**UUID Validation:**
```typescript
export const uuidSchema = z
  .string()
  .uuid('Invalid ID format')

// Example: 123e4567-e89b-12d3-a456-426614174000
```

**Address Validation:**
```typescript
export const addressSchema = z
  .string()
  .min(5, 'Address too short')
  .max(500, 'Address too long')
  .trim()
  .refine(
    (address) => address.split(' ').length >= 2,
    'Please provide a complete address'
  )
```

---

### 3.3 Complete Form Validation Example

```typescript
// lib/validations/serviceRequest.ts
import { z } from 'zod'

export const serviceRequestSchema = z.object({
  serviceId: z.string().uuid('Invalid service ID'),
  
  preferredDate: z
    .date({ required_error: 'Please select a date' })
    .refine((date) => date > new Date(), 'Date must be in the future')
    .refine(
      (date) => date < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      'Date cannot be more than 90 days in the future'
    ),
  
  preferredTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
  
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description too long')
    .trim()
    .transform((val) => 
      // Remove HTML tags
      val.replace(/<[^>]*>/g, '')
    ),
  
  address: z
    .string()
    .min(5, 'Address too short')
    .max(500, 'Address too long')
    .trim(),
  
  contactPhone: z
    .string()
    .regex(/^(\+92|0)?[0-9]{10}$/, 'Invalid phone number')
    .optional(),
})

export type ServiceRequestInput = z.infer<typeof serviceRequestSchema>
```

**Server-Side Usage:**
```typescript
// app/api/requests/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { serviceRequestSchema } from '@/lib/validations/serviceRequest'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Validate input
    const validated = serviceRequestSchema.parse(body)
    
    // Input is now safe and typed
    const { serviceId, preferredDate, description } = validated
    
    // Save to database...
    
    return NextResponse.json({ success: true })
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message,
          }))
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

---

### 3.4 HTML Sanitization

**For Rich Text (Reviews, Descriptions):**

```bash
npm install dompurify
npm install -D @types/dompurify
```

```typescript
// lib/sanitize.ts
import DOMPurify from 'dompurify'

export function sanitizeHTML(dirty: string): string {
  // Server-side sanitization
  const clean = DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [], // No HTML tags allowed
    ALLOWED_ATTR: [],
  })
  return clean
}

// For limited HTML (if allowing formatting)
export function sanitizeRichText(dirty: string): string {
  const clean = DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
    ALLOWED_ATTR: [],
  })
  return clean
}

// Usage in API
import { sanitizeHTML } from '@/lib/sanitize'

const cleanDescription = sanitizeHTML(userInput.description)
```

---

### 3.5 SQL Injection Prevention

**✅ SAFE: Using Supabase Client (Automatically Parameterized)**

```typescript
// ✅ SAFE - Supabase handles parameterization
const { data, error } = await supabase
  .from('service_requests')
  .select('*')
  .eq('customer_id', userId) // Automatically escaped
  .eq('status', status) // Automatically escaped
```

**❌ DANGEROUS: Raw SQL (If absolutely necessary)**

```typescript
// ❌ NEVER DO THIS - Vulnerable to SQL injection
const query = `SELECT * FROM users WHERE email = '${userInput}'`

// ✅ IF you must use raw SQL, use parameterized queries
const { data, error } = await supabase.rpc('custom_function', {
  user_email: userInput, // Passed as parameter
})
```

---

### 3.6 Command Injection Prevention

```typescript
// ❌ NEVER DO THIS
const { exec } = require('child_process')
exec(`ping -c 4 ${userInput}`) // DANGEROUS!

// ✅ AVOID executing system commands based on user input
// If absolutely necessary, use allowlists:
const allowedCommands = ['option1', 'option2', 'option3']
if (!allowedCommands.includes(userInput)) {
  throw new Error('Invalid command')
}
```

---

### 3.7 Path Traversal Prevention

```typescript
// ❌ DANGEROUS
const filePath = `./uploads/${req.query.filename}`

// ✅ SAFE - Validate and sanitize
import path from 'path'

function safeFilePath(filename: string): string {
  // Remove directory traversal attempts
  const sanitized = path.basename(filename)
  
  // Validate against allowed pattern
  if (!/^[a-zA-Z0-9_-]+\.(jpg|jpeg|png|pdf)$/.test(sanitized)) {
    throw new Error('Invalid filename')
  }
  
  return path.join('./uploads', sanitized)
}

const safePath = safeFilePath(req.query.filename)
```

---

## 4. API Key Protection

### 🔑 Critical API Key Security

**Types of API Keys in Karigar:**
1. ✅ **Public** (client-side safe): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
2. 🔒 **Private** (server-only): `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, `RESEND_API_KEY`

---

### 4.1 Environment Variables Best Practices

**✅ DO:**
```bash
# .env.local (LOCAL DEVELOPMENT - NEVER COMMIT)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...  # Public - OK to expose
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...      # Private - SERVER ONLY
STRIPE_SECRET_KEY=sk_test_...             # Private - SERVER ONLY
```

**❌ DON'T:**
```typescript
// ❌ NEVER hardcode API keys
const apiKey = 'sk_test_51Hxxx...'

// ❌ NEVER commit .env files
# .gitignore should include:
.env
.env.local
.env.production.local
```

---

### 4.2 .gitignore Configuration

```bash
# .gitignore (REQUIRED)

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Secrets
*.pem
*.key
secrets/

# API keys
config/secrets.json
```

---

### 4.3 Verify No Exposed Keys

**Before Committing:**
```bash
# Check for exposed secrets
git log --all -p | grep -E 'sk_live|sk_test|service_role'

# Use git-secrets to prevent committing secrets
npm install -g git-secrets
git secrets --install
git secrets --register-aws
```

**Check Repository:**
```bash
# Search for potential secrets in codebase
grep -r "sk_test_" .
grep -r "sk_live_" .
grep -r "service_role" .
grep -r "api_key" .
```

---

### 4.4 Separate Public vs Private Keys

**Public Keys (NEXT_PUBLIC_*):**
```typescript
// ✅ SAFE - Public keys in client components
'use client'

export function StripeCheckout() {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY! // OK to expose
  )
  
  return <Elements stripe={stripePromise}>...</Elements>
}
```

**Private Keys (Server-only):**
```typescript
// ✅ SAFE - Private keys in server components/API routes
// app/api/payment/route.ts

import Stripe from 'stripe'

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!, // SERVER ONLY - Never exposed
  { apiVersion: '2023-10-16' }
)

export async function POST(req: Request) {
  // Use private key safely on server
  const session = await stripe.checkout.sessions.create({...})
  return Response.json({ sessionId: session.id })
}
```

---

### 4.5 Key Rotation Strategy

**If API Key is Exposed:**

1. **Immediate Actions:**
```bash
# 1. Revoke the exposed key immediately
# Go to service dashboard and delete/revoke the key

# 2. Generate new key
# Create replacement key

# 3. Update environment variables
# In Vercel: Settings → Environment Variables → Edit

# 4. Remove from git history (if committed)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# 5. Force push (CAREFUL!)
git push origin --force --all
```

2. **Update Vercel Environment Variables:**
```bash
# Install Vercel CLI
npm i -g vercel

# Update environment variable
vercel env add STRIPE_SECRET_KEY production
# Paste new key

# Redeploy
vercel --prod
```

---

### 4.6 Supabase RLS for API Security

**Row Level Security Policies (Database-level protection):**

```sql
-- Customers can only see their own requests
CREATE POLICY "Customers can view own requests"
  ON service_requests FOR SELECT
  USING (auth.uid() = customer_id);

-- Providers can only see their own requests
CREATE POLICY "Providers can view assigned requests"
  ON service_requests FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM service_providers
      WHERE service_providers.user_id = auth.uid()
      AND service_providers.id = service_requests.provider_id
    )
  );

-- Only authenticated users can create requests
CREATE POLICY "Authenticated users can create requests"
  ON service_requests FOR INSERT
  WITH CHECK (auth.uid() = customer_id);

-- Users can only update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

---

### 4.7 Server-Only Utility Functions

```typescript
// lib/server-only.ts
import 'server-only' // This package ensures code only runs on server

// ✅ Safe to use private keys here
export async function getSecretData(userId: string) {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  // Use service role key for admin operations
}

// If accidentally imported in client component, build will fail
```

```bash
npm install server-only
```

---

## 5. Authentication Security

### 🔐 Secure Authentication Checklist

| Security Measure | Implementation | Status |
|-----------------|----------------|--------|
| Password hashing | bcrypt/Supabase Auth | ⬜ |
| Password strength | Min 8 chars, complexity | ⬜ |
| Rate limit login | 5 attempts per 15 min | ⬜ |
| Account lockout | After 10 failed attempts | ⬜ |
| Session timeout | 30 minutes inactivity | ⬜ |
| Secure cookies | HttpOnly, Secure, SameSite | ⬜ |
| Email verification | Required for signup | ⬜ |
| Password reset | Token-based, time-limited | ⬜ |
| 2FA (Optional) | TOTP for admin accounts | ⬜ |

---

### 5.1 Secure Password Reset

```typescript
// app/api/auth/reset-password/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const { email } = await req.json()
  const supabase = createRouteHandlerClient({ cookies })

  // Send password reset email
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/update-password`,
  })

  // ⚠️ IMPORTANT: Don't reveal if email exists
  // Always return success to prevent email enumeration
  return Response.json({ 
    message: 'If that email exists, a reset link has been sent.' 
  })
}
```

---

### 5.2 Secure Session Management

```typescript
// middleware.ts - Session validation
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  const supabase = createMiddlewareClient({ req, res })
  
  const { data: { session } } = await supabase.auth.getSession()

  // Check if session is expired
  if (session && session.expires_at) {
    const expiresAt = new Date(session.expires_at * 1000)
    if (expiresAt < new Date()) {
      // Session expired - redirect to login
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}
```

---

### 5.3 Prevent Account Enumeration

```typescript
// ❌ BAD - Reveals if email exists
if (!userExists) {
  return { error: 'Email not found' }
}

// ✅ GOOD - Generic message
return { 
  message: 'If that email exists, you will receive a reset link.' 
}
```

---

## 6. Database Security

### 🗄️ Supabase Security Configuration

**Enable Row Level Security on ALL tables:**

```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;

-- Disable public access by default
REVOKE ALL ON profiles FROM anon, authenticated;
REVOKE ALL ON service_providers FROM anon, authenticated;
REVOKE ALL ON service_requests FROM anon, authenticated;

-- Grant specific permissions via policies only
```

**Comprehensive RLS Policies:**

```sql
-- Example: Service Requests Security

-- Customers can view their own requests
CREATE POLICY "customer_view_own_requests" ON service_requests
  FOR SELECT
  USING (auth.uid() = customer_id);

-- Providers can view requests assigned to them
CREATE POLICY "provider_view_assigned_requests" ON service_requests
  FOR SELECT
  USING (
    provider_id IN (
      SELECT id FROM service_providers WHERE user_id = auth.uid()
    )
  );

-- Customers can create requests (but only for themselves)
CREATE POLICY "customer_create_requests" ON service_requests
  FOR INSERT
  WITH CHECK (auth.uid() = customer_id);

-- Customers can update only pending requests
CREATE POLICY "customer_update_pending_requests" ON service_requests
  FOR UPDATE
  USING (auth.uid() = customer_id AND status = 'pending')
  WITH CHECK (auth.uid() = customer_id);

-- Providers can update assigned requests
CREATE POLICY "provider_update_assigned_requests" ON service_requests
  FOR UPDATE
  USING (
    provider_id IN (
      SELECT id FROM service_providers WHERE user_id = auth.uid()
    )
  );

-- Admins have full access
CREATE POLICY "admin_full_access" ON service_requests
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );
```

---

## 7. XSS Prevention

### 🛡️ Cross-Site Scripting Protection

**React automatically escapes output, but be careful:**

```tsx
// ✅ SAFE - React escapes by default
<div>{userInput}</div>

// ❌ DANGEROUS - Bypasses escaping
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ SAFE - If you must use HTML, sanitize first
import DOMPurify from 'dompurify'
<div dangerouslySetInnerHTML={{ 
  __html: DOMPurify.sanitize(userInput) 
}} />
```

**Content Security Policy (CSP):**

```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' js.stripe.com maps.googleapis.com;
      style-src 'self' 'unsafe-inline' fonts.googleapis.com;
      img-src 'self' data: https: blob:;
      font-src 'self' fonts.gstatic.com;
      connect-src 'self' *.supabase.co *.stripe.com;
      frame-src js.stripe.com;
    `.replace(/\s{2,}/g, ' ').trim()
  },
]

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}
```

---

## 8. CSRF Protection

### 🛡️ Cross-Site Request Forgery Prevention

Next.js API routes with proper authentication are protected, but add extra layer:

```typescript
// lib/csrf.ts
import { randomBytes } from 'crypto'

export function generateCSRFToken(): string {
  return randomBytes(32).toString('hex')
}

export function verifyCSRFToken(token: string, sessionToken: string): boolean {
  return token === sessionToken
}

// Store in session/cookie
// Verify on sensitive operations (delete, update, payment)
```

**SameSite Cookie Attribute:**

```typescript
// Supabase automatically sets this, but verify:
{
  name: 'session',
  value: 'token',
  httpOnly: true,
  secure: true,
  sameSite: 'lax', // or 'strict'
}
```

---

## 9. SQL Injection Prevention

✅ **Using Supabase = Automatic Protection**

Supabase uses PostgREST which automatically parameterizes queries.

**Just avoid raw SQL:**

```typescript
// ✅ SAFE
await supabase
  .from('users')
  .select('*')
  .eq('email', userEmail)

// ❌ AVOID
await supabase.rpc('execute_raw_sql', {
  query: `SELECT * FROM users WHERE email = '${userEmail}'`
})
```

---

## 10. File Upload Security

### 📁 Secure File Upload Checklist

```typescript
// lib/fileUpload.ts
import { z } from 'zod'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export const fileSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_SIZE, 'File too large (max 5MB)')
    .refine(
      (file) => ALLOWED_TYPES.includes(file.type),
      'Invalid file type. Only JPG, PNG, WEBP, and PDF allowed'
    ),
})

export async function uploadFile(file: File, userId: string) {
  // Validate
  const validated = fileSchema.parse({ file })
  
  // Generate safe filename
  const ext = file.name.split('.').pop()
  const filename = `${userId}-${Date.now()}.${ext}`
  
  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from('uploads')
    .upload(filename, file, {
      cacheControl: '3600',
      upsert: false,
    })
  
  return data?.path
}
```

**Prevent file execution:**

```typescript
// Supabase Storage configuration
// Set proper Content-Type headers to prevent execution
const { data } = await supabase.storage
  .from('uploads')
  .upload(path, file, {
    contentType: file.type, // Explicit type
    cacheControl: '3600',
  })
```

---

## 11. Payment Security (Stripe)

### 💳 Stripe Security Best Practices

```typescript
// app/api/webhooks/stripe/route.ts
import Stripe from 'stripe'
import { headers } from 'next/headers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('stripe-signature')!

  let event: Stripe.Event

  try {
    // ✅ CRITICAL: Verify webhook signature
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    // ❌ Invalid signature - reject
    return new Response('Webhook signature verification failed', { 
      status: 400 
    })
  }

  // Process verified event
  switch (event.type) {
    case 'checkout.session.completed':
      // Handle payment...
      break
  }

  return new Response(JSON.stringify({ received: true }))
}
```

**Never store card details:**
```typescript
// ❌ NEVER do this
const cardData = {
  number: '4242424242424242',
  cvv: '123',
}

// ✅ Use Stripe Elements (PCI compliant)
// Stripe handles card data, you only get token
```

---

## 12. HTTPS & Transport Security

### 🔒 Force HTTPS

**Vercel automatically provides HTTPS, but enforce:**

```typescript
// middleware.ts
export function middleware(req: NextRequest) {
  const url = req.nextUrl
  
  // Redirect HTTP to HTTPS in production
  if (
    process.env.NODE_ENV === 'production' &&
    req.headers.get('x-forwarded-proto') !== 'https'
  ) {
    return NextResponse.redirect(
      `https://${url.hostname}${url.pathname}${url.search}`,
      301
    )
  }

  return NextResponse.next()
}
```

**Security Headers:**

```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self)'
  },
]

module.exports = {
  async headers() {
    return [{
      source: '/:path*',
      headers: securityHeaders,
    }]
  },
}
```

---

## 13. Error Handling & Logging

### 🔍 Secure Error Handling

```typescript
// lib/errorHandler.ts

// ❌ BAD - Exposes internals
catch (error) {
  return Response.json({ error: error.message })
}

// ✅ GOOD - Generic message to user, log details
catch (error) {
  console.error('Error in service request:', error)
  
  // Send to monitoring (Sentry)
  Sentry.captureException(error)
  
  // Generic message to user
  return Response.json(
    { error: 'An error occurred. Please try again.' },
    { status: 500 }
  )
}
```

**Never log sensitive data:**

```typescript
// ❌ DON'T log passwords, tokens, API keys
console.log('User password:', password)
console.log('Stripe key:', process.env.STRIPE_SECRET_KEY)

// ✅ Log safely
console.log('User login attempt:', { 
  email: user.email,
  timestamp: new Date(),
  success: true 
})
```

---

## 14. Security Headers

### 🛡️ Complete Security Headers

```typescript
// next.config.js
const securityHeaders = [
  // Prevent clickjacking
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  // Prevent MIME sniffing
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Enable XSS filter
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  // Force HTTPS
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // Control referrer information
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Control browser features
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self)',
  },
  // Content Security Policy
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
]

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.stripe.com *.googleapis.com;
  style-src 'self' 'unsafe-inline' fonts.googleapis.com;
  img-src 'self' blob: data: https:;
  font-src 'self' fonts.gstatic.com;
  connect-src 'self' *.supabase.co *.stripe.com;
  frame-src 'self' *.stripe.com;
`

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}
```

---

## 15. Dependency Security

### 📦 Package Security

```bash
# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix

# Force fix (may break changes)
npm audit fix --force

# Check specific package
npm view package-name
```

**Regular Updates:**

```bash
# Update all packages
npm update

# Check outdated
npm outdated

# Update to latest
npm install package-name@latest
```

**Use Dependabot (GitHub):**

Create `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

---

## 16. Security Testing

### 🧪 Pre-Launch Security Tests

**Automated Tests:**

```bash
# 1. npm audit
npm audit

# 2. Check for exposed secrets
git log --all -p | grep -E 'sk_live|sk_test|service_role|api_key'

# 3. Lighthouse security audit
npm install -g @lhci/cli
lhci autorun --collect.url=http://localhost:3000

# 4. OWASP ZAP scan (optional)
# Visit https://www.zaproxy.org/
```

**Manual Security Checklist:**

- [ ] SQL Injection test (try `' OR '1'='1` in inputs)
- [ ] XSS test (try `<script>alert('XSS')</script>` in inputs)
- [ ] CSRF test (submit forms from external site)
- [ ] Rate limit test (spam API endpoint)
- [ ] Authentication bypass test
- [ ] File upload malicious file test
- [ ] Privilege escalation test
- [ ] Session hijacking test

---

## Final Pre-Deployment Checklist

### 🚀 MANDATORY Before Going Live

```bash
✅ Environment Variables
  [ ] All API keys in environment variables
  [ ] No hardcoded secrets in code
  [ ] .env files in .gitignore
  [ ] Production keys (not test keys) in Vercel

✅ Rate Limiting
  [ ] Login endpoint rate limited (5/15min)
  [ ] API endpoints rate limited (100/15min)
  [ ] Service request rate limited (10/hour)
  [ ] File upload rate limited (10/hour)

✅ Input Validation
  [ ] All forms validated client-side
  [ ] All API routes validated server-side (Zod)
  [ ] HTML sanitized in text fields
  [ ] File uploads validated (type, size)

✅ Authentication
  [ ] Passwords hashed (Supabase Auth)
  [ ] Sessions expire (30 min)
  [ ] Email verification required
  [ ] Password reset working
  [ ] Secure cookies (HttpOnly, Secure, SameSite)

✅ Database Security
  [ ] Row Level Security enabled on all tables
  [ ] RLS policies tested
  [ ] No public table access
  [ ] Database backups enabled

✅ XSS/CSRF
  [ ] React escaping verified
  [ ] No dangerouslySetInnerHTML (or sanitized)
  [ ] Content Security Policy configured
  [ ] CSRF tokens for sensitive operations

✅ HTTPS
  [ ] HTTPS enforced (Vercel automatic)
  [ ] Security headers configured
  [ ] HSTS enabled

✅ Stripe Security
  [ ] Using live keys (not test)
  [ ] Webhook signature verification
  [ ] No card data stored

✅ Error Handling
  [ ] Generic error messages to users
  [ ] Detailed errors logged (not exposed)
  [ ] Sentry/monitoring configured

✅ Dependencies
  [ ] npm audit run (no critical issues)
  [ ] All packages updated
  [ ] Dependabot enabled

✅ Testing
  [ ] Manual security tests passed
  [ ] Penetration testing completed
  [ ] No console.errors in production
```

---

## Emergency Response Plan

### 🚨 If Security Breach Occurs

**Immediate Actions (Within 1 hour):**

1. **Identify the breach**
   - Check logs for suspicious activity
   - Identify affected users/data

2. **Contain the damage**
   ```bash
   # Revoke exposed API keys
   # Supabase: Project Settings → API → Reset keys
   # Stripe: Developers → API keys → Roll secret key
   
   # Force logout all users (if needed)
   # Supabase: Run SQL
   DELETE FROM auth.sessions;
   ```

3. **Patch the vulnerability**
   - Fix the security hole
   - Deploy immediately

4. **Notify affected users**
   - Send email notifications
   - Force password reset if needed

5. **Document incident**
   - What happened
   - How it was fixed
   - Lessons learned

---

## Security Resources

### 📚 Further Reading

- **OWASP Top 10:** https://owasp.org/www-project-top-ten/
- **Next.js Security:** https://nextjs.org/docs/advanced-features/security-headers
- **Supabase Security:** https://supabase.com/docs/guides/auth/row-level-security
- **Stripe Security:** https://stripe.com/docs/security/guide
- **Web Security Academy:** https://portswigger.net/web-security

---

**✅ Security is NOT optional. Complete this checklist before launch!**

**Document Version:** 1.0  
**Last Updated:** February 11, 2026  
**Review Schedule:** Before every deployment
