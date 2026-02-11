/**
 * Validation Schemas for Karigar
 * 
 * This module contains all Zod validation schemas for forms and API inputs.
 * Use these schemas for both client-side and server-side validation.
 * 
 * Features:
 * - Type-safe validation with Zod
 * - Input sanitization
 * - Pakistani phone number format
 * - XSS prevention
 * - Business logic validation
 * 
 * Usage:
 * import { loginSchema, serviceRequestSchema } from '@/lib/validations'
 * const validated = loginSchema.parse(data)
 */

import { z } from 'zod'

// ============================================================================
// COMMON VALIDATION SCHEMAS
// ============================================================================

/**
 * Email validation
 * Ensures valid email format, normalized to lowercase
 */
export const emailSchema = z
  .string({
    required_error: 'Email is required',
  })
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .max(255, 'Email is too long')
  .toLowerCase()
  .trim()

/**
 * Password validation
 * Enforces strong password requirements:
 * - At least 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */
export const passwordSchema = z
  .string({
    required_error: 'Password is required',
  })
  .min(8, 'Password must be at least 8 characters')
  .max(100, 'Password is too long')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)'
  )

/**
 * Pakistani phone number validation
 * Accepts formats: +923001234567, 03001234567
 */
export const phoneSchema = z
  .string({
    required_error: 'Phone number is required',
  })
  .regex(
    /^(\+92|0)?3[0-9]{9}$/,
    'Please enter a valid Pakistani phone number (e.g., 03001234567 or +923001234567)'
  )
  .transform((val) => {
    // Normalize to +92 format
    if (val.startsWith('0')) {
      return '+92' + val.slice(1)
    }
    if (!val.startsWith('+')) {
      return '+92' + val
    }
    return val
  })

/**
 * Optional phone number (allows empty)
 */
export const phoneOptionalSchema = z
  .string()
  .regex(/^(\+92|0)?3[0-9]{9}$/, 'Invalid Pakistani phone number')
  .transform((val) => {
    if (val.startsWith('0')) return '+92' + val.slice(1)
    if (!val.startsWith('+')) return '+92' + val
    return val
  })
  .optional()
  .or(z.literal(''))

/**
 * Name validation (first/last name, business name)
 * Allows letters, spaces, hyphens, and apostrophes
 */
export const nameSchema = z
  .string({
    required_error: 'Name is required',
  })
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name is too long')
  .regex(
    /^[a-zA-Z\s'-]+$/,
    'Name can only contain letters, spaces, hyphens, and apostrophes'
  )
  .trim()

/**
 * UUID validation
 */
export const uuidSchema = z.string().uuid('Invalid ID format')

/**
 * URL validation (HTTPS only for security)
 */
export const urlSchema = z
  .string()
  .url('Please enter a valid URL')
  .max(500, 'URL is too long')
  .refine((url) => url.startsWith('https://'), 'Only HTTPS URLs are allowed')

/**
 * Price validation
 * Non-negative, max 2 decimal places, reasonable max value
 */
export const priceSchema = z
  .number({
    required_error: 'Price is required',
    invalid_type_error: 'Price must be a number',
  })
  .min(0, 'Price cannot be negative')
  .max(10000000, 'Price is too high')
  .multipleOf(0.01, 'Price can have at most 2 decimal places')

/**
 * Rating validation (1-5 stars)
 */
export const ratingSchema = z
  .number({
    required_error: 'Rating is required',
  })
  .int('Rating must be a whole number')
  .min(1, 'Rating must be at least 1 star')
  .max(5, 'Rating cannot exceed 5 stars')

// ============================================================================
// TEXT SANITIZATION SCHEMAS
// ============================================================================

/**
 * Sanitize HTML/script tags from text input
 * Use for any user-generated text that will be displayed
 */
function sanitizeText(text: string): string {
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/<[^>]*>/g, '') // Remove all HTML tags
    .trim()
}

/**
 * Short text input (e.g., titles, names)
 * Max 200 characters, sanitized
 */
export const shortTextSchema = z
  .string({
    required_error: 'This field is required',
  })
  .min(2, 'Must be at least 2 characters')
  .max(200, 'Must be less than 200 characters')
  .transform(sanitizeText)

/**
 * Description/comment text
 * Longer text with sanitization
 */
export const descriptionSchema = z
  .string({
    required_error: 'Description is required',
  })
  .min(10, 'Description must be at least 10 characters')
  .max(1000, 'Description is too long (max 1000 characters)')
  .transform(sanitizeText)

/**
 * Optional description
 */
export const descriptionOptionalSchema = z
  .string()
  .max(1000, 'Description is too long (max 1000 characters)')
  .transform(sanitizeText)
  .optional()

/**
 * Address validation
 */
export const addressSchema = z
  .string({
    required_error: 'Address is required',
  })
  .min(5, 'Address is too short')
  .max(500, 'Address is too long')
  .trim()
  .refine(
    (address) => address.split(' ').length >= 2,
    'Please provide a complete address'
  )

// ============================================================================
// DATE & TIME VALIDATION
// ============================================================================

