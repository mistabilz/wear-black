'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()

  return (
    <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm uppercase tracking-wide">
      <button
        onClick={() => setLocale('en')}
        className={`px-2 sm:px-3 py-2 min-h-[44px] sm:min-h-[36px] flex items-center justify-center transition-colors ${
          locale === 'en'
            ? 'text-white font-bold'
            : 'text-white/60 hover:text-white'
        }`}
        aria-label="Switch to English"
        aria-pressed={locale === 'en'}
      >
        EN
      </button>
      <span className="text-white/40">|</span>
      <button
        onClick={() => setLocale('fr')}
        className={`px-2 sm:px-3 py-2 min-h-[44px] sm:min-h-[36px] flex items-center justify-center transition-colors ${
          locale === 'fr'
            ? 'text-white font-bold'
            : 'text-white/60 hover:text-white'
        }`}
        aria-label="Switch to French"
        aria-pressed={locale === 'fr'}
      >
        FR
      </button>
    </div>
  )
}

