import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Product from '@/models/Product'

export async function GET(
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        await dbConnect()
        const { slug } = await params
        const product = await Product.findOne({ slug, isActive: true }).lean()

        if (!product) {
            return NextResponse.json(
                { success: false, error: 'Product not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ success: true, data: product })
    } catch (error: any) {
        console.error('Product GET error:', error)
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
    }
}
