'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const FloatingModel = dynamic(() => import('./FloatingModel'), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-transparent" />,
})

export default function HeroCanvas() {
    return (
        <Suspense fallback={<div className="h-full w-full bg-transparent" />}>
            <FloatingModel />
        </Suspense>
    )
}
