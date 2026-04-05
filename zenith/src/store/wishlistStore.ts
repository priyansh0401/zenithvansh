'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WishlistStore {
    items: string[]
    toggleWishlist: (productId: string) => void
    isWishlisted: (productId: string) => boolean
}

export const useWishlistStore = create<WishlistStore>()(
    persist(
        (set, get) => ({
            items: [],

            toggleWishlist: (productId: string) => {
                const items = get().items
                if (items.includes(productId)) {
                    set({ items: items.filter((id) => id !== productId) })
                } else {
                    set({ items: [...items, productId] })
                }
            },

            isWishlisted: (productId: string) => get().items.includes(productId),
        }),
        {
            name: 'zenith-wishlist',
            skipHydration: true,
        }
    )
)
