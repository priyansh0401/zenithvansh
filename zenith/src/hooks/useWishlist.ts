'use client'

import { useWishlistStore } from '@/store/wishlistStore'
import toast from 'react-hot-toast'

export function useWishlist() {
    const store = useWishlistStore()

    const toggle = (productId: string, productName?: string) => {
        const wasWishlisted = store.isWishlisted(productId)
        store.toggleWishlist(productId)
        if (wasWishlisted) {
            toast.success(productName ? `${productName} removed from wishlist` : 'Removed from wishlist')
        } else {
            toast.success(productName ? `${productName} added to wishlist` : 'Added to wishlist')
        }
    }

    return {
        items: store.items,
        toggleWishlist: toggle,
        isWishlisted: store.isWishlisted,
    }
}
