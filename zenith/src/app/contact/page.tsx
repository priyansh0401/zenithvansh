'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, MapPin, Phone, Mail, Clock, Check } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import toast from 'react-hot-toast'

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            const data = await res.json()
            if (data.success) {
                setSent(true)
                toast.success('Message sent successfully!')
                setForm({ name: '', email: '', subject: '', message: '' })
            } else {
                toast.error(data.error || 'Failed to send message')
            }
        } catch {
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    const contactInfo = [
        { icon: MapPin, label: 'Address', value: '28 Via della Moda, Milan, Italy 20121' },
        { icon: Phone, label: 'Phone', value: '+39 02 8090 1234' },
        { icon: Mail, label: 'Email', value: 'hello@zenith.store' },
        { icon: Clock, label: 'Hours', value: 'Mon-Fri, 9:00 AM - 6:00 PM CET' },
    ]

    return (
        <PageWrapper>
            <section className="py-12">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="mb-12 text-center">
                        <h1 className="font-display text-5xl font-black uppercase tracking-tight md:text-6xl">
                            Contact Us
                        </h1>
                        <p className="mt-3 text-lg text-[var(--color-text-secondary)]">
                            We&apos;d love to hear from you. Reach out and we&apos;ll get back within 24 hours.
                        </p>
                    </div>

                    <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
                        <div>
                            {sent ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-12 text-center"
                                >
                                    <Check size={48} className="text-[var(--color-success)]" />
                                    <h2 className="mt-4 font-display text-2xl font-bold">Message Sent!</h2>
                                    <p className="mt-2 text-[var(--color-text-muted)]">
                                        We&apos;ll get back to you within 24 hours.
                                    </p>
                                    <Button onClick={() => setSent(false)} variant="outline" className="mt-6">
                                        Send Another Message
                                    </Button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-8">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <Input
                                            label="Name"
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: (e.target as HTMLInputElement).value })}
                                            required
                                        />
                                        <Input
                                            label="Email"
                                            type="email"
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: (e.target as HTMLInputElement).value })}
                                            required
                                        />
                                    </div>
                                    <Input
                                        label="Subject"
                                        value={form.subject}
                                        onChange={(e) => setForm({ ...form, subject: (e.target as HTMLInputElement).value })}
                                        required
                                    />
                                    <Input
                                        textarea
                                        label="Message"
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: (e.target as HTMLTextAreaElement).value })}
                                        required
                                    />
                                    <Button type="submit" loading={loading} className="w-full" size="lg">
                                        <Send size={18} className="mr-2" />
                                        Send Message
                                    </Button>
                                </form>
                            )}
                        </div>

                        <div className="space-y-6">
                            {contactInfo.map((item) => {
                                const Icon = item.icon
                                return (
                                    <div
                                        key={item.label}
                                        className="flex items-start gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5"
                                    >
                                        <div className="rounded-lg bg-accent/10 p-3">
                                            <Icon size={20} className="text-accent" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
                                                {item.label}
                                            </h3>
                                            <p className="mt-0.5 text-sm text-[var(--color-text-secondary)]">
                                                {item.value}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}

                            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5">
                                <h3 className="font-display text-lg font-bold">FAQ</h3>
                                <div className="mt-4 space-y-3">
                                    {[
                                        { q: 'What is your return policy?', a: '30-day free returns on all unworn items.' },
                                        { q: 'How long does shipping take?', a: 'Standard: 5-7 business days. Express: 2-3 business days.' },
                                        { q: 'Do you ship internationally?', a: 'Yes! We ship to 120+ countries worldwide.' },
                                    ].map((faq) => (
                                        <details key={faq.q} className="group">
                                            <summary className="cursor-pointer text-sm font-medium text-[var(--color-text-secondary)] group-open:text-accent">
                                                {faq.q}
                                            </summary>
                                            <p className="mt-1 pl-4 text-sm text-[var(--color-text-muted)]">{faq.a}</p>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PageWrapper>
    )
}
