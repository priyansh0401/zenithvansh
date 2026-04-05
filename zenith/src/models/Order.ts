import { Schema, models, model } from 'mongoose'

const OrderItemSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    productName: { type: String, required: true },
    productImage: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: Number, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
})

const ShippingAddressSchema = new Schema({
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, required: true },
})

const StatusHistorySchema = new Schema({
    status: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    note: { type: String, default: '' },
})

const OrderSchema = new Schema(
    {
        orderNumber: { type: String, required: true, unique: true },
        transactionId: { type: String, required: true, unique: true },
        receiptNumber: { type: String, required: true, unique: true },
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        items: [OrderItemSchema],
        shippingAddress: ShippingAddressSchema,
        subtotal: { type: Number, required: true },
        shippingFee: { type: Number, required: true },
        tax: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        total: { type: Number, required: true },
        paymentMethod: { type: String, default: 'Cash on Delivery' },
        paymentStatus: {
            type: String,
            enum: ['pending', 'paid'],
            default: 'pending',
        },
        orderStatus: {
            type: String,
            enum: [
                'Order Placed',
                'Confirmed',
                'Processing',
                'Shipped',
                'Out for Delivery',
                'Delivered',
                'Cancelled',
            ],
            default: 'Order Placed',
        },
        statusHistory: [StatusHistorySchema],
        estimatedDelivery: { type: Date },
        notes: { type: String },
    },
    { timestamps: true }
)

OrderSchema.index({ userId: 1, createdAt: -1 })
OrderSchema.index({ orderNumber: 1 })

const Order = models.Order || model('Order', OrderSchema)
export default Order
