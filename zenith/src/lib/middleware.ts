import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './auth'
import type { JWTPayload } from './auth'
import { cookies } from 'next/headers'

export async function authenticateRequest(
    request: NextRequest
): Promise<{ user: JWTPayload } | NextResponse> {
    const token = request.cookies.get('token')?.value

    if (!token) {
        return NextResponse.json(
            { success: false, error: 'Authentication required' },
            { status: 401 }
        )
    }

    const decoded = verifyToken(token)
    if (!decoded) {
        return NextResponse.json(
            { success: false, error: 'Invalid or expired token' },
            { status: 401 }
        )
    }

    return { user: decoded }
}

export function isNextResponse(result: unknown): result is NextResponse {
    return result instanceof NextResponse
}

/**
 * Get authenticated user ID from the request cookie.
 * Returns the userId string or null if not authenticated.
 */
export async function getAuthUser(req: Request): Promise<string | null> {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value
        if (!token) return null
        const decoded = verifyToken(token)
        return decoded?.userId || null
    } catch {
        return null
    }
}
