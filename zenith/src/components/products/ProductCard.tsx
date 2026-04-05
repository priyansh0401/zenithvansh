'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag } from 'lucide-react'
import { formatPrice, getDiscountPercent, getUnsplashUrl } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import Badge from '@/components/ui/Badge'
import type { Product } from '@/types'
import toast from 'react-hot-toast'

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false)
    const addItem = useCartStore((s) => s.addItem)
    const { toggleWishlist, isWishlisted } = useWishlistStore()
    const wishlisted = isWishlisted(product._id)

    const mainImage =
        product.colors[0]?.images[0] ||
        product.images[0]?.url ||
        getUnsplashUrl('photo-1542291026-7eec264c27ff')

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        const defaultSize = product.sizes.find((s) => s.stock > 0)?.size || product.sizes[0]?.size || 9
        const defaultColor = product.colors[0]?.name || 'Default'

        addItem({
            productId: product._id,
            productName: product.name,
            productImage: mainImage,
            color: defaultColor,
            size: defaultSize,
            quantity: 1,
            price: product.price,
        })
        toast.success(`${product.name} added to cart`)
    }

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        toggleWishlist(product._id)
    }

    return (
        <Link href={`/${product.category}/${product.slug}`}>
            <motion.div
                className="group relative overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ y: -4 }}
            >
                <div className="relative aspect-square overflow-hidden bg-[var(--color-bg-tertiary)]">
                    <Image
                        src={mainImage}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    {product.isNew && (
                        <div className="absolute left-3 top-3">
                            <Badge>NEW</Badge>
                        </div>
                    )}

                    {product.compareAtPrice && (
                        <div className="absolute left-3 top-3">
                            <Badge variant="error">
                                -{getDiscountPercent(product.price, product.compareAtPrice)}%
                            </Badge>
                        </div>
                    )}

                    <button
                        onClick={handleWishlist}
                        className="absolute right-3 top-3 rounded-full bg-black/40 p-2 backdrop-blur-sm transition hover:bg-black/60"
                    >
                        <Heart
                            size={18}
                            className={wishlisted ? 'fill-red-500 text-red-500' : 'text-white'}
                        />
                    </button>

                    <motion.div
                        initial={false}
                        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                        className="absolute bottom-3 left-3 right-3"
                    >
                        <button
                            onClick={handleQuickAdd}
                            className="flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3 text-sm font-medium text-white transition hover:bg-accent-secondary"
                        >
                            <ShoppingBag size={16} />
                            Quick Add
                        </button>
                    </motion.div>
                </div>

                <div className="p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                        {product.brand}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-bold text-[var(--color-text-primary)]">
                        {product.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-2">
                        <span className="text-lg font-bold text-[var(--color-text-primary)]">
                            {formatPrice(product.price)}
                        </span>
                        {product.compareAtPrice && (
                            <span className="text-sm text-[var(--color-text-muted)] line-through">
                                {formatPrice(product.compareAtPrice)}
                            </span>
                        )}
                    </div>
                    <div className="mt-2 flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                                key={i}
                                className={`h-3.5 w-3.5 ${i < Math.floor(product.rating.average)
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'fill-gray-600 text-gray-600'
                                    }`}
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                        <span className="ml-1 text-xs text-[var(--color-text-muted)]">
                            ({product.rating.count})
                        </span>
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}
