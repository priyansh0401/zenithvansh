export default function NotFound() {
    return (
        <section className="flex min-h-[70vh] flex-col items-center justify-center">
            <h1 className="font-display text-8xl font-black text-accent">404</h1>
            <p className="mt-4 text-xl text-[var(--color-text-secondary)]">Page not found</p>
            <a
                href="/"
                className="mt-6 rounded-full bg-accent px-8 py-3 font-medium text-white transition hover:bg-accent-secondary"
            >
                Go Home
            </a>
        </section>
    )
}
