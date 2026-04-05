import type { Config } from 'tailwindcss'

const config: Config = {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                accent: {
                    DEFAULT: 'var(--color-accent-primary)',
                    secondary: 'var(--color-accent-secondary)',
                },
                background: 'var(--color-bg-primary)',
                surface: 'var(--color-bg-secondary)',
                tertiary: 'var(--color-bg-tertiary)',
                border: 'var(--color-border)',
                success: 'var(--color-success)',
                error: 'var(--color-error)',
            },
            fontFamily: {
                display: ['var(--font-barlow)', 'sans-serif'],
                body: ['var(--font-inter)', 'sans-serif'],
            },
            animation: {
                'marquee-left': 'marquee-left 30s linear infinite',
                'marquee-right': 'marquee-right 30s linear infinite',
                'bounce-arrow': 'bounce-arrow 2s ease-in-out infinite',
                'pulse-ring': 'pulse-ring 1.5s ease-out infinite',
                'confetti-fall': 'confetti-fall 3s ease-in forwards',
                'draw-progress': 'draw-progress 1.5s ease-out forwards',
            },
            keyframes: {
                'marquee-left': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                'marquee-right': {
                    '0%': { transform: 'translateX(-50%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                'bounce-arrow': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(8px)' },
                },
                'pulse-ring': {
                    '0%': { transform: 'scale(1)', opacity: '1' },
                    '100%': { transform: 'scale(1.8)', opacity: '0' },
                },
                'confetti-fall': {
                    '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
                    '100%': {
                        transform: 'translateY(100vh) rotate(720deg)',
                        opacity: '0',
                    },
                },
                'draw-progress': {
                    from: { width: '0' },
                    to: { width: '100%' },
                },
            },
        },
    },
    plugins: [],
}

export default config
