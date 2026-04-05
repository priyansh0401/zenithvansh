'use client'

import { useCartStore } from '@/store/cartStore'
import type { CartItem } from '@/types'
import toast from 'react-hot-toast'

export function useCart() {
    const store = useCartStore()

    const addToCart = (item: CartItem) => {
        store.addItem(item)
        toast.success(`${item.productName} added to cart`)
    }

    const removeFromCart = (productId: string, color: string, size: number) => {
        store.removeItem(productId, color, size)
        toast.success('Item removed from cart')
    }

    const updateQty = (productId: string, color: string, size: number, quantity: number) => {
        store.updateQuantity(productId, color, size, quantity)
    }

    return {
        items: store.items,
        isOpen: store.isOpen,
        isLoading: store.isLoading,
        totalItems: store.getTotalItems(),
        totalPrice: store.getTotalPrice(),
        addToCart,
        removeFromCart,
        updateQty,
        clearCart: store.clearCart,
        openDrawer: store.openDrawer,
        closeDrawer: store.closeDrawer,
        syncWithServer: store.syncWithServer,
        loadFromServer: store.loadFromServer,
    }
}
