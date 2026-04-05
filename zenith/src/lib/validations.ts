import { z } from 'zod'

export const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    phone: z.string().optional(),
})

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
})

export const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    subject: z.string().min(2, 'Subject is required'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
})

export const addressSchema = z.object({
    label: z.enum(['Home', 'Work', 'Other']),
    fullName: z.string().min(2, 'Full name is required'),
    phone: z.string().min(5, 'Phone number is required'),
    street: z.string().min(5, 'Street address is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    pincode: z.string().min(3, 'Pincode is required'),
    country: z.string().min(2, 'Country is required'),
    isDefault: z.boolean().optional(),
})

export const profileUpdateSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
    phone: z.string().optional(),
    currentPassword: z.string().optional(),
    newPassword: z.string().min(8, 'Password must be at least 8 characters').optional(),
    addresses: z.array(addressSchema).optional(),
})

export const cartItemSchema = z.object({
    productId: z.string().min(1, 'Product ID is required'),
    color: z.string().min(1, 'Color is required'),
    size: z.number().min(1, 'Size is required'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
})

export const shippingAddressSchema = z.object({
    fullName: z.string().min(2, 'Full name is required'),
    phone: z.string().min(5, 'Phone number is required'),
    street: z.string().min(5, 'Street address is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    pincode: z.string().min(3, 'Pincode is required'),
    country: z.string().min(2, 'Country is required'),
})

export const orderSchema = z.object({
    shippingAddress: shippingAddressSchema,
    notes: z.string().optional(),
})

export const checkoutSchema = z.object({
    shippingAddress: shippingAddressSchema,
    notes: z.string().optional(),
    promoCode: z.string().optional(),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type ContactInput = z.infer<typeof contactSchema>
export type AddressInput = z.infer<typeof addressSchema>
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>
export type CartItemInput = z.infer<typeof cartItemSchema>
export type CheckoutInput = z.infer<typeof checkoutSchema>
export type OrderInput = z.infer<typeof orderSchema>
