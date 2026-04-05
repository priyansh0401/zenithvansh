import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = ['/profile', '/checkout']

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const { pathname } = request.nextUrl

    const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))

    if (isProtected && !token) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/profile/:path*', '/checkout/:path*'],
}
