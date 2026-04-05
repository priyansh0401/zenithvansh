'use client'

import { MEN_SIZES, WOMEN_SIZES } from '@/lib/constants'

interface SizeGuideProps {
    category: 'men' | 'women'
}

const menSizeChart = [
    { us: 7, uk: 6, eu: 40, cm: 25 },
    { us: 8, uk: 7, eu: 41, cm: 26 },
    { us: 9, uk: 8, eu: 42, cm: 27 },
    { us: 10, uk: 9, eu: 43, cm: 28 },
    { us: 11, uk: 10, eu: 44, cm: 29 },
    { us: 12, uk: 11, eu: 45, cm: 30 },
    { us: 13, uk: 12, eu: 46, cm: 31 },
]

const womenSizeChart = [
    { us: 5, uk: 3, eu: 35, cm: 22 },
    { us: 6, uk: 4, eu: 36, cm: 23 },
    { us: 7, uk: 5, eu: 37, cm: 24 },
    { us: 8, uk: 6, eu: 38, cm: 25 },
    { us: 9, uk: 7, eu: 39, cm: 26 },
    { us: 10, uk: 8, eu: 40, cm: 27 },
    { us: 11, uk: 9, eu: 41, cm: 28 },
]

export default function SizeGuide({ category }: SizeGuideProps) {
    const chart = category === 'men' ? menSizeChart : womenSizeChart

    return (
        <div>
            <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
                Find your perfect fit. Measurements are in standard US sizing.
            </p>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-[var(--color-border)]">
                            <th className="px-4 py-3 text-left text-xs font-bold uppercase text-[var(--color-text-muted)]">US</th>
                            <th className="px-4 py-3 text-left text-xs font-bold uppercase text-[var(--color-text-muted)]">UK</th>
                            <th className="px-4 py-3 text-left text-xs font-bold uppercase text-[var(--color-text-muted)]">EU</th>
                            <th className="px-4 py-3 text-left text-xs font-bold uppercase text-[var(--color-text-muted)]">CM</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chart.map((row) => (
                            <tr key={row.us} className="border-b border-[var(--color-border)]">
                                <td className="px-4 py-3 font-medium text-[var(--color-text-primary)]">{row.us}</td>
                                <td className="px-4 py-3 text-[var(--color-text-secondary)]">{row.uk}</td>
                                <td className="px-4 py-3 text-[var(--color-text-secondary)]">{row.eu}</td>
                                <td className="px-4 py-3 text-[var(--color-text-secondary)]">{row.cm}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="mt-4 text-xs text-[var(--color-text-muted)]">
                Pro tip: If you are between sizes, we recommend going half a size up for a more comfortable fit.
            </p>
        </div>
    )
}
