import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Order from '@/models/Order'
import { getAuthUser } from '@/lib/middleware'
import { orderSchema } from '@/lib/validations'
import { nanoid } from 'nanoid'

export async function GET(req: Request) {
    try {
        const userId = await getAuthUser(req)
        if (!userId) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
        }

        await dbConnect()
        const orders = await Order.find({ user: userId })
            .sort({ createdAt: -1 })
            .lean()

        return NextResponse.json({ success: true, data: orders })
    } catch (error: any) {
        console.error('Orders GET error:', error)
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const userId = await getAuthUser(req)
        if (!userId) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
        }

        await dbConnect()
        const body = await req.json()
        const parsed = orderSchema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json(
                { success: false, error: parsed.error.errors[0]?.message || 'Invalid input' },
                { status: 400 }
            )
        }

        const { shippingAddress, notes } = parsed.data

        // In a real app, we'd load the user's cart from DB. 
        // For this MVP with Zustand client-side cart, the cart items are sent from the client.
        // We simplify by getting items from the request body.
        const items = body.items || []

        if (items.length === 0) {
            return NextResponse.json(
                { success: false, error: 'Cart is empty' },
                { status: 400 }
            )
        }

        const subtotal = items.reduce(
            (sum: number, item: any) => sum + item.price * item.quantity,
            0
        )
        const shippingFee = subtotal >= 200 ? 0 : 15
        const tax = subtotal * 0.08
        const total = subtotal + shippingFee + tax

        const order = await Order.create({
            user: userId,
            orderNumber: `ZEN-${nanoid(8).toUpperCase()}`,
            transactionId: `TXN-${nanoid(12).toUpperCase()}`,
            receiptNumber: `REC-${nanoid(10).toUpperCase()}`,
            items: items.map((item: any) => ({
                productId: item.productId,
                productName: item.productName,
                productImage: item.productImage,
                color: item.color,
                size: item.size,
                quantity: item.quantity,
                price: item.price,
            })),
            shippingAddress,
            paymentMethod: 'Cash on Delivery',
            subtotal,
            shippingFee,
            tax,
            total,
            notes: notes || '',
            orderStatus: 'Order Placed',
            statusHistory: [{ status: 'Order Placed', timestamp: new Date() }],
        })

        return NextResponse.json({ success: true, data: order }, { status: 201 })
    } catch (error: any) {
        console.error('Order POST error:', error)
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
    }
}
