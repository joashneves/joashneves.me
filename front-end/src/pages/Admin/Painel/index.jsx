import { useState, useEffect } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import useSWR from 'swr'
import AdminForms from '../../../components/Admin/AdminForms'
import ItemList from '../../../components/Admin/ItemList'
import SearchFilters from '../../../components/Admin/SearchFilters'

const fetcher = (url) => fetch(url, { credentials: 'include' }).then(async (res) => {
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
  }
  return res.json();
});

export default function Painel() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('posts')
  const [search, setSearch] = useState('')
  const [tagFilter, setTagFilter] = useState('')
  const [page, setPage] = useState(1)
  const [editingItem, setEditingItem] = useState(null) // Estado para gerenciar o item em edição

  // Fetching tags separately as they are needed for multiple tabs
  const { data: tags } = useSWR('/api/tags/', fetcher)
  
  // Fetching items for the active tab
  const apiUrl = `/api/${activeTab}/?q=${search}&tag=${tagFilter}&page=${page}`;
  const { data: itemsData, mutate } = useSWR(apiUrl, fetcher);
  const items = itemsData?.items || []
  const paginationData = {
    total: itemsData?.total,
    per_page: itemsData?.per_page,
    page: itemsData?.page,
    pages: itemsData?.pages
  }

  // Reset pagination and search when tab changes
  useEffect(() => {
    setPage(1);
    setSearch('');
    setTagFilter('');
    setEditingItem(null); // Clear editing state when tab changes
  }, [activeTab]);

  // Handler to set item for editing
  const handleEdit = (item) => {
    setEditingItem(item);
  };

  // Handler to cancel editing
  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setEditingItem(null) // Clear editing state when tab changes
    setPage(1) // Reset page
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
          style={{ /* ... button styles ... */ }}
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
          <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--gh-dark-border-default)', paddingBottom: '0.5rem' }}>
            {editingItem ? `Editando ${activeTab.slice(0, -1)}` : `Novo ${activeTab.slice(0, -1)}`}
          </h3>
          <AdminForms 
            activeTab={activeTab} 
            tags={tags} 
            mutate={mutate} 
            editingItem={editingItem} // Passando o item para edição
            onCancelEdit={handleCancelEdit} // Passando a função para cancelar
          />
        </div>

        <div style={{ padding: '1.5rem', border: '1px solid var(--gh-dark-border-default)', borderRadius: '12px', background: 'var(--gh-dark-bg-muted)' }}>
          <ItemList 
            activeTab={activeTab} 
            data={{ items, total: itemsData?.total, per_page: itemsData?.per_page, page: itemsData?.page, pages: itemsData?.pages }} 
            page={page} 
            setPage={setPage} 
            onEditItem={handleEdit} // Passando a função para editar
          />
        </div>
      </div>
    </section>
  )
}
