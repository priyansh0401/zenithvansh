'use client'

import { formatPrice, formatDate } from '@/lib/utils'
import type { Order } from '@/types'

interface OrderReceiptProps {
    order: Order
}

export default function OrderReceipt({ order }: OrderReceiptProps) {
    return (
        <div className="print-receipt bg-white p-8 text-black">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-black tracking-wider">ZENITH</h1>
                <p className="text-sm text-gray-500">Engineered for the apex.</p>
            </div>

            <div className="mb-6 border-b border-gray-200 pb-4">
                <h2 className="text-lg font-bold">Order Receipt</h2>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div>
                        <span className="text-gray-500">Order #:</span>
                        <span className="ml-2 font-mono font-bold">{order.orderNumber}</span>
                    </div>
                    <div>
                        <span className="text-gray-500">Date:</span>
                        <span className="ml-2">{formatDate(order.createdAt)}</span>
                    </div>
                    <div>
                        <span className="text-gray-500">Transaction ID:</span>
                        <span className="ml-2 font-mono">{order.transactionId}</span>
                    </div>
                    <div>
                        <span className="text-gray-500">Receipt #:</span>
                        <span className="ml-2 font-mono">{order.receiptNumber}</span>
                    </div>
                </div>
            </div>

            <table className="mb-6 w-full text-sm">
                <thead>
                    <tr className="border-b border-gray-200">
                        <th className="py-2 text-left text-gray-500">Item</th>
                        <th className="py-2 text-center text-gray-500">Color</th>
                        <th className="py-2 text-center text-gray-500">Size</th>
                        <th className="py-2 text-center text-gray-500">Qty</th>
                        <th className="py-2 text-right text-gray-500">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {order.items.map((item, i) => (
                        <tr key={i} className="border-b border-gray-100">
                            <td className="py-2">{item.productName}</td>
                            <td className="py-2 text-center">{item.color}</td>
                            <td className="py-2 text-center">{item.size}</td>
                            <td className="py-2 text-center">{item.quantity}</td>
                            <td className="py-2 text-right">{formatPrice(item.price * item.quantity)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mb-6 space-y-1 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    <span>{order.shippingFee === 0 ? 'FREE' : formatPrice(order.shippingFee)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">Tax</span>
                    <span>{formatPrice(order.tax)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2 font-bold">
                    <span>Total</span>
                    <span>{formatPrice(order.total)}</span>
                </div>
            </div>

            <div className="mb-6 text-sm">
                <h3 className="font-bold text-gray-500">Shipping Address</h3>
                <p className="mt-1">
                    {order.shippingAddress.fullName}, {order.shippingAddress.street},{' '}
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode},{' '}
                    {order.shippingAddress.country}
                </p>
            </div>

            <div className="text-sm">
                <p className="text-gray-500">Payment: {order.paymentMethod}</p>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-4 text-center text-xs text-gray-400">
                <p>ZENITH · Engineered for the apex.</p>
                <p>28 Via della Moda, Milan, Italy 20121</p>
            </div>
        </div>
    )
}
