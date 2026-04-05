'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Tag, Check, AlertCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'
import { PROMO_CODES, SHIPPING_THRESHOLD, SHIPPING_FEE, TAX_RATE } from '@/lib/constants'

interface CartSummaryProps {
    subtotal: number
    onPromoApplied?: (discount: number) => void
}

export default function CartSummary({ subtotal, onPromoApplied }: CartSummaryProps) {
    const [promoCode, setPromoCode] = useState('')
    const [promoError, setPromoError] = useState('')
    const [promoSuccess, setPromoSuccess] = useState('')
    const [discount, setDiscount] = useState(0)

    const handleApplyPromo = () => {
        const code = promoCode.toUpperCase().trim()
        if (PROMO_CODES[code] !== undefined) {
            const discountAmount = subtotal * PROMO_CODES[code]
            setDiscount(discountAmount)
            setPromoSuccess(`${Math.round(PROMO_CODES[code] * 100)}% discount applied ✓`)
            setPromoError('')
            onPromoApplied?.(discountAmount)
        } else {
            setPromoError('Invalid promo code')
            setPromoSuccess('')
            setDiscount(0)
        }
    }

    const discountedSubtotal = subtotal - discount
    const shipping = discountedSubtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
    const tax = discountedSubtotal * TAX_RATE
    const total = discountedSubtotal + shipping + tax

    return (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <h3 className="font-display text-xl font-bold text-[var(--color-text-primary)]">
                Order Summary
            </h3>

            <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--color-text-secondary)]">Subtotal</span>
                    <span className="text-[var(--color-text-primary)]">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                        <input
                            type="text"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            placeholder="Promo code"
                            className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] py-2 pl-9 pr-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-accent focus:outline-none"
                        />
                    </div>
                    <button
                        onClick={handleApplyPromo}
                        className="rounded-lg border border-accent px-4 py-2 text-sm font-medium text-accent transition hover:bg-accent/10"
                    >
                        Apply
                    </button>
                </div>

                {promoSuccess && (
                    <p className="flex items-center gap-1 text-xs text-[var(--color-success)]">
                        <Check size={14} /> {promoSuccess}
                    </p>
                )}
                {promoError && (
                    <p className="flex items-center gap-1 text-xs text-[var(--color-error)]">
                        <AlertCircle size={14} /> {promoError}
                    </p>
                )}

                {discount > 0 && (
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-[var(--color-success)]">Discount</span>
                        <span className="text-[var(--color-success)]">-{formatPrice(discount)}</span>
                    </div>
                )}

                <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--color-text-secondary)]">Shipping</span>
                    <span className="text-[var(--color-text-primary)]">
                        {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                    </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--color-text-secondary)]">Tax (8%)</span>
                    <span className="text-[var(--color-text-primary)]">{formatPrice(tax)}</span>
                </div>

                <div className="border-t border-[var(--color-border)] pt-3">
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-[var(--color-text-primary)]">Total</span>
                        <span className="text-lg font-bold text-[var(--color-text-primary)]">
                            {formatPrice(total)}
                        </span>
                    </div>
                </div>
            </div>

            <Link href="/checkout" className="mt-6 block">
                <Button className="w-full" size="lg">
                    Proceed to Checkout
                </Button>
            </Link>
            <Link
                href="/men"
                className="mt-3 block text-center text-sm text-accent hover:text-accent-secondary"
            >
                Continue Shopping
            </Link>
        </div>
    )
}
