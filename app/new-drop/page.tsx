'use client'

import { products } from '@/data/products'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'

export default function NewDropPage() {
  const { addToCart } = useCart()

  // Get all pre-order products
  const preOrderProducts = products.filter(product => product.isPreOrder)

  const handlePreOrder = (product: any) => {
    addToCart(product)
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold uppercase tracking-wide mb-4">
            New Drop
          </h1>
          <p className="text-off-white text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
            Pre-order exclusive pieces before they drop. Limited quantities, bold statements.
          </p>
        </div>

        {preOrderProducts.length === 0 ? (
          // No pre-orders available
          <div className="text-center py-16">
            <svg
              className="w-20 h-20 mx-auto mb-6 text-white/30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <h2 className="text-2xl font-display font-bold uppercase tracking-wide mb-4">
              No Drops Available
            </h2>
            <p className="text-off-white text-base mb-8">
              Check back soon for new exclusive releases.
            </p>
            <Link
              href="/"
              className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          // Pre-order products grid
          <div className="space-y-8">
            {/* Product Count */}
            <div className="text-center">
              <p className="text-off-white text-sm sm:text-base">
                {preOrderProducts.length} {preOrderProducts.length === 1 ? 'item' : 'items'} available for pre-order
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {preOrderProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white/5 border-2 border-white/10 rounded-2xl overflow-hidden hover:border-soft-pink/50 transition-all duration-300 group"
                >
                  {/* Product Image */}
                  <div className="relative w-full flex justify-center items-center bg-black p-4 min-h-[300px] sm:min-h-[320px]">
                    <div className="relative w-full h-full max-h-[350px]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="object-contain w-full h-auto max-h-[350px] group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      />
                    </div>
                    {/* Pre-Order Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="bg-soft-pink text-black px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
                        Pre-Order
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div>
                      <p className="text-off-white text-xs uppercase tracking-wide mb-1">
                        {product.category}
                      </p>
                      <h3 className="text-lg sm:text-xl font-display font-bold uppercase tracking-wide mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-soft-pink text-xl sm:text-2xl font-bold mb-2">
                        {product.price} {product.currency}
                      </p>
                      <p className="text-off-white/80 text-sm line-clamp-3 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Pre-Order Button */}
                    <button
                      onClick={() => handlePreOrder(product)}
                      className="w-full bg-soft-pink text-black px-6 py-3.5 rounded-full font-bold uppercase tracking-wide hover:scale-105 hover:shadow-xl transition-all duration-300 text-sm min-h-[52px]"
                    >
                      Pre-Order Now
                    </button>

                    {/* Shipping Notice */}
                    <p className="text-xs text-off-white/60 text-center italic">
                      Ships soon
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Back to Home Link */}
            <div className="text-center pt-8">
              <Link
                href="/"
                className="inline-block text-off-white hover:text-white text-sm underline"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

