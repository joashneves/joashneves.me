import { useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import useSWR from 'swr'
import AdminForms from '../../../components/Admin/AdminForms'
import ItemList from '../../../components/Admin/ItemList'
import SearchFilters from '../../../components/Admin/SearchFilters'

const fetcher = (url) => fetch(url, { credentials: 'include' }).then((res) => res.json())

export default function Painel() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('posts')
  const [search, setSearch] = useState('')
  const [tagFilter, setTagFilter] = useState('')
  const [page, setPage] = useState(1)

  const { data: tags } = useSWR('http://localhost:5000/api/tags/', fetcher)
  const { data: items, mutate } = useSWR(`http://localhost:5000/api/${activeTab}/?q=${search}&tag=${tagFilter}&page=${page}`, fetcher)

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setPage(1)
  }

  return (
    <section style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--gh-dark-border-default)', paddingBottom: '1rem' }}>
        <div>
          <h1 style={{ color: 'var(--title-green-color)', fontSize: '2rem' }}>Painel Administrativo</h1>
          <p style={{ color: 'var(--gh-dark-fg-muted)' }}>Bem-vindo, {user?.user} ({user?.cargo})</p>
        </div>
        <button 
          onClick={logout}
          style={{ 
            background: 'transparent', 
            color: '#f85149', 
            border: '1px solid #f85149', 
            padding: '0.5rem 1.2rem', 
            borderRadius: '6px', 
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => { e.target.style.background = '#f85149'; e.target.style.color = 'white' }}
          onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#f85149' }}
        >
          Sair
        </button>
      </header>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        {['posts', 'links', 'tags', 'projects'].map(tab => (
          <button 
            key={tab}
            onClick={() => handleTabChange(tab)}
            style={{ 
              background: activeTab === tab ? 'var(--efects-purple)' : 'transparent', 
              color: 'white', 
              padding: '0.6rem 1.2rem', 
              border: '1px solid var(--efects-purple)', 
              borderRadius: '6px', 
              cursor: 'pointer',
              textTransform: 'capitalize',
              fontWeight: activeTab === tab ? 'bold' : 'normal'
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem', marginTop: '2rem' }}>
        <div style={{ padding: '1.5rem', border: '1px solid var(--gh-dark-border-default)', borderRadius: '12px', background: 'var(--gh-dark-bg-muted)' }}>
          <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--gh-dark-border-default)', paddingBottom: '0.5rem' }}>Gerenciar {activeTab}</h3>
          <AdminForms activeTab={activeTab} tags={tags} mutate={mutate} />
        </div>

        <div style={{ padding: '1.5rem', border: '1px solid var(--gh-dark-border-default)', borderRadius: '12px', background: 'var(--gh-dark-bg-muted)' }}>
          <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--gh-dark-border-default)', paddingBottom: '0.5rem' }}>Lista de {activeTab}</h3>
          <ItemList activeTab={activeTab} data={items} page={page} setPage={setPage} />
        </div>
      </div>
    </section>
  )
}
