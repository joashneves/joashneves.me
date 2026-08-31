import { useState } from 'react'
import { useApi } from '../../services/api'
import SearchBar from '../../components/Public/SearchBar'
import Pagination from '../../components/Public/Pagination'
import ProjectCard from '../../components/Public/ProjectCard'
import EstiloDigital from '../../components/DigitalStyle'
import { formatDate } from '../../utils/date'
import styles from './Projetos.module.css'

export default function Projetos() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [view, setView] = useState('grid')

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

      <div className={styles.toolbar}>
        <SearchBar
          value={search}
          onChange={(val) => { setSearch(val); setPage(1); }}
          placeholder="Pesquisar projetos..."
        />
        <div className={styles.viewToggle} role="group" aria-label="Alternar visualização">
          <button
            type="button"
            className={`${styles.viewButton} ${view === 'grid' ? styles.viewActive : ''}`}
            onClick={() => setView('grid')}
          >
            Grid
          </button>
          <button
            type="button"
            className={`${styles.viewButton} ${view === 'timeline' ? styles.viewActive : ''}`}
            onClick={() => setView('timeline')}
          >
            Linha do tempo
          </button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className={styles.grid}>
          {projects.length > 0 ? projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          )) : (
            <div className={styles.empty}>
              <p className={styles.emptyText}>Nenhum projeto encontrado para esta busca.</p>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.timeline}>
          {projects.length > 0 ? projects.map(project => (
            <div key={project.id} className={styles.timelineItem}>
              <span className={styles.timelineDot}></span>
              <div className={styles.timelineDate}>
                {formatDate(project.date)}
              </div>
              <div className={styles.timelineCard}>
                <h3 className={styles.timelineTitle}>{project.title}</h3>
                <p className={styles.timelineDesc}>{project.long_description}</p>
                <div className={styles.timelineLinks}>
                  <a href={project.repo_link} target="_blank" rel="noopener noreferrer">Código fonte</a>
                  {project.alternative_link && (
                    <a href={project.alternative_link} target="_blank" rel="noopener noreferrer">Link alternativo</a>
                  )}
                </div>
              </div>
            </div>
          )) : (
            <div className={styles.empty}>
              <p className={styles.emptyText}>Nenhum projeto encontrado para esta busca.</p>
            </div>
          )}
        </div>
      )}

      <Pagination
        total={projectsData?.total}
        perPage={projectsData?.per_page}
        currentPage={page}
        onPageChange={setPage}
      />
    </section>
  )
}