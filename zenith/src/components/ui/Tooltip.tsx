'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface TooltipProps {
    children: React.ReactNode
    content: string
    className?: string
}

export default function Tooltip({ children, content, className }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div
                    className={cn(
                        'absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[var(--color-bg-tertiary)] px-3 py-2 text-xs text-[var(--color-text-secondary)] shadow-lg',
                        className
                    )}
                >
                    {content}
                    <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-[var(--color-bg-tertiary)]" />
                </div>
            )}
        </div>
    )
}
