'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const stats = [
    { value: 50000, label: 'Happy Customers', suffix: '+' },
    { value: 120, label: 'Countries Reached', suffix: '' },
    { value: 99, label: '% Satisfaction', suffix: '' },
    { value: 4.9, label: '★ Average Rating', suffix: '', isDecimal: true },
]

function CountUp({ target, isDecimal, inView }: { target: number; isDecimal?: boolean; inView: boolean }) {
    const [value, setValue] = useState(0)

    useEffect(() => {
        if (!inView) return
        const duration = 2000
        const steps = 60
        const increment = target / steps
        let current = 0
        const interval = setInterval(() => {
            current += increment
            if (current >= target) {
                setValue(target)
                clearInterval(interval)
            } else {
                setValue(current)
            }
        }, duration / steps)
        return () => clearInterval(interval)
    }, [target, inView])

    if (isDecimal) return <>{value.toFixed(1)}</>
    return <>{Math.floor(value).toLocaleString()}</>
}

export default function StatsSection() {
    const { ref, isInView } = useScrollAnimation()

    return (
        <section ref={ref} className="bg-[var(--color-bg-secondary)] py-20">
            <div className="mx-auto max-w-5xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    className="grid gap-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] p-8 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <span className="font-display text-4xl font-black text-accent md:text-5xl">
                                <CountUp target={stat.value} isDecimal={stat.isDecimal} inView={isInView} />
                                {stat.suffix}
                            </span>
                            <p className="mt-2 text-sm text-[var(--color-text-muted)]">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
