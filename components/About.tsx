'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { usePathname } from 'next/navigation'

export default function About() {
  const { t, locale } = useLanguage()
  const pathname = usePathname()
  const currentLocale = pathname?.split('/')[1] || locale || 'en'
  
  return (
    <section id="about" className="w-full bg-black text-white overflow-hidden">
      <div className="min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto">
            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.25em] mb-6 sm:mb-8 md:mb-10 lg:mb-12 break-words">
              {t('about.title')}
            </h2>
            
            {/* Story Text Block */}
            <div className="text-white/80 sm:text-white/85 text-sm sm:text-base md:text-lg lg:text-xl xl:text-[22px] leading-relaxed sm:leading-7 md:leading-8 lg:leading-9 tracking-wide font-light antialiased space-y-3 sm:space-y-4">
              <p>
                {t('about.paragraph1')}
              </p>
              <p>
                {t('about.paragraph2')}
              </p>
              <p>
                {t('about.paragraph3')}
              </p>
              <p className="text-white/95 font-light tracking-wide my-6 sm:my-8">
                {t('about.paragraph4')}
              </p>
              <p>
                {t('about.paragraph5')}
              </p>
            </div>
            
            {/* Sign Up Button - Smaller size */}
            <div className="pt-8 sm:pt-10 md:pt-12 lg:pt-14 text-center">
              <Link
                href={`/${currentLocale}/join-the-movement`}
                className="inline-block bg-soft-pink text-black px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-full font-black uppercase tracking-widest hover:opacity-90 transition-opacity duration-300 text-base sm:text-lg md:text-xl lg:text-2xl text-center min-h-[44px] sm:min-h-[48px] flex items-center justify-center break-words"
              >
                {t('about.signUp')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

