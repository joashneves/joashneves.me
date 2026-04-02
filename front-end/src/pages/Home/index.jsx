import React from 'react'
import Button from '../../components/Button'
import ProjectCard from '../../components/Public/ProjectCard'
import PostCard from '../../components/Public/PostCard'
import { useApi } from '../../services/api'

export default function Home() {

  const { data: linksData, error: linksError, isLoading: linksLoading } = useApi('/links/?&per_page=5')
  const { data: projectsData, error: projectsError, isLoading: projectsLoading } = useApi('/projects/?&per_page=3')
  const { data: latestPostData, error: postError, isLoading: postLoading } = useApi('/posts/?&per_page=2')

  const links = linksData?.items || []
  const projects = projectsData?.items || []
  const latestPost = latestPostData?.items?.[0]

  const allLoading = linksLoading || projectsLoading || postLoading;
  const hasErrors = linksError || projectsError || postError;

  return (
    <section style={{ padding: '4rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <h1 >
          Confira as últimas novidades
        </h1>
        <p style={{ fontSize: '1.3rem', color: 'var(--gh-dark-fg-muted)', maxWidth: '700px', margin: '0 auto' }}>
          Fique por dentro dos meus últimos projetos, artigos e links interessantes.
        </p>
        <div style={{ width: '100%', height: '1px', background: 'var(--gh-dark-border-default)', marginTop: '2rem' }}></div>

      </header>

      {allLoading && <p style={{ color: 'var(--gh-dark-fg-muted)', fontSize: '1.2rem' }}>Carregando novidades...</p>}
      {hasErrors && <p style={{ color: '#f85149', fontSize: '1.2rem' }}>Erro ao carregar novidades.</p>}

      {!allLoading && !hasErrors && (
        <div style={{ display: 'flex', gap: '4rem', marginBottom: '6rem', alignItems: 'flex-start', width: '100%', maxWidth: '1200px' }}>
          {/* Coluna da Esquerda: Últimos Links e Último Artigo */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4rem' }}>

            {/* Últimos Links */}
            <div>
              <h2 style={{ fontSize: '2rem', color: 'var(--title-green-color)', marginBottom: '2rem' }}>
                Confira estes últimos links
              </h2>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {links.length > 0 ? links.map(link => (
                  <li key={link.id} style={{ fontSize: '1.1rem', color: 'var(--gh-dark-fg-default)', lineHeight: '1.7', borderBottom: '1px solid var(--gh-dark-border-default)', paddingBottom: '1rem' }}>
                    {/* Usando <a> para links externos */}
                    <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--title-green-color)', textDecoration: 'none', fontWeight: 'bold' }}>
                      {link.title}
                    </a>
                    <p style={{ fontSize: '0.9rem', color: 'var(--gh-dark-fg-muted)', marginTop: '0.5rem', marginBottom: 0 }}>{link.description}</p>
                  </li>
                )) : (
                  <p style={{ color: 'var(--gh-dark-fg-muted)' }}>Nenhum link recente encontrado.</p>
                )}
              </ul>
            </div>

            {/* Último Artigo */}
            {latestPost && (
              <div style={{ marginTop: '4rem' }}>
                <h2 style={{ fontSize: '2rem', color: 'var(--title-green-color)', marginBottom: '2rem' }}>
                  Confira o último artigo
                </h2>
                <PostCard post={latestPost} />
              </div>
            )}
          </div>

          {/* Coluna da Direita: Últimos Projetos (Grid/Simulação de Carrossel) */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--title-green-color)', marginBottom: '2rem' }}>
              Confira estes últimos projetos
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '3rem',
              width: '100%'
            }}>
              {projects.length > 0 ? projects.map(project => (
                <ProjectCard key={project.id} project={project} />
              )) : (
                <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--gh-dark-fg-muted)', fontSize: '1.1rem' }}>Nenhum projeto recente encontrado.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
