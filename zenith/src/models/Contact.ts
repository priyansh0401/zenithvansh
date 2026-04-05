import { Schema, models, model } from 'mongoose'

const ContactSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String },
        subject: {
            type: String,
            enum: [
                'General Inquiry',
                'Order Support',
                'Returns & Exchanges',
                'Product Information',
                'Partnership',
                'Other',
            ],
            required: true,
        },
        message: { type: String, required: true },
        isRead: { type: Boolean, default: false },
    },
    { timestamps: true }
)

const Contact = models.Contact || model('Contact', ContactSchema)
export default Contact
