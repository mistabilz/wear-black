'use client'

import { useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'

export default function OrderConfirmationPage() {
  const { cart } = useCart()

  // Note: In a real app, cart should be cleared BEFORE redirecting here
  // For now, we'll just show the confirmation

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-32">
      <div className="max-w-2xl w-full text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl lg:text-5xl font-display font-bold uppercase tracking-wide mb-4">
            Thank You for Your Order!
          </h1>

          <p className="text-off-white text-lg mb-2">
            Your order has been successfully placed.
          </p>

          <p className="text-off-white text-base mb-8">
            We've sent a confirmation email with your order details and tracking information.
            You'll receive your BLACK pieces soon.
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-8 mb-8">
          <h2 className="text-xl font-display font-bold uppercase tracking-wide mb-4">
            What's Next?
          </h2>
          <div className="space-y-3 text-off-white text-left">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-soft-pink/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-soft-pink text-sm font-bold">1</span>
              </div>
              <p className="text-sm">
                <strong className="text-white">Order Confirmation:</strong> Check your email for your order confirmation and receipt.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-soft-pink/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-soft-pink text-sm font-bold">2</span>
              </div>
              <p className="text-sm">
                <strong className="text-white">Processing:</strong> We'll begin preparing your order immediately.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-soft-pink/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-soft-pink text-sm font-bold">3</span>
              </div>
              <p className="text-sm">
                <strong className="text-white">Shipping:</strong> You'll receive a shipping notification with tracking once your order ships.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-soft-pink/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-soft-pink text-sm font-bold">4</span>
              </div>
              <p className="text-sm">
                <strong className="text-white">Delivery:</strong> Your BLACK pieces will arrive within 5-7 business days.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm"
          >
            Back to Home
          </Link>
          <Link
            href="/"
            className="inline-block border border-white/30 text-white px-8 py-3 rounded-full font-semibold uppercase tracking-wide hover:bg-white hover:text-black transition-all duration-300 text-sm"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Contact Info */}
        <div className="mt-12 text-center">
          <p className="text-off-white text-sm">
            Questions about your order?{' '}
            <a href="mailto:info@wearblack.ca" className="text-white hover:text-soft-pink transition-colors underline">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

