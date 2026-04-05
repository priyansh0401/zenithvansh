'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import PageWrapper from '@/components/layout/PageWrapper'
import ProfileHeader from '@/components/profile/ProfileHeader'
import ProfileNav from '@/components/profile/ProfileNav'
import EditProfileForm from '@/components/profile/EditProfileForm'
import Spinner from '@/components/ui/Spinner'
import { useAuthStore } from '@/store/authStore'
import { useWishlistStore } from '@/store/wishlistStore'

export default function ProfilePage() {
    const router = useRouter()
    const { user, isAuthenticated, loading } = useAuthStore()
    const wishlistItems = useWishlistStore((s) => s.items)
    const [orderCount, setOrderCount] = useState(0)
    const [totalSpent, setTotalSpent] = useState(0)

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/login?redirect=/profile')
        }
    }, [isAuthenticated, loading, router])

    useEffect(() => {
        if (isAuthenticated) {
            fetch('/api/orders')
                .then((r) => r.json())
                .then((data) => {
                    if (data.success) {
                        setOrderCount(data.data.length)
                        setTotalSpent(data.data.reduce((sum: number, o: any) => sum + o.total, 0))
                    }
                })
                .catch(console.error)
        }
    }, [isAuthenticated])

    if (loading || !isAuthenticated || !user) {
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
                        <div className="space-y-8">
                            <ProfileHeader user={user} orderCount={orderCount} totalSpent={totalSpent} wishlistCount={wishlistItems.length} />
                            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
                                <h2 className="mb-6 font-display text-xl font-bold">Account Settings</h2>
                                <EditProfileForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PageWrapper>
    )
}
