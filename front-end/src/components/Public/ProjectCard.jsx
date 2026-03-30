import Button from '../Button'

export default function ProjectCard({ project }) {
  return (
    <div style={projectCardStyle}>
      {project.image_url && (
        <div style={imageContainerStyle}>
          <img src={project.image_url} alt={project.title} style={imageStyle} />
        </div>
      )}
      <div style={{ padding: '1.5rem 2.5rem 2.5rem' }}>
        <h2 style={{ color: 'var(--title-green-color)', fontSize: '1.6rem', marginBottom: '1.2rem' }}>
          {project.title}
        </h2>
        <p style={{ fontSize: '1rem', marginBottom: '2rem', lineHeight: '1.7', color: 'var(--gh-dark-fg-default)' }}>
          {project.long_description}
        </p>
        <div style={{ marginTop: 'auto', display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
          <a href={project.repo_link} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
            <Button>Repositório</Button>
          </a>
          {project.alternative_link && (
            <a href={project.alternative_link} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
              <Button>Ver Demo / Site</Button>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

const projectCardStyle = {
  borderRadius: '20px',
  border: '1px solid var(--gh-dark-border-default)',
  background: 'var(--gh-dark-bg-default)',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  height: '100%',
  overflow: 'hidden'
}

const imageContainerStyle = {
  width: '100%',
  height: '200px',
  overflow: 'hidden',
  borderBottom: '1px solid var(--gh-dark-border-default)'
}

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover'
}
