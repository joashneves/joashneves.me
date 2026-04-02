import { useState } from 'react'
import { useApi } from '../../services/api'
import SearchBar from '../../components/Public/SearchBar'
import Pagination from '../../components/Public/Pagination'
import ProjectCard from '../../components/Public/ProjectCard'

export default function Projetos() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  
  const { data: projectsData } = useApi(`/projects/?q=${search}&page=${page}`)
  const projects = projectsData?.items || []

  return (
    <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 >
          {'{ Projetos }'}
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--gh-dark-fg-muted)', marginTop: '1rem' }}>
          Galeria de projetos autorais e experimentais.
        </p>
        <div style={{ width: '100%', height: '1px', background: 'var(--gh-dark-border-default)', marginTop: '2rem' }}></div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '3rem' }}>
        {projects.length > 0 ? projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        )) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '6rem' }}>
            <p style={{ color: 'var(--gh-dark-fg-muted)', fontSize: '1.2rem' }}>Nenhum projeto encontrado para esta busca.</p>
          </div>
        )}
      </div>

      <Pagination 
        total={projectsData?.total} 
        perPage={projectsData?.per_page} 
        currentPage={page} 
        onPageChange={setPage} 
      />
    </section>
  )
}
