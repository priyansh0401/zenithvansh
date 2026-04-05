'use client'

import { cn } from '@/lib/utils'

interface BadgeProps {
    children: React.ReactNode
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'custom'
    className?: string
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
    const variants = {
        default: 'bg-accent/20 text-accent',
        success: 'bg-green-500/20 text-green-400',
        warning: 'bg-yellow-500/20 text-yellow-400',
        error: 'bg-red-500/20 text-red-400',
        info: 'bg-blue-500/20 text-blue-400',
        custom: '',
    }

    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    )
}
