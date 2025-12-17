'use client'

import Image from 'next/image'

// Price constant
export const UNISEX_TRACKSUIT_PRICE_CAD = 120

export default function UnisexTracksuitSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Desktop: Side-by-side | Mobile: Stacked */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Image */}
            <div className="w-full flex justify-center items-center bg-white/5 rounded-2xl p-6 sm:p-8">
              <div className="relative w-full max-w-lg">
                <Image
                  src="/images/Unisex Tracksuit.jpg"
                  alt="Unisex Tracksuit - BLACK brand"
                  width={800}
                  height={1000}
                  className="object-contain w-full h-auto max-h-[600px]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Right: Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold uppercase tracking-wide mb-4">
                  Unisex Tracksuit
                </h2>
                <p className="text-off-white text-base sm:text-lg lg:text-xl">
                  Built for movement, made for every body.
                </p>
              </div>

              <div className="border-t border-white/10 pt-6">
                <p className="text-off-white text-sm sm:text-base leading-relaxed">
                  Premium quality tracksuit designed for comfort and style. Available in Black and Orange. 
                  Perfect for everyday wear, workouts, or making a statement on the streets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

