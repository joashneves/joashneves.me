import { useState } from 'react'
import Button from '../../components/Button'
import { useApi } from '../../services/api'
import { Link } from 'react-router-dom'
import SearchBar from '../../components/Public/SearchBar'
import TagFilter from '../../components/Public/TagFilter'
import Pagination from '../../components/Public/Pagination'
import PostCard from '../../components/Public/PostCard'

export default function Home() {
  const [search, setSearch] = useState('')
  const [tagFilter, setTagFilter] = useState('')
  const [page, setPage] = useState(1)

  const { data: tags } = useApi('/tags/')
  const { data: postsData } = useApi(`/posts/?q=${search}&tag=${tagFilter}&page=${page}`)

  const posts = postsData?.items || []

  return (
    <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '6rem 2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '6rem' }}>
        <h1 style={{ fontSize: '4.5rem', marginBottom: '1.5rem', color: 'var(--title-green-color)' }}>Joash Neves</h1>
        <p style={{ fontSize: '1.4rem', color: 'var(--gh-dark-fg-muted)', maxWidth: '700px', margin: '0 auto 3rem' }}>
          Desenvolvedor Full Stack apaixonado por criar experiências digitais escaláveis e elegantes.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
          <Link to="/projetos"><Button>Explorar Projetos</Button></Link>
          <Link to="/links"><Button>Minha Biblioteca</Button></Link>
        </div>
      </header>

      <section id="conteudo" style={{ marginTop: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2.5rem', borderBottom: '2px solid var(--gh-dark-border-default)', paddingBottom: '0.8rem' }}>
          Blog & Artigos
        </h2>

        <SearchBar 
          value={search} 
          onChange={(val) => { setSearch(val); setPage(1); }} 
          placeholder="O que você quer ler hoje?" 
        />

        <TagFilter 
          tags={tags} 
          selectedTag={tagFilter} 
          onSelect={(id) => { setTagFilter(id); setPage(1); }} 
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {posts.length > 0 ? posts.map(post => (
            <PostCard key={post.id} post={post} tags={tags} />
          )) : (
            <div style={{ textAlign: 'center', padding: '6rem' }}>
              <p style={{ fontSize: '1.2rem', color: 'var(--gh-dark-fg-muted)' }}>Nenhum artigo encontrado para esta pesquisa.</p>
            </div>
          )}
        </div>

        <Pagination 
          total={postsData?.total} 
          perPage={postsData?.per_page} 
          currentPage={page} 
          onPageChange={setPage} 
        />
      </section>
    </section>
  )
}
