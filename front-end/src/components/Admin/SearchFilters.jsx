import styles from './AdminPanel.module.css'

export default function SearchFilters({ search, setSearch, tagFilter, setTagFilter, tags }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
      <input
        placeholder="Pesquisar..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className={styles.input}
        style={{ flex: 1, minWidth: '200px' }}
      />

      <select
        value={tagFilter}
        onChange={e => setTagFilter(e.target.value)}
        className={styles.input}
        style={{ flex: '0 0 auto', cursor: 'pointer' }}
      >
        <option value="">Todas as Tags</option>
        {tags?.items?.map(tag => (
          <option key={tag.id} value={tag.id}># {tag.name}</option>
        ))}
      </select>
    </div>
  )
}