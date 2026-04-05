import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import User from '@/models/User'
import { signToken, setAuthCookie } from '@/lib/auth'
import { registerSchema } from '@/lib/validations'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
    try {
        await dbConnect()
        const body = await req.json()
        const parsed = registerSchema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json(
                { success: false, error: parsed.error.errors[0]?.message || 'Invalid input' },
                { status: 400 }
            )
        }

        const { name, email, password, phone } = parsed.data

        const existingUser = await User.findOne({ email: email.toLowerCase() })
        if (existingUser) {
            return NextResponse.json(
                { success: false, error: 'An account with this email already exists' },
                { status: 409 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            phone: phone || '',
        })

        const token = signToken(user._id.toString())
        const response = NextResponse.json(
            {
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
            },
            { status: 201 }
        )

        setAuthCookie(response, token)
        return response
    } catch (error: any) {
        console.error('Register error:', error)
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
    }
}
