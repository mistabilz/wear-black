import Image from 'next/image'
import Link from 'next/link'

// Original hero image with two models in front of brick wall
const HERO_IMAGE_PATH = '/images/black-hero.jpg'

export default function Hero() {
  return (
    <section id="home" className="relative w-full bg-black">
      {/* Hero Container - Height determined by image aspect ratio */}
      <div className="relative w-full max-w-[1920px] mx-auto">
        {/* Full Hero Image - No cropping */}
        <div className="relative w-full aspect-[16/10]">
          <Image
            src={HERO_IMAGE_PATH}
            alt="BLACK Hero - Two models in front of brick wall"
            fill
            className="object-contain"
            priority
            sizes="100vw"
          />
          
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent lg:from-black/80 lg:via-black/50" />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white uppercase tracking-wide leading-tight mb-6 lg:mb-8 drop-shadow-2xl">
                BUILT FROM BLACK CULTURE.
                <br />
                MADE FOR THE WORLD.
              </h1>

              {/* Tagline */}
              <p className="text-off-white text-sm sm:text-base lg:text-lg max-w-xl mb-8 lg:mb-10 drop-shadow-lg">
                Luxury streetwear stitched with culture, confidence, and community.
              </p>

              {/* CTA Button */}
              <div>
                <Link
                  href="/join-the-movement"
                  className="inline-block bg-soft-pink text-black px-8 py-3 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm lg:text-base text-center"
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

