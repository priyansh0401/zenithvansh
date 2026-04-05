'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import PageWrapper from '@/components/layout/PageWrapper'
import ProfileNav from '@/components/profile/ProfileNav'
import OrderCard from '@/components/orders/OrderCard'
import Spinner from '@/components/ui/Spinner'
import { useAuthStore } from '@/store/authStore'
import type { Order } from '@/types'
import { Package } from 'lucide-react'

export default function OrdersPage() {
    const router = useRouter()
    const { isAuthenticated, loading } = useAuthStore()
    const [orders, setOrders] = useState<Order[]>([])
    const [ordersLoading, setOrdersLoading] = useState(true)

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/login?redirect=/profile/orders')
        }
    }, [isAuthenticated, loading, router])

    useEffect(() => {
        if (isAuthenticated) {
            fetch('/api/orders')
                .then((r) => r.json())
                .then((data) => {
                    if (data.success) setOrders(data.data)
                })
                .catch(console.error)
                .finally(() => setOrdersLoading(false))
        }
    }, [isAuthenticated])

    if (loading || !isAuthenticated) {
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
                    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
                        <aside>
                            <ProfileNav />
                        </aside>
                        <div>
                            <h1 className="mb-8 font-display text-3xl font-black uppercase tracking-tight">
                                My Orders
                            </h1>
                            {ordersLoading ? (
                                <div className="flex justify-center py-12">
                                    <Spinner size="lg" />
                                </div>
                            ) : orders.length === 0 ? (
                                <div className="flex flex-col items-center py-20">
                                    <Package size={64} className="text-[var(--color-text-muted)]" />
                                    <p className="mt-4 text-lg text-[var(--color-text-muted)]">No orders yet</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {orders.map((order) => (
                                        <OrderCard key={order._id} order={order} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </PageWrapper>
    )
}
