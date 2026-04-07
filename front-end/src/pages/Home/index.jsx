import React, { useMemo } from 'react'
import ProjectCard from '../../components/Public/ProjectCard'
import PostCard from '../../components/Public/PostCard'
import LinkCard from '../../components/Public/LinkCard'
import { useApi } from '../../services/api'
import EstiloDigital from '../../components/DigitalStyle'
import { getWelcomeMessage } from '../../utils/welcomeMessages'

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

  // Usa a função de utilitário importada
  const welcomeMessage = useMemo(() => getWelcomeMessage(), []);

  return (
    <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <header style={{ textAlign: 'center', marginBottom: '5rem', width: '100%', maxWidth: '1200px', padding: '0 1rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
          <EstiloDigital>{welcomeMessage}</EstiloDigital>
        </h1>
        <p style={{ fontSize: '1.3rem', color: 'var(--gh-dark-fg-muted)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
          Olá, seja bem-vindo ao meu site! Aqui você encontrará projetos criados por mim e ideias que eu quis deixar em um lugar um pouco mais organizado. 
          Sinta-se livre para explorar e não deixe de dar seu feedback me seguindo nas redes sociais.
        </p>
        <div style={{ width: '100%', height: '1px', background: 'var(--gh-dark-border-default)', marginTop: '2.5rem' }}></div>
      </header>

      {allLoading && <p style={{ color: 'var(--gh-dark-fg-muted)', fontSize: '1.2rem' }}>Carregando novidades...</p>}
      {hasErrors && <p style={{ color: '#f85149', fontSize: '1.2rem' }}>Erro ao carregar novidades.</p>}

      {!allLoading && !hasErrors && (
        <div style={{ display: 'flex', gap: '4rem', marginBottom: '6rem', alignItems: 'flex-start', width: '100%', maxWidth: '1200px', padding: '0 1rem' }}>
          {/* Coluna da Esquerda: Últimos Links e Último Artigo */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {/* Últimos Links */}
            <div>
              <h2 style={{ color: 'var(--title-green-color)', marginBottom: '2rem', fontSize: '1.8rem' }}>
                Links recentes:
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {links.length > 0 ? links.map(link => (
                  <LinkCard key={link.id} link={link} tags={tagsData} />
                )) : (
                  <p style={{ color: 'var(--gh-dark-fg-muted)' }}>Nada ainda...</p>
                )}
              </div>
            </div>

            {/* Último Artigo */}
            {latestPost && (
              <div>
                <h2 style={{ color: 'var(--title-green-color)', marginBottom: '2rem', fontSize: '1.8rem' }}>
                  Último post:
                </h2>
                <PostCard post={latestPost} tags={tagsData} />
              </div>
            )}
          </div>

          {/* Coluna da Direita: Últimos Projetos */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--title-green-color)', marginBottom: '2rem', textAlign: 'center' }}>
              Últimos projetos:
            </h2>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
              width: '100%'
            }}>
              {projects.length > 0 ? projects.map(project => (
                <ProjectCard key={project.id} project={project} />
              )) : (
                <p style={{ textAlign: 'center', color: 'var(--gh-dark-fg-muted)', fontSize: '1.1rem' }}>Nada ainda...</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
