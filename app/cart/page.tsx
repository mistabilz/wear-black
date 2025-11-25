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
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 sm:px-6 py-24 sm:py-32">
        <div className="text-center max-w-md w-full">
          <svg
            className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 text-white/30"
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
          <h1 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-wide mb-4 px-2">
            Your cart is empty
          </h1>
          <p className="text-off-white mb-8 text-sm sm:text-base px-2">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link
            href="/"
            className="block w-full sm:inline-block sm:w-auto bg-white text-black px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm min-h-[48px] flex items-center justify-center"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-display font-bold uppercase tracking-wide mb-8 sm:mb-10 lg:mb-12 text-center">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {cart.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6 flex gap-4 sm:gap-6"
              >
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-md overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 80px, 96px"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold uppercase tracking-wide mb-1 truncate">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-off-white mb-2">{item.category}</p>
                  <p className="text-white font-medium text-base sm:text-lg">{item.price}</p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-300 transition-colors self-start p-1 -mr-1"
                  aria-label="Remove item"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
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
            <div className="bg-white/5 border border-white/10 rounded-lg p-5 sm:p-6 lg:sticky lg:top-24">
              <h2 className="text-lg sm:text-xl font-display font-bold uppercase tracking-wide mb-5 sm:mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6 text-sm sm:text-base">
                <div className="flex justify-between text-off-white">
                  <span>Subtotal ({cart.length} {cart.length === 1 ? 'item' : 'items'})</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-off-white text-sm">
                  <span>Shipping</span>
                  <span className="text-right">Calculated at checkout</span>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <div className="flex justify-between text-white font-semibold text-base sm:text-lg">
                    <span>Total</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-white text-black px-6 py-3 sm:py-3.5 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm text-center min-h-[48px] flex items-center justify-center"
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

