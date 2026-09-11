import { useEffect, useState } from 'react'
import { useLanguage } from '../../i18n/context.js'
import {
  HomeIcon,
  AboutIcon,
  ProjectsIcon,
  ServicesIcon,
  ContactIcon,
} from './navIcons.jsx'
import styles from './navbar.module.css'

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  )
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('site-theme')
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('site-theme', theme)
  }, [theme])

  return { theme, toggleTheme: () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')) }
}

const NAV_ITEMS = [
  { id: 'home', key: 'nav.home', Icon: HomeIcon },
  { id: 'about', key: 'nav.about', Icon: AboutIcon },
  { id: 'projects', key: 'nav.projects', Icon: ProjectsIcon },
  { id: 'services', key: 'nav.services', Icon: ServicesIcon },
  { id: 'contact', key: 'nav.contact', Icon: ContactIcon },
]

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY

    const onScroll = () => {
      const y = window.scrollY
      if (y <= 8) {
        setHidden(false)
      } else if (y > lastY && y > 80) {
        setHidden(true)
      } else if (y < lastY) {
        setHidden(false)
      }
      lastY = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = (e, id) => {
    e.preventDefault()
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`${styles.navbar} ${!open && hidden ? styles.hidden : ''} ${open ? styles.open : ''}`}
      aria-label="Navegação principal"
    >
      <a className={styles.brand} href="#home" onClick={(e) => goTo(e, 'home')}>
        joashneves<span>.me</span>
      </a>

      <ul className={styles.links}>
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <a className={styles.link} href={`#${item.id}`} onClick={(e) => goTo(e, item.id)}>
              <item.Icon width="15" height="15" fill="currentColor" />
              {t(item.key)}
            </a>
          </li>
        ))}
      </ul>

      <ul className={styles.menu}>
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <a className={styles.link} href={`#${item.id}`} onClick={(e) => goTo(e, item.id)}>
              <item.Icon width="15" height="15" fill="currentColor" />
              {t(item.key)}
            </a>
          </li>
        ))}
      </ul>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.button}
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
          title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
        <button type="button" className={`${styles.button} ${styles.lang}`} onClick={toggleLang}>
          {lang === 'pt' ? 'EN' : 'PT'}
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.burger}`}
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>
    </nav>
  )
}