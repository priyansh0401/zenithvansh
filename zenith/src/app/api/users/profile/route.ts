import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import User from '@/models/User'
import { getAuthUser } from '@/lib/middleware'
import bcrypt from 'bcryptjs'

export async function GET(req: Request) {
    try {
        const userId = await getAuthUser(req)
        if (!userId) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
        }

        await dbConnect()
        const user = await User.findById(userId)
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
        console.error('Profile GET error:', error)
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
    }
}

export async function PUT(req: Request) {
    try {
        const userId = await getAuthUser(req)
        if (!userId) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
        }

        await dbConnect()
        const user = await User.findById(userId).select('+password')
        if (!user) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
        }

        const body = await req.json()

        if (body.name) user.name = body.name
        if (body.phone !== undefined) user.phone = body.phone

        if (body.newPassword) {
            if (!body.currentPassword) {
                return NextResponse.json(
                    { success: false, error: 'Current password is required' },
                    { status: 400 }
                )
            }
            const isMatch = await bcrypt.compare(body.currentPassword, user.password)
            if (!isMatch) {
                return NextResponse.json(
                    { success: false, error: 'Current password is incorrect' },
                    { status: 400 }
                )
            }
            user.password = await bcrypt.hash(body.newPassword, 12)
        }

        if (body.address) {
            const existingIdx = user.addresses.findIndex(
                (a: any) => a.label === body.address.label
            )
            if (existingIdx >= 0) {
                user.addresses[existingIdx] = body.address
            } else {
                user.addresses.push(body.address)
            }
        }

        await user.save()

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
        console.error('Profile PUT error:', error)
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
    }
}
