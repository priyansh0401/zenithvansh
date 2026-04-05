'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { getUnsplashUrl } from '@/lib/utils'

export default function BrandStory() {
    const { ref, isInView } = useScrollAnimation()

    return (
        <section ref={ref} className="overflow-hidden bg-[var(--color-bg-primary)] py-24">
            <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[200px_1fr_300px]">
                <div className="flex flex-col gap-8">
                    {['2018', '∞', '24'].map((num, i) => (
                        <motion.span
                            key={num}
                            initial={{ opacity: 0, x: -30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: i * 0.2 }}
                            className="font-display text-6xl font-black text-accent"
                        >
                            {num}
                        </motion.span>
                    ))}
                </div>

                <div className="flex flex-col justify-center">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.3 }}
                        className="font-display text-3xl font-black uppercase tracking-tight text-[var(--color-text-primary)] md:text-4xl"
                    >
                        Born From Obsession
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5 }}
                        className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)]"
                    >
                        ZENITH was born from an obsession with perfection. In 2018, a team of former athletic
                        footwear engineers set out to create something the industry had never seen — sneakers
                        that marry uncompromising performance with architectural beauty. Every pair undergoes a
                        72-point quality check. Every stitch is intentional. Every sole is engineered to
                        respond.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.7 }}
                        className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]"
                    >
                        From Milan to the world, ZENITH has become the mark of those who refuse to settle. With
                        24 signature models and counting, we continue to push what footwear can be —
                        performance art for your feet.
                    </motion.p>
                </div>

                <div className="relative hidden overflow-hidden rounded-2xl lg:block">
                    <Image
                        src={getUnsplashUrl('photo-1606107557195-0e29a4b5b4aa')}
                        alt="ZENITH craftsmanship"
                        fill
                        className="object-cover"
                        sizes="300px"
                    />
                </div>
            </div>
        </section>
    )
}
