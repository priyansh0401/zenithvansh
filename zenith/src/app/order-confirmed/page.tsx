'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, Package } from 'lucide-react'
import Button from '@/components/ui/Button'
import PageWrapper from '@/components/layout/PageWrapper'
import Confetti from '@/components/ui/Confetti'
import Spinner from '@/components/ui/Spinner'

function OrderConfirmedContent() {
    const searchParams = useSearchParams()
    const orderId = searchParams.get('orderId')
    const [showConfetti, setShowConfetti] = useState(true)

    useEffect(() => {
        setTimeout(() => setShowConfetti(false), 5000)
    }, [])

    return (
        <>
            {showConfetti && <Confetti />}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg text-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                    <CheckCircle size={80} className="mx-auto text-[var(--color-success)]" />
                </motion.div>

                <h1 className="mt-6 font-display text-4xl font-black uppercase tracking-tight">
                    Order Confirmed!
                </h1>
                <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
                    Thank you for your purchase. Your order has been placed successfully.
                </p>

                {orderId && (
                    <p className="mt-4 rounded-lg bg-[var(--color-bg-secondary)] px-4 py-2 text-sm text-[var(--color-text-muted)]">
                        Order ID: <span className="font-mono font-bold text-accent">{orderId}</span>
                    </p>
                )}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    {orderId && (
                        <Link href={`/profile/orders/${orderId}`}>
                            <Button variant="outline" className="w-full sm:w-auto">
                                <Package size={18} className="mr-2" />
                                Track Order
                            </Button>
                        </Link>
                    )}
                    <Link href="/men">
                        <Button className="w-full sm:w-auto">Continue Shopping</Button>
                    </Link>
                </div>
            </motion.div>
        </>
    )
}

export default function OrderConfirmedPage() {
    return (
        <PageWrapper>
            <section className="flex min-h-[70vh] items-center justify-center py-12">
                <Suspense fallback={<Spinner size="lg" />}>
                    <OrderConfirmedContent />
                </Suspense>
            </section>
        </PageWrapper>
    )
}
