import useSWR from 'swr'
import { fetcher, API_BASE_URL } from '../../services/api'
import Icon from '../icon'
import styles from './TwitchBanner.module.css'

export default function TwitchBanner() {
  const { data } = useSWR(`${API_BASE_URL}/twitch`, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false,
  })

  if (!data || !data.live) return null

  const url = 'https://www.twitch.tv/joashneves'

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.banner}
    >
      <span className={styles.liveDot}></span>
      <Icon name="twitch" width="18" height="18" />
      <span className={styles.title}>
        {data.title || 'Ao vivo agora'} · {data.viewer_count} assistindo
      </span>
      <span className={styles.cta}>assistir →</span>
    </a>
  )
}