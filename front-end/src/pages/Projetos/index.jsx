import { useState } from 'react'
import { useApi } from '../../services/api'
import SearchBar from '../../components/Public/SearchBar'
import Pagination from '../../components/Public/Pagination'
import ProjectCard from '../../components/Public/ProjectCard'
import EstiloDigital from '../../components/DigitalStyle'
import styles from './Projetos.module.css'

export default function Projetos() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  
  const { data: projectsData } = useApi(`/projects/?q=${search}&page=${page}`)
  const projects = projectsData?.items || []

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <EstiloDigital>
          Projetos finalizados
        </EstiloDigital>
        <p className={styles.description}>
          Galeria de projetos autorais e experimentais que ja estão disponiveis para publicos, ou que eu participei ativamente.
        </p>
        <div className={styles.divider}></div>
      </header>

      <div className={styles.grid}>
        {projects.length > 0 ? projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        )) : (
          <div className={styles.empty}>
            <p className={styles.emptyText}>Nenhum projeto encontrado para esta busca.</p>
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
