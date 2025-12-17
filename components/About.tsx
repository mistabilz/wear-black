import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  return (
    <section id="about" className="w-full bg-black text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] lg:min-h-[700px]">
        {/* Left Column - Text Content */}
        <div className="bg-black flex items-center py-16 sm:py-20 lg:py-24 xl:py-32">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="max-w-2xl mx-auto lg:mx-0 space-y-8 sm:space-y-10 lg:space-y-12 text-left">
              {/* Section Title */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-6xl font-display font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] leading-tight">
                OUR STORY
              </h2>
              
              {/* Content Container */}
              <div className="space-y-6 sm:space-y-7 lg:space-y-8">
                {/* Lead Paragraph */}
                <p className="text-white text-xl sm:text-2xl lg:text-2xl leading-relaxed sm:leading-relaxed lg:leading-relaxed font-light">
                  BLACK is more than a name. It's a voice, a rhythm, a movement. Rooted in Black culture, created for every shade, every shape, every soul bold enough to be seen.
                </p>
                
                {/* Body Paragraphs */}
                <div className="space-y-5 sm:space-y-6 text-white/90 text-base sm:text-lg lg:text-lg leading-relaxed sm:leading-relaxed lg:leading-relaxed">
                  <p>
                    When you wear BLACK, you carry both history and the future, the confidence, the creativity, and the unshakable pride of a culture that shaped the world.
                  </p>
                  <p>
                    This isn't exclusion; it's inclusion with intention. If you believe in our rise, you belong here.
                  </p>
                  <p className="text-white font-medium tracking-wide">
                    BLACK is unity. BLACK is movement. BLACK is purpose.
                  </p>
                  <p>
                    Don't just wear it. Live it. And even if you're not Black, when you stand with us, you're part of us. Wear it.
                  </p>
                </div>
              </div>
              
              {/* Sign Up Button */}
              <div className="pt-6 sm:pt-8 lg:pt-10">
                <Link
                  href="/join-the-movement"
                  className="inline-block bg-soft-pink text-black px-8 sm:px-10 py-4 sm:py-4.5 rounded-full font-semibold uppercase tracking-wider hover:scale-105 hover:shadow-xl transition-all duration-300 text-sm sm:text-base lg:text-base text-center min-h-[52px] flex items-center justify-center"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="relative w-full h-[400px] sm:h-[500px] lg:h-full lg:min-h-[700px]">
          <Image
            src="/images/black-hero.jpg"
            alt="BLACK - Our Story"
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  )
}

