'use client'

import Link from 'next/link'

export default function About() {
  
  return (
    <section id="about" className="w-full bg-black text-white overflow-hidden">
      <div className="min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto">
            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.25em] mb-6 sm:mb-8 md:mb-10 lg:mb-12 break-words">
              OUR STORY
            </h2>
            
            {/* Story Text Block */}
            <div className="text-white/80 sm:text-white/85 text-sm sm:text-base md:text-lg lg:text-xl xl:text-[22px] leading-relaxed sm:leading-7 md:leading-8 lg:leading-9 tracking-wide font-light antialiased space-y-3 sm:space-y-4">
              <p>
                BLACK is more than a name.
                It is a voice, a rhythm, a movement.
              </p>
              <p>
                Rooted in Black culture and created for every shade, every shape, and every soul bold enough to be seen. BLACK turns identity into expression and purpose into action. Every piece reflects confidence, creativity, and the pride of a culture that has shaped the world.
              </p>
              <p>
                BLACK goes beyond fashion. With every purchase, a portion is dedicated to supporting orphans across Africa, creating opportunities, care, and hope for children whose futures deserve to be protected. What you wear becomes a statement not only of style, but of responsibility and impact.
              </p>
              <p>
                This is not exclusion. It is inclusion with intention. BLACK welcomes those who believe in empowerment, dignity, and collective growth, and those who understand that progress is strongest when it is shared.
              </p>
              <p className="text-white/95 font-light tracking-wide my-6 sm:my-8">
                BLACK is unity.
                BLACK is movement.
                BLACK is purpose.
              </p>
              <p>
                Do not just wear it. Live it.
                When you stand with BLACK, you stand for purpose, community, and progress.
              </p>
            </div>
            
            {/* Sign Up Button - Smaller size */}
            <div className="pt-8 sm:pt-10 md:pt-12 lg:pt-14 text-center">
              <Link
                href="/join-the-movement"
                className="inline-block bg-soft-pink text-black px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-full font-black uppercase tracking-widest hover:opacity-90 transition-opacity duration-300 text-base sm:text-lg md:text-xl lg:text-2xl text-center min-h-[44px] sm:min-h-[48px] flex items-center justify-center break-words"
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

