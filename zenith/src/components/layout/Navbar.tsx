'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Heart, User, Menu, Search, X } from 'lucide-react'
import Logo from '@/components/Logo'
import MobileMenu from './MobileMenu'
import CartDrawer from '@/components/cart/CartDrawer'
import { NAV_LINKS } from '@/lib/constants'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useAuthStore } from '@/store/authStore'
import { cn } from '@/lib/utils'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [userDropdown, setUserDropdown] = useState(false)
    const pathname = usePathname()

    const cartItems = useCartStore((s) => s.items)
    const openDrawer = useCartStore((s) => s.openDrawer)
    const wishlistItems = useWishlistStore((s) => s.items)
    const { user, isAuthenticated } = useAuthStore()

    const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 80)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setUserDropdown(false)
        setMobileMenuOpen(false)
    }, [pathname])

    return (
        <>
            <nav
                className={cn(
                    'fixed left-0 right-0 top-0 z-50 h-16 transition-all duration-300',
                    scrolled
                        ? 'border-b border-[var(--color-border)] bg-[rgba(3,3,4,0.9)] backdrop-blur-xl'
                        : 'bg-transparent'
                )}
            >
                <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
                    <Link href="/" className="flex-shrink-0">
                        <Logo size={28} variant="full" />
                    </Link>

                    <div className="hidden items-center gap-8 md:flex">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    'group relative py-1 text-sm font-medium transition-colors',
                                    pathname === link.href
                                        ? 'text-[var(--color-text-primary)]'
                                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                                )}
                            >
                                {link.label}
                                <span
                                    className={cn(
                                        'absolute -bottom-0.5 left-0 h-0.5 bg-accent transition-all duration-300',
                                        pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                                    )}
                                />
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSearchOpen(!searchOpen)}
                            className="p-2 text-[var(--color-text-secondary)] transition hover:text-[var(--color-text-primary)]"
                        >
                            {searchOpen ? <X size={20} /> : <Search size={20} />}
                        </button>

                        <Link
                            href="/profile"
                            className="relative p-2 text-[var(--color-text-secondary)] transition hover:text-[var(--color-text-primary)]"
                        >
                            <Heart size={20} />
                            {wishlistItems.length > 0 && (
                                <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
                                    {wishlistItems.length}
                                </span>
                            )}
                        </Link>

                        <div className="relative">
                            <button
                                onClick={() => setUserDropdown(!userDropdown)}
                                className="p-2 text-[var(--color-text-secondary)] transition hover:text-[var(--color-text-primary)]"
                            >
                                <User size={20} />
                            </button>

                            <AnimatePresence>
                                {userDropdown && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 8 }}
                                        className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-2 shadow-xl"
                                    >
                                        {isAuthenticated ? (
                                            <>
                                                <p className="px-3 py-2 text-sm text-[var(--color-text-muted)]">
                                                    {user?.name}
                                                </p>
                                                <Link
                                                    href="/profile"
                                                    className="block rounded-lg px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-white"
                                                >
                                                    Profile
                                                </Link>
                                                <Link
                                                    href="/profile/orders"
                                                    className="block rounded-lg px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-white"
                                                >
                                                    My Orders
                                                </Link>
                                                <button
                                                    onClick={async () => {
                                                        await useAuthStore.getState().logout()
                                                        setUserDropdown(false)
                                                    }}
                                                    className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-400 hover:bg-white/5"
                                                >
                                                    Logout
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <Link
                                                    href="/login"
                                                    className="block rounded-lg px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-white"
                                                >
                                                    Login
                                                </Link>
                                                <Link
                                                    href="/register"
                                                    className="block rounded-lg px-3 py-2 text-sm text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-white"
                                                >
                                                    Register
                                                </Link>
                                            </>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <button
                            onClick={openDrawer}
                            className="relative p-2 text-[var(--color-text-secondary)] transition hover:text-[var(--color-text-primary)]"
                        >
                            <ShoppingBag size={20} />
                            {totalCartItems > 0 && (
                                <motion.span
                                    key={totalCartItems}
                                    initial={{ scale: 1.3 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white"
                                >
                                    {totalCartItems}
                                </motion.span>
                            )}
                        </button>

                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="p-2 text-[var(--color-text-secondary)] transition hover:text-[var(--color-text-primary)] md:hidden"
                        >
                            <Menu size={20} />
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {searchOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]"
                        >
                            <div className="mx-auto max-w-7xl px-6 py-3">
                                <input
                                    type="text"
                                    placeholder="Search sneakers..."
                                    autoFocus
                                    className="w-full bg-transparent text-lg text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
            <CartDrawer />
        </>
    )
}
