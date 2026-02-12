import { NextResponse } from 'next/server';
import { ZodError, type ZodSchema } from 'zod';

/**
 * Standard success response.
 */
export function successResponse<T>(data: T, status = 200) {
    return NextResponse.json({ success: true, data }, { status });
}

/**
 * Standard error response.
 */
export function errorResponse(message: string, status = 400, details?: unknown) {
    return NextResponse.json(
        { success: false, error: message, ...(details ? { details } : {}) },
        { status }
    );
}

/**
 * Parse and validate request body against a Zod schema.
 * Returns the validated data or throws an error response.
 */
export async function validateBody<T>(
    request: Request,
    schema: ZodSchema<T>
): Promise<T | NextResponse> {
    try {
        const body = await request.json();
        return schema.parse(body);
    } catch (err) {
        if (err instanceof ZodError) {
            const fieldErrors = err.issues.map((e) => ({
                field: e.path.join('.'),
                message: e.message,
            }));
            return errorResponse('Validation failed', 400, fieldErrors);
        }
        return errorResponse('Invalid JSON body', 400);
    }
}

/**
 * Type guard: check if validateBody returned a NextResponse (error).
 */
export function isErrorResponse(value: unknown): value is NextResponse {
    return value instanceof NextResponse;
}
