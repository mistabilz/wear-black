'use client'

import Image from 'next/image'
import Link from 'next/link'

// Updated hero image - desktop 16:9 aspect ratio
const HERO_IMAGE_PATH = '/images/heroimagedesktop169.JPG'

export default function Hero() {
  return (
    <section id="home" className="relative w-full bg-black overflow-hidden">
      {/* Full-bleed Hero Image Container */}
      <div className="relative w-screen left-1/2 -translate-x-1/2 bg-black overflow-hidden h-[70vh] sm:h-[75vh] lg:h-[85vh] max-h-[900px] pt-16 md:pt-0">
        <Image
          src={HERO_IMAGE_PATH}
          alt="BLACK Hero - Streetwear models"
          fill
          priority
          className="object-contain object-center"
          sizes="100vw"
        />
      </div>
      
      {/* Text Content Section - Below image, tight spacing */}
      <div className="w-full bg-black text-white text-center px-6 py-10 sm:py-12">
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-wide leading-tight break-words uppercase">
            BUILT FROM BLACK CULTURE. MADE FOR THE WORLD.
          </h1>

          {/* Tagline */}
          <p className="mt-4 text-sm sm:text-base tracking-[0.35em] uppercase text-white/80">
            WEAR IT BLACK. WEAR IT BOLD.
          </p>

          {/* CTA Button */}
          <div className="mt-8">
            <Link
              href="/join-the-movement"
              className="inline-flex items-center justify-center rounded-full bg-soft-pink px-10 py-4 text-base sm:text-lg font-extrabold tracking-[0.25em] uppercase text-black hover:opacity-90 transition-opacity duration-300"
            >
              JOIN THE MOVEMENT
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

