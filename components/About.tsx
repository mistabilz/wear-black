import Link from 'next/link'

export default function About() {
  return (
    <section id="about" className="w-full bg-black text-white">
      <div className="min-h-screen flex items-center justify-center py-20 sm:py-24 lg:py-32 xl:py-40">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-3xl mx-auto text-left">
            <div className="space-y-12 sm:space-y-14 lg:space-y-16">
              {/* Section Title */}
              <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] leading-tight">
                OUR STORY
              </h2>
              
              {/* Content Container */}
              <div className="space-y-8 sm:space-y-9 lg:space-y-10">
                {/* Lead Paragraph */}
                <p className="text-white/90 text-xl sm:text-2xl lg:text-3xl leading-[1.8] sm:leading-[1.9] lg:leading-[2] font-light">
                  BLACK is more than a name. It's a voice, a rhythm, a movement. Rooted in Black culture, created for every shade, every shape, every soul bold enough to be seen.
                </p>
                
                {/* Body Paragraphs */}
                <div className="space-y-7 sm:space-y-8 text-white/85 text-lg sm:text-xl lg:text-2xl leading-[1.8] sm:leading-[1.9] lg:leading-[2] font-light">
                  <p>
                    When you wear BLACK, you carry both history and the future, the confidence, the creativity, and the unshakable pride of a culture that shaped the world.
                  </p>
                  <p>
                    This isn't exclusion; it's inclusion with intention. If you believe in our rise, you belong here.
                  </p>
                  <p className="text-white/95 font-medium tracking-wide">
                    BLACK is unity. BLACK is movement. BLACK is purpose.
                  </p>
                  <p>
                    Don't just wear it. Live it. And even if you're not Black, when you stand with us, you're part of us. Wear it.
                  </p>
                </div>
              </div>
              
              {/* Sign Up Button */}
              <div className="pt-8 sm:pt-10 lg:pt-12">
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
      </div>
    </section>
  )
}

