import { Link } from 'react-router-dom'

export default function PostCard({ post, tags }) {
  return (
    <Link to={`/post/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={postCardStyle}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.8rem', color: 'var(--title-green-color)', marginBottom: '0.8rem' }}>{post.title}</h3>
          <p style={{ fontSize: '1.1rem', color: 'var(--gh-dark-fg-default)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            {post.description}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--gh-dark-fg-muted)' }}>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {post.tag_ids?.map(tagId => {
                const tag = tags?.find(t => t.id === tagId)
                return tag && <span key={tagId} style={tagStyle}>#{tag.name}</span>
              })}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

const postCardStyle = {
  padding: '2.5rem',
  borderRadius: '24px',
  border: '1px solid var(--gh-dark-border-default)',
  background: 'var(--gh-dark-bg-default)',
  transition: 'all 0.3s ease',
  display: 'flex',
  cursor: 'pointer',
  marginBottom: '1.5rem'
}

const tagStyle = {
  fontSize: '0.85rem',
  color: 'var(--efects-purple)',
  fontWeight: 'bold'
}
