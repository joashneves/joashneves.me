export default function ItemList({ activeTab, data, page, setPage }) {
  const items = data?.items || []
  const total = data?.total || 0
  const perPage = data?.per_page || 10
  const totalPages = Math.ceil(total / perPage)

  return (
    <div>
      <h3>Existentes ({activeTab})</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map(item => (
          <li key={item.id} style={listItemStyle}>
            {activeTab === 'tags' ? `# ${item.name}` : item.title}
          </li>
        ))}
      </ul>
      
      {totalPages > 1 && (
        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button 
              key={p} 
              onClick={() => setPage(p)}
              style={{
                padding: '0.3rem 0.6rem',
                background: page === p ? 'var(--efects-purple)' : 'transparent',
                color: 'white',
                border: '1px solid var(--efects-purple)',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const listItemStyle = { padding: '0.5rem', borderBottom: '1px solid var(--gh-dark-border-default)' }
