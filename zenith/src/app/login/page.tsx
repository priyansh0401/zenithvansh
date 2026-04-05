'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import PageWrapper from '@/components/layout/PageWrapper'
import { useAuthStore } from '@/store/authStore'
import Spinner from '@/components/ui/Spinner'
import toast from 'react-hot-toast'

function LoginForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const redirect = searchParams.get('redirect') || '/'
    const { login } = useAuthStore()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await login(email, password)
            toast.success('Welcome back!')
            router.push(redirect)
        } catch (error: any) {
            toast.error(error.message || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-8"
        >
            <div className="mb-8 text-center">
                <h1 className="font-display text-3xl font-black tracking-tight">Welcome Back</h1>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Sign in to your ZENITH account
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
                    required
                />
                <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
                    required
                />
                <Button type="submit" loading={loading} className="w-full" size="lg">
                    Sign In
                </Button>
            </form>

            <p className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="text-accent hover:underline">
                    Create one
                </Link>
            </p>
        </motion.div>
    )
}

export default function LoginPage() {
    return (
        <PageWrapper>
            <section className="flex min-h-[80vh] items-center justify-center py-12">
                <Suspense fallback={<Spinner size="lg" />}>
                    <LoginForm />
                </Suspense>
            </section>
        </PageWrapper>
    )
}
