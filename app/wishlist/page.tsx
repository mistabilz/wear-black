'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, moveToCart } = useCart()

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-display font-bold uppercase tracking-wide mb-8">
            Wishlist
          </h1>
          <div className="text-center py-20">
            <p className="text-xl text-white/70 mb-6">Your wishlist is empty</p>
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
          Wishlist
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((item) => (
            <div key={item.id} className="group">
              <Link href="#" className="block mb-4">
                <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </Link>

              <div className="space-y-2 mb-4">
                <p className="text-off-white text-sm uppercase tracking-wide">{item.category}</p>
                <h3 className="text-xl font-semibold uppercase tracking-wide">{item.name}</h3>
                <p className="text-white text-lg font-medium">{item.price}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => moveToCart(item)}
                  className="flex-1 bg-white text-black px-6 py-3 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm"
                >
                  Move to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="px-6 py-3 border border-white/30 rounded-full hover:border-white transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
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
          ))}
        </div>
      </div>
    </div>
  )
}

