import { useState, useEffect } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { useApi } from '../../../services/api'
import AdminForms from '../../../components/Admin/AdminForms'
import ItemList from '../../../components/Admin/ItemList'
import SearchFilters from '../../../components/Admin/SearchFilters'

export default function Painel() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('posts')
  const [search, setSearch] = useState('')
  const [tagFilter, setTagFilter] = useState('')
  const [page, setPage] = useState(1)
  const [editingItem, setEditingItem] = useState(null)

  // O data aqui já é a lista de tags
  const { data: tags, isError: tagsError } = useApi('/tags/')
  console.log("TAGS DATA:", tags, "ERROR:", tagsError);
  
  // O data aqui é { items, total, ... }
  const { data: allLinksData } = useApi('/links/?per_page=100')
  const allLinks = allLinksData?.items || []
  
  const apiUrl = `/${activeTab}/?q=${search}&tag=${tagFilter}&page=${page}`;
  const { data: itemsData, mutate, isError: itemsError } = useApi(apiUrl);
  
  const items = itemsData?.items || []

  // Feedback de erro para depuração
  useEffect(() => {
    if (tagsError) console.error("Erro ao carregar tags:", tagsError);
    if (itemsError) console.error("Erro ao carregar itens:", itemsError);
  }, [tagsError, itemsError]);

  useEffect(() => {
    setPage(1);
    setSearch('');
    setTagFilter('');
    setEditingItem(null);
  }, [activeTab]);

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setEditingItem(null)
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
            background: 'var(--gh-dark-danger)', 
            color: 'white', 
            border: 'none', 
            padding: '0.5rem 1rem', 
            borderRadius: '6px', 
            cursor: 'pointer' 
          }}
        >
          Sair
        </button>
      </header>
      
      { (tagsError || itemsError) && (
        <div style={{ background: '#3b1d1d', color: '#ff7b72', padding: '1rem', borderRadius: '6px', marginBottom: '2rem', border: '1px solid #ff7b72' }}>
          <strong>Aviso:</strong> {tagsError?.message || itemsError?.message}
        </div>
      )}

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
            links={allLinks}
            mutate={mutate} 
            editingItem={editingItem} 
            onCancelEdit={handleCancelEdit} 
          />
        </div>

        <div style={{ padding: '1.5rem', border: '1px solid var(--gh-dark-border-default)', borderRadius: '12px', background: 'var(--gh-dark-bg-muted)' }}>
          <ItemList 
            activeTab={activeTab} 
            data={itemsData} 
            page={page} 
            setPage={setPage} 
            onEditItem={handleEdit} 
            mutate={mutate} 
          />
        </div>
      </div>
    </section>
  )
}
