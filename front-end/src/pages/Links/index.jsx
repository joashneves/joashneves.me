import { useState } from 'react'
import { useApi } from '../../services/api'
import SearchBar from '../../components/Public/SearchBar'
import TagFilter from '../../components/Public/TagFilter'
import Pagination from '../../components/Public/Pagination'
import LinkCard from '../../components/Public/LinkCard'
import EstiloDigital from '../../components/DigitalStyle'

export default function LinksPage() {
  const [search, setSearch] = useState('')
  const [tagFilter, setTagFilter] = useState('')
  const [page, setPage] = useState(1)

  const { data: tags } = useApi('/tags/')
  const { data: linksData } = useApi(`/links/?q=${search}&tag=${tagFilter}&page=${page}`)

  const links = linksData?.items || []

  return (
    <section style={{ maxWidth: '900px', margin: '0 auto'}}>
      <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <EstiloDigital >Links encontrados por ai...</EstiloDigital>
        <p>
          Recursos, ferramentas e sites úteis salvos por mim.
        </p>
        <div style={{ width: '100%', height: '1px', background: 'var(--gh-dark-border-default)', marginTop: '2rem' }}></div>

      </header>

      <SearchBar
        value={search}
        onChange={(val) => { setSearch(val); setPage(1); }}
        placeholder="Pesquisar por título ou descrição..."
      />

      <TagFilter
        tags={tags}
        selectedTag={tagFilter}
        onSelect={(id) => { setTagFilter(id); setPage(1); }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
        {links.length > 0 ? links.map(link => (
          <LinkCard key={link.id} link={link} tags={tags} />
        )) : (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <p style={{ fontSize: '1.2rem', color: 'var(--gh-dark-fg-muted)' }}>Nenhum link encontrado.</p>
          </div>
        )}
      </div>

      <Pagination
        total={linksData?.total}
        perPage={linksData?.per_page}
        currentPage={page}
        onPageChange={setPage}
      />
    </section>
  )
}
