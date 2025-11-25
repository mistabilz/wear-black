import Image from 'next/image'
import Link from 'next/link'

// Original hero image with two models in front of brick wall
const HERO_IMAGE_PATH = '/images/black-hero.jpg'

export default function Hero() {
  return (
    <section id="home" className="relative w-full bg-black">
      {/* MOBILE LAYOUT: Stacked (image + text below) */}
      <div className="md:hidden">
        {/* Hero Image - Clear and visible on mobile */}
        <div className="relative w-full aspect-[3/4]">
          <Image
            src={HERO_IMAGE_PATH}
            alt="BLACK Hero - Two models in front of brick wall"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Very subtle overlay on mobile - just enough for edge definition */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
        </div>

        {/* Text Content Below Image on Mobile */}
        <div className="bg-black px-4 py-8">
          <div className="max-w-lg mx-auto text-center">
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white uppercase tracking-wide leading-tight mb-4">
              BUILT FROM BLACK CULTURE. MADE FOR THE WORLD.
            </h1>

            {/* Tagline */}
            <p className="text-off-white text-sm sm:text-base mb-6">
              Luxury streetwear stitched with culture, confidence, and community.
            </p>

            {/* CTA Button */}
            <Link
              href="/join-the-movement"
              className="block w-full max-w-xs mx-auto bg-soft-pink text-black px-6 py-3.5 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm text-center min-h-[48px] flex items-center justify-center"
            >
              Join the Movement
            </Link>
          </div>
        </div>
      </div>

      {/* DESKTOP/TABLET LAYOUT: Overlay design (md and up) */}
      <div className="hidden md:block relative w-full max-w-[1920px] mx-auto">
        {/* Full Hero Image with overlay text */}
        <div className="relative w-full aspect-[3/2] lg:aspect-[16/10]">
          <Image
            src={HERO_IMAGE_PATH}
            alt="BLACK Hero - Two models in front of brick wall"
            fill
            className="object-contain"
            priority
            sizes="100vw"
          />
          
          {/* Gradient Overlay for text readability on desktop */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent lg:from-black/80 lg:via-black/50" />
          
          {/* Content Overlay on Desktop */}
          <div className="absolute inset-0 flex items-center">
            <div className="w-full px-6 lg:px-8">
              <div className="max-w-2xl">
                {/* Main Headline */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white uppercase tracking-wide leading-tight mb-6 lg:mb-8 drop-shadow-2xl">
                  BUILT FROM BLACK CULTURE. MADE FOR THE WORLD.
                </h1>

                {/* Tagline */}
                <p className="text-off-white text-base lg:text-lg max-w-xl mb-8 lg:mb-10 drop-shadow-lg">
                  Luxury streetwear stitched with culture, confidence, and community.
                </p>

                {/* CTA Button */}
                <Link
                  href="/join-the-movement"
                  className="inline-block bg-soft-pink text-black px-8 py-3.5 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm lg:text-base text-center min-h-[48px] flex items-center justify-center"
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

