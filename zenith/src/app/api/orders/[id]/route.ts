import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Order from '@/models/Order'
import { getAuthUser } from '@/lib/middleware'

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const userId = await getAuthUser(req)
        if (!userId) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
        }

        await dbConnect()
        const { id } = await params
        const order = await Order.findOne({ _id: id, user: userId }).lean()

        if (!order) {
            return NextResponse.json(
                { success: false, error: 'Order not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ success: true, data: order })
    } catch (error: any) {
        console.error('Order GET error:', error)
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const userId = await getAuthUser(req)
        if (!userId) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
        }

        await dbConnect()
        const { id } = await params
        const body = await req.json()
        const order = await Order.findOne({ _id: id, user: userId })

        if (!order) {
            return NextResponse.json(
                { success: false, error: 'Order not found' },
                { status: 404 }
            )
        }

        if (body.cancel && order.orderStatus === 'Order Placed') {
            order.orderStatus = 'Cancelled'
            order.statusHistory.push({ status: 'Cancelled', timestamp: new Date() })
            await order.save()
        }

        return NextResponse.json({ success: true, data: order })
    } catch (error: any) {
        console.error('Order PUT error:', error)
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
    }
}
