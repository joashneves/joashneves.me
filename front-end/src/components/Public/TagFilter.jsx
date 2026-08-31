import styles from './TagFilter.module.css'

export default function TagFilter({ tags, selectedTag, onSelect }) {
  return (
    <div className={styles.container}>
      <button
        onClick={() => onSelect('')}
        className={`${styles.badge} ${!selectedTag ? styles.active : ''}`}
      >
        Tudo
      </button>
      {tags?.items?.map(tag => (
        <button
          key={tag.id}
          onClick={() => onSelect(tag.id)}
          className={`${styles.badge} ${selectedTag === tag.id ? styles.active : ''}`}
        >
          # {tag.name}
        </button>
      ))}
    </div>
  )
}