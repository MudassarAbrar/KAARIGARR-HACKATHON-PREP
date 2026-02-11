# Security Infrastructure Setup Guide
## Karigar Project

This guide explains how to use the security files created for your project.

---

## 📁 Files Created

1. **`lib/ratelimit.ts`** - Rate limiting module
2. **`lib/validations.ts`** - Input validation schemas
3. **`scripts/security-test.js`** - Automated security testing
4. **`.env.example`** - Environment variables template
5. **`.gitignore`** - Git ignore configuration

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Core dependencies
npm install zod @hookform/resolvers

# Rate limiting (Upstash)
npm install @upstash/ratelimit @upstash/redis

# Sanitization
npm install dompurify
npm install -D @types/dompurify

# Server-only marker
npm install server-only
```

### 2. Set Up Environment Variables

```bash
# Copy the example file
copy .env.example .env.local

# Edit .env.local and fill in your actual API keys
# Get keys from:
# - Supabase: https://supabase.com/dashboard
# - Stripe: https://dashboard.stripe.com
# - Google Maps: https://console.cloud.google.com
# - Resend: https://resend.com
# - Upstash: https://console.upstash.com
```

### 3. Configure Security Testing Script

Add to `package.json`:

```json
{
  "scripts": {
    "security:test": "node scripts/security-test.js",
    "precommit": "npm run security:test",
    "predeploy": "npm run security:test"
  }
}
```

### 4. Run Security Tests

```bash
# Run security checks
npm run security:test
```

---

## 📖 Usage Examples

### Rate Limiting

**In API Routes:**

```typescript
// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { applyRateLimit, loginRateLimit } from '@/lib/ratelimit'
import { loginSchema } from '@/lib/validations'

export async function POST(req: NextRequest) {
  // 1. Apply rate limit
  const rateLimitResult = await applyRateLimit(req, loginRateLimit)
  if (!rateLimitResult.success) {
    return rateLimitResult.response // Returns 429 Too Many Requests
  }

  // 2. Validate input
  const body = await req.json()
  const { email, password } = loginSchema.parse(body)

  // 3. Continue with authentication logic...
  
  return NextResponse.json({ success: true })
}
```

**Different Rate Limiters:**

```typescript
import {
  loginRateLimit,          // 5 requests / 15 min
  apiRateLimit,            // 100 requests / 15 min
  serviceRequestRateLimit, // 10 requests / 1 hour
  reviewRateLimit,         // 5 reviews / 1 hour
  fileUploadRateLimit,     // 10 uploads / 1 hour
} from '@/lib/ratelimit'
```

---

### Input Validation

**Client-Side (React Hook Form):**

```typescript
// components/forms/ServiceRequestForm.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { serviceRequestSchema, ServiceRequestInput } from '@/lib/validations'

export function ServiceRequestForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceRequestInput>({
    resolver: zodResolver(serviceRequestSchema),
  })

  const onSubmit = async (data: ServiceRequestInput) => {
    const response = await fetch('/api/requests', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('description')} />
      {errors.description && <span>{errors.description.message}</span>}
      
      <button type="submit">Submit</button>
    </form>
  )
}
```

**Server-Side (API Route):**

```typescript
// app/api/requests/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { serviceRequestSchema } from '@/lib/validations'
import { z } from 'zod'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Validate - will throw if invalid
    const validated = serviceRequestSchema.parse(body)
    
    // Data is now type-safe and sanitized
    // Save to database...
    
    return NextResponse.json({ success: true })
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: error.errors 
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal error' },
      { status: 500 }
    )
  }
}
```

**Available Validation Schemas:**

```typescript
import {
  // Authentication
  loginSchema,
  registerSchema,
  passwordResetSchema,
  
  // Profiles
  customerProfileSchema,
  providerProfileSchema,
  
  // Services
  serviceSchema,
  serviceCategorySchema,
  
  // Service Requests
  serviceRequestSchema,
  serviceRequestStatusSchema,
  
  // Reviews
  reviewSchema,
  
  // Search
  providerSearchSchema,
  
  // Common
  emailSchema,
  passwordSchema,
  phoneSchema,
  priceSchema,
} from '@/lib/validations'
```

---

### Security Testing

**Before Every Commit:**

```bash
npm run security:test
```

**What It Checks:**

✅ `.gitignore` configuration  
✅ No hardcoded API keys in code  
✅ `.env.example` exists and complete  
✅ No npm vulnerabilities  
✅ No secrets in git history  
✅ Security headers configured  
✅ Input validation present  
✅ Rate limiting implemented  
✅ No dangerous functions  
✅ TypeScript strict mode  
✅ HTTPS enforcement  

**Example Output:**

```
══════════════════════════════════════════════════════════════════
  1. GITIGNORE CONFIGURATION
