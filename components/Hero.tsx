import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Using Unsplash placeholder */}
      <div className="absolute inset-0 z-0 bg-black">
        <Image
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1920&h=1080&fit=crop&q=80"
          alt="BLACK Hero"
          fill
          className="object-contain"
          priority
          sizes="100vw"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/80 via-black/70 to-black/60" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 py-32 lg:py-40">
        <div className="max-w-4xl">
          {/* Label */}
          <div className="mb-6 lg:mb-8">
            <p className="text-white text-xs lg:text-sm font-bold uppercase tracking-[0.2em] text-center lg:text-left">
              BLACK
            </p>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white uppercase tracking-wide leading-tight mb-6 lg:mb-8 text-center lg:text-left">
            BUILT FROM BLACK CULTURE.
            <br />
            MADE FOR THE WORLD.
          </h1>

          {/* Tagline */}
          <p className="text-off-white text-sm sm:text-base lg:text-lg max-w-2xl mb-6 lg:mb-8 text-center lg:text-left">
            Luxury streetwear stitched with culture, confidence, and community.
          </p>

          {/* Join the Movement CTA */}
          <div className="mb-8 lg:mb-10">
            <Link
              href="#about"
              className="inline-block bg-soft-pink text-black px-8 py-3 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm lg:text-base text-center"
            >
              Join the Movement
            </Link>
          </div>

          {/* Secondary CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6">
            <Link
              href="#shop"
              className="bg-white text-black px-8 py-3 rounded-full font-semibold uppercase tracking-wide hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm lg:text-base text-center w-full sm:w-auto"
            >
              SHOP NOW
            </Link>

            {/* Secondary Link */}
            <Link
              href="#about"
              className="text-white/80 hover:text-white underline underline-offset-4 text-sm lg:text-base transition-colors"
            >
              Learn more about BLACK
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

