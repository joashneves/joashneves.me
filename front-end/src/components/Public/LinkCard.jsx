export default function LinkCard({ link, tags }) {
  return (
    <a href={link.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={linkCardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
          <h3 style={{ color: 'var(--title-green-color)', margin: 0 }}>{link.title}</h3>
        </div>
        <p style={{ fontSize: '0.95rem', color: 'var(--gh-dark-fg-default)', marginBottom: '1.2rem', lineHeight: '1.6' }}>
          {link.description}
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {link.tag_ids?.map(tagId => {
            const tag = tags?.items?.find(t => t.id === tagId)
            return tag && <span key={tagId} style={tagBadgeStyle}># {tag.name}</span>
          })}
        </div>
      </div>
    </a>
  )
}

const linkCardStyle = {
  padding: '1.8rem',
  borderRadius: '16px',
  border: '1px solid var(--gh-dark-border-default)',
  background: 'var(--gh-dark-bg-default)',
  transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
  cursor: 'pointer',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  marginBottom: '1rem'
}

const tagBadgeStyle = {
  fontSize: '0.75rem',
  padding: '0.3rem 0.7rem',
  borderRadius: '20px',
  background: 'var(--gh-dark-bg-muted)',
  border: '1px solid var(--gh-dark-border-default)',
  color: 'var(--gh-dark-fg-muted)'
}
