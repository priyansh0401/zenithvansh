import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-production'

export interface JWTPayload {
    userId: string
}

export function signToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): JWTPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as JWTPayload
    } catch {
        return null
    }
}

export function setAuthCookie(response: NextResponse, token: string): void {
    const isProduction = process.env.NODE_ENV === 'production'
    response.cookies.set('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        secure: isProduction,
    })
}

export function clearAuthCookie(): string {
    return 'token=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0'
}

export async function getAuthenticatedUser(): Promise<JWTPayload | null> {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value
        if (!token) return null
        return verifyToken(token)
    } catch {
        return null
    }
}
