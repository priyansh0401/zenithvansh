'use client'

export default function ScrollingMarquee() {
    const row1 = 'ZENITH · APEX RUNNER · SHADOW PRO · ZENITH · VELOCITY X · GHOST LITE · '
    const row2 = 'ENGINEERED FOR THE APEX · PRECISION CRAFT · ZENITH · URBAN LEGEND · NOVA BOOST · '

    return (
        <section className="overflow-hidden border-y border-[var(--color-border)] bg-[var(--color-bg-secondary)] py-6">
            <div className="flex animate-marquee-left whitespace-nowrap">
                <span className="font-display text-2xl font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                    {row1}
                    {row1}
                </span>
            </div>
            <div className="mt-4 flex animate-marquee-right whitespace-nowrap">
                <span className="font-display text-2xl font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                    {row2}
                    {row2}
                </span>
            </div>
        </section>
    )
}
