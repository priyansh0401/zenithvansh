import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import User from '@/models/User'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function GET() {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value
        if (!token) {
            return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
        }

        const decoded = verifyToken(token)
        if (!decoded) {
            return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 })
        }

        await dbConnect()
        const user = await User.findById(decoded.userId)
        if (!user) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                addresses: user.addresses,
                createdAt: user.createdAt,
            },
        })
    } catch (error: any) {
        console.error('Auth check error:', error)
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
    }
}
