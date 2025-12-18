'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()

  return (
    <div className="flex items-center gap-2 text-sm uppercase tracking-wide">
      <button
        onClick={() => setLocale('en')}
        className={`px-2 py-1 transition-colors ${
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
        className={`px-2 py-1 transition-colors ${
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

