import Image from 'next/image'
import Link from 'next/link'

// Original hero image with two models in front of brick wall
const HERO_IMAGE_PATH = '/images/black-hero.jpg'

export default function Hero() {
  return (
    <section id="home" className="relative w-full bg-black pt-16 md:pt-0">
      {/* MOBILE LAYOUT: Stacked (image + text below) - NO OVERLAP */}
      <div className="md:hidden">
        {/* Hero Image - Clear and visible on mobile, no overlay blocking it */}
        <div className="relative w-full bg-black">
          <Image
            src={HERO_IMAGE_PATH}
            alt="BLACK Hero - Two models in front of brick wall"
            width={1920}
            height={1440}
            priority
            className="w-full h-auto object-contain mx-auto"
          />
        </div>

        {/* Text Content Below Image on Mobile */}
        <div className="bg-black px-4 py-8">
          <div className="max-w-lg mx-auto text-center space-y-4">
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white uppercase tracking-wide leading-tight">
              BUILT FROM BLACK CULTURE. MADE FOR THE WORLD.
            </h1>

            {/* Tagline */}
            <p className="text-off-white text-sm sm:text-base">
              Luxury streetwear stitched with culture, confidence, and community.
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

      {/* DESKTOP/TABLET LAYOUT: Overlay design (md and up) */}
      <div className="hidden md:block relative w-full max-w-[1920px] mx-auto">
        {/* Full Hero Image with overlay text */}
        <div className="relative w-full h-[calc(100vh-80px)] min-h-[600px] max-h-[900px]">
          <Image
            src={HERO_IMAGE_PATH}
            alt="BLACK Hero - Two models in front of brick wall"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          
          {/* Gradient Overlay for text readability on desktop */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent lg:from-black/85 lg:via-black/50" />
          
          {/* Content Overlay on Desktop */}
          <div className="absolute inset-0 flex items-center">
            <div className="w-full px-8 lg:px-16">
              <div className="max-w-2xl">
                {/* Main Headline */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white uppercase tracking-wide leading-tight mb-6 lg:mb-8 drop-shadow-2xl">
                  BUILT FROM BLACK CULTURE.
                  <br />
                  MADE FOR THE WORLD.
                </h1>

                {/* Tagline */}
                <p className="text-off-white text-base lg:text-lg max-w-xl mb-8 lg:mb-10 drop-shadow-lg">
                  Luxury streetwear stitched with culture, confidence, and community.
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

