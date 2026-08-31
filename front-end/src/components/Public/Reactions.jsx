import { useState } from 'react'
import { postData } from '../../services/api'
import styles from './Reactions.module.css'

const EMOJIS = ['👍', '❤️', '🔥', '🚀', '👏']

export default function Reactions({ slug, initial }) {
  const [reactions, setReactions] = useState(initial || {})
  const [voted, setVoted] = useState(() => localStorage.getItem(`reaction:${slug}`))

  async function handleReact(emoji) {
    if (voted) return
    setReactions(prev => ({ ...prev, [emoji]: (prev[emoji] || 0) + 1 }))
    setVoted(emoji)
    localStorage.setItem(`reaction:${slug}`, emoji)
    try {
      await postData(`/posts/${slug}/reaction`, { emoji })
    } catch (e) {
      // falha silenciosa: contagem local já foi atualizada otimisticamente
    }
  }

  return (
    <div className={styles.wrap}>
      <span className={styles.label}>Gostou do post?</span>
      <div className={styles.buttons}>
        {EMOJIS.map(emoji => (
          <button
            key={emoji}
            type="button"
            className={`${styles.button} ${voted === emoji ? styles.active : ''}`}
            onClick={() => handleReact(emoji)}
            aria-label={`Reagir com ${emoji}`}
          >
            <span className={styles.emoji}>{emoji}</span>
            <span className={styles.count}>{reactions[emoji] || 0}</span>
          </button>
        ))}
      </div>
    </div>
  )
}