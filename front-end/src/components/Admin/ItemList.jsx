import { deleteData } from '../../services/api'

export default function ItemList({ activeTab, data, page, setPage, onEditItem, mutate }) {
  const items = data?.items || []
  const total = data?.total || 0
  const perPage = data?.per_page || 10
  const totalPages = Math.ceil(total / perPage)

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      try {
        const result = await deleteData(`/${activeTab}/${id}`)
        if (result.error) {
          alert('Erro: ' + result.error)
        } else {
          alert('Excluído com sucesso!')
          if (mutate) mutate()
        }
      } catch (err) {
        alert('Erro ao excluir item')
      }
    }
  }

  return (
    <div>
      <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--gh-dark-border-default)', paddingBottom: '0.5rem' }}>
        Existentes ({activeTab})
      </h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.length === 0 && <p style={{ color: 'var(--gh-dark-fg-muted)' }}>Nenhum item encontrado.</p>}
        {items.map(item => (
          <li key={item.id} style={listItemStyle}>
            <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {activeTab === 'tags' ? `# ${item.name}` : item.title}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={() => onEditItem(item)}
                style={actionButtonStyle('var(--efects-purple)')}
              >
                Editar
              </button>
              <button 
                onClick={() => handleDelete(item.id)}
                style={actionButtonStyle('var(--gh-dark-danger)')}
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
      
      {totalPages > 1 && (
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button 
              key={p} 
              onClick={() => setPage(p)}
              style={{
                padding: '0.4rem 0.8rem',
                background: page === p ? 'var(--efects-purple)' : 'transparent',
                color: 'white',
                border: '1px solid var(--efects-purple)',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: page === p ? 'bold' : 'normal'
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

const listItemStyle = { 
  padding: '0.8rem 0', 
  borderBottom: '1px solid var(--gh-dark-border-default)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '1rem'
}

const actionButtonStyle = (color) => ({
  background: 'transparent',
  color: 'white',
  border: `1px solid ${color}`,
  padding: '0.3rem 0.6rem',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.8rem',
  transition: '0.2s',
  '&:hover': {
    background: color
  }
})
