import React, { useMemo } from 'react'
import ProjectCard from '../../components/Public/ProjectCard'
import PostCard from '../../components/Public/PostCard'
import LinkCard from '../../components/Public/LinkCard'
import { useApi } from '../../services/api'
import EstiloDigital from '../../components/DigitalStyle'
import { getWelcomeMessage } from '../../utils/welcomeMessages'
import styles from './Home.module.css'

export default function Home() {
  const { data: linksData, error: linksError, isLoading: linksLoading } = useApi('/links/?&per_page=5')
  const { data: tagsData } = useApi('/tags/')
  const { data: projectsData, error: projectsError, isLoading: projectsLoading } = useApi('/projects/?&per_page=3')
  const { data: latestPostData, error: postError, isLoading: postLoading } = useApi('/posts/?&per_page=1')

  const links = linksData?.items || []
  const projects = projectsData?.items || []
  const latestPost = latestPostData?.items?.[0]

  const allLoading = linksLoading || projectsLoading || postLoading;
  const hasErrors = linksError || projectsError || postError;

  const welcomeMessage = useMemo(() => getWelcomeMessage(), []);

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <EstiloDigital className={styles.welcomeTitle}>{welcomeMessage}</EstiloDigital>
        <p className={styles.description}>
          Olá, seja bem-vindo ao meu site! Aqui você encontrará projetos criados por mim e ideias que eu quis deixar em um lugar um pouco mais organizado. 
          Sinta-se livre para explorar e não deixe de dar seu feedback me seguindo nas redes sociais.
        </p>
        <div className={styles.divider}></div>
      </header>

      {allLoading && <p className={styles.statusMessage}>Carregando novidades...</p>}
      {hasErrors && <p className={styles.errorMessage}>Erro ao carregar novidades.</p>}

      {!allLoading && !hasErrors && (
        <div className={styles.contentGrid}>
          {/* Coluna da Esquerda: Últimos Links e Último Artigo */}
          <div className={styles.leftColumn}>
            {/* Últimos Links */}
            <div>
              <h2 className={styles.sectionTitle}>
                Links recentes:
              </h2>
              <div className={styles.linksContainer}>
                {links.length > 0 ? links.map(link => (
                  <LinkCard key={link.id} link={link} tags={tagsData} />
                )) : (
                  <p className={styles.statusMessage}>Nada ainda...</p>
                )}
              </div>
            </div>

            {/* Último Artigo */}
            {latestPost && (
              <div>
                <h2 className={styles.sectionTitle}>
                  Último post:
                </h2>
                <PostCard post={latestPost} tags={tagsData} />
              </div>
            )}
          </div>

          {/* Coluna da Direita: Últimos Projetos */}
          <div className={styles.rightColumn}>
            <h2 className={styles.sectionTitle} style={{ textAlign: 'center' }}>
              Últimos projetos:
            </h2>
            <div className={styles.projectsContainer}>
              {projects.length > 0 ? projects.map(project => (
                <ProjectCard key={project.id} project={project} />
              )) : (
                <p className={styles.statusMessage}>Nada ainda...</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
