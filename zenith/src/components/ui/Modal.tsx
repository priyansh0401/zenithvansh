'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect } from 'react'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: React.ReactNode
    className?: string
}

export default function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                            'fixed left-1/2 top-1/2 z-[101] max-h-[90vh] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6',
                            className
                        )}
                    >
                        {title && (
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="font-display text-xl font-bold">{title}</h3>
                                <button
                                    onClick={onClose}
                                    className="rounded-full p-1 text-[var(--color-text-muted)] transition hover:bg-white/10 hover:text-[var(--color-text-primary)]"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        )}
                        {!title && (
                            <button
                                onClick={onClose}
                                className="absolute right-4 top-4 rounded-full p-1 text-[var(--color-text-muted)] transition hover:bg-white/10 hover:text-[var(--color-text-primary)]"
                            >
                                <X size={20} />
                            </button>
                        )}
                        {children}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
