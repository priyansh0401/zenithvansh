'use client'

import { cn } from '@/lib/utils'
import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: string
    textarea?: false
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    error?: string
    textarea: true
}

type Props = InputProps | TextareaProps

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
    ({ className, label, error, ...props }, ref) => {
        const baseStyles =
            'w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] transition-all duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25'

        const errorStyles = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/25' : ''

        return (
            <div className="w-full">
                {label && (
                    <label className="mb-2 block text-sm font-medium text-[var(--color-text-secondary)]">
                        {label}
                    </label>
                )}
                {props.textarea ? (
                    <textarea
                        ref={ref as React.Ref<HTMLTextAreaElement>}
                        className={cn(baseStyles, errorStyles, 'min-h-[120px] resize-y', className)}
                        {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
                    />
                ) : (
                    <input
                        ref={ref as React.Ref<HTMLInputElement>}
                        className={cn(baseStyles, errorStyles, className)}
                        {...(props as InputHTMLAttributes<HTMLInputElement>)}
                    />
                )}
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>
        )
    }
)

Input.displayName = 'Input'
export default Input
