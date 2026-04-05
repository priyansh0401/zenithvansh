'use client'

import { useState } from 'react'
import { X, SlidersHorizontal } from 'lucide-react'
import { PRODUCT_TYPES } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface FiltersState {
    sizes: number[]
    types: string[]
    priceRange: [number, number]
    sort: string
}

interface ProductFiltersProps {
    availableSizes: number[]
    filters: FiltersState
    onFiltersChange: (filters: FiltersState) => void
    totalProducts: number
    filteredCount: number
}

export default function ProductFilters({
    availableSizes,
    filters,
    onFiltersChange,
    totalProducts,
    filteredCount,
}: ProductFiltersProps) {
    const [mobileOpen, setMobileOpen] = useState(false)

    const toggleSize = (size: number) => {
        const newSizes = filters.sizes.includes(size)
            ? filters.sizes.filter((s) => s !== size)
            : [...filters.sizes, size]
        onFiltersChange({ ...filters, sizes: newSizes })
    }

    const toggleType = (type: string) => {
        const newTypes = filters.types.includes(type)
            ? filters.types.filter((t) => t !== type)
            : [...filters.types, type]
        onFiltersChange({ ...filters, types: newTypes })
    }

    const clearAll = () => {
        onFiltersChange({ sizes: [], types: [], priceRange: [0, 500], sort: 'featured' })
    }

    const hasActiveFilters = filters.sizes.length > 0 || filters.types.length > 0
    const activeFilterCount = filters.sizes.length + filters.types.length

    const filterContent = (
        <>
            <div className="mb-6">
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
                    Sort By
                </h4>
                <select
                    value={filters.sort}
                    onChange={(e) => onFiltersChange({ ...filters, sort: e.target.value })}
                    className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] px-3 py-2 text-sm text-[var(--color-text-primary)] focus:border-accent focus:outline-none"
                >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="newest">Newest</option>
                </select>
            </div>

            <div className="mb-6">
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
                    Type
                </h4>
                <div className="space-y-2">
                    {PRODUCT_TYPES.map((type) => (
                        <label key={type} className="flex cursor-pointer items-center gap-2">
                            <input
                                type="checkbox"
                                checked={filters.types.includes(type)}
                                onChange={() => toggleType(type)}
                                className="rounded border-[var(--color-border)] bg-[var(--color-bg-tertiary)] text-accent focus:ring-accent"
                            />
                            <span className="text-sm text-[var(--color-text-secondary)]">{type}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
                    Size
                </h4>
                <div className="grid grid-cols-4 gap-2">
                    {availableSizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => toggleSize(size)}
                            className={cn(
                                'rounded-lg border px-3 py-2 text-sm transition',
                                filters.sizes.includes(size)
                                    ? 'border-accent bg-accent text-white'
                                    : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-accent/50'
                            )}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {hasActiveFilters && (
                <button
                    onClick={clearAll}
                    className="mt-4 text-sm text-accent underline transition hover:text-accent-secondary"
                >
                    Clear All Filters
                </button>
            )}
        </>
    )

    return (
        <>
            <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-[var(--color-text-muted)]">
                    Showing {filteredCount} of {totalProducts} products
                </p>
                <button
                    onClick={() => setMobileOpen(true)}
                    className="flex items-center gap-2 rounded-full border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-text-secondary)] lg:hidden"
                >
                    <SlidersHorizontal size={16} />
                    Filters
                    {activeFilterCount > 0 && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-white">
                            {activeFilterCount}
                        </span>
                    )}
                </button>
            </div>

            {hasActiveFilters && (
                <div className="mb-6 flex flex-wrap gap-2">
                    {filters.sizes.map((size) => (
                        <span
                            key={`size-${size}`}
                            className="flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs text-accent"
                        >
                            Size {size}
                            <button onClick={() => toggleSize(size)}>
                                <X size={12} />
                            </button>
                        </span>
                    ))}
                    {filters.types.map((type) => (
                        <span
                            key={`type-${type}`}
                            className="flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs text-accent"
                        >
                            {type}
                            <button onClick={() => toggleType(type)}>
                                <X size={12} />
                            </button>
                        </span>
                    ))}
                </div>
            )}

            <div className="hidden lg:block">{filterContent}</div>

            {mobileOpen && (
                <div className="fixed inset-0 z-[100] lg:hidden">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
                    <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-[var(--color-bg-secondary)] p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="font-display text-lg font-bold">Filters</h3>
                            <button onClick={() => setMobileOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        {filterContent}
                    </div>
                </div>
            )}
        </>
    )
}
