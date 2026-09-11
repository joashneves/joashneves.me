import { useLanguage } from '../../i18n/context'
import { useGithub } from '../../github/context.js'
import Icon from '../icon/index.jsx'
import styles from './home.module.css'

const SOCIALS = [
  { name: 'github', url: 'https://github.com/joashneves' },
  { name: 'linkedin', url: 'https://www.linkedin.com/in/joashneves' },
  { name: 'instagram', url: 'https://instagram.com/joashneves' },
  { name: 'bsky', url: 'https://bsky.app/profile/joashneves.me' },
  { name: 'itchio', url: 'https://joashneves.itch.io' },
  { name: 'youtube', url: 'https://youtube.com/@joashneves' },
]

export default function HomeSection() {
  const { t } = useLanguage()
  const { data } = useGithub()

  return (
    <section id="home" className={styles.home}>
      <div className={styles.content}>
        <span className={styles.badge}>{t('hero.greeting')}</span>
        <h1>Joashneves</h1>
        <p className={styles.role}>{t('hero.role')}</p>
        <p className={styles.summary}>{t('hero.summary')}</p>

        <div className={styles.divider} aria-hidden="true" />

        <p className={styles.follow}>{t('social.follow')}</p>
        <div className={styles.social}>
          {SOCIALS.map((social) => (
            <a
              key={social.name}
              className={styles.socialLink}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              aria-label={social.name}
            >
              <Icon name={social.name} size={24} />
            </a>
          ))}
        </div>

        <a className={styles.cta} href="#projects">
          {t('hero.cta')}
        </a>
      </div>

      <div className={styles.portraitWrap}>
        <img
          className={styles.portrait}
          src="https://github.com/joashneves.png"
          alt="Foto de perfil no GitHub"
        />
        {data?.user && (
          <a
            className={styles.githubCard}
            href={data.user.html_url}
            target="_blank"
            rel="noreferrer"
          >
            <span className={styles.githubStat}>
              {data.user.followers}{' '}
              {data.user.followers === 1 ? t('hero.followersOne') : t('hero.followers')}
            </span>
            <span className={styles.githubStat}>
              {data.user.public_repos}{' '}
              {data.user.public_repos === 1 ? t('hero.reposOne') : t('hero.repos')}
            </span>
          </a>
        )}
      </div>
    </section>
  )
}