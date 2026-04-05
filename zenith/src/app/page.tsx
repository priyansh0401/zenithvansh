'use client'

import HeroSection from '@/components/home/HeroSection'
import ScrollingMarquee from '@/components/home/ScrollingMarquee'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import CategorySection from '@/components/home/CategorySection'
import BrandStory from '@/components/home/BrandStory'
import StatsSection from '@/components/home/StatsSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import NewsletterSection from '@/components/home/NewsletterSection'
import PageWrapper from '@/components/layout/PageWrapper'
import { useEffect, useState } from 'react'
import type { Product } from '@/types'

export default function HomePage() {
    const [featured, setFeatured] = useState<Product[]>([])

    useEffect(() => {
        fetch('/api/products?featured=true&limit=4')
            .then((r) => r.json())
            .then((data) => {
                if (data.success) setFeatured(data.data)
            })
            .catch(console.error)
    }, [])

    return (
        <PageWrapper>
            <HeroSection />
            <ScrollingMarquee />
            <FeaturedProducts products={featured} />
            <CategorySection />
            <BrandStory />
            <StatsSection />
            <TestimonialsSection />
            <NewsletterSection />
        </PageWrapper>
    )
}
