import styles from './LinkCard.module.css';

export default function LinkCard({ link, tags }) {
  return (
    <a href={link.url} target="_blank" rel="noreferrer" className={styles.link_container}>
      <div className={styles.link_card}>
        <div className={styles.header}>
          <h3 className={styles.title}>{link.title}</h3>
        </div>
        <p className={styles.description}>
          {link.description}
        </p>
        <div className={styles.tags_container}>
          {link.tag_ids?.map(tagId => {
            const tag = tags?.items?.find(t => t.id === tagId)
            return tag && <span key={tagId} className={styles.tag_badge}># {tag.name}</span>
          })}
        </div>
      </div>
    </a>
  )
}
