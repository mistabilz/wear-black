'use client'

import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import Link from 'next/link'

export default function CartPage() {
  const { cart, removeFromCart } = useCart()

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''))
      return total + price
    }, 0)
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-32">
        <div className="text-center max-w-md">
          <svg
            className="w-24 h-24 mx-auto mb-6 text-white/30"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <h1 className="text-3xl font-display font-bold uppercase tracking-wide mb-4">
            Your cart is empty
          </h1>
          <p className="text-off-white mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-32">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl lg:text-5xl font-display font-bold uppercase tracking-wide mb-12 text-center">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="bg-white/5 border border-white/10 rounded-lg p-6 flex gap-6"
              >
                <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold uppercase tracking-wide mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-off-white mb-2">{item.category}</p>
                  <p className="text-white font-medium text-lg">{item.price}</p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-300 transition-colors self-start"
                  aria-label="Remove item"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-display font-bold uppercase tracking-wide mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-off-white">
                  <span>Subtotal ({cart.length} items)</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-off-white">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <div className="flex justify-between text-white font-semibold text-lg">
                    <span>Total</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-white text-black px-6 py-3 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm text-center"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/"
                className="block w-full mt-4 text-center text-sm text-off-white hover:text-white transition-colors underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

