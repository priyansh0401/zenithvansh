'use client'

import { AnimatePresence } from 'framer-motion'
import PageWrapper from '@/components/layout/PageWrapper'
import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import { useCartStore } from '@/store/cartStore'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function CartPage() {
    const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore()
    const subtotal = getTotalPrice()

    return (
        <PageWrapper>
            <section className="py-12">
                <div className="mx-auto max-w-7xl px-6">
                    <h1 className="font-display text-4xl font-black uppercase tracking-tight">Your Cart</h1>

                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <ShoppingBag size={64} className="text-[var(--color-text-muted)]" />
                            <h2 className="mt-6 font-display text-2xl font-bold">Your cart is empty</h2>
                            <p className="mt-2 text-[var(--color-text-muted)]">
                                Looks like you haven&apos;t added anything yet.
                            </p>
                            <Link href="/men" className="mt-8">
                                <Button size="lg">Start Shopping</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
                            <div>
                                <AnimatePresence>
                                    {items.map((item) => (
                                        <CartItem
                                            key={`${item.productId}-${item.color}-${item.size}`}
                                            item={item}
                                            onUpdateQuantity={(qty) =>
                                                updateQuantity(item.productId, item.color, item.size, qty)
                                            }
                                            onRemove={() => removeItem(item.productId, item.color, item.size)}
                                        />
                                    ))}
                                </AnimatePresence>
                            </div>
                            <div>
                                <CartSummary subtotal={subtotal} />
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </PageWrapper>
    )
}
