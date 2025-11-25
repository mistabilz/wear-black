'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { products } from '@/data/products'

export default function Shop() {
  const { addToCart, addToWishlist, cart, wishlist } = useCart()

  return (
    <section id="shop" className="py-20 lg:py-32 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-display font-bold uppercase tracking-wide mb-4">
            Shop The Collection
          </h2>
          <p className="text-off-white text-lg max-w-2xl mx-auto">
            Premium streetwear crafted for those who demand excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const isInWishlist = wishlist.some((item) => item.id === product.id)
            return (
              <div key={product.id} className="group">
                <Link href="#" className="block">
                  <div className="relative h-[500px] lg:h-[600px] mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          addToCart(product)
                        }}
                        className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors"
                        aria-label="Add to cart"
                      >
                        <svg
                          className="w-5 h-5 text-black"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          addToWishlist(product)
                        }}
                        className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors"
                        aria-label="Add to wishlist"
                      >
                        <svg
                          className={`w-5 h-5 ${isInWishlist ? 'text-soft-pink fill-soft-pink' : 'text-black'}`}
                          fill={isInWishlist ? 'currentColor' : 'none'}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </Link>
                <div className="space-y-2">
                  <p className="text-off-white text-sm uppercase tracking-wide">
                    {product.category}
                  </p>
                  <h3 className="text-xl font-semibold uppercase tracking-wide">
                    {product.name}
                  </h3>
                  <p className="text-white text-lg font-medium">
                    {product.price}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="#"
            className="inline-block border border-white/30 px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-wide text-sm font-semibold"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}

