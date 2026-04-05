'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { ProductColor } from '@/types'

interface ProductImagesProps {
    colors: ProductColor[]
    selectedColor: string
    productName: string
}

export default function ProductImages({ colors, selectedColor, productName }: ProductImagesProps) {
    const currentColor = colors.find((c) => c.name === selectedColor) || colors[0]
    const images = currentColor?.images || []
    const [mainImage, setMainImage] = useState(images[0] || '')

    const handleColorChange = () => {
        const color = colors.find((c) => c.name === selectedColor)
        if (color?.images[0]) {
            setMainImage(color.images[0])
        }
    }

    useState(() => {
        handleColorChange()
    })

    return (
        <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-[var(--color-bg-tertiary)]">
                <Image
                    src={mainImage}
                    alt={productName}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority
                />
            </div>

            <div className="flex gap-3">
                {images.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setMainImage(img)}
                        className={cn(
                            'relative h-20 w-20 overflow-hidden rounded-lg border-2 transition',
                            mainImage === img ? 'border-accent' : 'border-[var(--color-border)] hover:border-accent/50'
                        )}
                    >
                        <Image
                            src={img}
                            alt={`${productName} view ${i + 1}`}
                            fill
                            className="object-cover"
                            sizes="80px"
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}
