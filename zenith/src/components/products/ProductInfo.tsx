'use client'

import { useState } from 'react'
import { Heart, Check, Truck, ShieldCheck, Banknote } from 'lucide-react'
import { motion } from 'framer-motion'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import SizeGuide from './SizeGuide'
import { formatPrice, getDiscountPercent, cn } from '@/lib/utils'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import type { Product } from '@/types'
import toast from 'react-hot-toast'

interface ProductInfoProps {
    product: Product
    onColorChange: (color: string) => void
}

export default function ProductInfo({ product, onColorChange }: ProductInfoProps) {
    const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '')
    const [selectedSize, setSelectedSize] = useState<number | null>(null)
    const [quantity, setQuantity] = useState(1)
    const [addedToCart, setAddedToCart] = useState(false)
    const [showSizeGuide, setShowSizeGuide] = useState(false)
    const [activeTab, setActiveTab] = useState<'description' | 'details'>('description')

    const addItem = useCartStore((s) => s.addItem)
    const { toggleWishlist, isWishlisted } = useWishlistStore()
    const wishlisted = isWishlisted(product._id)

    const mainImage = product.colors.find((c) => c.name === selectedColor)?.images[0] || product.images[0]?.url || ''

    const selectedSizeData = product.sizes.find((s) => s.size === selectedSize)
    const maxQty = selectedSizeData?.stock || 10

    const handleColorSelect = (colorName: string) => {
        setSelectedColor(colorName)
        onColorChange(colorName)
    }

    const handleAddToCart = () => {
        if (!selectedSize) {
            toast.error('Please select a size')
            return
        }

        addItem({
            productId: product._id,
            productName: product.name,
            productImage: mainImage,
            color: selectedColor,
            size: selectedSize,
            quantity,
            price: product.price,
        })

        setAddedToCart(true)
        toast.success(`${product.name} added to cart`)
        setTimeout(() => setAddedToCart(false), 2000)
    }

    return (
        <div className="space-y-6">
            <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
                    ZENITH
                </p>
                <h1 className="mt-2 font-display text-3xl font-black text-[var(--color-text-primary)] md:text-4xl">
                    {product.name}
                </h1>
                <div className="mt-2">
                    <Badge>{product.type}</Badge>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(product.rating.average)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'fill-gray-600 text-gray-600'
                                }`}
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                </div>
                <span className="text-sm text-[var(--color-text-muted)]">
                    {product.rating.average} ({product.rating.count} reviews)
                </span>
            </div>

            <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[var(--color-text-primary)]">
                    {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && (
                    <>
                        <span className="text-lg text-[var(--color-text-muted)] line-through">
                            {formatPrice(product.compareAtPrice)}
                        </span>
                        <Badge variant="error">-{getDiscountPercent(product.price, product.compareAtPrice)}%</Badge>
                    </>
                )}
            </div>

            <div>
                <p className="mb-3 text-sm font-medium text-[var(--color-text-secondary)]">Color</p>
                <div className="flex flex-wrap gap-3">
                    {product.colors.map((color) => (
                        <button
                            key={color.name}
                            onClick={() => handleColorSelect(color.name)}
                            className={cn(
                                'group relative h-10 w-10 rounded-full border-2 transition',
                                selectedColor === color.name ? 'border-accent ring-2 ring-accent/30' : 'border-[var(--color-border)]'
                            )}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                        >
                            {selectedColor === color.name && (
                                <Check size={16} className="absolute inset-0 m-auto text-white drop-shadow" />
                            )}
                        </button>
                    ))}
                </div>
                {selectedColor && (
                    <p className="mt-2 text-xs text-[var(--color-text-muted)]">{selectedColor}</p>
                )}
            </div>

            <div>
                <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-medium text-[var(--color-text-secondary)]">Size</p>
                    <button
                        onClick={() => setShowSizeGuide(true)}
                        className="text-xs text-accent underline hover:text-accent-secondary"
                    >
                        Size Guide
                    </button>
                </div>
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                    {product.sizes.map((s) => (
                        <button
                            key={s.size}
                            onClick={() => s.stock > 0 && setSelectedSize(s.size)}
                            disabled={s.stock === 0}
                            className={cn(
                                'rounded-lg border px-3 py-3 text-sm font-medium transition',
                                selectedSize === s.size
                                    ? 'border-accent bg-accent text-white'
                                    : s.stock > 0
                                        ? 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-accent/50'
                                        : 'border-[var(--color-border)] text-[var(--color-text-muted)] opacity-40 line-through'
                            )}
                        >
                            {s.size}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <p className="text-sm font-medium text-[var(--color-text-secondary)]">Quantity</p>
                <div className="flex items-center rounded-lg border border-[var(--color-border)]">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 text-[var(--color-text-secondary)] hover:text-white"
                    >
                        -
                    </button>
                    <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                    <button
                        onClick={() => setQuantity(Math.min(maxQty, quantity + 1))}
                        className="px-3 py-2 text-[var(--color-text-secondary)] hover:text-white"
                    >
                        +
                    </button>
                </div>
            </div>

            <div className="space-y-3">
                <Button onClick={handleAddToCart} className="w-full" size="lg">
                    {addedToCart ? (
                        <motion.span
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className="flex items-center gap-2"
                        >
                            <Check size={20} />
                            Added to Cart
                        </motion.span>
                    ) : (
                        'Add to Cart'
                    )}
                </Button>
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                        toggleWishlist(product._id)
                        toast.success(wishlisted ? 'Removed from wishlist' : 'Added to wishlist')
                    }}
                >
                    <Heart size={18} className={cn('mr-2', wishlisted && 'fill-red-500 text-red-500')} />
                    {wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </Button>
            </div>

            <div className="space-y-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] p-4">
                <div className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                    <Truck size={18} className="text-[var(--color-success)]" />
                    Free shipping on orders over $200
                </div>
                <div className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                    <ShieldCheck size={18} className="text-[var(--color-success)]" />
                    Estimated delivery in 7 business days
                </div>
                <div className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                    <Banknote size={18} className="text-[var(--color-success)]" />
                    Cash on Delivery available
                </div>
            </div>

            <div>
                <div className="flex border-b border-[var(--color-border)]">
                    {(['description', 'details'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                'px-6 py-3 text-sm font-medium capitalize transition',
                                activeTab === tab
                                    ? 'border-b-2 border-accent text-accent'
                                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="py-4">
                    {activeTab === 'description' ? (
                        <div className="space-y-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                            <p>{product.description}</p>
                            <p>{product.longDescription}</p>
                        </div>
                    ) : (
                        <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                            <div className="flex justify-between border-b border-[var(--color-border)] py-2">
                                <span className="text-[var(--color-text-muted)]">Weight</span>
                                <span>285g (size 10)</span>
                            </div>
                            <div className="flex justify-between border-b border-[var(--color-border)] py-2">
                                <span className="text-[var(--color-text-muted)]">Drop</span>
                                <span>8mm</span>
                            </div>
                            <div className="flex justify-between border-b border-[var(--color-border)] py-2">
                                <span className="text-[var(--color-text-muted)]">Material</span>
                                <span>Engineered mesh upper, recycled polyester</span>
                            </div>
                            <div className="flex justify-between border-b border-[var(--color-border)] py-2">
                                <span className="text-[var(--color-text-muted)]">Sole</span>
                                <span>ZENITH ProFoam responsive sole</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-[var(--color-text-muted)]">Origin</span>
                                <span>Designed in Milan, crafted in Portugal</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Modal isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} title="Size Guide">
                <SizeGuide category={product.category} />
            </Modal>
        </div>
    )
}
