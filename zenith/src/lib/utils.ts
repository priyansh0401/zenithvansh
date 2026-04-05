import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price)
}

export function formatDate(date: string | Date): string {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(new Date(date))
}

export function getDiscountPercent(price: number, compareAtPrice: number): number {
    return Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
}

export function generateInitials(name: string): string {
    return name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
}

export function getUnsplashUrl(photoId: string, width = 800, quality = 80): string {
    return `https://images.unsplash.com/${photoId}?w=${width}&q=${quality}`
}

export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
    })

    if (!res.ok) {
        const error = await res.json().catch(() => ({ error: 'Request failed' }))
        throw new Error(error.error || 'Request failed')
    }

    return res.json()
}

export function getStarArray(rating: number): ('full' | 'half' | 'empty')[] {
    const stars: ('full' | 'half' | 'empty')[] = []
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) stars.push('full')
        else if (rating >= i - 0.5) stars.push('half')
        else stars.push('empty')
    }
    return stars
}
