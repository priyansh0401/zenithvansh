'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Trash2, Plus, Minus } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import type { CartItem as CartItemType } from '@/types'

interface CartItemProps {
    item: CartItemType
    onUpdateQuantity: (quantity: number) => void
    onRemove: () => void
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
    return (
        <motion.div
            layout
            exit={{ opacity: 0, x: -100 }}
            className="flex gap-4 border-b border-[var(--color-border)] py-4"
        >
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-[var(--color-bg-tertiary)]">
                <Image
                    src={item.productImage}
                    alt={item.productName}
                    fill
                    className="object-cover"
                    sizes="80px"
                />
            </div>

            <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between">
                    <div>
                        <h4 className="font-medium text-[var(--color-text-primary)]">{item.productName}</h4>
                        <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                            {item.color} · Size {item.size}
                        </p>
                    </div>
                    <button
                        onClick={onRemove}
                        className="p-1 text-[var(--color-text-muted)] transition hover:text-red-400"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>

                <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="flex items-center rounded-lg border border-[var(--color-border)]">
                        <button
                            onClick={() => onUpdateQuantity(item.quantity - 1)}
                            className="px-2 py-1 text-[var(--color-text-muted)] hover:text-white"
                        >
                            <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                            onClick={() => onUpdateQuantity(item.quantity + 1)}
                            className="px-2 py-1 text-[var(--color-text-muted)] hover:text-white"
                        >
                            <Plus size={14} />
                        </button>
                    </div>
                    <span className="font-medium text-[var(--color-text-primary)]">
                        {formatPrice(item.price * item.quantity)}
                    </span>
                </div>
            </div>
        </motion.div>
    )
}
