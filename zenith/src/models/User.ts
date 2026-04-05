import mongoose, { Schema, models, model } from 'mongoose'

const AddressSchema = new Schema({
    label: { type: String, enum: ['Home', 'Work', 'Other'], default: 'Home' },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
})

const UserSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        passwordHash: { type: String, required: true },
        phone: { type: String },
        avatar: { type: String },
        addresses: [AddressSchema],
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
        wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    },
    { timestamps: true }
)

UserSchema.index({ email: 1 })

const User = models.User || model('User', UserSchema)
export default User
