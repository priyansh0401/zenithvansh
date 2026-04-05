'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import PageWrapper from '@/components/layout/PageWrapper'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'

export default function RegisterPage() {
    const router = useRouter()
    const { register } = useAuthStore()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await register(name, email, password, phone)
            toast.success('Account created! Welcome to ZENITH.')
            router.push('/')
        } catch (error: any) {
            toast.error(error.message || 'Registration failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <PageWrapper>
            <section className="flex min-h-[80vh] items-center justify-center py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-8"
                >
                    <div className="mb-8 text-center">
                        <h1 className="font-display text-3xl font-black tracking-tight">Join ZENITH</h1>
                        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                            Create your account and step into the apex.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Full Name"
                            value={name}
                            onChange={(e) => setName((e.target as HTMLInputElement).value)}
                            required
                        />
                        <Input
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
                            required
                        />
                        <Input
                            label="Phone (optional)"
                            value={phone}
                            onChange={(e) => setPhone((e.target as HTMLInputElement).value)}
                        />
                        <Input
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
                            required
                        />
                        <Button type="submit" loading={loading} className="w-full" size="lg">
                            Create Account
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
                        Already have an account?{' '}
                        <Link href="/login" className="text-accent hover:underline">
                            Sign in
                        </Link>
                    </p>
                </motion.div>
            </section>
        </PageWrapper>
    )
}
