'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getUnsplashUrl } from '@/lib/utils'

const categories = [
    {
        name: 'MEN',
        subtitle: 'Explore Collection',
        href: '/men',
        image: getUnsplashUrl('photo-1542291026-7eec264c27ff'),
    },
    {
        name: 'WOMEN',
        subtitle: 'Explore Collection',
        href: '/women',
        image: getUnsplashUrl('photo-1595950653106-6c9ebd614d3a'),
    },
]

export default function CategorySection() {
    return (
        <section className="flex h-[60vh] min-h-[400px] w-full">
            {categories.map((cat) => (
                <Link
                    key={cat.name}
                    href={cat.href}
                    className="group relative flex-1 overflow-hidden transition-all duration-500 hover:flex-[1.5]"
                >
                    <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <motion.div
                        className="absolute inset-0 flex flex-col items-center justify-center text-center"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3 className="font-display text-5xl font-black tracking-wider text-white md:text-6xl">
                            {cat.name}
                        </h3>
                        <p className="mt-2 text-sm uppercase tracking-[0.3em] text-white/70">
                            {cat.subtitle}
                        </p>
                        <div className="mt-6 rounded-full border border-white/30 px-8 py-3 text-sm font-medium text-white transition group-hover:border-white group-hover:bg-white group-hover:text-black">
                            Shop Now
                        </div>
                    </motion.div>
                </Link>
            ))}
        </section>
    )
}
