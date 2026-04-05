'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@/types'

interface CartStore {
    items: CartItem[]
    isOpen: boolean
    isLoading: boolean
    addItem: (item: CartItem) => void
    removeItem: (productId: string, color: string, size: number) => void
    updateQuantity: (productId: string, color: string, size: number, quantity: number) => void
    clearCart: () => void
    openDrawer: () => void
    closeDrawer: () => void
    syncWithServer: () => Promise<void>
    loadFromServer: () => Promise<void>
    getTotalItems: () => number
    getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            isLoading: false,

            addItem: (item: CartItem) => {
                const items = get().items
                const existingIndex = items.findIndex(
                    (i) => i.productId === item.productId && i.color === item.color && i.size === item.size
                )

                if (existingIndex > -1) {
                    const updated = [...items]
                    updated[existingIndex] = {
                        ...updated[existingIndex],
                        quantity: updated[existingIndex].quantity + item.quantity,
                    }
                    set({ items: updated })
                } else {
                    set({ items: [...items, item] })
                }
            },

            removeItem: (productId: string, color: string, size: number) => {
                set({
                    items: get().items.filter(
                        (i) => !(i.productId === productId && i.color === color && i.size === size)
                    ),
                })
            },

            updateQuantity: (productId: string, color: string, size: number, quantity: number) => {
                if (quantity <= 0) {
                    get().removeItem(productId, color, size)
                    return
                }
                set({
                    items: get().items.map((i) =>
                        i.productId === productId && i.color === color && i.size === size
                            ? { ...i, quantity }
                            : i
                    ),
                })
            },

            clearCart: () => set({ items: [] }),
            openDrawer: () => set({ isOpen: true }),
            closeDrawer: () => set({ isOpen: false }),

            syncWithServer: async () => {
                const items = get().items
                try {
                    for (const item of items) {
                        await fetch('/api/cart', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                productId: item.productId,
                                color: item.color,
                                size: item.size,
                                quantity: item.quantity,
                            }),
                        })
                    }
                } catch (error) {
                    console.error('Failed to sync cart with server:', error)
                }
            },

            loadFromServer: async () => {
                set({ isLoading: true })
                try {
                    const res = await fetch('/api/cart')
                    if (res.ok) {
                        const data = await res.json()
                        if (data.data?.items) {
                            const mapped: CartItem[] = data.data.items.map(
                                (item: { productId: { _id: string; name: string; price: number; images: { url: string }[] }; color: string; size: number; quantity: number }) => ({
                                    productId: item.productId._id || item.productId,
                                    productName: item.productId.name || '',
                                    productImage: item.productId.images?.[0]?.url || '',
                                    color: item.color,
                                    size: item.size,
                                    quantity: item.quantity,
                                    price: item.productId.price || 0,
                                })
                            )
                            set({ items: mapped })
                        }
                    }
                } catch (error) {
                    console.error('Failed to load cart from server:', error)
                } finally {
                    set({ isLoading: false })
                }
            },

            getTotalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
            getTotalPrice: () =>
                get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        }),
        {
            name: 'zenith-cart',
            skipHydration: true,
        }
    )
)
