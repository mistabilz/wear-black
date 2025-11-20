'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function CartPage() {
  const router = useRouter()
  const { cart, updateCartQuantity, removeFromCart, clearCart } = useCart()

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => {
      const price = parseFloat(item.price.replace('$', ''))
      return sum + price * (item.quantity || 1)
    }, 0)
  }

  const subtotal = calculateSubtotal()
  const tax = subtotal * 0.13 // 13% tax placeholder
  const total = subtotal + tax

  const handleCheckout = () => {
    router.push('/checkout/start')
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-display font-bold uppercase tracking-wide mb-8">
            Shopping Cart
          </h1>
          <div className="text-center py-20">
            <p className="text-xl text-white/70 mb-6">Your cart is empty</p>
            <Link
              href="#shop"
              className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-display font-bold uppercase tracking-wide mb-12">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => {
              const price = parseFloat(item.price.replace('$', ''))
              const itemTotal = price * (item.quantity || 1)

              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-white/10"
                >
                  <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                      sizes="(max-width: 640px) 100vw, 128px"
                    />
                  </div>

                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold uppercase tracking-wide mb-2">
                        {item.name}
                      </h3>
                      <p className="text-sm text-white/70 uppercase tracking-wide mb-2">
                        {item.category}
                      </p>
                      {item.size && (
                        <p className="text-sm text-white/70">Size: {item.size}</p>
                      )}
                      <p className="text-lg font-medium mt-2">{item.price}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateCartQuantity(item.id, (item.quantity || 1) - 1)
                          }
                          className="w-8 h-8 border border-white/30 rounded flex items-center justify-center hover:border-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 12H4"
                            />
                          </svg>
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity || 1}</span>
                        <button
                          onClick={() =>
                            updateCartQuantity(item.id, (item.quantity || 1) + 1)
                          }
                          className="w-8 h-8 border border-white/30 rounded flex items-center justify-center hover:border-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-semibold">${itemTotal.toFixed(2)}</p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-white/70 hover:text-white transition-colors ml-4"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 sticky top-32">
              <h2 className="text-xl font-semibold uppercase tracking-wide mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
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

              <button
                onClick={handleCheckout}
                className="w-full bg-white text-black px-8 py-3 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 mb-4"
              >
                Proceed to Checkout
              </button>

              <Link
                href="/"
                className="block text-center text-sm text-white/70 hover:text-white transition-colors underline"
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

