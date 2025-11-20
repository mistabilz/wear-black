'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function OrderConfirmationPage() {
  const router = useRouter()
  const { cart } = useCart()
  const [orderItems, setOrderItems] = useState<any[]>([])
  const [orderTotal, setOrderTotal] = useState(0)

  useEffect(() => {
    // Get order details from localStorage (stored before cart was cleared)
    const storedOrder = localStorage.getItem('black_last_order')
    if (storedOrder) {
      try {
        const order = JSON.parse(storedOrder)
        setOrderItems(order.items || [])
        setOrderTotal(order.total || 0)
      } catch (e) {
        // If no stored order, redirect to home
        router.push('/')
      }
    } else {
      // If no order found, redirect to home
      router.push('/')
    }
  }, [router])

  const calculateSubtotal = () => {
    return orderItems.reduce((sum, item) => {
      const price = parseFloat(item.price.replace('$', ''))
      return sum + price * (item.quantity || 1)
    }, 0)
  }

  const subtotal = calculateSubtotal()
  const tax = subtotal * 0.13
  const shipping = 15.0
  const total = subtotal + tax + shipping

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="mb-8">
            <svg
              className="w-20 h-20 mx-auto text-soft-pink mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h1 className="text-4xl lg:text-5xl font-display font-bold uppercase tracking-wide mb-6">
            Thank You For Your Order
          </h1>

          <p className="text-xl text-white/70 mb-8">
            Your order has been confirmed and you will receive an email confirmation shortly.
          </p>
        </div>

        {/* Order Summary */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 lg:p-8 mb-8">
          <h2 className="text-2xl font-semibold uppercase tracking-wide mb-6">
            Order Summary
          </h2>

          <div className="space-y-4 mb-6">
            {orderItems.map((item) => {
              const price = parseFloat(item.price.replace('$', ''))
              const itemTotal = price * (item.quantity || 1)
              return (
                <div
                  key={item.id}
                  className="flex justify-between items-center pb-4 border-b border-white/10"
                >
                  <div>
                    <h3 className="font-semibold uppercase tracking-wide">{item.name}</h3>
                    <p className="text-sm text-white/70">
                      {item.category} × {item.quantity || 1}
                    </p>
                  </div>
                  <p className="font-medium">${itemTotal.toFixed(2)}</p>
                </div>
              )
            })}
          </div>

          <div className="space-y-2 pt-4 border-t border-white/10">
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/70">Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold pt-4 border-t border-white/10">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 text-center"
          >
            Return Home
          </Link>
          <Link
            href="#shop"
            className="inline-block border border-white/30 text-white px-8 py-3 rounded-full font-semibold uppercase tracking-wide hover:bg-white hover:text-black transition-all duration-300 text-center"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

