import { useLanguage } from '../../i18n/context'
import styles from './projects.module.css'

const projects = Object.values(
  import.meta.glob('../../_data/projects/*.js', { eager: true }),
).map((mod) => mod.default)

export default function Projects() {
  const { t, lang } = useLanguage()

  return (
    <section id="projects" className={styles.projects}>
      <h2>{t('projects.title')}</h2>
      <p>{t('projects.text')}</p>
      <div className={styles.grid}>
        {projects.map((project) => (
          <article className={styles.card} key={project.title}>
            {project.image && (
              <img className={styles.image} src={project.image} alt={project.title} />
            )}
            <h3>{project.title}</h3>
            <p>{project[`description_${lang}`] ?? project.description ?? t('proj.empty')}</p>
            {(project.github || project.url) && (
              <div className={styles.buttons}>
                {project.github && (
                  <a
                    className={styles.button}
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t('proj.repo')}
                  </a>
                )}
                {project.url && (
                  <a className={styles.button} href={project.url} target="_blank" rel="noreferrer">
                    {t('proj.live')}
                  </a>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}