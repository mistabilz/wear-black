'use client'

import { LanguageProvider } from '@/context/LanguageContext'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function LocaleProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  useEffect(() => {
    // Update html lang attribute based on pathname
    const locale = pathname.split('/')[1] || 'en'
    if (['en', 'fr'].includes(locale)) {
      document.documentElement.lang = locale
    }
  }, [pathname])

  return <LanguageProvider>{children}</LanguageProvider>
}