/**
 * Future date validation
 * Date must be in the future
 */
export const futureDateSchema = z
  .coerce
  .date({
    required_error: 'Please select a date',
    invalid_type_error: 'Invalid date format',
  })
  .refine((date) => date > new Date(), 'Date must be in the future')
  .refine(
    (date) => date < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    'Date cannot be more than 90 days in the future'
  )

/**
 * Time validation (HH:MM format)
 */
export const timeSchema = z
  .string({
    required_error: 'Please select a time',
  })
  .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (use HH:MM)')

/**
 * Day of week (0-6, 0 = Sunday)
 */
export const dayOfWeekSchema = z
  .number()
  .int()
  .min(0, 'Invalid day of week')
  .max(6, 'Invalid day of week')

// ============================================================================
// AUTHENTICATION SCHEMAS
// ============================================================================

/**
 * User registration schema
 */
export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  firstName: nameSchema,
  lastName: nameSchema,
  role: z.enum(['customer', 'provider'], {
    required_error: 'Please select a role',
  }),
  phoneNumber: phoneOptionalSchema,
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

export type RegisterInput = z.infer<typeof registerSchema>

/**
 * Login schema
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
})

export type LoginInput = z.infer<typeof loginSchema>

/**
 * Password reset request schema
 */
export const passwordResetRequestSchema = z.object({
  email: emailSchema,
})

export type PasswordResetRequestInput = z.infer<typeof passwordResetRequestSchema>

/**
 * Password reset (new password) schema
 */
export const passwordResetSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string(),
  token: z.string().min(1, 'Reset token is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

export type PasswordResetInput = z.infer<typeof passwordResetSchema>

// ============================================================================
// PROFILE SCHEMAS
// ============================================================================

/**
 * Customer profile schema
 */
export const customerProfileSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  phoneNumber: phoneSchema,
  email: emailSchema,
  profilePhotoUrl: urlSchema.optional().or(z.literal('')),
})

export type CustomerProfileInput = z.infer<typeof customerProfileSchema>

/**
 * Service provider profile schema
 */
export const providerProfileSchema = z.object({
  businessName: nameSchema,
  firstName: nameSchema,
  lastName: nameSchema,
  phoneNumber: phoneSchema,
  email: emailSchema,
  bio: descriptionOptionalSchema,
  profilePhotoUrl: urlSchema.optional().or(z.literal('')),
  serviceArea: z.string().min(2, 'Service area is required').max(200),
  city: z.string().min(2, 'City is required').max(100),
  state: z.string().min(2, 'State/Province is required').max(100),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
})

export type ProviderProfileInput = z.infer<typeof providerProfileSchema>

// ============================================================================
// SERVICE SCHEMAS
// ============================================================================

/**
 * Service category schema
 */
export const serviceCategorySchema = z.object({
  name: z.string().min(2, 'Category name is required').max(100),
  description: descriptionOptionalSchema,
  iconUrl: urlSchema.optional().or(z.literal('')),
})

export type ServiceCategoryInput = z.infer<typeof serviceCategorySchema>

/**
 * Service creation/update schema
 */
export const serviceSchema = z.object({
  categoryId: uuidSchema,
  name: z.string().min(2, 'Service name is required').max(200),
  description: descriptionSchema,
  basePrice: priceSchema,
  priceUnit: z.enum(['per_hour', 'per_job', 'per_sqft', 'per_day'], {
    required_error: 'Please select a price unit',
  }),
  isActive: z.boolean().default(true),
})

export type ServiceInput = z.infer<typeof serviceSchema>

// ============================================================================
// SERVICE REQUEST SCHEMAS
// ============================================================================

/**
 * Service request creation schema
 */
export const serviceRequestSchema = z.object({
  serviceId: uuidSchema,
  providerId: uuidSchema,
  preferredDate: futureDateSchema,
  preferredTime: timeSchema,
  description: descriptionSchema,
  address: addressSchema,
  contactPhone: phoneOptionalSchema,
})

export type ServiceRequestInput = z.infer<typeof serviceRequestSchema>

/**
 * Service request status update schema
 */
export const serviceRequestStatusSchema = z.object({
  requestId: uuidSchema,
  status: z.enum(['pending', 'confirmed', 'rescheduled', 'completed', 'cancelled', 'rejected']),
  rejectionReason: descriptionOptionalSchema,
  proposedAlternateDate: z.coerce.date().optional(),
  proposedAlternateTime: timeSchema.optional(),
})

export type ServiceRequestStatusInput = z.infer<typeof serviceRequestStatusSchema>

/**
 * Service request cancellation schema
 */
export const cancelRequestSchema = z.object({
  requestId: uuidSchema,
  cancellationReason: descriptionSchema,
})

export type CancelRequestInput = z.infer<typeof cancelRequestSchema>

// ============================================================================
// REVIEW SCHEMAS
// ============================================================================

/**
 * Review submission schema
 */
