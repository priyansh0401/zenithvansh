'use client'

import { generateInitials, cn } from '@/lib/utils'
import type { User } from '@/types'

interface ProfileHeaderProps {
    user: User
    orderCount: number
    totalSpent: number
    wishlistCount: number
}

export default function ProfileHeader({ user, orderCount, totalSpent, wishlistCount }: ProfileHeaderProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-2xl font-bold text-white">
                    {generateInitials(user.name)}
                </div>
                <div>
                    <h1 className="font-display text-2xl font-bold">{user.name}</h1>
                    <p className="text-sm text-[var(--color-text-muted)]">{user.email}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                        Member since {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: 'Total Orders', value: orderCount },
                    { label: 'Total Spent', value: `$${totalSpent.toFixed(0)}` },
                    { label: 'Wishlist Items', value: wishlistCount },
                ].map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] p-4 text-center">
                        <p className="font-display text-2xl font-bold text-accent">{stat.value}</p>
                        <p className="mt-1 text-xs text-[var(--color-text-muted)]">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
