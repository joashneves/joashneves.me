import { useLanguage } from '../../i18n/context'
import styles from './about.module.css'

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className={styles.about}>
      <h2>{t('about.title')}</h2>
      <p className={styles.lead}>{t('about.lead')}</p>
      <p className={styles.text}>{t('about.text')}</p>
    </section>
  )
}