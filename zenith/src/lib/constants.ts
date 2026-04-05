export const BRAND_NAME = 'ZENITH'
export const TAGLINE = 'Engineered for the apex.'
export const ORDER_PREFIX = 'ZNT'
export const TRANSACTION_PREFIX = 'TXN'
export const RECEIPT_PREFIX = 'RCP'

export const PROMO_CODES: Record<string, number> = {
    FIRST10: 0.1,
}

export const SHIPPING_THRESHOLD = 200
export const SHIPPING_FEE = 15
export const TAX_RATE = 0.08

export const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Men', href: '/men' },
    { label: 'Women', href: '/women' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
]

export const PRODUCT_TYPES = ['Running', 'Lifestyle', 'Performance', 'Limited Edition', 'Training', 'Sneakers'] as const
export const MEN_SIZES = [7, 8, 9, 10, 11, 12, 13]
export const WOMEN_SIZES = [5, 6, 7, 8, 9, 10, 11]

export const ORDER_STATUSES = [
    'Order Placed',
    'Confirmed',
    'Processing',
    'Shipped',
    'Out for Delivery',
    'Delivered',
    'Cancelled',
] as const

export const STATUS_COLORS: Record<string, string> = {
    'Order Placed': 'bg-blue-500/20 text-blue-400',
    Confirmed: 'bg-indigo-500/20 text-indigo-400',
    Processing: 'bg-yellow-500/20 text-yellow-400',
    Shipped: 'bg-orange-500/20 text-orange-400',
    'Out for Delivery': 'bg-cyan-500/20 text-cyan-400',
    Delivered: 'bg-green-500/20 text-green-400',
    Cancelled: 'bg-red-500/20 text-red-400',
}

export const CONTACT_SUBJECTS = [
    'General Inquiry',
    'Order Support',
    'Returns & Exchanges',
    'Product Information',
    'Partnership',
    'Other',
] as const

export const UNSPLASH_PHOTOS = [
    'photo-1542291026-7eec264c27ff',
    'photo-1549298916-b41d501d3772',
    'photo-1595950653106-6c9ebd614d3a',
    'photo-1608231387042-66d1773070a5',
    'photo-1606107557195-0e29a4b5b4aa',
    'photo-1600185365483-26d7a4cc7519',
    'photo-1560769629-975ec94e6a86',
    'photo-1491553895911-0055eca6402d',
    'photo-1542272604-787c3835535d',
    'photo-1527090526205-beaac8dc3c62',
    'photo-1539185441755-769473a23570',
    'photo-1556906781-9dcd19c4af15',
]

export const SOCIAL_LINKS = [
    { name: 'Instagram', href: '#' },
    { name: 'X', href: '#' },
    { name: 'YouTube', href: '#' },
    { name: 'TikTok', href: '#' },
]
