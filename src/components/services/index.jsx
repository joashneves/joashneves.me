import { useLanguage } from '../../i18n/context'
import Icon from '../icon/index.jsx'
import styles from './services.module.css'

const STACKS = [
  { name: 'react', label: 'React' },
  { name: 'javascript', label: 'JavaScript' },
  { name: 'html', label: 'HTML' },
  { name: 'css', label: 'CSS' },
  { name: 'nodejs', label: 'Node.js' },
  { name: 'python', label: 'Python' },
  { name: 'cshap', label: 'C#' },
  { name: 'git', label: 'Git' },
  { name: 'github', label: 'GitHub' },
  { name: 'vscode', label: 'VS Code' },
  { name: 'obsidian', label: 'Obsidian' },
  { name: 'linux', label: 'Linux' },
  { name: 'godot', label: 'Godot' },
  { name: 'unity', label: 'Unity' },
  { name: 'cicd', label: 'CI/CD' },
  { name: 'test', label: 'Testes' },
]

export default function Services() {
  const { t } = useLanguage()

  return (
    <section id="services" className={styles.services}>
      <h2>{t('services.title')}</h2>
      <h3 className={styles.subtitle}>{t('services.skills')}</h3>
      <div className={styles.stackGrid}>
        {STACKS.map((stack) => (
          <div className={styles.stackCard} key={stack.name}>
            <Icon name={stack.name} size={34} title={stack.label} />
            <span>{stack.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}