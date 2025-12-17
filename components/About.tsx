import Link from 'next/link'

export default function About() {
  return (
    <section id="about" className="w-full bg-black text-white">
      <div className="min-h-screen flex items-center justify-center py-20 sm:py-24 lg:py-32 xl:py-40">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto">
            {/* Quote Block Container */}
            <div className="relative">
              {/* Large Opening Quote Mark */}
              <div className="absolute -left-4 sm:-left-6 lg:-left-8 top-0 text-white/40 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif leading-none">
                "
              </div>
              
              {/* Quote Text Block */}
              <div className="relative pl-8 sm:pl-10 lg:pl-12">
                <div className="text-white/80 sm:text-white/85 text-base sm:text-lg lg:text-xl xl:text-[22px] leading-relaxed sm:leading-8 lg:leading-9 tracking-wide font-light antialiased space-y-4">
                  <p>
                    BLACK is more than a name. It's a voice, a rhythm, a movement. Rooted in Black culture, created for every shade, every shape, every soul bold enough to be seen.
                  </p>
                  <p>
                    When you wear BLACK, you carry both history and the future, the confidence, the creativity, and the unshakable pride of a culture that shaped the world.
                  </p>
                  <p>
                    This isn't exclusion; it's inclusion with intention. If you believe in our rise, you belong here.
                  </p>
                  <p className="text-white/90 font-medium tracking-wide">
                    BLACK is unity. BLACK is movement. BLACK is purpose.
                  </p>
                  <p>
                    Don't just wear it. Live it. And even if you're not Black, when you stand with us, you're part of us. Wear it.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Sign Up Button - Understated placement */}
            <div className="pt-12 sm:pt-14 lg:pt-16 text-center">
              <Link
                href="/join-the-movement"
                className="inline-block bg-soft-pink text-black px-8 sm:px-10 py-4 sm:py-4.5 rounded-full font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity duration-300 text-sm sm:text-base lg:text-base text-center min-h-[52px] flex items-center justify-center"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

