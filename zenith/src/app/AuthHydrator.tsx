'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'

export default function AuthHydrator() {
    const checkAuth = useAuthStore((s) => s.checkAuth)

    useEffect(() => {
        // Hydrate persisted stores
        useCartStore.persist.rehydrate()
        useWishlistStore.persist.rehydrate()
        // Check auth status
        checkAuth()
    }, [checkAuth])

    return null
}
