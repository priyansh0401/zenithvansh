'use client'

import { motion } from 'framer-motion'
import ProductCard from '@/components/products/ProductCard'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import type { Product } from '@/types'

interface FeaturedProductsProps {
    products: Product[]
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
    const { ref, isInView } = useScrollAnimation()

    return (
        <section className="bg-[var(--color-bg-primary)] py-24" ref={ref}>
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-12 text-center">
                    <h2 className="font-display text-4xl font-black uppercase tracking-tight text-[var(--color-text-primary)] md:text-5xl">
                        This Season&apos;s Best
                    </h2>
                    <div className="mx-auto mt-4 h-1 w-24 overflow-hidden rounded-full bg-[var(--color-border)]">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: '100%' } : {}}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="h-full bg-accent"
                        />
                    </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product, i) => (
                        <motion.div
                            key={product._id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
