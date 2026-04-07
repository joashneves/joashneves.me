import { Link } from 'react-router-dom'
import styles from './PostCard.module.css'

export default function PostCard({ post, tags }) {
  return (
    <Link to={`/post/${post.slug}`} className={styles.post_link}>
      <div className={styles.post_card}>
        <div className={styles.content}>
          <h3 className={styles.title}>{post.title}</h3>
          <p className={styles.description}>
            {post.description}
          </p>
          <div className={styles.footer}>
            <span className={styles.date}>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
            <div className={styles.tags_container}>
              {post.tag_ids?.map(tagId => {
                const tag = tags?.items?.find(t => t.id === tagId)
                return tag && <span key={tagId} className={styles.tag}>#{tag.name}</span>
              })}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
