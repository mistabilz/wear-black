'use client'

import Link from 'next/link'
import { products } from '@/data/products'

export default function Shop() {
  return (
    <section id="shop" className="py-12 sm:py-16 md:py-20 lg:py-32 bg-black text-white overflow-hidden scroll-mt-[72px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-left mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold uppercase tracking-wide mb-3 sm:mb-4 break-words">
            Shop The Collection
          </h2>
          <p className="text-off-white text-sm sm:text-base md:text-lg max-w-2xl">
            Premium streetwear crafted for those who demand excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {products.map((product) => {
            return (
              <div key={product.id} className="group">
                <div className="space-y-2 py-4">
                  <p className="text-off-white text-sm uppercase tracking-wide">
                    {product.category}
                  </p>
                  <h3 className="text-xl font-semibold uppercase tracking-wide">
                    {product.name}
                  </h3>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-8 sm:mt-10 md:mt-12">
          <Link
            href="#"
            className="inline-block border border-white/30 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-wide text-xs sm:text-sm font-semibold min-h-[44px] flex items-center justify-center"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}

