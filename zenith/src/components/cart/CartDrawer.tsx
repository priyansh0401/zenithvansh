'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import Button from '@/components/ui/Button'

export default function CartDrawer() {
    const { items, isOpen, closeDrawer, removeItem, updateQuantity, getTotalPrice } = useCartStore()
    const total = getTotalPrice()

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/60"
                        onClick={closeDrawer}
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed bottom-0 right-0 top-0 z-[101] flex w-full max-w-md flex-col bg-[var(--color-bg-primary)] shadow-xl"
                    >
                        <div className="flex items-center justify-between border-b border-[var(--color-border)] p-6">
                            <h2 className="flex items-center gap-2 font-display text-xl font-bold">
                                <ShoppingBag size={20} />
                                Cart ({items.length})
                            </h2>
                            <button
                                onClick={closeDrawer}
                                className="rounded-full p-2 text-[var(--color-text-muted)] hover:bg-white/5 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {items.length === 0 ? (
                            <div className="flex flex-1 flex-col items-center justify-center p-6">
                                <ShoppingBag size={48} className="text-[var(--color-text-muted)]" />
                                <p className="mt-4 text-lg text-[var(--color-text-muted)]">Your cart is empty</p>
                                <Link href="/men" onClick={closeDrawer}>
                                    <Button className="mt-6">Start Shopping</Button>
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="flex-1 overflow-y-auto p-6">
                                    <AnimatePresence>
                                        {items.map((item) => (
                                            <motion.div
                                                key={`${item.productId}-${item.color}-${item.size}`}
                                                layout
                                                exit={{ opacity: 0, x: 50 }}
                                                className="mb-4 flex gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-3"
                                            >
                                                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                                                    <Image
                                                        src={item.productImage}
                                                        alt={item.productName}
                                                        fill
                                                        className="object-cover"
                                                        sizes="64px"
                                                    />
                                                </div>
                                                <div className="flex flex-1 flex-col">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <p className="text-sm font-medium">{item.productName}</p>
                                                            <p className="text-xs text-[var(--color-text-muted)]">
                                                                {item.color} · Size {item.size}
                                                            </p>
                                                        </div>
                                                        <button
                                                            onClick={() => removeItem(item.productId, item.color, item.size)}
                                                            className="p-1 text-[var(--color-text-muted)] hover:text-red-400"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                    <div className="mt-auto flex items-center justify-between pt-1">
                                                        <div className="flex items-center rounded border border-[var(--color-border)]">
                                                            <button
                                                                onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity - 1)}
                                                                className="px-1.5 py-0.5 text-xs text-[var(--color-text-muted)] hover:text-white"
                                                            >
                                                                <Minus size={12} />
                                                            </button>
                                                            <span className="w-6 text-center text-xs">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity + 1)}
                                                                className="px-1.5 py-0.5 text-xs text-[var(--color-text-muted)] hover:text-white"
                                                            >
                                                                <Plus size={12} />
                                                            </button>
                                                        </div>
                                                        <span className="text-sm font-medium">
                                                            {formatPrice(item.price * item.quantity)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>

                                <div className="border-t border-[var(--color-border)] p-6">
                                    <div className="mb-4 flex items-center justify-between">
                                        <span className="text-[var(--color-text-secondary)]">Subtotal</span>
                                        <span className="text-lg font-bold">{formatPrice(total)}</span>
                                    </div>
                                    <Link href="/cart" onClick={closeDrawer}>
                                        <Button className="w-full" size="lg">
                                            View Cart & Checkout
                                        </Button>
                                    </Link>
                                </div>
                            </>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
