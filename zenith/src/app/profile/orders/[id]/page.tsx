'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import PageWrapper from '@/components/layout/PageWrapper'
import OrderTimeline from '@/components/orders/OrderTimeline'
import OrderReceipt from '@/components/orders/OrderReceipt'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'
import { useAuthStore } from '@/store/authStore'
import { formatPrice, formatDate } from '@/lib/utils'
import { STATUS_COLORS } from '@/lib/constants'
import type { Order } from '@/types'
import { ArrowLeft, Printer, FileText, Ban } from 'lucide-react'
import toast from 'react-hot-toast'

export default function OrderDetailPage() {
    const params = useParams()
    const router = useRouter()
    const id = params.id as string
    const { isAuthenticated, loading } = useAuthStore()
    const [order, setOrder] = useState<Order | null>(null)
    const [orderLoading, setOrderLoading] = useState(true)
    const [showReceipt, setShowReceipt] = useState(false)
    const receiptRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/login')
        }
    }, [isAuthenticated, loading, router])

    useEffect(() => {
        if (isAuthenticated && id) {
            fetch(`/api/orders/${id}`)
                .then((r) => r.json())
                .then((data) => {
                    if (data.success) setOrder(data.data)
                })
                .catch(console.error)
                .finally(() => setOrderLoading(false))
        }
    }, [isAuthenticated, id])

    const handleCancel = async () => {
        if (!confirm('Are you sure you want to cancel this order?')) return
        try {
            const res = await fetch(`/api/orders/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cancel: true }),
            })
            const data = await res.json()
            if (data.success) {
                setOrder(data.data)
                toast.success('Order cancelled')
            }
        } catch {
            toast.error('Failed to cancel order')
        }
    }

    const handlePrint = () => {
        setShowReceipt(true)
        setTimeout(() => window.print(), 200)
    }

    if (loading || !isAuthenticated || orderLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Spinner size="lg" />
            </div>
        )
    }

    if (!order) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center">
                <h1 className="font-display text-3xl font-bold">Order Not Found</h1>
            </div>
        )
    }

    return (
        <PageWrapper>
            <section className="py-12">
                <div className="mx-auto max-w-5xl px-6">
                    <button
                        onClick={() => router.push('/profile/orders')}
                        className="mb-4 flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-white"
                    >
                        <ArrowLeft size={16} /> Back to Orders
                    </button>

                    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h1 className="font-display text-2xl font-black">Order {order.orderNumber}</h1>
                            <p className="text-sm text-[var(--color-text-muted)]">{formatDate(order.createdAt)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Badge variant="custom" className={STATUS_COLORS[order.orderStatus] || 'bg-gray-500/20 text-gray-400'}>
                                {order.orderStatus}
                            </Badge>
                            {order.orderStatus === 'Order Placed' && (
                                <Button variant="ghost" size="sm" onClick={handleCancel} className="text-red-400 hover:text-red-300">
                                    <Ban size={16} className="mr-1" /> Cancel
                                </Button>
                            )}
                            <Button variant="outline" size="sm" onClick={handlePrint}>
                                <Printer size={16} className="mr-1" /> Print
                            </Button>
                        </div>
                    </div>

                    <div className="mb-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
                        <OrderTimeline currentStatus={order.orderStatus} statusHistory={order.statusHistory} />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
                            <h3 className="mb-4 font-display text-lg font-bold">Items</h3>
                            {order.items.map((item, i) => (
                                <div key={i} className="flex items-center gap-3 border-b border-[var(--color-border)] py-3 last:border-0">
                                    <div className="relative h-14 w-14 overflow-hidden rounded-lg">
                                        <Image src={item.productImage} alt={item.productName} fill className="object-cover" sizes="56px" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{item.productName}</p>
                                        <p className="text-xs text-[var(--color-text-muted)]">{item.color} · Size {item.size} · ×{item.quantity}</p>
                                    </div>
                                    <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-6">
                            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
                                <h3 className="mb-4 font-display text-lg font-bold">Payment Summary</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between"><span className="text-[var(--color-text-muted)]">Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
                                    <div className="flex justify-between"><span className="text-[var(--color-text-muted)]">Shipping</span><span>{order.shippingFee === 0 ? 'FREE' : formatPrice(order.shippingFee)}</span></div>
                                    <div className="flex justify-between"><span className="text-[var(--color-text-muted)]">Tax</span><span>{formatPrice(order.tax)}</span></div>
                                    <div className="flex justify-between border-t border-[var(--color-border)] pt-2 font-bold"><span>Total</span><span>{formatPrice(order.total)}</span></div>
                                </div>
                                <p className="mt-3 text-xs text-[var(--color-text-muted)]">Payment: {order.paymentMethod}</p>
                            </div>

                            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
                                <h3 className="mb-2 font-display text-lg font-bold">Shipping Address</h3>
                                <p className="text-sm text-[var(--color-text-secondary)]">
                                    {order.shippingAddress.fullName}<br />
                                    {order.shippingAddress.street}<br />
                                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}<br />
                                    {order.shippingAddress.country}
                                </p>
                                {order.shippingAddress.phone && (
                                    <p className="mt-2 text-sm text-[var(--color-text-muted)]">Phone: {order.shippingAddress.phone}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {showReceipt && (
                        <div className="mt-8 print:block" ref={receiptRef}>
                            <OrderReceipt order={order} />
                        </div>
                    )}
                </div>
            </section>
        </PageWrapper>
    )
}
