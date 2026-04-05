import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Contact from '@/models/Contact'
import { contactSchema } from '@/lib/validations'

export async function POST(req: Request) {
    try {
        await dbConnect()
        const body = await req.json()
        const parsed = contactSchema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json(
                { success: false, error: parsed.error.errors[0]?.message || 'Invalid input' },
                { status: 400 }
            )
        }

        await Contact.create(parsed.data)
        return NextResponse.json(
            { success: true, message: 'Message sent successfully' },
            { status: 201 }
        )
    } catch (error: any) {
        console.error('Contact POST error:', error)
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
    }
}
