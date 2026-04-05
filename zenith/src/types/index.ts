export interface Address {
    _id?: string
    label: 'Home' | 'Work' | 'Other'
    fullName: string
    phone: string
    street: string
    city: string
    state: string
    pincode: string
    country: string
    isDefault: boolean
}

export interface User {
    _id: string
    name: string
    email: string
    phone?: string
    avatar?: string
    addresses: Address[]
    role: 'user' | 'admin'
    wishlist: string[]
    createdAt: string
    updatedAt: string
}

export interface ProductColor {
    name: string
    hex: string
    images: string[]
}

export interface ProductSize {
    size: number
    stock: number
}

export interface ProductReview {
    userId?: string
    userName: string
    rating: number
    comment: string
    createdAt: string
}

export interface Product {
    _id: string
    name: string
    slug: string
    brand: string
    description: string
    longDescription: string
    category: 'men' | 'women'
    type: 'Running' | 'Lifestyle' | 'Performance' | 'Limited Edition' | 'Training' | 'Sneakers'
    price: number
    compareAtPrice?: number
    images: { url: string; alt: string }[]
    colors: ProductColor[]
    sizes: ProductSize[]
    tags: string[]
    isFeatured: boolean
    isNew: boolean
    rating: { average: number; count: number }
    reviews: ProductReview[]
    sold: number
    createdAt: string
    updatedAt: string
}

export interface CartItem {
    productId: string
    productName: string
    productImage: string
    color: string
    size: number
    quantity: number
    price: number
}

export interface Cart {
    _id: string
    userId: string
    items: CartItem[]
    updatedAt: string
}

export interface ShippingAddress {
    fullName: string
    phone: string
    street: string
    city: string
    state: string
    pincode: string
    country: string
}

export interface OrderItem {
    productId: string
    productName: string
    productImage: string
    color: string
    size: number
    quantity: number
    price: number
}

export type OrderStatus =
    | 'Order Placed'
    | 'Confirmed'
    | 'Processing'
    | 'Shipped'
    | 'Out for Delivery'
    | 'Delivered'
    | 'Cancelled'

export interface Order {
    _id: string
    orderNumber: string
    transactionId: string
    receiptNumber: string
    userId: string
    items: OrderItem[]
    shippingAddress: ShippingAddress
    subtotal: number
    shippingFee: number
    tax: number
    total: number
    discount?: number
    paymentMethod: string
    paymentStatus: 'pending' | 'paid'
    orderStatus: OrderStatus
    statusHistory: { status: string; timestamp: string; note: string }[]
    estimatedDelivery: string
    notes?: string
    createdAt: string
    updatedAt: string
}

export interface Contact {
    _id: string
    name: string
    email: string
    phone?: string
    subject: string
    message: string
    isRead: boolean
    createdAt: string
}

export interface ApiResponse<T> {
    success: boolean
    data?: T
    error?: string
    message?: string
}

export interface PaginatedResponse<T> {
    products: T[]
    total: number
    page: number
    totalPages: number
}

export interface AuthState {
    user: User | null
    isLoading: boolean
    isAuthenticated: boolean
    setUser: (user: User) => void
    clearUser: () => void
    fetchCurrentUser: () => Promise<void>
    logout: () => Promise<void>
}

export interface CartState {
    items: CartItem[]
    isOpen: boolean
    isLoading: boolean
    addItem: (item: CartItem) => void
    removeItem: (productId: string, color: string, size: number) => void
    updateQuantity: (productId: string, color: string, size: number, quantity: number) => void
    clearCart: () => void
    openDrawer: () => void
    closeDrawer: () => void
    syncWithServer: () => Promise<void>
    loadFromServer: () => Promise<void>
    getTotalItems: () => number
    getTotalPrice: () => number
}

export interface WishlistState {
    items: string[]
    toggleWishlist: (productId: string) => void
    isWishlisted: (productId: string) => boolean
}
