'use client'

import { create } from 'zustand'
import type { User } from '@/types'

interface AuthStore {
    user: User | null
    loading: boolean
    isAuthenticated: boolean
    setUser: (user: User) => void
    clearUser: () => void
    checkAuth: () => Promise<void>
    login: (email: string, password: string) => Promise<void>
    register: (name: string, email: string, password: string, phone?: string) => Promise<void>
    logout: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    loading: true,
    isAuthenticated: false,

    setUser: (user: User) => set({ user, isAuthenticated: true, loading: false }),
    clearUser: () => set({ user: null, isAuthenticated: false, loading: false }),

    checkAuth: async () => {
        set({ loading: true })
        try {
            const res = await fetch('/api/auth/me')
            if (res.ok) {
                const data = await res.json()
                set({ user: data.data, isAuthenticated: true, loading: false })
            } else {
                set({ user: null, isAuthenticated: false, loading: false })
            }
        } catch {
            set({ user: null, isAuthenticated: false, loading: false })
        }
    },

    login: async (email: string, password: string) => {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
        const data = await res.json()
        if (!data.success) throw new Error(data.error || 'Login failed')
        set({ user: data.data, isAuthenticated: true, loading: false })
    },

    register: async (name: string, email: string, password: string, phone?: string) => {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, phone }),
        })
        const data = await res.json()
        if (!data.success) throw new Error(data.error || 'Registration failed')
        set({ user: data.data, isAuthenticated: true, loading: false })
    },

    logout: async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' })
        } catch {
            // silent fail
        }
        set({ user: null, isAuthenticated: false, loading: false })
    },
}))
