'use client'

import Link from 'next/link'
import Image from 'next/image'
import Badge from '@/components/ui/Badge'
import { formatPrice, formatDate } from '@/lib/utils'
import { STATUS_COLORS } from '@/lib/constants'
import type { Order } from '@/types'

interface OrderCardProps {
    order: Order
}

export default function OrderCard({ order }: OrderCardProps) {
    const statusColor = STATUS_COLORS[order.orderStatus] || 'bg-gray-500/20 text-gray-400'

    return (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5 transition hover:border-accent/30">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                    <p className="font-mono text-sm font-bold text-accent">{order.orderNumber}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{formatDate(order.createdAt)}</p>
                </div>
                <Badge variant="custom" className={statusColor}>
                    {order.orderStatus}
                </Badge>
            </div>

            <div className="mt-4 flex items-center gap-2">
                {order.items.slice(0, 3).map((item, i) => (
                    <div key={i} className="relative h-12 w-12 overflow-hidden rounded-lg">
                        <Image src={item.productImage} alt={item.productName} fill className="object-cover" sizes="48px" />
                    </div>
                ))}
                {order.items.length > 3 && (
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-bg-tertiary)] text-sm text-[var(--color-text-muted)]">
                        +{order.items.length - 3}
                    </div>
                )}
                <span className="ml-2 text-sm text-[var(--color-text-muted)]">{order.items.length} item{order.items.length > 1 ? 's' : ''}</span>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <span className="font-bold">{formatPrice(order.total)}</span>
                <div className="flex gap-2">
                    <Link href={`/profile/orders/${order._id}`} className="rounded-full border border-[var(--color-border)] px-4 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] transition hover:border-accent hover:text-accent">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    )
}
