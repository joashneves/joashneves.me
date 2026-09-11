import styles from './contact.module.css'
import { useLanguage } from '../../i18n/context'

export default function Contact() {
  const { t } = useLanguage()

  return (
    <section id="contact" className={styles.contact}>
      <h2>{t('contact.title')}</h2>
      <p>{t('contact.text')}</p>
      <a className={styles.contact_email} href={`mailto:${t('contact.email')}`}>
        {t('contact.email')}
      </a>
    </section>
  )
}