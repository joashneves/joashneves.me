import { useState } from 'react'
import { useApi } from '../../services/api'
import SearchBar from '../../components/Public/SearchBar'
import TagFilter from '../../components/Public/TagFilter'
import Pagination from '../../components/Public/Pagination'
import LinkCard from '../../components/Public/LinkCard'
import EstiloDigital from '../../components/DigitalStyle'
import styles from './Links.module.css'

export default function LinksPage() {
  const [search, setSearch] = useState('')
  const [tagFilter, setTagFilter] = useState('')
  const [page, setPage] = useState(1)

  const { data: tags } = useApi('/tags/')
  const { data: linksData } = useApi(`/links/?q=${search}&tag=${tagFilter}&page=${page}`)

  const links = linksData?.items || []

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <EstiloDigital >Links encontrados por ai...</EstiloDigital>
        <p className={styles.description}>
          Recursos, ferramentas e sites úteis salvos por mim.
        </p>
        <div className={styles.divider}></div>

      </header>

      <SearchBar
        className={styles.pesquisaBar}
        value={search}
        onChange={(val) => { setSearch(val); setPage(1); }}
        placeholder="Pesquisar..."
      />

      <TagFilter
        tags={tags}
        selectedTag={tagFilter}
        onSelect={(id) => { setTagFilter(id); setPage(1); }}
      />

      <div className={styles.grid}>
        {links.length > 0 ? links.map(link => (
          <LinkCard key={link.id} link={link} tags={tags} />
        )) : (
          <div className={styles.empty}>
            <p className={styles.emptyText}>Nenhum link encontrado.</p>
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
