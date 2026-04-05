import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import User from '@/models/User'
import { signToken, setAuthCookie } from '@/lib/auth'
import { loginSchema } from '@/lib/validations'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
    try {
        await dbConnect()
        const body = await req.json()
        const parsed = loginSchema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json(
                { success: false, error: parsed.error.errors[0]?.message || 'Invalid input' },
                { status: 400 }
            )
        }

        const { email, password } = parsed.data

        const user = await User.findOne({ email: email.toLowerCase() }).select('+password')
        if (!user) {
            return NextResponse.json(
                { success: false, error: 'Invalid email or password' },
                { status: 401 }
            )
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return NextResponse.json(
                { success: false, error: 'Invalid email or password' },
                { status: 401 }
            )
        }

        const token = signToken(user._id.toString())
        const response = NextResponse.json({
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

        setAuthCookie(response, token)
        return response
    } catch (error: any) {
        console.error('Login error:', error)
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
    }
}
