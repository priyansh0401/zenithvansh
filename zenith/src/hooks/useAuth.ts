'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'

export function useAuth() {
    const store = useAuthStore()

    useEffect(() => {
        store.checkAuth()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        user: store.user,
        loading: store.loading,
        isAuthenticated: store.isAuthenticated,
        setUser: store.setUser,
        clearUser: store.clearUser,
        login: store.login,
        register: store.register,
        logout: store.logout,
        refreshUser: store.checkAuth,
    }
}
