import { useState } from 'react'
import Button from '../../components/Button'
import { useApi } from '../../services/api'
import { Link } from 'react-router-dom'


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

      
    </section>
  )
}
