import { useRef, useState } from 'react'
import styles from './CodeBlock.module.css'

export default function CodeBlock({ children, ...props }) {
  const preRef = useRef(null)
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    const text = preRef.current?.textContent || ''
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      setCopied(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.copy}
        onClick={handleCopy}
        type="button"
        aria-label="Copiar código"
      >
        {copied ? 'Copiado!' : 'Copiar'}
      </button>
      <pre ref={preRef} {...props}>{children}</pre>
    </div>
  )
}