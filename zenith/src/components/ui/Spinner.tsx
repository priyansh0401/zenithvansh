'use client'

import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

const sizeMap = {
    sm: 16,
    md: 24,
    lg: 40,
    xl: 56,
}

interface SpinnerProps {
    size?: keyof typeof sizeMap | number
    className?: string
}

export default function Spinner({ size = 'md', className }: SpinnerProps) {
    const px = typeof size === 'number' ? size : sizeMap[size]
    return <Loader2 size={px} className={cn('animate-spin text-accent', className)} />
}
