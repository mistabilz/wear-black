'use client'

import Link from 'next/link'

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-2xl text-center">
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

        <h1 className="text-4xl font-display font-bold uppercase tracking-wide mb-6">
          Order Confirmed
        </h1>

        <p className="text-xl text-white/70 mb-8">
          Thank you for your purchase! Your order has been confirmed and you will receive an email
          confirmation shortly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Continue Shopping
          </Link>
          <Link
            href="/account"
            className="inline-block border border-white/30 text-white px-8 py-3 rounded-full font-semibold uppercase tracking-wide hover:bg-white hover:text-black transition-all duration-300"
          >
            View Account
          </Link>
        </div>
      </div>
    </div>
  )
}

