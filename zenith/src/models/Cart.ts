import { Schema, models, model } from 'mongoose'

const CartItemSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    color: { type: String, required: true },
    size: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 },
    addedAt: { type: Date, default: Date.now },
})

const CartSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
        items: [CartItemSchema],
    },
    { timestamps: true }
)

CartSchema.index({ userId: 1 })

const Cart = models.Cart || model('Cart', CartSchema)
export default Cart
