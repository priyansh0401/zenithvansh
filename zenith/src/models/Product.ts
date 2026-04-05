import { Schema, models, model } from 'mongoose'

const ReviewSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    userName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
})

const ColorSchema = new Schema({
    name: { type: String, required: true },
    hex: { type: String, required: true },
    images: [{ type: String }],
})

const SizeSchema = new Schema({
    size: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
})

const ProductSchema = new Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        brand: { type: String, default: 'ZENITH' },
        description: { type: String, required: true },
        longDescription: { type: String },
        category: { type: String, enum: ['men', 'women'], required: true },
        type: {
            type: String,
            enum: ['Running', 'Lifestyle', 'Performance', 'Limited Edition', 'Training', 'Sneakers'],
            required: true,
        },
        price: { type: Number, required: true },
        compareAtPrice: { type: Number },
        images: [{ url: String, alt: String }],
        colors: [ColorSchema],
        sizes: [SizeSchema],
        tags: [{ type: String }],
        isFeatured: { type: Boolean, default: false },
        isNew: { type: Boolean, default: false },
        rating: {
            average: { type: Number, default: 0 },
            count: { type: Number, default: 0 },
        },
        reviews: [ReviewSchema],
        sold: { type: Number, default: 0 },
    },
    { timestamps: true, suppressReservedKeysWarning: true }
)

ProductSchema.index({ slug: 1 })
ProductSchema.index({ category: 1 })
ProductSchema.index({ isFeatured: 1 })
ProductSchema.index({ price: 1 })

const Product = models.Product || model('Product', ProductSchema)
export default Product
