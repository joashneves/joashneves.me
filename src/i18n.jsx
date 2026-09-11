import { useMemo, useState } from 'react'
import { LanguageContext } from './i18n/context.js'
import { translations } from './i18n/translations.js'

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('site-lang') || 'pt')

  const value = useMemo(() => {
    const t = (key) => translations[lang][key] ?? key
    const toggleLang = () => setLang((prev) => (prev === 'pt' ? 'en' : 'pt'))
    return { lang, setLang, toggleLang, t }
  }, [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}