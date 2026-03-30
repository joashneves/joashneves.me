import { useState } from 'react'
import { useApi } from '../../../services/api'
import AdminForms from '../../../components/Admin/AdminForms'
import ItemList from '../../../components/Admin/ItemList'
import SearchFilters from '../../../components/Admin/SearchFilters'

export default function Painel() {
  const [activeTab, setActiveTab] = useState('posts')
  const [search, setSearch] = useState('')
  const [tagFilter, setTagFilter] = useState('')
  const [page, setPage] = useState(1)

  const { data: tags } = useApi('/tags/')
  const { data: items, mutate } = useApi(`/${activeTab}/?q=${search}&tag=${tagFilter}&page=${page}`)

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setPage(1)
  }

  return (
    <section style={{ padding: '2rem' }}>
      <h1>Painel Administrativo</h1>
      
      <div style={{ display: 'flex', gap: '1rem', margin: '2rem 0' }}>
        {['posts', 'links', 'tags', 'projects'].map(tab => (
          <button 
            key={tab}
            onClick={() => handleTabChange(tab)}
            style={{ 
              background: activeTab === tab ? 'var(--efects-purple)' : 'transparent', 
              color: 'white', 
              padding: '0.5rem 1rem', 
              border: '1px solid var(--efects-purple)', 
              borderRadius: '4px', 
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <SearchFilters 
        search={search} 
        setSearch={setSearch} 
        tagFilter={tagFilter} 
        setTagFilter={setTagFilter} 
        tags={tags} 
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div style={{ padding: '1rem', border: '1px solid var(--gh-dark-border-default)', borderRadius: '8px' }}>
          <AdminForms activeTab={activeTab} tags={tags} mutate={mutate} />
        </div>

        <div style={{ padding: '1rem', border: '1px solid var(--gh-dark-border-default)', borderRadius: '8px' }}>
          <ItemList activeTab={activeTab} data={items} page={page} setPage={setPage} />
        </div>
      </div>
    </section>
  )
}
