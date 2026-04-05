'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ChevronDown } from 'lucide-react'
import Button from '@/components/ui/Button'

const HeroCanvas = dynamic(() => import('@/components/three/HeroCanvas'), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-transparent" />,
})

export default function HeroSection() {
    return (
        <section className="noise-overlay relative flex min-h-[100dvh] items-center overflow-hidden bg-[var(--color-bg-primary)]">
            <div
                className="absolute inset-0"
                style={{
                    background:
                        'radial-gradient(ellipse at center, rgba(20,20,30,1) 0%, rgba(3,3,4,1) 70%)',
                }}
            />

            <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-8 px-6 lg:grid-cols-[55%_45%]">
                <div className="flex flex-col justify-center py-20 lg:py-0">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0 }}
                        className="font-display text-sm font-bold uppercase tracking-[0.3em] text-accent"
                    >
                        ZENITH
                    </motion.span>

                    <h1 className="mt-4 font-display font-black leading-[0.9] tracking-tight">
                        <motion.span
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="block text-6xl text-[var(--color-text-primary)] md:text-7xl lg:text-8xl"
                        >
                            Step Into
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="block text-6xl text-accent md:text-7xl lg:text-8xl"
                        >
                            The Apex.
                        </motion.span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="mt-6 max-w-md text-lg text-[var(--color-text-secondary)]"
                    >
                        Engineered for the apex. Every stitch, every sole, every stride — crafted for those who
                        refuse to settle.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0 }}
                        className="mt-8 flex flex-wrap gap-4"
                    >
                        <Link href="/men">
                            <Button size="lg">Shop Men</Button>
                        </Link>
                        <Link href="/women">
                            <Button variant="outline" size="lg">
                                Shop Women
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                <div className="hidden h-[500px] lg:block">
                    <HeroCanvas />
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
            >
                <ChevronDown size={24} className="animate-[bounce-arrow_2s_ease-in-out_infinite] text-[var(--color-text-muted)]" />
            </motion.div>
        </section>
    )
}
