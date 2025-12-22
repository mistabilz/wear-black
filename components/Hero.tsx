'use client'

import Image from 'next/image'
import Link from 'next/link'

// Updated hero image - desktop 16:9 aspect ratio
const HERO_IMAGE_PATH = '/images/heroimagedesktop169.JPG'

export default function Hero() {
  return (
    <section id="home" className="relative w-full bg-black pt-16 md:pt-0">
      {/* MOBILE LAYOUT: Stacked (image + text below) - NO OVERLAP */}
      <div className="md:hidden">
        {/* Hero Image - Clear and visible on mobile, minimal overlay */}
        <div className="relative w-full bg-black min-h-[70vh] sm:min-h-[80vh]">
          <Image
            src={HERO_IMAGE_PATH}
            alt="BLACK Hero - Streetwear models"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
          {/* Very light overlay - just for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
          
          {/* Text Content Overlaid on Mobile - positioned lower */}
          <div className="absolute inset-0 flex flex-col justify-end pb-8 sm:pb-12 px-4 sm:px-6">
            <div className="max-w-lg mx-auto w-full text-center space-y-3 sm:space-y-4 backdrop-blur-sm bg-black/20 p-4 sm:p-6 rounded-2xl">
              {/* Main Headline */}
              <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white uppercase tracking-wide leading-tight drop-shadow-2xl break-words">
                BUILT FROM BLACK CULTURE. MADE FOR THE WORLD.
              </h1>

              {/* Tagline */}
              <p className="text-off-white text-xs sm:text-sm drop-shadow-lg uppercase tracking-wide break-words">
                WEAR IT BLACK. WEAR IT BOLD.
              </p>

              {/* CTA Button */}
              <div className="pt-2">
                <Link
                  href="/join-the-movement"
                  className="block w-full max-w-xs mx-auto bg-soft-pink text-black px-6 py-3.5 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm text-center min-h-[48px] flex items-center justify-center"
                >
                  Join the Movement
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP/TABLET LAYOUT: Overlay design (md and up) */}
      <div className="hidden md:block relative w-full">
        {/* Full Hero Image with overlay text */}
        <div className="relative w-full h-screen max-h-[900px]">
          <Image
            src={HERO_IMAGE_PATH}
            alt="BLACK Hero - Streetwear models"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          
          {/* Gradient Overlay for text readability on desktop - reduced opacity */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent lg:from-black/75 lg:via-black/30" />
          
          {/* Content Overlay on Desktop */}
          <div className="absolute inset-0 flex items-center">
            <div className="w-full px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
              <div className="max-w-2xl mx-auto">
                {/* Main Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white uppercase tracking-wide leading-tight mb-4 sm:mb-6 lg:mb-8 drop-shadow-2xl break-words">
                  BUILT FROM BLACK CULTURE. MADE FOR THE WORLD.
                </h1>

                {/* Tagline */}
                <p className="text-off-white text-sm sm:text-base lg:text-lg xl:text-xl max-w-xl mb-6 sm:mb-8 lg:mb-10 drop-shadow-lg uppercase tracking-wide break-words">
                  WEAR IT BLACK. WEAR IT BOLD.
                </p>

                {/* CTA Button */}
                <div>
                  <Link
                    href="/join-the-movement"
                    className="inline-flex items-center justify-center bg-soft-pink text-black px-8 py-3.5 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm lg:text-base min-h-[48px]"
                  >
                    Join the Movement
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

