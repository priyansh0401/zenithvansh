'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ORDER_STATUSES } from '@/lib/constants'
import type { OrderStatus } from '@/types'

interface OrderTimelineProps {
    currentStatus: OrderStatus
    statusHistory: { status: string; timestamp: string }[]
}

export default function OrderTimeline({ currentStatus, statusHistory }: OrderTimelineProps) {
    const statuses = ORDER_STATUSES.filter((s) => s !== 'Cancelled')
    const currentIndex = statuses.indexOf(currentStatus as typeof statuses[number])
    const isCancelled = currentStatus === 'Cancelled'

    return (
        <div className="w-full">
            <div className="hidden md:flex md:items-center md:justify-between">
                {statuses.map((status, i) => {
                    const isCompleted = !isCancelled && i <= currentIndex
                    const isCurrent = !isCancelled && i === currentIndex
                    const historyEntry = statusHistory.find((h) => h.status === status)

                    return (
                        <div key={status} className="flex flex-1 items-center">
                            <div className="flex flex-col items-center">
                                <div className="relative">
                                    <div
                                        className={cn(
                                            'flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition',
                                            isCompleted
                                                ? 'border-accent bg-accent text-white'
                                                : 'border-[var(--color-border)] text-[var(--color-text-muted)]'
                                        )}
                                    >
                                        {isCompleted ? <Check size={14} /> : i + 1}
                                    </div>
                                    {isCurrent && (
                                        <div className="absolute inset-0 animate-pulse-ring rounded-full border-2 border-accent" />
                                    )}
                                </div>
                                <span
                                    className={cn(
                                        'mt-2 text-center text-xs',
                                        isCompleted ? 'text-accent' : 'text-[var(--color-text-muted)]'
                                    )}
                                >
                                    {status}
                                </span>
                                {historyEntry && (
                                    <span className="mt-0.5 text-[10px] text-[var(--color-text-muted)]">
                                        {new Date(historyEntry.timestamp).toLocaleDateString()}
                                    </span>
                                )}
                            </div>
                            {i < statuses.length - 1 && (
                                <div
                                    className={cn(
                                        'mx-2 h-0.5 flex-1',
                                        !isCancelled && i < currentIndex ? 'bg-accent' : 'bg-[var(--color-border)]'
                                    )}
                                />
                            )}
                        </div>
                    )
                })}
            </div>

            <div className="space-y-4 md:hidden">
                {statuses.map((status, i) => {
                    const isCompleted = !isCancelled && i <= currentIndex
                    const isCurrent = !isCancelled && i === currentIndex
                    const historyEntry = statusHistory.find((h) => h.status === status)

                    return (
                        <div key={status} className="flex items-start gap-3">
                            <div className="flex flex-col items-center">
                                <div
                                    className={cn(
                                        'flex h-6 w-6 items-center justify-center rounded-full border-2 text-[10px] font-bold',
                                        isCompleted ? 'border-accent bg-accent text-white' : 'border-[var(--color-border)] text-[var(--color-text-muted)]'
                                    )}
                                >
                                    {isCompleted ? <Check size={12} /> : i + 1}
                                </div>
                                {i < statuses.length - 1 && (
                                    <div className={cn('mt-1 h-8 w-0.5', !isCancelled && i < currentIndex ? 'bg-accent' : 'bg-[var(--color-border)]')} />
                                )}
                            </div>
                            <div>
                                <span className={cn('text-sm', isCompleted ? 'font-medium text-[var(--color-text-primary)]' : 'text-[var(--color-text-muted)]')}>
                                    {status}
                                </span>
                                {historyEntry && (
                                    <p className="text-[10px] text-[var(--color-text-muted)]">
                                        {new Date(historyEntry.timestamp).toLocaleDateString()}
                                    </p>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            {isCancelled && (
                <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-center text-sm text-red-400">
                    This order has been cancelled.
                </div>
            )}
        </div>
    )
}
