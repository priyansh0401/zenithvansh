'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { getUnsplashUrl } from '@/lib/utils'
import PageWrapper from '@/components/layout/PageWrapper'
import StatsSection from '@/components/home/StatsSection'

const values = [
    {
        title: 'Precision Engineering',
        desc: 'Every ZENITH shoe undergoes a 72-point quality check. We obsess over the details so you never have to.',
    },
    {
        title: 'Sustainable Future',
        desc: 'From recycled polyester uppers to carbon-neutral shipping, we are building a brand that respects the planet.',
    },
    {
        title: 'Global Community',
        desc: 'ZENITH has reached 120+ countries and counting. We are building a global tribe of those who refuse to settle.',
    },
    {
        title: 'Innovation First',
        desc: 'Our R&D lab in Milan is constantly pushing the boundaries of what sneakers can be — from materials to form.',
    },
]

const team = [
    { name: 'Marco Divani', role: 'Founder & CEO', image: getUnsplashUrl('photo-1507003211169-0a1dd7228f2d') },
    { name: 'Sophia Chen', role: 'Head of Design', image: getUnsplashUrl('photo-1494790108377-be9c29b29330') },
    { name: 'James Okafor', role: 'Lead Engineer', image: getUnsplashUrl('photo-1539571696357-5a69c17a67c6') },
    { name: 'Aisha Patel', role: 'Creative Director', image: getUnsplashUrl('photo-1534528741775-53994a69daeb') },
]

export default function AboutPage() {
    return (
        <PageWrapper>
            <section className="relative flex min-h-[50vh] items-center overflow-hidden">
                <Image
                    src={getUnsplashUrl('photo-1556906781-9a412961c28c')}
                    alt="ZENITH story"
                    fill
                    className="object-cover"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-[var(--color-bg-primary)]" />
                <div className="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-display text-5xl font-black uppercase tracking-tight md:text-6xl"
                    >
                        Our Story
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-4 text-lg text-[var(--color-text-secondary)]"
                    >
                        Born from an obsession with perfection. Engineered for the apex.
                    </motion.p>
                </div>
            </section>

            <section className="py-20">
                <div className="mx-auto max-w-4xl px-6">
                    <div className="space-y-6 text-lg leading-relaxed text-[var(--color-text-secondary)]">
                        <p>
                            ZENITH was founded in 2018 in Milan, Italy, by a team of former athletic footwear
                            engineers who believed the industry had lost its soul. Too many brands chase trends
                            at the expense of craft. We set out to change that.
                        </p>
                        <p>
                            Our mission is simple: create sneakers that are engineered as meticulously as
                            performance vehicles, yet designed with the artistry of haute couture. Every pair is
                            a marriage of form and function — architectural beauty meets biomechanical precision.
                        </p>
                        <p>
                            Today, ZENITH has grown into a global brand with 24 signature models and a community
                            of over 50,000 customers across 120 countries. But our DNA remains the same: obsessive
                            attention to detail, relentless innovation, and an uncompromising commitment to quality.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-[var(--color-bg-secondary)] py-20">
                <div className="mx-auto max-w-7xl px-6">
                    <h2 className="mb-12 text-center font-display text-4xl font-black uppercase tracking-tight">
                        Our Values
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {values.map((val, i) => (
                            <motion.div
                                key={val.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] p-6"
                            >
                                <h3 className="font-display text-lg font-bold text-accent">{val.title}</h3>
                                <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{val.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <StatsSection />

            <section className="py-20">
                <div className="mx-auto max-w-5xl px-6">
                    <h2 className="mb-12 text-center font-display text-4xl font-black uppercase tracking-tight">
                        The Team
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {team.map((person) => (
                            <div key={person.name} className="text-center">
                                <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full">
                                    <Image src={person.image} alt={person.name} fill className="object-cover" sizes="128px" />
                                </div>
                                <h3 className="mt-4 font-display text-lg font-bold">{person.name}</h3>
                                <p className="text-sm text-[var(--color-text-muted)]">{person.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </PageWrapper>
    )
}
