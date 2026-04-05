'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Check } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function NewsletterSection() {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (email) setSubmitted(true)
    }

    return (
        <section className="relative overflow-hidden py-24">
            <div className="absolute inset-0 bg-accent/10" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />

            <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
                <Mail className="mx-auto mb-6 text-accent" size={40} />
                <h2 className="font-display text-4xl font-black uppercase tracking-tight text-[var(--color-text-primary)]">
                    Join the Apex Circle
                </h2>
                <p className="mt-4 text-[var(--color-text-secondary)]">
                    Get early access to drops, exclusive offers, and style guides.
                </p>

                {submitted ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-8 flex items-center justify-center gap-2 text-[var(--color-success)]"
                    >
                        <Check size={20} />
                        <span className="font-medium">Welcome to the Apex Circle!</span>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-8 flex gap-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="flex-1 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-6 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
                        />
                        <Button type="submit">Subscribe</Button>
                    </form>
                )}
            </div>
        </section>
    )
}
