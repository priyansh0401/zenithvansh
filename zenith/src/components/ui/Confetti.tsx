'use client'

export default function Confetti() {
    return (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
            {Array.from({ length: 50 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute animate-confetti"
                    style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${2 + Math.random() * 3}s`,
                    }}
                >
                    <div
                        className="h-3 w-2 rotate-45"
                        style={{
                            backgroundColor: ['#7C3AED', '#6D28D9', '#F5F5F7', '#FFD700', '#FF6B6B', '#4ECDC4'][
                                Math.floor(Math.random() * 6)
                            ],
                        }}
                    />
                </div>
            ))}
        </div>
    )
}
