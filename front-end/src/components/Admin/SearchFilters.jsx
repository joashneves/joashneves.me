export default function SearchFilters({ search, setSearch, tagFilter, setTagFilter, tags }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
      <input 
        placeholder="Pesquisar..." 
        value={search} 
        onChange={e => setSearch(e.target.value)}
        style={{ 
          padding: '0.5rem', 
          borderRadius: '4px', 
          border: '1px solid var(--gh-dark-border-default)', 
          background: 'var(--gh-dark-bg-default)', 
          color: 'white',
          flex: 1,
          minWidth: '200px'
        }}
      />
      
      <select 
        value={tagFilter} 
        onChange={e => setTagFilter(e.target.value)}
        style={{ 
          padding: '0.5rem', 
          borderRadius: '4px', 
          border: '1px solid var(--gh-dark-border-default)', 
          background: 'var(--gh-dark-bg-default)', 
          color: 'white'
        }}
      >
        <option value="">Todas as Tags</option>
        {tags?.items?.map(tag => (
          <option key={tag.id} value={tag.id}># {tag.name}</option>
        ))}
      </select>
    </div>
  )
}
