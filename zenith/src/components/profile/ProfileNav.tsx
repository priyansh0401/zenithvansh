'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User, Package, Heart, MapPin, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
    { label: 'Overview', href: '/profile', icon: User },
    { label: 'My Orders', href: '/profile/orders', icon: Package },
    { label: 'Wishlist', href: '/profile', icon: Heart, hash: '#wishlist' },
    { label: 'Addresses', href: '/profile', icon: MapPin, hash: '#addresses' },
    { label: 'Settings', href: '/profile/settings', icon: Settings },
]

export default function ProfileNav() {
    const pathname = usePathname()

    return (
        <nav>
            <div className="flex gap-1 overflow-x-auto md:flex-col">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 whitespace-nowrap rounded-lg px-4 py-3 text-sm font-medium transition',
                                isActive
                                    ? 'bg-accent/10 text-accent'
                                    : 'text-[var(--color-text-muted)] hover:bg-white/5 hover:text-[var(--color-text-secondary)]'
                            )}
                        >
                            <Icon size={18} />
                            {item.label}
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