══════════════════════════════════════════════════════════════════

✓ .env files in .gitignore

══════════════════════════════════════════════════════════════════
  TEST SUMMARY
══════════════════════════════════════════════════════════════════

Total Tests:   15
Passed:        15
Failed:        0
Warnings:      0

Success Rate:  100.0%

✓ ALL SECURITY CHECKS PASSED!
Your application is ready for deployment.
```

---

## 🔒 Security Checklist

### Before Development

- [ ] Copy `.env.example` to `.env.local`
- [ ] Fill in all API keys in `.env.local`
- [ ] Install all security dependencies
- [ ] Run `npm run security:test`

### During Development

- [ ] Use validation schemas for all forms
- [ ] Apply rate limiting to all API routes
- [ ] Never hardcode API keys
- [ ] Test security before each commit
- [ ] Use TypeScript for type safety

### Before Deployment

- [ ] Run `npm run security:test` (must pass 100%)
- [ ] Check `npm audit` (no critical vulnerabilities)
- [ ] Set environment variables in Vercel
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Configure security headers
- [ ] Test all rate limiters
- [ ] Verify no secrets in git history

---

## 🚨 Emergency Procedures

### If API Key Is Exposed

1. **Immediate Actions:**

```bash
# 1. Revoke the exposed key immediately
# - Supabase: Project Settings → API → Reset
# - Stripe: Dashboard → API Keys → Roll
# - Upstash: Console → Reset Token

# 2. Generate new keys

# 3. Update .env.local
# (Edit the file with new keys)

# 4. Update Vercel environment variables
vercel env add STRIPE_SECRET_KEY production
# (Paste new key)

# 5. Redeploy
vercel --prod
```

2. **Clean Git History:**

```bash
# Remove secret from git history (CAREFUL!)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (after team coordination)
git push origin --force --all
```

### If Security Test Fails

```bash
# Run test to see what failed
npm run security:test

# Fix issues shown in output

# Re-run test
npm run security:test

# Must pass before deploying
```

---

## 📚 Additional Resources

### Rate Limiting
- [Upstash Documentation](https://upstash.com/docs/redis/features/ratelimiting)
- [Rate Limiting Best Practices](https://cloud.google.com/architecture/rate-limiting-strategies-techniques)

### Input Validation
- [Zod Documentation](https://zod.dev/)
- [OWASP Input Validation](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)

### Security Testing
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [npm Security Best Practices](https://docs.npmjs.com/security-best-practices)

### Environment Variables
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Twelve-Factor App](https://12factor.net/config)

---

## 💡 Pro Tips

1. **Development vs Production:**
   - Use test API keys in `.env.local`
   - Use live API keys in Vercel (production only)

2. **Rate Limiting:**
   - Be generous in development (`simpleRateLimit`)
   - Be strict in production (Upstash)

3. **Validation:**
   - Always validate on both client and server
   - Client validation = UX
   - Server validation = Security

4. **Testing:**
   - Run security tests locally before every commit
   - Run in CI/CD pipeline
   - Block deployments if tests fail

5. **Monitoring:**
   - Set up Sentry for error tracking
   - Monitor rate limit hits in Upstash dashboard
   - Check npm audit weekly

---

## 🎯 Quick Commands Reference

```bash
# Install dependencies
npm install zod @upstash/ratelimit @upstash/redis dompurify server-only

# Set up environment
copy .env.example .env.local

# Run security tests
npm run security:test

# Check vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Update packages
npm update

# Deploy to Vercel
vercel --prod
```

---

## ✅ Success Criteria

Your security setup is complete when:

- ✅ Security test passes 100%
- ✅ No hardcoded secrets in code
- ✅ All validation schemas implemented
- ✅ Rate limiting on all API routes
- ✅ Environment variables configured
- ✅ `.gitignore` prevents secret commits
- ✅ npm audit shows no critical issues

---

**Remember: Security is not optional. Complete this setup before writing any code!**

For questions or issues, refer to the SECURITY_CHECKLIST.md document.
