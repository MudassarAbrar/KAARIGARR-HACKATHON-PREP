# Tech Stack Document
## Karigar - Hyperlocal Services Marketplace

---

**Version:** 1.0  
**Date:** February 11, 2026  
**Project:** Karigar Hackathon  

---

## 📋 Table of Contents

1. [Tech Stack Overview](#tech-stack-overview)
2. [Core Technologies](#core-technologies)
3. [Supporting Services](#supporting-services)
4. [Development Tools](#development-tools)
5. [Architecture Diagram](#architecture-diagram)
6. [Technology Justifications](#technology-justifications)
7. [Integration Strategy](#integration-strategy)
8. [Deployment Strategy](#deployment-strategy)
9. [Environment Configuration](#environment-configuration)
10. [Getting Started](#getting-started)

---

## 1. Tech Stack Overview

### 1.1 Stack Summary

```
Frontend:      Next.js 14+ (App Router)
UI/Design:     Stitch (Google's UI design tool)
Database:      Supabase (PostgreSQL)
Authentication: Supabase Auth (Primary) / Clerk (Alternative)
Payments:      Stripe
Hosting:       Vercel (Frontend) + Supabase Cloud (Backend)
```

### 1.2 Technology Categories

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Frontend Framework** | Next.js 14+ | Server-side rendering, routing, API routes |
| **UI Design** | Stitch | Design system and UI components |
| **Styling** | Tailwind CSS | Utility-first CSS framework |
| **Database** | Supabase (PostgreSQL) | Primary data storage |
| **Authentication** | Supabase Auth | User authentication & authorization |
| **Payment Processing** | Stripe | Payment gateway for transactions |
| **File Storage** | Supabase Storage | Profile images, documents |
| **Maps/Location** | Google Maps API | Location search and display |
| **Email Service** | Resend | Transactional emails |
| **Real-time** | Supabase Realtime | Live updates for requests/bookings |
| **State Management** | Zustand | Global state management |
| **Form Handling** | React Hook Form | Form validation and management |
| **API Communication** | Axios / Fetch | HTTP requests |
| **Deployment** | Vercel | Production hosting |
| **Version Control** | Git + GitHub | Code repository |

---

## 2. Core Technologies

### 2.1 Frontend: Next.js 14+

**Choice:** Next.js with App Router  
**Version:** 14.x or latest  

**Why Next.js?**
- ✅ **Server-Side Rendering (SSR):** Better SEO for service provider profiles
- ✅ **Static Site Generation (SSG):** Fast loading for category pages
- ✅ **API Routes:** Built-in backend endpoints
- ✅ **Image Optimization:** Automatic image optimization
- ✅ **File-based Routing:** Intuitive project structure
- ✅ **React Server Components:** Better performance
- ✅ **TypeScript Support:** Type safety out of the box

**Key Features to Use:**
```javascript
// App Router Structure
app/
├── (auth)/
│   ├── login/
│   ├── register/
│   └── layout.tsx
├── (customer)/
│   ├── dashboard/
│   ├── browse/
│   ├── providers/
│   ├── requests/
│   └── layout.tsx
├── (provider)/
│   ├── dashboard/
│   ├── profile/
│   ├── requests/
│   ├── bookings/
│   └── layout.tsx
├── (admin)/
│   ├── dashboard/
│   ├── users/
│   ├── providers/
│   └── layout.tsx
├── api/
│   ├── auth/
│   ├── providers/
│   ├── requests/
│   └── reviews/
└── layout.tsx
```

**Dependencies:**
```json
{
  "next": "^14.2.0",
  "react": "^18.3.0",
  "react-dom": "^18.3.0",
  "typescript": "^5.4.0"
}
```

---

### 2.2 UI/Design: Stitch + Tailwind CSS

**Design System:** Stitch by Google  
**Styling Framework:** Tailwind CSS  

**Why Stitch?**
- ✅ **AI-Powered Design:** Generate UI screens quickly
- ✅ **Component Library:** Pre-built, professional components
- ✅ **Design Consistency:** Unified design language
- ✅ **Export to Code:** Convert designs to React components
- ✅ **Responsive by Default:** Mobile-first approach

**Tailwind CSS Configuration:**
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        secondary: {
          500: '#8b5cf6',
          600: '#7c3aed',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

**UI Component Structure:**
```
components/
├── ui/              # Base UI components from Stitch
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Modal.tsx
│   ├── Badge.tsx
│   └── Avatar.tsx
├── layout/          # Layout components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Sidebar.tsx
│   └── Container.tsx
├── features/        # Feature-specific components
│   ├── ProviderCard.tsx
│   ├── ServiceRequestForm.tsx
│   ├── ReviewCard.tsx
│   ├── RatingStars.tsx
│   └── StatusBadge.tsx
└── shared/          # Shared components
    ├── LoadingSpinner.tsx
    ├── ErrorMessage.tsx
    └── EmptyState.tsx
```

---

### 2.3 Database: Supabase (PostgreSQL)

**Platform:** Supabase  
**Database Engine:** PostgreSQL 15+  

**Why Supabase?**
- ✅ **Instant APIs:** Auto-generated REST and GraphQL APIs
- ✅ **Real-time Subscriptions:** Live data updates
- ✅ **Built-in Authentication:** Integrated auth system
- ✅ **Row Level Security:** Database-level permissions
- ✅ **Storage:** File storage included
- ✅ **Edge Functions:** Serverless functions
- ✅ **Free Tier:** Generous free tier for development

**Database Schema:**
```sql
-- Users table (managed by Supabase Auth)
-- Extended with profiles table

-- Profiles
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  role VARCHAR(20) NOT NULL CHECK (role IN ('customer', 'provider', 'admin')),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone_number VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Service Providers
CREATE TABLE service_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) UNIQUE NOT NULL,
  business_name VARCHAR(200),
  bio TEXT,
  profile_photo_url TEXT,
  service_area VARCHAR(200),
  city VARCHAR(100),
  state VARCHAR(100),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_verified BOOLEAN DEFAULT FALSE,
  average_rating DECIMAL(3, 2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Service Categories
CREATE TABLE service_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  icon_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Services
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES service_providers(id) ON DELETE CASCADE,
  category_id UUID REFERENCES service_categories(id),
  name VARCHAR(200) NOT NULL,
  description TEXT,
  base_price DECIMAL(10, 2),
  price_unit VARCHAR(50), -- 'per_hour', 'per_job', 'per_sqft'
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Service Requests
CREATE TABLE service_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES profiles(id),
  provider_id UUID REFERENCES service_providers(id),
  service_id UUID REFERENCES services(id),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'rescheduled', 'completed', 'cancelled', 'rejected')),
  preferred_date DATE NOT NULL,
  preferred_time TIME NOT NULL,
  description TEXT,
  address TEXT,
  rejection_reason TEXT,
  proposed_alternate_date DATE,
  proposed_alternate_time TIME,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  cancelled_at TIMESTAMP
);

-- Reviews
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID REFERENCES service_requests(id) UNIQUE,
  customer_id UUID REFERENCES profiles(id),
  provider_id UUID REFERENCES service_providers(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_moderated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Availability
CREATE TABLE availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID REFERENCES service_providers(id) ON DELETE CASCADE,
  day_of_week INTEGER CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  UNIQUE(provider_id, day_of_week)
);

-- Indexes for performance
CREATE INDEX idx_providers_city ON service_providers(city);
CREATE INDEX idx_providers_verified ON service_providers(is_verified);
CREATE INDEX idx_services_provider ON services(provider_id);
CREATE INDEX idx_services_category ON services(category_id);
CREATE INDEX idx_requests_customer ON service_requests(customer_id);
CREATE INDEX idx_requests_provider ON service_requests(provider_id);
CREATE INDEX idx_requests_status ON service_requests(status);
CREATE INDEX idx_reviews_provider ON reviews(provider_id);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;

-- RLS Policies (examples)
-- Profiles: Users can read all, update own
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Service Providers: Public read, providers update own
CREATE POLICY "Service providers are viewable by everyone"
  ON service_providers FOR SELECT
  USING (true);

CREATE POLICY "Providers can update own profile"
  ON service_providers FOR UPDATE
  USING (auth.uid() = user_id);
```

**Supabase Client Setup:**
```typescript
// lib/supabase/client.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const supabase = createClientComponentClient()

// lib/supabase/server.ts
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const createServerSupabaseClient = () => {
  return createServerComponentClient({ cookies })
}
```

---

### 2.4 Authentication: Supabase Auth

**Primary Choice:** Supabase Auth  
**Alternative:** Clerk (if needed)  

**Why Supabase Auth?**
- ✅ **Integrated:** Native integration with Supabase database
- ✅ **Row Level Security:** Works seamlessly with RLS policies
- ✅ **Multiple Providers:** Email, Google, GitHub, etc.
- ✅ **JWT Tokens:** Secure token-based authentication
- ✅ **Free Tier:** Unlimited users on free plan
- ✅ **Email Templates:** Customizable email templates

**Authentication Flow:**
```typescript
// app/api/auth/signup/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, password, role, firstName, lastName } = await request.json()
  const supabase = createRouteHandlerClient({ cookies })

  // Sign up user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        role: role,
      },
    },
  })

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 400 })
  }

  // Create profile
  const { error: profileError } = await supabase
    .from('profiles')
    .insert({
      id: authData.user?.id,
      role: role,
      first_name: firstName,
      last_name: lastName,
    })

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 400 })
  }

  return NextResponse.json({ data: authData.user }, { status: 200 })
}
```

**Protected Routes Middleware:**
```typescript
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protect routes
  if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/provider/:path*', '/admin/:path*'],
}
```

**Alternative: Clerk**
```typescript
// If using Clerk instead
// Install: npm install @clerk/nextjs

// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
```

---

### 2.5 Payment Gateway: Stripe

**Service:** Stripe  
**Integration:** Stripe Checkout + Stripe Connect  

**Why Stripe?**
- ✅ **Industry Standard:** Most trusted payment platform
- ✅ **Easy Integration:** Well-documented APIs
- ✅ **Stripe Connect:** Perfect for marketplace (split payments)
- ✅ **Test Mode:** Full testing environment
- ✅ **Webhooks:** Real-time payment notifications
- ✅ **Pakistan Support:** Works in Pakistan

**Use Cases:**
1. **Customer Payments:** Customers pay for services
2. **Provider Payouts:** Pay service providers (via Stripe Connect)
3. **Platform Fee:** Deduct commission before payout
4. **Subscription:** Optional provider subscription tiers

**Stripe Setup:**
```typescript
// lib/stripe.ts
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

// app/api/payments/create-checkout/route.ts
import { stripe } from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { amount, requestId, providerId } = await req.json()

  try {
    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'pkr', // Pakistani Rupees
            product_data: {
              name: 'Service Payment',
              description: `Payment for service request #${requestId}`,
            },
            unit_amount: amount * 100, // Convert to paisa
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment/cancelled`,
      metadata: {
        requestId,
        providerId,
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    return NextResponse.json({ error: 'Payment failed' }, { status: 500 })
  }
}

// Webhook handler
// app/api/webhooks/stripe/route.ts
export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 })
  }

  // Handle events
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session
      // Update service request status to 'paid'
      // Update payment record in database
      break
    case 'payment_intent.payment_failed':
      // Handle failed payment
      break
  }

  return NextResponse.json({ received: true })
}
```

---

## 3. Supporting Services

### 3.1 Maps & Geolocation: Google Maps API

**Service:** Google Maps Platform  
**Features:** Places API, Geocoding API, Maps JavaScript API  

**Why Google Maps?**
- ✅ **Comprehensive:** Best location data for Pakistan
- ✅ **Autocomplete:** Address search autocomplete
- ✅ **Geocoding:** Convert addresses to coordinates
- ✅ **Distance Calculation:** Calculate service radius

**Usage:**
```typescript
// components/LocationSearch.tsx
import { LoadScript, Autocomplete } from '@react-google-maps/api'

const libraries: Libraries = ['places']

export default function LocationSearch({ onLocationSelect }) {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete)
  }

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace()
      onLocationSelect({
        address: place.formatted_address,
        lat: place.geometry?.location?.lat(),
        lng: place.geometry?.location?.lng(),
      })
    }
  }

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      libraries={libraries}
    >
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder="Enter location"
          className="w-full px-4 py-2 border rounded"
        />
      </Autocomplete>
    </LoadScript>
  )
}
```

**Dependencies:**
```json
{
  "@react-google-maps/api": "^2.19.3"
}
```

---

### 3.2 Email Service: Resend

**Service:** Resend  
**Purpose:** Transactional emails  

**Why Resend?**
- ✅ **Developer-First:** Simple API, great DX
- ✅ **React Email:** Send beautiful emails with React
- ✅ **Generous Free Tier:** 3,000 emails/month free
- ✅ **Fast Delivery:** Excellent deliverability

**Email Types:**
1. Welcome email (registration)
2. Service request confirmation
3. Provider response notification
4. Booking confirmation
5. Review reminder
6. Password reset

**Setup:**
```typescript
// lib/email.ts
import { Resend } from 'resend'
import { ServiceRequestEmail } from '@/emails/ServiceRequestEmail'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendServiceRequestEmail(data: {
  to: string
  customerName: string
  serviceName: string
  date: string
}) {
  await resend.emails.send({
    from: 'Karigar <noreply@karigar.com>',
    to: data.to,
    subject: 'New Service Request Received',
    react: ServiceRequestEmail(data),
  })
}

// emails/ServiceRequestEmail.tsx (React Email)
import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Button,
} from '@react-email/components'

export function ServiceRequestEmail({ customerName, serviceName, date }) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'Arial, sans-serif' }}>
        <Container>
          <Heading>New Service Request</Heading>
          <Text>Hi there,</Text>
          <Text>
            {customerName} has requested {serviceName} on {date}.
          </Text>
          <Button href="https://karigar.com/provider/requests">
            View Request
          </Button>
        </Container>
      </Body>
    </Html>
  )
}
```

**Dependencies:**
```json
{
  "resend": "^3.2.0",
  "@react-email/components": "^0.0.15"
}
```

---

### 3.3 File Storage: Supabase Storage

**Service:** Supabase Storage  
**Purpose:** Profile images, documents, service photos  

**Features:**
- ✅ **Integrated:** Part of Supabase platform
- ✅ **CDN:** Fast global delivery
- ✅ **Image Transformations:** Resize, crop on-the-fly
- ✅ **Security:** RLS policies for storage

**Buckets:**
1. `profile-photos` - User/provider profile pictures
2. `service-images` - Service photos
3. `documents` - Verification documents (admin only)

**Upload Example:**
```typescript
// lib/storage.ts
import { supabase } from '@/lib/supabase/client'

export async function uploadProfilePhoto(file: File, userId: string) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}-${Date.now()}.${fileExt}`
  const filePath = `profile-photos/${fileName}`

  const { data, error } = await supabase.storage
    .from('profile-photos')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    })

  if (error) throw error

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('profile-photos')
    .getPublicUrl(filePath)

  return publicUrl
}
```

---

### 3.4 Real-time Updates: Supabase Realtime

**Service:** Supabase Realtime  
**Purpose:** Live updates for service requests  

**Use Cases:**
- New service request notification (provider)
- Request status change (customer)
- New message in chat (future)

**Implementation:**
```typescript
// hooks/useRealtimeRequests.ts
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export function useRealtimeRequests(providerId: string) {
  const [requests, setRequests] = useState<any[]>([])

  useEffect(() => {
    // Subscribe to changes
    const channel = supabase
      .channel('service_requests')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'service_requests',
          filter: `provider_id=eq.${providerId}`,
        },
        (payload) => {
          console.log('Change received!', payload)
          // Update requests state
          if (payload.eventType === 'INSERT') {
            setRequests((prev) => [payload.new, ...prev])
          }
          // Handle UPDATE and DELETE similarly
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [providerId])

  return requests
}
```

---

### 3.5 State Management: Zustand

**Library:** Zustand  
**Purpose:** Global state management  

**Why Zustand?**
- ✅ **Lightweight:** Minimal bundle size
- ✅ **Simple API:** Easy to learn and use
- ✅ **TypeScript:** Great TS support
- ✅ **No Boilerplate:** Less code than Redux

**Stores:**
```typescript
// stores/authStore.ts
import { create } from 'zustand'

interface User {
  id: string
  email: string
  role: 'customer' | 'provider' | 'admin'
  firstName: string
  lastName: string
}

interface AuthState {
  user: User | null
  session: any
  setUser: (user: User | null) => void
  setSession: (session: any) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  logout: () => set({ user: null, session: null }),
}))

// stores/requestStore.ts
interface RequestState {
  requests: any[]
  selectedRequest: any | null
  setRequests: (requests: any[]) => void
  setSelectedRequest: (request: any) => void
  addRequest: (request: any) => void
  updateRequest: (id: string, updates: any) => void
}

export const useRequestStore = create<RequestState>((set) => ({
  requests: [],
  selectedRequest: null,
  setRequests: (requests) => set({ requests }),
  setSelectedRequest: (request) => set({ selectedRequest: request }),
  addRequest: (request) =>
    set((state) => ({ requests: [...state.requests, request] })),
  updateRequest: (id, updates) =>
    set((state) => ({
      requests: state.requests.map((r) =>
        r.id === id ? { ...r, ...updates } : r
      ),
    })),
}))
```

---

### 3.6 Form Handling: React Hook Form + Zod

**Libraries:**
- React Hook Form (form state management)
- Zod (schema validation)

**Why This Combo?**
- ✅ **Performance:** Minimal re-renders
- ✅ **Type-Safe:** Full TypeScript support
- ✅ **DX:** Great developer experience
- ✅ **Validation:** Powerful schema validation

**Example:**
```typescript
// lib/validations/serviceRequest.ts
import { z } from 'zod'

export const serviceRequestSchema = z.object({
  serviceId: z.string().uuid('Invalid service ID'),
  preferredDate: z.date({
    required_error: 'Please select a date',
  }),
  preferredTime: z.string().min(1, 'Please select a time'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description too long'),
  address: z.string().min(5, 'Please provide a valid address'),
})

export type ServiceRequestFormData = z.infer<typeof serviceRequestSchema>

// components/ServiceRequestForm.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { serviceRequestSchema, ServiceRequestFormData } from '@/lib/validations/serviceRequest'

export function ServiceRequestForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ServiceRequestFormData>({
    resolver: zodResolver(serviceRequestSchema),
  })

  const onSubmit = async (data: ServiceRequestFormData) => {
    // Submit to API
    const response = await fetch('/api/requests', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('serviceId')} type="hidden" />
      
      <div>
        <label>Preferred Date</label>
        <input {...register('preferredDate')} type="date" />
        {errors.preferredDate && <span>{errors.preferredDate.message}</span>}
      </div>

      {/* More fields */}

      <button type="submit" disabled={isSubmitting}>
        Submit Request
      </button>
    </form>
  )
}
```

**Dependencies:**
```json
{
  "react-hook-form": "^7.51.0",
  "zod": "^3.22.4",
  "@hookform/resolvers": "^3.3.4"
}
```

---

## 4. Development Tools

### 4.1 Code Quality

**ESLint + Prettier**
```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}

// .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

---

### 4.2 Environment Variables Management

**Tool:** dotenv + .env.local  

**Environment Files:**
```bash
# .env.local (local development)
# .env.production (production - in Vercel)

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key

# Resend
RESEND_API_KEY=re_...

# App URL
NEXT_PUBLIC_URL=http://localhost:3000
```

---

### 4.3 Testing (Optional but Recommended)

**Unit Testing:** Jest + React Testing Library  
**E2E Testing:** Playwright  

```json
{
  "@testing-library/react": "^14.2.1",
  "@testing-library/jest-dom": "^6.4.2",
  "jest": "^29.7.0",
  "@playwright/test": "^1.42.0"
}
```

---

### 4.4 Error Tracking & Monitoring

**Service:** Sentry (Optional)  

**Why Sentry?**
- Track production errors
- Performance monitoring
- User session replay
- Free tier available

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
})
```

---

### 4.5 Analytics (Optional)

**Service:** Vercel Analytics or Google Analytics  

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

---

## 5. Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │           Next.js 14+ (App Router + RSC)                  │   │
│  │  - Server Components (SSR/SSG)                            │   │
│  │  - Client Components (Interactive UI)                     │   │
│  │  - API Routes (/app/api)                                  │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              UI Layer (Stitch + Tailwind)                 │   │
│  │  - Design System Components                               │   │
│  │  - Feature Components                                     │   │
│  │  - Layout Components                                      │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                       STATE MANAGEMENT                           │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Zustand Stores: Auth, Requests, Provider, UI State      │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND SERVICES                            │
│  ┌──────────────┬──────────────┬──────────────┬──────────────┐  │
│  │  Supabase    │   Stripe     │ Google Maps  │   Resend     │  │
│  │  ────────    │   ──────     │  ──────────  │   ──────     │  │
│  │  • Auth      │   • Checkout │  • Places    │   • Emails   │  │
│  │  • Database  │   • Connect  │  • Geocoding │              │  │
│  │  • Storage   │   • Webhooks │  • Distance  │              │  │
│  │  • Realtime  │              │              │              │  │
│  └──────────────┴──────────────┴──────────────┴──────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                       DATA LAYER                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │           Supabase PostgreSQL Database                    │   │
│  │  - Users & Profiles                                       │   │
│  │  - Service Providers                                      │   │
│  │  - Services & Categories                                  │   │
│  │  - Service Requests                                       │   │
│  │  - Reviews & Ratings                                      │   │
│  │  - Availability                                           │   │
│  │  - Row Level Security (RLS)                               │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                     DEPLOYMENT & HOSTING                         │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Vercel (Frontend + API Routes) + Supabase Cloud         │   │
│  │  - Edge Functions                                         │   │
│  │  - CDN Distribution                                       │   │
│  │  - Automatic Deployments                                  │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. Technology Justifications

### 6.1 Next.js vs Alternatives

| Framework | Pros | Cons | Decision |
|-----------|------|------|----------|
| **Next.js** | ✅ SSR/SSG<br>✅ API routes<br>✅ Great DX<br>✅ Vercel integration | ❌ Learning curve<br>❌ Bundle size | ✅ **CHOSEN** |
| Vite + React | ✅ Fast<br>✅ Simple | ❌ No SSR<br>❌ Manual setup | ❌ |
| Remix | ✅ Data loading<br>✅ Progressive enhancement | ❌ Smaller ecosystem | ❌ |

---

### 6.2 Supabase vs Alternatives

| Database | Pros | Cons | Decision |
|----------|------|------|----------|
| **Supabase** | ✅ Instant APIs<br>✅ Real-time<br>✅ Auth included<br>✅ Storage | ❌ Vendor lock-in | ✅ **CHOSEN** |
| Firebase | ✅ Google backing<br>✅ Real-time | ❌ NoSQL<br>❌ Pricing | ❌ |
| MongoDB Atlas | ✅ Flexible schema | ❌ No relations<br>❌ More setup | ❌ |
| PostgreSQL (self-hosted) | ✅ Full control | ❌ Maintenance<br>❌ Time-consuming | ❌ |

---

### 6.3 Supabase Auth vs Clerk

| Feature | Supabase Auth | Clerk | Decision |
|---------|---------------|-------|----------|
| **Pricing** | Free unlimited users | Free 10K users/month | Supabase wins |
| **Integration** | Native with Supabase | External service | Supabase wins |
| **UI Components** | Basic | Beautiful pre-built | Clerk wins |
| **Customization** | Full control | Limited | Supabase wins |
| **RLS Integration** | Seamless | Requires mapping | Supabase wins |
| **Social Logins** | Supported | Supported | Tie |

**Recommendation:** Use **Supabase Auth** for cost-effectiveness and tight integration. Switch to Clerk only if premium UI is critical.

---

## 7. Integration Strategy

### 7.1 Phase 1: Foundation (Days 1-2)
```bash
# Setup
1. Create Next.js project
   npx create-next-app@latest karigar --typescript --tailwind --app

2. Install dependencies
   npm install @supabase/auth-helpers-nextjs @supabase/supabase-js
   npm install zustand react-hook-form zod @hookform/resolvers
   npm install stripe @stripe/stripe-js
   npm install @react-google-maps/api
   npm install resend @react-email/components

3. Configure Supabase
   - Create Supabase project
   - Set up database schema
   - Configure authentication
   - Enable Row Level Security

4. Set up environment variables
   - Create .env.local
   - Add all API keys

5. Configure Tailwind
   - Customize theme
   - Add plugins
```

---

### 7.2 Phase 2: Core Features (Days 3-7)

**Day 3-4: Authentication & User Management**
- Implement Supabase Auth
- Create registration flows (customer/provider)
- Build profile pages
- Set up protected routes

**Day 5-6: Service Provider Features**
- Provider profile creation
- Service management
- Availability settings
- Request management dashboard

**Day 7: Customer Features**
- Browse service categories
- Provider search & filtering
- Provider profile viewing
- Service request form

---

### 7.3 Phase 3: Advanced Features (Days 8-12)

**Day 8-9: Request Workflow**
- Request submission
- Status management
- Real-time updates (Supabase Realtime)
- Email notifications (Resend)

**Day 10: Reviews & Ratings**
- Rating system
- Review submission
- Review display
- Average rating calculation

**Day 11: Payment Integration**
- Stripe checkout
- Payment confirmation
- Webhook handling

**Day 12: Admin Panel (Bonus)**
- User management
- Provider verification
- Review moderation
- Analytics dashboard

---

### 7.4 Phase 4: Polish & Deploy (Days 13-14)

**Day 13: UI Polish**
- Stitch design system implementation
- Responsive design
- Loading states
- Error handling

**Day 14: Testing & Deployment**
- Bug fixes
- Performance optimization
- Vercel deployment
- Production testing

---

## 8. Deployment Strategy

### 8.1 Vercel Deployment

**Setup:**
```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/karigar.git
git push -u origin main

# 2. Connect to Vercel
# - Visit https://vercel.com
# - Import GitHub repository
# - Add environment variables
# - Deploy

# 3. Configure domains
# - Add custom domain (optional)
# - Enable automatic deployments
```

**Environment Variables in Vercel:**
```
Production Environment:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
- RESEND_API_KEY
- NEXT_PUBLIC_URL
```

---

### 8.2 Supabase Configuration

**Production Setup:**
1. Upgrade to Pro plan (if needed)
2. Configure custom domain
3. Set up database backups
4. Enable Point-in-Time Recovery
5. Set up monitoring and alerts

---

### 8.3 Stripe Configuration

**Production Checklist:**
1. Switch from test to live API keys
2. Configure webhooks endpoint
3. Set up Stripe Connect (for provider payouts)
4. Verify business information
5. Enable supported payment methods

---

## 9. Environment Configuration

### 9.1 Complete .env.local Template

```bash
# ===================================
# SUPABASE
# ===================================
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# ===================================
# STRIPE
# ===================================
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# ===================================
# GOOGLE MAPS
# ===================================
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# ===================================
# RESEND (Email)
# ===================================
RESEND_API_KEY=re_...

# ===================================
# APP CONFIGURATION
# ===================================
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Karigar
NODE_ENV=development

# ===================================
# OPTIONAL: CLERK (if using instead of Supabase Auth)
# ===================================
# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
# CLERK_SECRET_KEY=sk_test_...

# ===================================
# OPTIONAL: SENTRY (Error Tracking)
# ===================================
# NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...
```

---

### 9.2 API Key Setup Guides

**Supabase:**
1. Visit https://supabase.com
2. Create new project
3. Go to Settings → API
4. Copy URL and anon key

**Stripe:**
1. Visit https://stripe.com
2. Create account
3. Go to Developers → API keys
4. Copy publishable and secret keys
5. For webhooks: Developers → Webhooks → Add endpoint

**Google Maps:**
1. Visit https://console.cloud.google.com
2. Create project
3. Enable Maps JavaScript API, Places API, Geocoding API
4. Go to Credentials → Create API key
5. Restrict key to your domain

**Resend:**
1. Visit https://resend.com
2. Sign up
3. Add domain (or use resend.dev for testing)
4. Generate API key

---

## 10. Getting Started

### 10.1 Quick Start Commands

```bash
# 1. Create Next.js project
npx create-next-app@latest karigar --typescript --tailwind --app --src-dir

cd karigar

# 2. Install all dependencies
npm install @supabase/auth-helpers-nextjs @supabase/supabase-js @supabase/ssr
npm install stripe @stripe/stripe-js
npm install zustand
npm install react-hook-form @hookform/resolvers zod
npm install @react-google-maps/api
npm install resend @react-email/components
npm install axios
npm install date-fns # for date formatting
npm install clsx tailwind-merge # for className utilities

# 3. Install dev dependencies
npm install -D @types/node @types/react @types/react-dom
npm install -D eslint-config-prettier prettier

# 4. Create environment file
cp .env.example .env.local
# Edit .env.local with your API keys

# 5. Run development server
npm run dev
```

---

### 10.2 Project Structure

```
karigar/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   └── layout.tsx
│   ├── (customer)/
│   │   ├── dashboard/
│   │   ├── browse/
│   │   ├── providers/
│   │   ├── requests/
│   │   └── layout.tsx
│   ├── (provider)/
│   │   ├── dashboard/
│   │   ├── profile/
│   │   ├── services/
│   │   ├── requests/
│   │   ├── bookings/
│   │   └── layout.tsx
│   ├── (admin)/
│   │   ├── dashboard/
│   │   ├── users/
│   │   ├── providers/
│   │   ├── reviews/
│   │   └── layout.tsx
│   ├── api/
│   │   ├── auth/
│   │   ├── providers/
│   │   ├── services/
│   │   ├── requests/
│   │   ├── reviews/
│   │   ├── payments/
│   │   └── webhooks/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/              # Stitch components
│   ├── layout/
│   ├── features/
│   └── shared/
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── stripe.ts
│   ├── email.ts
│   ├── utils.ts
│   └── validations/
├── stores/
│   ├── authStore.ts
│   ├── requestStore.ts
│   └── providerStore.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useRequests.ts
│   └── useRealtime.ts
├── types/
│   └── database.types.ts
├── emails/              # React Email templates
├── public/
├── .env.local
├── .env.example
├── middleware.ts
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

### 10.3 First Steps Checklist

- [ ] Create Next.js project
- [ ] Install all dependencies
- [ ] Set up Supabase project
- [ ] Create database schema
- [ ] Configure environment variables
- [ ] Set up authentication
- [ ] Create basic layouts
- [ ] Implement Stitch design system
- [ ] Build first feature (registration)
- [ ] Test locally
- [ ] Deploy to Vercel

---

## 11. Additional Recommendations

### 11.1 Optional Enhancements

**Progressive Web App (PWA):**
```bash
npm install next-pwa
# Configure in next.config.js for offline support
```

**Internationalization (i18n):**
```bash
npm install next-intl
# Support multiple languages (Urdu, English)
```

**SEO Optimization:**
```tsx
// app/layout.tsx
export const metadata = {
  title: 'Karigar - Find Local Service Providers',
  description: 'Connect with trusted local service providers',
  keywords: 'plumber, electrician, tutor, local services',
}
```

---

### 11.2 Performance Optimizations

**Image Optimization:**
```tsx
import Image from 'next/image'

<Image
  src="/profile.jpg"
  alt="Profile"
  width={200}
  height={200}
  priority
/>
```

**Font Optimization:**
```tsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
```

**Dynamic Imports:**
```tsx
import dynamic from 'next/dynamic'

const MapComponent = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
})
```

---

## 12. Success Metrics

### 12.1 Technical Metrics
- ✅ Lighthouse score > 90
- ✅ First Contentful Paint < 1.5s
- ✅ Time to Interactive < 3s
- ✅ Zero critical security issues
- ✅ 100% TypeScript coverage
- ✅ Mobile-responsive on all screens

### 12.2 Feature Completion
- ✅ All P0 features implemented
- ✅ User flows tested end-to-end
- ✅ Payment integration working
- ✅ Real-time updates functional
- ✅ Email notifications sent
- ✅ Admin panel (bonus) complete

---

## 13. Resources & Documentation

### 13.1 Official Documentation
- **Next.js:** https://nextjs.org/docs
- **Supabase:** https://supabase.com/docs
- **Stripe:** https://stripe.com/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **React Hook Form:** https://react-hook-form.com
- **Zustand:** https://zustand-demo.pmnd.rs

### 13.2 Learning Resources
- Next.js App Router Course: https://nextjs.org/learn
- Supabase Crash Course: https://www.youtube.com/supabase
- Stripe Integration Guide: https://stripe.com/docs/payments/quickstart

---

## 14. Team Roles & Responsibilities

### 14.1 Recommended Team Structure (3-4 members)

**Role 1: Full-Stack Lead**
- Next.js setup and architecture
- API routes
- Database schema
- Supabase integration

**Role 2: Frontend Developer**
- Stitch design implementation
- Component development
- User flows
- State management

**Role 3: Backend/Integration Specialist**
- Stripe integration
- Email service
- Google Maps API
- Webhooks

**Role 4: QA/Documentation (Optional)**
- Testing
- Bug fixes
- Documentation
- Deployment

---

## 15. Timeline Summary

| Phase | Days | Focus | Status |
|-------|------|-------|--------|
| **Setup** | 1-2 | Project initialization, dependencies | 🟡 Not Started |
| **Auth** | 3-4 | Authentication, user management | 🟡 Not Started |
| **Core Features** | 5-9 | Provider/customer features | 🟡 Not Started |
| **Advanced** | 10-12 | Payments, real-time, admin | 🟡 Not Started |
| **Polish** | 13-14 | UI/UX, testing, deployment | 🟡 Not Started |

**Total Duration:** 14 days  
**Target Launch:** [Date]

---

## 16. Final Checklist

### Pre-Development
- [ ] Tech stack approved
- [ ] APIs registered (Supabase, Stripe, Google, Resend)
- [ ] Team roles assigned
- [ ] Development environment set up
- [ ] Git repository created

### During Development
- [ ] Daily standups
- [ ] Code reviews
- [ ] Git commits with meaningful messages
- [ ] Documentation updates
- [ ] Testing as you build

### Pre-Launch
- [ ] All features tested
- [ ] Mobile responsiveness verified
- [ ] Production environment variables set
- [ ] Domain configured (if applicable)
- [ ] Performance optimized
- [ ] Security audit done
- [ ] Deployed to Vercel
- [ ] Demo video recorded

---

## Conclusion

This tech stack is **optimized for**:
- ⚡ **Fast development** (AI tools + modern frameworks)
- 🎨 **Beautiful UI** (Stitch + Tailwind)
- 🔒 **Security** (Supabase RLS + Auth)
- 💰 **Cost-effective** (Generous free tiers)
- 📈 **Scalable** (Serverless architecture)
- 🚀 **Production-ready** (Vercel + Supabase Cloud)

**Next Step:** Set up your development environment and start building! 🎉

---

**Document Owner:** Development Team  
**Last Updated:** February 11, 2026  
**Version:** 1.0
