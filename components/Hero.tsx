'use client'

import Image from 'next/image'
import Link from 'next/link'

// Updated hero image - desktop 16:9 aspect ratio
const HERO_IMAGE_PATH = '/images/heroimagedesktop169.JPG'

export default function Hero() {
  return (
    <section id="home" className="relative w-full bg-black overflow-hidden">
      {/* Full-bleed Hero Image Container - No side gaps, full image visible */}
      <div className="relative w-screen left-1/2 -translate-x-1/2 bg-black overflow-hidden aspect-[3/4] sm:aspect-[16/9] min-h-0 pt-16 md:pt-0">
        <Image
          src={HERO_IMAGE_PATH}
          alt="BLACK Hero - Streetwear models"
          fill
          priority
          className="object-contain object-[center_top] sm:object-center"
          style={{ objectFit: 'contain', objectPosition: 'center top' }}
          sizes="100vw"
        />
        
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
        
        {/* Tagline Section - Positioned at bottom of hero image */}
        <div className="absolute bottom-0 left-0 right-0 w-full text-white text-center px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 md:pb-12 z-10">
          <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4">
            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-semibold tracking-wide leading-tight break-words uppercase drop-shadow-lg">
              BUILT FROM BLACK CULTURE. MADE FOR THE WORLD.
            </h1>

            {/* Subline */}
            <p className="text-xs sm:text-sm md:text-base tracking-[0.25em] uppercase opacity-90 drop-shadow-md">
              WEAR IT BLACK. WEAR IT BOLD.
            </p>

            {/* CTA Button - Immediately after subline */}
            <div className="pt-2 sm:pt-4">
              <Link
                href="/join-the-movement"
                className="inline-flex items-center justify-center rounded-full bg-soft-pink px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-extrabold tracking-[0.25em] uppercase text-black hover:opacity-90 transition-opacity duration-300 shadow-lg"
              >
                JOIN THE MOVEMENT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

