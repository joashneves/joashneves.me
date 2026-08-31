import Button from '../Button'
import styles from './ProjectCard.module.css'

export default function ProjectCard({ project, index = 0 }) {
  return (
    <div className={styles.card} style={{ animationDelay: `${index * 80}ms` }}>
      {project.image_url && (
        <div className={styles.imageContainer}>
          <img src={project.image_url} alt={project.title} className={styles.image} />
        </div>
      )}
      <div className={styles.body}>
        <h2 className={styles.title}>{project.title}</h2>
        <p className={styles.description}>{project.long_description}</p>
        <div className={styles.buttons}>
          <Button href={project.repo_link}>Repositório</Button>
          {project.alternative_link && (
            <Button href={project.alternative_link}>Acesso</Button>
          )}
        </div>
      </div>
    </div>
  )
}