export const reviewSchema = z.object({
  requestId: uuidSchema,
  providerId: uuidSchema,
  rating: ratingSchema,
  comment: z
    .string()
    .min(10, 'Review must be at least 10 characters')
    .max(500, 'Review is too long (max 500 characters)')
    .transform(sanitizeText),
})

export type ReviewInput = z.infer<typeof reviewSchema>

/**
 * Review moderation schema (Admin)
 */
export const reviewModerationSchema = z.object({
  reviewId: uuidSchema,
  isModerated: z.boolean(),
  moderationReason: descriptionOptionalSchema,
})

export type ReviewModerationInput = z.infer<typeof reviewModerationSchema>

// ============================================================================
// AVAILABILITY SCHEMAS
// ============================================================================

/**
 * Provider availability schema
 */
export const availabilitySchema = z.object({
  dayOfWeek: dayOfWeekSchema,
  startTime: timeSchema,
  endTime: timeSchema,
  isAvailable: z.boolean().default(true),
}).refine(
  (data) => {
    // Ensure end time is after start time
    const [startHour, startMin] = data.startTime.split(':').map(Number)
    const [endHour, endMin] = data.endTime.split(':').map(Number)
    const startMinutes = startHour * 60 + startMin
    const endMinutes = endHour * 60 + endMin
    return endMinutes > startMinutes
  },
  {
    message: 'End time must be after start time',
    path: ['endTime'],
  }
)

export type AvailabilityInput = z.infer<typeof availabilitySchema>

/**
 * Bulk availability update schema
 */
export const bulkAvailabilitySchema = z.object({
  availability: z.array(availabilitySchema),
})

export type BulkAvailabilityInput = z.infer<typeof bulkAvailabilitySchema>

// ============================================================================
// SEARCH & FILTER SCHEMAS
// ============================================================================

/**
 * Provider search schema
 */
export const providerSearchSchema = z.object({
  categoryId: uuidSchema.optional(),
  city: z.string().max(100).optional(),
  serviceArea: z.string().max(200).optional(),
  minRating: z.number().min(0).max(5).optional(),
  maxPrice: priceSchema.optional(),
  isVerified: z.boolean().optional(),
  sortBy: z.enum(['rating', 'price', 'reviews', 'distance']).default('rating'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
})

export type ProviderSearchInput = z.infer<typeof providerSearchSchema>

/**
 * Service request filter schema
 */
export const requestFilterSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'rescheduled', 'completed', 'cancelled', 'rejected']).optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
})

export type RequestFilterInput = z.infer<typeof requestFilterSchema>

// ============================================================================
// FILE UPLOAD SCHEMAS
// ============================================================================

/**
 * File upload validation
 */
export const fileUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
    .refine(
      (file) =>
        ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'].includes(
          file.type
        ),
      'Only JPG, PNG, WEBP, and PDF files are allowed'
    ),
})

export type FileUploadInput = z.infer<typeof fileUploadSchema>

/**
 * Profile photo upload
 */
export const profilePhotoSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 2 * 1024 * 1024, 'Image must be less than 2MB')
    .refine(
      (file) => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
      'Only JPG, PNG, and WEBP images are allowed'
    ),
})

export type ProfilePhotoInput = z.infer<typeof profilePhotoSchema>

// ============================================================================
// ADMIN SCHEMAS
// ============================================================================

/**
 * User management schema (Admin)
 */
export const userManagementSchema = z.object({
  userId: uuidSchema,
  status: z.enum(['active', 'suspended', 'deleted']),
  reason: descriptionOptionalSchema,
})

export type UserManagementInput = z.infer<typeof userManagementSchema>

/**
 * Provider verification schema (Admin)
 */
export const providerVerificationSchema = z.object({
  providerId: uuidSchema,
  isVerified: z.boolean(),
  verificationNotes: descriptionOptionalSchema,
})

export type ProviderVerificationInput = z.infer<typeof providerVerificationSchema>

// ============================================================================
// PAYMENT SCHEMAS
// ============================================================================

/**
 * Payment intent creation schema
 */
export const paymentSchema = z.object({
  requestId: uuidSchema,
  amount: priceSchema.refine((val) => val > 0, 'Amount must be greater than 0'),
  currency: z.enum(['pkr', 'usd']).default('pkr'),
})

export type PaymentInput = z.infer<typeof paymentSchema>

// ============================================================================
// QUERY PARAMETER SCHEMAS
// ============================================================================

/**
 * Pagination schema
 */
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
})

export type PaginationInput = z.infer<typeof paginationSchema>

/**
 * Sort schema
 */
export const sortSchema = z.object({
  sortBy: z.string().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

export type SortInput = z.infer<typeof sortSchema>

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Safe parse with error formatting
 * Returns formatted validation errors
 */
export function safeParseWithErrors<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): {
  success: boolean
  data?: T
  errors?: Array<{ field: string; message: string }>
} {
  const result = schema.safeParse(data)

  if (result.success) {
    return { success: true, data: result.data }
  }

  const errors = result.error.errors.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
  }))

  return { success: false, errors }
}

/**
 * Validate and transform data
 * Throws error if validation fails
 */
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data)
}
