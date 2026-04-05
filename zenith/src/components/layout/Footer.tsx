'use client'

import Link from 'next/link'
import Logo from '@/components/Logo'
import { Instagram, Youtube } from 'lucide-react'

const footerLinks = {
    shop: [
        { label: "Men's", href: '/men' },
        { label: "Women's", href: '/women' },
        { label: 'New Arrivals', href: '/men' },
        { label: 'Sale', href: '/men' },
        { label: 'Size Guide', href: '/contact' },
    ],
    company: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Careers', href: '/about' },
        { label: 'Press', href: '/about' },
        { label: 'Sustainability', href: '/about' },
    ],
    support: [
        { label: 'FAQ', href: '/contact' },
        { label: 'Shipping Info', href: '/contact' },
        { label: 'Returns', href: '/contact' },
        { label: 'Track Order', href: '/profile/orders' },
        { label: 'Contact Us', href: '/contact' },
    ],
}

export default function Footer() {
    return (
        <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
            <div className="mx-auto max-w-7xl px-6 py-16">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <Logo size={24} variant="full" />
                        <p className="mt-4 text-sm text-[var(--color-text-muted)]">
                            Engineered for the apex.
                        </p>
                        <div className="mt-6 flex gap-4">
                            <a href="#" className="text-[var(--color-text-muted)] transition hover:text-accent">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="text-[var(--color-text-muted)] transition hover:text-accent">
                                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a href="#" className="text-[var(--color-text-muted)] transition hover:text-accent">
                                <Youtube size={20} />
                            </a>
                            <a href="#" className="text-[var(--color-text-muted)] transition hover:text-accent">
                                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .54.04.79.11v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.82a8.28 8.28 0 004.76 1.5v-3.4a4.85 4.85 0 01-1-.23z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
                            Shop
                        </h4>
                        <ul className="mt-4 space-y-3">
                            {footerLinks.shop.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[var(--color-text-muted)] transition hover:text-[var(--color-text-primary)]"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
                            Company
                        </h4>
                        <ul className="mt-4 space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[var(--color-text-muted)] transition hover:text-[var(--color-text-primary)]"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
                            Support
                        </h4>
                        <ul className="mt-4 space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[var(--color-text-muted)] transition hover:text-[var(--color-text-primary)]"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[var(--color-border)] pt-8 md:flex-row">
                    <p className="text-xs text-[var(--color-text-muted)]">
                        © 2024 ZENITH. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <span className="rounded-full bg-[var(--color-bg-tertiary)] px-3 py-1 text-xs text-[var(--color-text-muted)]">
                            💵 Cash on Delivery
                        </span>
                        <span className="text-xs text-[var(--color-text-muted)]">Made for the apex.</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
