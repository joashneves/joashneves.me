export default function TagFilter({ tags, selectedTag, onSelect }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '3rem' }}>
      <button 
        onClick={() => onSelect('')}
        style={getBadgeStyle(!selectedTag)}
      >
        Tudo
      </button>
      {tags?.map(tag => (
        <button 
          key={tag.id}
          onClick={() => onSelect(tag.id)}
          style={getBadgeStyle(selectedTag === tag.id)}
        >
          # {tag.name}
        </button>
      ))}
    </div>
  )
}

const getBadgeStyle = (isActive) => ({
  padding: '0.5rem 1rem',
  borderRadius: '20px',
  border: '1px solid var(--gh-dark-border-default)',
  background: isActive ? 'var(--efects-purple)' : 'var(--gh-dark-bg-muted)',
  color: 'white',
  cursor: 'pointer',
  fontSize: '0.9rem',
  transition: 'transform 0.2s ease, background 0.2s ease',
  transform: isActive ? 'scale(1.05)' : 'scale(1)',
  boxShadow: isActive ? '0 4px 12px rgba(127, 90, 240, 0.3)' : 'none'
})
