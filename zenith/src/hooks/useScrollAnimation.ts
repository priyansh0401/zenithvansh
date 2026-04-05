'use client'

import { useEffect, useRef, useState } from 'react'

export function useScrollAnimation(threshold = 0.1) {
    const ref = useRef<HTMLDivElement>(null)
    const [isInView, setIsInView] = useState(false)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true)
                    observer.unobserve(entry.target)
                }
            },
            { threshold }
        )

        observer.observe(element)

        return () => {
            observer.disconnect()
        }
    }, [threshold])

    return { ref, isInView }
}
