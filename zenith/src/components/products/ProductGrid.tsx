'use client'

import ProductCard from './ProductCard'
import type { Product } from '@/types'

interface ProductGridProps {
    products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
    if (products.length === 0) {
        return (
            <div className="py-20 text-center">
                <p className="text-xl text-[var(--color-text-muted)]">No products found</p>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">Try adjusting your filters</p>
            </div>
        )
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    )
}
