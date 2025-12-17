import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  return (
    <section id="about" className="relative w-full min-h-screen flex items-center bg-black text-white">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/black-hero.jpg"
          alt="BLACK - Our Story"
          fill
          className="object-cover object-right"
          priority
          sizes="100vw"
        />
        {/* Dark Gradient Overlay - Heavy on left, transparent on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-2xl lg:max-w-3xl py-16 sm:py-20 lg:py-24 xl:py-32">
            <div className="space-y-10 sm:space-y-12 lg:space-y-14 text-left">
              {/* Section Title */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] leading-tight">
                OUR STORY
              </h2>
              
              {/* Content Container */}
              <div className="space-y-7 sm:space-y-8 lg:space-y-9">
                {/* Lead Paragraph */}
                <p className="text-white text-xl sm:text-2xl lg:text-3xl leading-relaxed sm:leading-relaxed lg:leading-relaxed font-light opacity-95">
                  BLACK is more than a name. It's a voice, a rhythm, a movement. Rooted in Black culture, created for every shade, every shape, every soul bold enough to be seen.
                </p>
                
                {/* Body Paragraphs */}
                <div className="space-y-6 sm:space-y-7 text-white/90 text-lg sm:text-xl lg:text-xl leading-relaxed sm:leading-relaxed lg:leading-relaxed font-light">
                  <p>
                    When you wear BLACK, you carry both history and the future, the confidence, the creativity, and the unshakable pride of a culture that shaped the world.
                  </p>
                  <p>
                    This isn't exclusion; it's inclusion with intention. If you believe in our rise, you belong here.
                  </p>
                  <p className="text-white font-medium tracking-wide opacity-100">
                    BLACK is unity. BLACK is movement. BLACK is purpose.
                  </p>
                  <p>
                    Don't just wear it. Live it. And even if you're not Black, when you stand with us, you're part of us. Wear it.
                  </p>
                </div>
              </div>
              
              {/* Bottom CTA Line - Milano Style */}
              <div className="pt-8 sm:pt-10 lg:pt-12 border-t border-white/20">
                <Link
                  href="/join-the-movement"
                  className="flex items-center gap-4 sm:gap-6 hover:opacity-80 transition-opacity duration-300 group"
                >
                  {/* Left Text */}
                  <span className="text-white text-lg sm:text-xl lg:text-2xl font-light uppercase tracking-[0.3em] sm:tracking-[0.4em]">
                    BELIEVERS ONLY
                  </span>
                  
                  {/* Divider Line */}
                  <span className="w-px h-8 sm:h-10 lg:h-12 bg-white/60 group-hover:bg-white transition-colors" />
                  
                  {/* Right Text - Accent Color */}
                  <span className="text-soft-pink text-lg sm:text-xl lg:text-2xl font-bold uppercase tracking-wider">
                    ENTER
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

