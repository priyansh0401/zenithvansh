'use client'

import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
    size?: 'sm' | 'md' | 'lg'
    loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => {
        const baseStyles =
            'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50'

        const variants = {
            primary: 'bg-accent text-white hover:bg-accent-secondary',
            secondary: 'bg-white text-gray-900 hover:bg-gray-100',
            outline: 'border border-accent text-accent hover:bg-accent/10',
            ghost: 'text-[var(--color-text-secondary)] hover:bg-white/5',
            danger: 'bg-red-600 text-white hover:bg-red-700',
        }

        const sizes = {
            sm: 'px-4 py-2 text-sm',
            md: 'px-6 py-3 text-base',
            lg: 'px-8 py-4 text-lg',
        }

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                disabled={disabled || loading}
                {...props}
            >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        )
    }
)

Button.displayName = 'Button'
export default Button
