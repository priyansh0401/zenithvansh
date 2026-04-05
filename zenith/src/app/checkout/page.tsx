'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PageWrapper from '@/components/layout/PageWrapper'
import CheckoutForm from '@/components/checkout/CheckoutForm'
import { useAuthStore } from '@/store/authStore'
import { useCartStore } from '@/store/cartStore'
import Spinner from '@/components/ui/Spinner'

export default function CheckoutPage() {
    const router = useRouter()
    const { isAuthenticated, loading } = useAuthStore()
    const items = useCartStore((s) => s.items)

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/login?redirect=/checkout')
        }
        if (!loading && items.length === 0) {
            router.push('/cart')
        }
    }, [isAuthenticated, loading, items.length, router])

    if (loading || !isAuthenticated || items.length === 0) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Spinner size="lg" />
            </div>
        )
    }

    return (
        <PageWrapper>
            <section className="py-12">
                <div className="mx-auto max-w-7xl px-6">
                    <h1 className="mb-8 font-display text-4xl font-black uppercase tracking-tight">
                        Checkout
                    </h1>
                    <CheckoutForm />
                </div>
            </section>
        </PageWrapper>
    )
}
