import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Product from '@/models/Product'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
    try {
        await dbConnect()
        const { searchParams } = new URL(req.url)

        const category = searchParams.get('category')
        const type = searchParams.get('type')
        const minPrice = searchParams.get('minPrice')
        const maxPrice = searchParams.get('maxPrice')
        const sort = searchParams.get('sort') || 'featured'
        const featured = searchParams.get('featured')
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '12')

        const filter: any = { isActive: true }
        if (category) filter.category = category
        if (type) filter.type = type
        if (featured === 'true') filter.isFeatured = true
        if (minPrice || maxPrice) {
            filter.price = {}
            if (minPrice) filter.price.$gte = parseFloat(minPrice)
            if (maxPrice) filter.price.$lte = parseFloat(maxPrice)
        }

        let sortOption: any = { isFeatured: -1, createdAt: -1 }
        if (sort === 'price-asc') sortOption = { price: 1 }
        else if (sort === 'price-desc') sortOption = { price: -1 }
        else if (sort === 'newest') sortOption = { createdAt: -1 }

        const skip = (page - 1) * limit
        const [products, total] = await Promise.all([
            Product.find(filter).sort(sortOption).skip(skip).limit(limit).lean(),
            Product.countDocuments(filter),
        ])

        return NextResponse.json({
            success: true,
            data: products,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        })
    } catch (error: any) {
        console.error('Products GET error:', error)
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
    }
}
