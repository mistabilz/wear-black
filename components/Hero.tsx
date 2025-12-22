'use client'

import Image from 'next/image'
import Link from 'next/link'

// Updated hero image - desktop 16:9 aspect ratio
const HERO_IMAGE_PATH = '/images/heroimagedesktop169.JPG'

export default function Hero() {
  return (
    <section id="home" className="relative w-full bg-black">
      {/* Hero Image Section - Starts directly under navbar */}
      <div className="relative w-full bg-black pt-16 md:pt-20 min-h-[75vh] sm:min-h-[80vh] md:min-h-[85vh] lg:min-h-screen">
        <Image
          src={HERO_IMAGE_PATH}
          alt="BLACK Hero - Streetwear models"
          fill
          priority
          className="object-contain object-center md:object-cover md:object-center"
          sizes="100vw"
        />
      </div>

      {/* Tagline Section - Below the image, no overlap */}
      <div className="w-full bg-black py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-white uppercase tracking-wide leading-tight break-words">
              BUILT FROM BLACK CULTURE. MADE FOR THE WORLD.
            </h1>

            {/* Tagline */}
            <p className="text-off-white text-sm sm:text-base md:text-lg lg:text-xl uppercase tracking-wide break-words">
              WEAR IT BLACK. WEAR IT BOLD.
            </p>

            {/* CTA Button */}
            <div className="pt-4 sm:pt-6">
              <Link
                href="/join-the-movement"
                className="inline-flex items-center justify-center bg-soft-pink text-black px-8 py-3.5 sm:px-10 sm:py-4 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm sm:text-base min-h-[48px]"
              >
                Join the Movement
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

