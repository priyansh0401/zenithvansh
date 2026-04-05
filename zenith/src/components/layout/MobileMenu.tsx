'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { X } from 'lucide-react'
import Logo from '@/components/Logo'
import { NAV_LINKS } from '@/lib/constants'
import { useAuthStore } from '@/store/authStore'

interface MobileMenuProps {
    isOpen: boolean
    onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const { isAuthenticated, user, logout } = useAuthStore()

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/60"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed bottom-0 right-0 top-0 z-[101] w-full max-w-sm bg-[var(--color-bg-primary)] p-6"
                    >
                        <div className="flex items-center justify-between">
                            <Logo size={24} variant="icon" />
                            <button
                                onClick={onClose}
                                className="rounded-full p-2 text-[var(--color-text-muted)] hover:bg-white/5 hover:text-white"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <nav className="mt-12 flex flex-col gap-2">
                            {NAV_LINKS.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 * i }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={onClose}
                                        className="block rounded-lg px-4 py-3 text-2xl font-display font-bold text-[var(--color-text-secondary)] transition hover:bg-white/5 hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <div className="mt-auto pt-8">
                            <div className="border-t border-[var(--color-border)] pt-6">
                                {isAuthenticated ? (
                                    <div className="space-y-3">
                                        <p className="text-sm text-[var(--color-text-muted)]">
                                            Signed in as {user?.name}
                                        </p>
                                        <Link
                                            href="/profile"
                                            onClick={onClose}
                                            className="block text-sm text-[var(--color-text-secondary)] hover:text-white"
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            onClick={async () => {
                                                await logout()
                                                onClose()
                                            }}
                                            className="text-sm text-red-400 hover:text-red-300"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex gap-3">
                                        <Link
                                            href="/login"
                                            onClick={onClose}
                                            className="flex-1 rounded-full border border-accent py-3 text-center text-sm font-medium text-accent"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/register"
                                            onClick={onClose}
                                            className="flex-1 rounded-full bg-accent py-3 text-center text-sm font-medium text-white"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
