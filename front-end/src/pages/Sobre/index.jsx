import EstiloDigital from '../../components/DigitalStyle'
import Icon from '../../components/icon'
import styles from './Sobre.module.css'

// TODO: substitua os placeholders abaixo pelos seus dados reais.

const aboutText = `Olá! Eu sou o Joash Neves — aqui você pode falar um pouco sobre você: sua área, o que faz, onde estuda/trabalha e o que te motiva. Escreva em 2 ou 3 parágrafos curtos para não cansar quem visita.`

const skills = [
  { name: 'Python', icon: 'python' },
  { name: 'JavaScript', icon: 'javascript' },
  { name: 'TypeScript', icon: 'javascript' },
  { name: 'React', icon: 'react' },
  { name: 'Node.js', icon: 'nodejs' },
  { name: 'C#', icon: 'cshap' },
  { name: 'C', icon: 'clang' },
  { name: 'C++', icon: 'cplusplus' },
  { name: 'HTML', icon: 'html' },
  { name: 'CSS', icon: 'css' },
  { name: 'Lua', icon: 'lua' },
  { name: 'Git', icon: 'git' },
  { name: 'GameMaker', icon: 'gml' },
  { name: 'Obsidian', icon: 'obsidian' },
  { name: 'VS Code', icon: 'vscode' },
]

const timeline = [
  { year: '2025', title: 'Título do evento (estudo / trabalho)', description: 'Descreva aqui o que aconteceu, o que aprendeu ou o que construiu.' },
  { year: '2024', title: 'Título do evento', description: 'Descreva aqui o que aconteceu, o que aprendeu ou o que construiu.' },
  { year: '2023', title: 'Título do evento', description: 'Descreva aqui o que aconteceu, o que aprendeu ou o que construiu.' },
]

const networks = [
  { name: 'bsky', href: 'https://bsky.app/profile/joashneves.me', label: 'Bluesky' },
  { name: 'github', href: 'https://github.com/joashneves', label: 'GitHub' },
  { name: 'linkedin', href: 'https://www.linkedin.com/in/joasneves/', label: 'LinkedIn' },
  { name: 'instagram', href: 'https://www.instagram.com/joashneves/', label: 'Instagram' },
  { name: 'youtube', href: 'https://www.youtube.com/@joashneves', label: 'YouTube' },
  { name: 'twitch', href: 'https://www.twitch.tv/joashneves', label: 'Twitch' },
  { name: 'discord', href: 'https://discord.com/invite/S2ua5wmUwE', label: 'Discord' },
  { name: 'coffee', href: 'https://www.buymeacoffee.com/joashneves', label: 'Apoiar' },
]

export default function Sobre() {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <EstiloDigital className={styles.title}>sobre mim</EstiloDigital>
        <div className={styles.divider}></div>
      </header>

      <div className={styles.body}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Quem sou eu?</h2>
          <p className={styles.paragraph}>{aboutText}</p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Ferramentas que uso</h2>
          <div className={styles.skillsGrid}>
            {skills.map((skill) => (
              <div key={skill.name} className={styles.skillItem}>
                <Icon name={skill.icon} width="28" height="28" />
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Trajetória</h2>
          <div className={styles.timeline}>
            {timeline.map((item) => (
              <div key={item.year} className={styles.timelineItem}>
                <span className={styles.timelineYear}>{item.year}</span>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timelineTitle}>{item.title}</h3>
                  <p className={styles.timelineDesc}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Onde me encontrar</h2>
          <div className={styles.networks}>
            {networks.map((net) => (
              <a
                key={net.name}
                className={styles.networkLink}
                href={net.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name={net.name} width="24" height="24" />
                <span>{net.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}