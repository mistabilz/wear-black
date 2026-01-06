'use client'

import Image from 'next/image'
import Link from 'next/link'

// Updated hero image - desktop 16:9 aspect ratio
const HERO_IMAGE_PATH = '/images/heroimagedesktop169.JPG'

export default function Hero() {
  return (
    <section id="home" className="w-screen bg-black mt-4 sm:mt-6 md:mt-8">
      {/* Hero Image Container - Aspect-ratio ONLY, no viewport height */}
      <div className="relative w-screen bg-black aspect-[3/4] sm:aspect-[16/9] min-h-0">
        <Image
          src={HERO_IMAGE_PATH}
          alt="BLACK Hero - Streetwear models"
          fill
          priority
          sizes="100vw"
          className="object-contain object-[center_top] sm:object-center"
          style={{ objectFit: 'contain', objectPosition: 'center top' }}
        />
      </div>

      {/* Text Block - Attached, no gap */}
      <div className="w-screen bg-black text-center py-10 px-4">
        <h1 className="text-white text-2xl sm:text-4xl font-display font-bold tracking-wide leading-tight break-words uppercase">
          BUILT FROM BLACK CULTURE. MADE FOR THE WORLD.
        </h1>
        <p className="mt-4 text-off-white text-sm sm:text-base tracking-[0.25em] uppercase">
          WEAR IT BLACK. WEAR IT BOLD.
        </p>
        <div className="mt-8">
          <Link
            href="/join-the-movement"
            className="inline-flex items-center justify-center rounded-full bg-soft-pink px-10 py-4 text-base sm:text-lg font-extrabold tracking-[0.25em] uppercase text-black hover:opacity-90 transition-opacity duration-300"
          >
            JOIN THE MOVEMENT
          </Link>
        </div>
      </div>
    </section>
  )
}

