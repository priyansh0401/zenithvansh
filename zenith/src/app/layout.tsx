import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AuthHydrator from './AuthHydrator'
import './globals.css'

export const metadata: Metadata = {
    title: 'ZENITH | Engineered for the Apex',
    description:
        'Premium sneakers engineered for those who refuse to settle. Step into the apex with ZENITH.',
    icons: { icon: '/favicon.svg' },
    openGraph: {
        title: 'ZENITH | Engineered for the Apex',
        description: 'Premium sneakers engineered for those who refuse to settle.',
        type: 'website',
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="min-h-screen bg-[var(--color-bg-primary)] font-body text-[var(--color-text-primary)] antialiased">
                <AuthHydrator />
                <Navbar />
                <main className="pt-16">{children}</main>
                <Footer />
                <Toaster
                    position="bottom-right"
                    toastOptions={{
                        style: {
                            background: 'var(--color-bg-secondary)',
                            color: 'var(--color-text-primary)',
                            border: '1px solid var(--color-border)',
                            borderRadius: '12px',
                            fontSize: '14px',
                        },
                    }}
                />
            </body>
        </html>
    )
}
