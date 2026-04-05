'use client'

import { cn } from '@/lib/utils'

interface LogoProps {
    size?: number
    variant?: 'full' | 'icon'
    theme?: 'light' | 'dark'
    className?: string
}

export default function Logo({ size = 32, variant = 'full', theme = 'light', className }: LogoProps) {
    const textColor = theme === 'light' ? '#F5F5F7' : '#030304'
    const accentColor = '#7C3AED'
    const accentDark = '#6D28D9'

    if (variant === 'icon') {
        return (
            <svg
                width={size}
                height={size}
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={cn(className)}
            >
                <path d="M4 40L20 8L28 22L36 8L52 40H4Z" fill={accentColor} />
                <path d="M20 8L28 22L36 8L28 16L20 8Z" fill={accentDark} />
            </svg>
        )
    }

    const width = size * 7
    return (
        <svg
            width={width}
            height={size}
            viewBox="0 0 280 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(className)}
        >
            <path d="M4 40L20 8L28 22L36 8L52 40H4Z" fill={accentColor} />
            <path d="M20 8L28 22L36 8L28 16L20 8Z" fill={accentDark} />
            <text
                x="68"
                y="36"
                fontFamily="sans-serif"
                fontWeight="900"
                fontSize="32"
                letterSpacing="8"
                fill={textColor}
            >
                ZENITH
            </text>
        </svg>
    )
}
