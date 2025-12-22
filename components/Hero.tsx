'use client'

import Image from 'next/image'
import Link from 'next/link'

// Updated hero image - desktop 16:9 aspect ratio
const HERO_IMAGE_PATH = '/images/heroimagedesktop169.JPG'

export default function Hero() {
  return (
    <section id="home" className="relative w-full bg-black">
      {/* MOBILE LAYOUT: Hero image with tagline/button at bottom */}
      <div className="md:hidden">
        {/* Hero Image Container - Starts directly under navbar */}
        <div className="relative w-full bg-black pt-16 min-h-[70vh] sm:min-h-[80vh] flex flex-col justify-end">
          <Image
            src={HERO_IMAGE_PATH}
            alt="BLACK Hero - Streetwear models"
            fill
            priority
            className="object-contain object-center"
            sizes="100vw"
          />
          
          {/* Subtle dark gradient overlay at bottom for text readability - NO BLUR */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none" />
          
          {/* Tagline and CTA at bottom of hero image */}
          <div className="relative z-10 pb-8 sm:pb-12 px-4 sm:px-6">
            <div className="max-w-lg mx-auto w-full text-center space-y-3 sm:space-y-4">
              {/* Main Headline */}
              <h1 className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-wide leading-tight drop-shadow-2xl break-words">
                BUILT FROM BLACK CULTURE. MADE FOR THE WORLD.
              </h1>

              {/* Tagline */}
              <p className="text-off-white text-xs sm:text-sm drop-shadow-lg uppercase tracking-wide break-words">
                WEAR IT BLACK. WEAR IT BOLD.
              </p>

              {/* CTA Button - immediately after tagline */}
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

      {/* DESKTOP/TABLET LAYOUT: Premium hero with tagline/button at bottom */}
      <div className="hidden md:block relative w-full">
        {/* Full Hero Image */}
        <div className="relative w-full min-h-[85vh] lg:min-h-screen flex flex-col justify-end">
          <Image
            src={HERO_IMAGE_PATH}
            alt="BLACK Hero - Streetwear models"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          
          {/* Subtle dark gradient overlay at bottom for text readability - NO BLUR */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
          
          {/* Tagline and CTA at bottom of hero image */}
          <div className="relative z-10 pb-12 md:pb-16 lg:pb-20 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
            <div className="max-w-2xl mx-auto text-center space-y-4 sm:space-y-6 lg:space-y-8">
              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white uppercase tracking-wide leading-tight drop-shadow-2xl break-words">
                BUILT FROM BLACK CULTURE. MADE FOR THE WORLD.
              </h1>

              {/* Tagline */}
              <p className="text-off-white text-sm sm:text-base lg:text-lg xl:text-xl max-w-xl drop-shadow-lg uppercase tracking-wide break-words">
                WEAR IT BLACK. WEAR IT BOLD.
              </p>

              {/* CTA Button - immediately after tagline */}
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
    </section>
  )
}

