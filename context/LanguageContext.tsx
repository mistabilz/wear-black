'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'

type Locale = 'en' | 'fr'

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const [translations, setTranslations] = useState<Record<string, any>>({})
  const [isInitialized, setIsInitialized] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Load translations
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translations = await import(`@/locales/${locale}/common.json`)
        setTranslations(translations.default)
      } catch (error) {
        console.error('Failed to load translations:', error)
      }
    }
    loadTranslations()
  }, [locale])

  // Initialize locale from pathname or localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const pathLocale = pathname.split('/').filter(Boolean)[0] as Locale
    
    if (['en', 'fr'].includes(pathLocale)) {
      setLocaleState(pathLocale)
      localStorage.setItem('locale', pathLocale)
      setIsInitialized(true)
    } else {
      // No locale in path, check localStorage or default to en
      const storedLocale = localStorage.getItem('locale') as Locale | null
      const initialLocale = (storedLocale && ['en', 'fr'].includes(storedLocale)) 
        ? storedLocale 
        : 'en'
      
      setLocaleState(initialLocale)
      localStorage.setItem('locale', initialLocale)
      
      // Redirect to locale path
      const cleanPath = pathname === '/' ? '' : pathname
      router.replace(`/${initialLocale}${cleanPath}`)
      setIsInitialized(true)
    }
  }, [pathname, router])

  const setLocale = (newLocale: Locale) => {
    if (!isInitialized) return
    
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
    
    // Update URL with new locale
    const pathParts = pathname.split('/').filter(Boolean)
    const currentPath = pathParts.length > 1 && ['en', 'fr'].includes(pathParts[0])
      ? '/' + pathParts.slice(1).join('/')
      : pathname
    
    const newPath = `/${newLocale}${currentPath === '/' ? '' : currentPath}`
    router.push(newPath)
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

