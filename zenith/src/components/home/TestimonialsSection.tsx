'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
    {
        name: 'Marcus Thompson',
        location: 'New York, USA',
        rating: 5,
        quote: 'The Apex Runner Pro is hands down the best running shoe I have ever worn. The responsiveness is unreal — it feels like the shoe anticipates every step before I take it.',
        date: 'Nov 2024',
    },
    {
        name: 'Aisha Patel',
        location: 'London, UK',
        rating: 5,
        quote: 'I ordered the Shadow Lite expecting just another sneaker. What arrived was a piece of art. The attention to detail is obsessive — in the best way possible.',
        date: 'Oct 2024',
    },
    {
        name: 'Kenji Watanabe',
        location: 'Tokyo, Japan',
        rating: 5,
        quote: 'ZENITH has completely changed my expectations for what a lifestyle sneaker can be. The Phantom Drift is both a statement piece and an all-day comfort shoe.',
        date: 'Sep 2024',
    },
    {
        name: 'Sofia Rodriguez',
        location: 'Barcelona, Spain',
        rating: 5,
        quote: 'The Nova Pulse is everything I wanted in a performance shoe. Lightweight, breathable, and gorgeous. I have worn them for two marathons now — zero complaints.',
        date: 'Aug 2024',
    },
    {
        name: 'James O\'Neil',
        location: 'Sydney, Australia',
        rating: 4,
        quote: 'Skeptical at first — the price point is premium. But after wearing the Velocity X for a month, I understand why. These are engineered differently.',
        date: 'Jul 2024',
    },
    {
        name: 'Lena Fischer',
        location: 'Berlin, Germany',
        rating: 5,
        quote: 'The customer service alone is worth it. But the Celestial Weave sneakers? Absolute perfection. I get compliments every single time I wear them.',
        date: 'Jun 2024',
    },
]

export default function TestimonialsSection() {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [])

    const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
    const next = () => setCurrent((c) => (c + 1) % testimonials.length)

    return (
        <section className="bg-[var(--color-bg-primary)] py-24">
            <div className="mx-auto max-w-4xl px-6">
                <h2 className="mb-12 text-center font-display text-4xl font-black uppercase tracking-tight text-[var(--color-text-primary)]">
                    What They Say
                </h2>

                <div className="relative min-h-[280px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                            className="text-center"
                        >
                            <div className="flex items-center justify-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`h-5 w-5 ${i < testimonials[current].rating
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'fill-gray-600 text-gray-600'
                                            }`}
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            <blockquote className="mt-6 text-xl italic leading-relaxed text-[var(--color-text-secondary)] md:text-2xl">
                                &ldquo;{testimonials[current].quote}&rdquo;
                            </blockquote>

                            <div className="mt-8">
                                <p className="font-display text-lg font-bold text-[var(--color-text-primary)]">
                                    {testimonials[current].name}
                                </p>
                                <p className="text-sm text-[var(--color-text-muted)]">
                                    {testimonials[current].location} · {testimonials[current].date}
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <button
                        onClick={prev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white/5 p-2 text-[var(--color-text-muted)] transition hover:bg-white/10 hover:text-white"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white/5 p-2 text-[var(--color-text-muted)] transition hover:bg-white/10 hover:text-white"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                <div className="mt-8 flex items-center justify-center gap-2">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`h-2 rounded-full transition-all ${i === current ? 'w-8 bg-accent' : 'w-2 bg-[var(--color-text-muted)]'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
