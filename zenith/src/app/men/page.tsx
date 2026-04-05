'use client'

import { useEffect, useState } from 'react'
import PageWrapper from '@/components/layout/PageWrapper'
import ProductGrid from '@/components/products/ProductGrid'
import ProductFilters from '@/components/products/ProductFilters'
import Spinner from '@/components/ui/Spinner'
import { MEN_SIZES, PRODUCT_TYPES } from '@/lib/constants'
import type { Product } from '@/types'

export default function MenPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({
        sizes: [] as number[],
        types: [] as string[],
        priceRange: [0, 500] as [number, number],
        sort: 'featured',
    })

    useEffect(() => {
        setLoading(true)
        const params = new URLSearchParams({ category: 'men', limit: '50' })
        if (filters.sort !== 'featured') params.set('sort', filters.sort)

        fetch(`/api/products?${params}`)
            .then((r) => r.json())
            .then((data) => {
                if (data.success) setProducts(data.data)
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [filters.sort])

    const filtered = products.filter((p) => {
        if (filters.sizes.length > 0) {
            const hasSize = p.sizes.some((s) => filters.sizes.includes(s.size) && s.stock > 0)
            if (!hasSize) return false
        }
        if (filters.types.length > 0 && !filters.types.includes(p.type)) return false
        return true
    })

    return (
        <PageWrapper>
            <section className="py-12">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-10">
                        <h1 className="font-display text-5xl font-black uppercase tracking-tight md:text-6xl">
                            Men&apos;s Collection
                        </h1>
                        <p className="mt-3 text-lg text-[var(--color-text-secondary)]">
                            Engineered for the modern man. Every pair, a statement.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
                        <aside>
                            <ProductFilters
                                availableSizes={MEN_SIZES}
                                filters={filters}
                                onFiltersChange={setFilters}
                                totalProducts={products.length}
                                filteredCount={filtered.length}
                            />
                        </aside>
                        <div>
                            {loading ? (
                                <div className="flex justify-center py-20">
                                    <Spinner size="lg" />
                                </div>
                            ) : (
                                <ProductGrid products={filtered} />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </PageWrapper>
    )
}
