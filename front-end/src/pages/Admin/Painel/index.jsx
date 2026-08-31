import { useState, useEffect } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { useApi } from '../../../services/api'
import AdminForms from '../../../components/Admin/AdminForms'
import ItemList from '../../../components/Admin/ItemList'
import SearchFilters from '../../../components/Admin/SearchFilters'
import styles from '../../../components/Admin/AdminPanel.module.css'

export default function Painel() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('posts')
  const [search, setSearch] = useState('')
  const [tagFilter, setTagFilter] = useState('')
  const [page, setPage] = useState(1)
  const [editingItem, setEditingItem] = useState(null)

  const { data: tags, isError: tagsError } = useApi('/tags/')

  const { data: allLinksData } = useApi('/links/?per_page=100')
  const allLinks = allLinksData?.items || []

  const apiUrl = `/${activeTab}/?q=${search}&tag=${tagFilter}&page=${page}`;
  const { data: itemsData, mutate, isError: itemsError } = useApi(apiUrl);

  useEffect(() => {
    if (tagsError) console.error("Erro ao carregar tags:", tagsError);
    if (itemsError) console.error("Erro ao carregar itens:", itemsError);
  }, [tagsError, itemsError]);

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setEditingItem(null)
    setSearch('')
    setTagFilter('')
    setPage(1)
  }

  return (
    <section className={styles.page}>
      <header className={styles.topHeader}>
        <div>
          <h1 className={styles.title}>Painel Administrativo</h1>
          <p className={styles.subtitle}>Bem-vindo, {user?.user} ({user?.cargo})</p>
        </div>
        <button onClick={logout} className={styles.logoutBtn}>
          Sair
        </button>
      </header>

      {(tagsError || itemsError) && (
        <div className={styles.errorBanner}>
          <strong>Aviso:</strong> {tagsError?.message || itemsError?.message}
        </div>
      )}

      <div className={styles.tabs}>
        {['posts', 'links', 'tags', 'projects'].map(tab => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
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

      <div className={styles.formGrid}>
        <div className={styles.panel}>
          <h3 className={styles.panelTitle}>
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

        <div className={styles.panel}>
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