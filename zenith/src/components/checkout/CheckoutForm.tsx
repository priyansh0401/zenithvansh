'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Check, CreditCard, Banknote, Smartphone } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import { formatPrice } from '@/lib/utils'
import { SHIPPING_THRESHOLD, SHIPPING_FEE, TAX_RATE } from '@/lib/constants'
import toast from 'react-hot-toast'

export default function CheckoutForm() {
    const router = useRouter()
    const { items, clearCart, getTotalPrice } = useCartStore()
    const { user } = useAuthStore()
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)

    const [contact, setContact] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
    })

    const [address, setAddress] = useState({
        fullName: user?.addresses?.[0]?.fullName || user?.name || '',
        phone: user?.addresses?.[0]?.phone || '',
        street: user?.addresses?.[0]?.street || '',
        city: user?.addresses?.[0]?.city || '',
        state: user?.addresses?.[0]?.state || '',
        pincode: user?.addresses?.[0]?.pincode || '',
        country: user?.addresses?.[0]?.country || '',
    })

    const [notes, setNotes] = useState('')

    const subtotal = getTotalPrice()
    const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
    const tax = subtotal * TAX_RATE
    const total = subtotal + shipping + tax

    const handlePlaceOrder = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    shippingAddress: address,
                    notes,
                }),
            })

            const data = await res.json()
            if (data.success) {
                clearCart()
                router.push(`/order-confirmed?orderId=${data.data._id}`)
            } else {
                toast.error(data.error || 'Failed to place order')
            }
        } catch {
            toast.error('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
            <div>
                <div className="mb-8 flex items-center gap-4">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex flex-1 items-center gap-2">
                            <div
                                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${step >= s
                                        ? 'bg-accent text-white'
                                        : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]'
                                    }`}
                            >
                                {step > s ? <Check size={16} /> : s}
                            </div>
                            <span className={`text-sm ${step >= s ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-muted)]'}`}>
                                {s === 1 ? 'Contact' : s === 2 ? 'Shipping' : 'Review & Pay'}
                            </span>
                            {s < 3 && <div className={`h-px flex-1 ${step > s ? 'bg-accent' : 'bg-[var(--color-border)]'}`} />}
                        </div>
                    ))}
                </div>

                {step === 1 && (
                    <div className="space-y-4">
                        <h2 className="font-display text-2xl font-bold">Contact Information</h2>
                        <Input label="Full Name" value={contact.name} onChange={(e) => setContact({ ...contact, name: (e.target as HTMLInputElement).value })} required />
                        <Input label="Email" type="email" value={contact.email} readOnly className="opacity-60" />
                        <Input label="Phone" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: (e.target as HTMLInputElement).value })} />
                        <Button onClick={() => setStep(2)} className="w-full">Continue to Shipping</Button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4">
                        <h2 className="font-display text-2xl font-bold">Shipping Address</h2>
                        {user?.addresses && user.addresses.length > 0 && (
                            <div className="mb-4">
                                <p className="mb-2 text-sm text-[var(--color-text-muted)]">Saved Addresses</p>
                                {user.addresses.map((addr, i) => (
                                    <button
                                        key={i}
                                        onClick={() =>
                                            setAddress({
                                                fullName: addr.fullName,
                                                phone: addr.phone,
                                                street: addr.street,
                                                city: addr.city,
                                                state: addr.state,
                                                pincode: addr.pincode,
                                                country: addr.country,
                                            })
                                        }
                                        className="mb-2 w-full rounded-lg border border-[var(--color-border)] p-3 text-left text-sm hover:border-accent"
                                    >
                                        <span className="font-medium">{addr.label}</span> — {addr.street}, {addr.city}
                                    </button>
                                ))}
                            </div>
                        )}
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Input label="Full Name" value={address.fullName} onChange={(e) => setAddress({ ...address, fullName: (e.target as HTMLInputElement).value })} required />
                            <Input label="Phone" value={address.phone} onChange={(e) => setAddress({ ...address, phone: (e.target as HTMLInputElement).value })} required />
                        </div>
                        <Input label="Street Address" value={address.street} onChange={(e) => setAddress({ ...address, street: (e.target as HTMLInputElement).value })} required />
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Input label="City" value={address.city} onChange={(e) => setAddress({ ...address, city: (e.target as HTMLInputElement).value })} required />
                            <Input label="State" value={address.state} onChange={(e) => setAddress({ ...address, state: (e.target as HTMLInputElement).value })} required />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Input label="Pincode" value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: (e.target as HTMLInputElement).value })} required />
                            <Input label="Country" value={address.country} onChange={(e) => setAddress({ ...address, country: (e.target as HTMLInputElement).value })} required />
                        </div>
                        <div className="flex gap-3">
                            <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                            <Button onClick={() => setStep(3)} className="flex-1">Continue to Review</Button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6">
                        <h2 className="font-display text-2xl font-bold">Review & Pay</h2>

                        <div>
                            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Order Items</h3>
                            {items.map((item) => (
                                <div key={`${item.productId}-${item.color}-${item.size}`} className="flex items-center gap-3 border-b border-[var(--color-border)] py-3">
                                    <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                                        <Image src={item.productImage} alt={item.productName} fill className="object-cover" sizes="48px" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{item.productName}</p>
                                        <p className="text-xs text-[var(--color-text-muted)]">{item.color} · Size {item.size} · Qty {item.quantity}</p>
                                    </div>
                                    <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                                </div>
                            ))}
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Shipping Address</h3>
                                <button onClick={() => setStep(2)} className="text-xs text-accent hover:underline">Edit</button>
                            </div>
                            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                                {address.fullName}, {address.street}, {address.city}, {address.state} {address.pincode}, {address.country}
                            </p>
                        </div>

                        <div>
                            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-[var(--color-text-muted)]">Payment Method</h3>
                            <div className="grid gap-3 sm:grid-cols-3">
                                <div className="rounded-lg border-2 border-accent bg-accent/5 p-4">
                                    <Banknote size={24} className="text-accent" />
                                    <p className="mt-2 text-sm font-medium">Cash on Delivery</p>
                                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">Pay when it arrives</p>
                                </div>
                                <div className="rounded-lg border border-[var(--color-border)] p-4 opacity-40">
                                    <CreditCard size={24} className="text-[var(--color-text-muted)]" />
                                    <p className="mt-2 text-sm font-medium text-[var(--color-text-muted)]">Credit/Debit Card</p>
                                    <span className="mt-1 inline-block rounded bg-[var(--color-bg-tertiary)] px-2 py-0.5 text-[10px] text-[var(--color-text-muted)]">Coming Soon</span>
                                </div>
                                <div className="rounded-lg border border-[var(--color-border)] p-4 opacity-40">
                                    <Smartphone size={24} className="text-[var(--color-text-muted)]" />
                                    <p className="mt-2 text-sm font-medium text-[var(--color-text-muted)]">UPI</p>
                                    <span className="mt-1 inline-block rounded bg-[var(--color-bg-tertiary)] px-2 py-0.5 text-[10px] text-[var(--color-text-muted)]">Coming Soon</span>
                                </div>
                            </div>
                        </div>

                        <Input textarea label="Special Instructions (Optional)" value={notes} onChange={(e) => setNotes((e.target as HTMLTextAreaElement).value)} placeholder="Any notes for delivery..." />

                        <div className="flex gap-3">
                            <Button variant="ghost" onClick={() => setStep(2)}>Back</Button>
                            <Button onClick={handlePlaceOrder} loading={loading} className="flex-1" size="lg">
                                Place Order — {formatPrice(total)}
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <div className="hidden lg:block">
                <div className="sticky top-24 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
                    <h3 className="font-display text-lg font-bold">Order Summary</h3>
                    <div className="mt-4 space-y-3">
                        {items.map((item) => (
                            <div key={`${item.productId}-${item.color}-${item.size}`} className="flex items-center gap-3">
                                <div className="relative h-10 w-10 overflow-hidden rounded-lg">
                                    <Image src={item.productImage} alt={item.productName} fill className="object-cover" sizes="40px" />
                                </div>
                                <div className="flex-1 text-xs">
                                    <p className="font-medium">{item.productName}</p>
                                    <p className="text-[var(--color-text-muted)]">×{item.quantity}</p>
                                </div>
                                <span className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 space-y-2 border-t border-[var(--color-border)] pt-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-[var(--color-text-muted)]">Subtotal</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-[var(--color-text-muted)]">Shipping</span>
                            <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-[var(--color-text-muted)]">Tax</span>
                            <span>{formatPrice(tax)}</span>
                        </div>
                        <div className="flex justify-between border-t border-[var(--color-border)] pt-2 text-lg font-bold">
                            <span>Total</span>
                            <span>{formatPrice(total)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
