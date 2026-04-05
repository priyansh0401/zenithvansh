'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import PageWrapper from '@/components/layout/PageWrapper'
import ProductImages from '@/components/products/ProductImages'
import ProductInfo from '@/components/products/ProductInfo'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import Spinner from '@/components/ui/Spinner'
import type { Product } from '@/types'

export default function ProductDetailPage() {
    const params = useParams()
    const slug = params.slug as string
    const [product, setProduct] = useState<Product | null>(null)
    const [related, setRelated] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedColor, setSelectedColor] = useState('')

    useEffect(() => {
        setLoading(true)
        fetch(`/api/products/${slug}`)
            .then((r) => r.json())
            .then((data) => {
                if (data.success) {
                    setProduct(data.data)
                    setSelectedColor(data.data.colors[0]?.name || '')
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [slug])

    useEffect(() => {
        if (product) {
            fetch(`/api/products?category=${product.category}&limit=4`)
                .then((r) => r.json())
                .then((data) => {
                    if (data.success) {
                        setRelated(data.data.filter((p: Product) => p._id !== product._id).slice(0, 4))
                    }
                })
                .catch(console.error)
        }
    }, [product])

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Spinner size="lg" />
            </div>
        )
    }

    if (!product) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center">
                <h1 className="font-display text-3xl font-bold">Product Not Found</h1>
                <p className="mt-2 text-[var(--color-text-muted)]">The product you are looking for does not exist.</p>
            </div>
        )
    }

    return (
        <PageWrapper>
            <section className="py-12">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
                        <ProductImages colors={product.colors} selectedColor={selectedColor} productName={product.name} />
                        <ProductInfo product={product} onColorChange={setSelectedColor} />
                    </div>
                </div>
            </section>

            {related.length > 0 && <FeaturedProducts products={related} />}
        </PageWrapper>
    )
}
