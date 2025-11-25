'use client'

import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import Link from 'next/link'

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useCart()

  const handleMoveToCart = (item: any) => {
    addToCart(item)
    removeFromWishlist(item.id)
  }

  if (wishlist.length === 0) {
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
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <h1 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-wide mb-4 px-2">
            Your wishlist is empty
          </h1>
          <p className="text-off-white mb-8 text-sm sm:text-base px-2">
            Save your favorite items for later.
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
          My Wishlist
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 border border-white/10 rounded-lg overflow-hidden group"
            >
              <div className="relative h-64 sm:h-72 lg:h-80">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 bg-black/80 hover:bg-red-500 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
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

              <div className="p-4 sm:p-5 lg:p-6 space-y-4">
                <div>
                  <p className="text-off-white text-xs sm:text-sm uppercase tracking-wide mb-1">
                    {item.category}
                  </p>
                  <h3 className="text-base sm:text-lg font-semibold uppercase tracking-wide mb-2">
                    {item.name}
                  </h3>
                  <p className="text-white font-medium text-base sm:text-lg">{item.price}</p>
                </div>

                <button
                  onClick={() => handleMoveToCart(item)}
                  className="w-full bg-white text-black px-6 py-3 sm:py-3.5 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm min-h-[48px] flex items-center justify-center"
                >
                  Move to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block text-off-white hover:text-white transition-colors underline text-sm"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

