import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { useParams } from 'react-router-dom'
import { useApi } from '../../services/api'
import EstiloDigital from '../../components/DigitalStyle'
import styles from './PostContent.module.css'

export default function PostContent() {
  const { slug } = useParams()
  const { data: post, isError: error, isLoading } = useApi(`/posts/${slug}`)

  if (isLoading) return <div className={styles.loading}>Carregando post...</div>
  if (error || !post || post.error) return <div className={styles.error}>Post não encontrado.</div>

  return (
    <article className={styles.article}>
      <header>
        <EstiloDigital className={styles.title}>{post.title}</EstiloDigital>
        <div className={styles.meta}>
          <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
        </div>
      </header>
      
      <div className={`${styles.content} markdown-body`}>
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]} 
          rehypePlugins={[rehypeRaw]}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  )
}
