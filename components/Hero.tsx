'use client'

import Image from 'next/image'
import Link from 'next/link'

// Updated hero image - desktop 16:9 aspect ratio
const HERO_IMAGE_PATH = '/images/heroimagedesktop169.JPG'

export default function Hero() {
  return (
    <section id="home" className="relative w-full bg-black">
      {/* MOBILE LAYOUT: Image + text below (no overlay) */}
      <div className="md:hidden">
        {/* Hero Image - Full image visible, no cropping */}
        <div className="relative w-full bg-black pt-16 min-h-[55vh]">
          <Image
            src={HERO_IMAGE_PATH}
            alt="BLACK Hero - Streetwear models"
            fill
            priority
            className="object-contain object-center"
            sizes="100vw"
          />
        </div>
        
        {/* Text Content - Below image, no blur */}
        <div className="w-full bg-black py-8 sm:py-10 px-4 sm:px-6">
          <div className="max-w-lg mx-auto w-full text-center space-y-4 sm:space-y-5">
            {/* Main Headline */}
            <h1 className="text-xl sm:text-2xl font-display font-bold text-white uppercase tracking-wide leading-tight break-words">
              BUILT FROM BLACK CULTURE. MADE FOR THE WORLD.
            </h1>

            {/* Tagline */}
            <p className="text-off-white text-xs sm:text-sm uppercase tracking-wide break-words">
              WEAR IT BLACK. WEAR IT BOLD.
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href="/join-the-movement"
                className="inline-block w-full max-w-xs mx-auto bg-soft-pink text-black px-10 py-4 rounded-full font-extrabold tracking-[0.25em] text-sm hover:scale-105 hover:shadow-lg transition-all duration-300 text-center min-h-[48px] flex items-center justify-center"
              >
                JOIN THE MOVEMENT
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP/TABLET LAYOUT: Image + text at bottom */}
      <div className="hidden md:block relative w-full bg-black">
        {/* Hero Image - Full image visible, no cropping */}
        <div className="relative w-full bg-black min-h-[70vh]">
          <Image
            src={HERO_IMAGE_PATH}
            alt="BLACK Hero - Streetwear models"
            fill
            className="object-contain object-center"
            priority
            sizes="100vw"
          />
        </div>
        
        {/* Text Content - At bottom of hero section, below image, no blur */}
        <div className="w-full bg-black py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
          <div className="max-w-2xl mx-auto text-center space-y-6 sm:space-y-8">
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white uppercase tracking-wide leading-tight break-words">
              BUILT FROM BLACK CULTURE. MADE FOR THE WORLD.
            </h1>

            {/* Tagline */}
            <p className="text-off-white text-sm sm:text-base lg:text-lg xl:text-xl max-w-xl uppercase tracking-wide break-words">
              WEAR IT BLACK. WEAR IT BOLD.
            </p>

            {/* CTA Button */}
            <div>
              <Link
                href="/join-the-movement"
                className="inline-block bg-soft-pink text-black px-10 py-4 rounded-full font-extrabold tracking-[0.25em] text-sm md:text-base hover:scale-105 hover:shadow-lg transition-all duration-300 min-h-[48px] flex items-center justify-center"
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

