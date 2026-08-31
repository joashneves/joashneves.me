import { useEffect, useState } from 'react'
import styles from './ReadingProgress.module.css'

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = null

    function update() {
      const docEl = document.documentElement
      const scrollTop = window.scrollY
      const height = docEl.scrollHeight - docEl.clientHeight
      setProgress(height > 0 ? (scrollTop / height) * 100 : 0)
    }

    function onScroll() {
      if (raf) return
      raf = requestAnimationFrame(() => {
        update()
        raf = null
      })
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return <div className={styles.bar} style={{ width: `${progress}%` }} />
}