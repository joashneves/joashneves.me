import { useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import { useParams } from 'react-router-dom'
import { useApi, postData } from '../../services/api'
import EstiloDigital from '../../components/DigitalStyle'
import ReadingProgress from '../../components/Public/ReadingProgress'
import CodeBlock from '../../components/Public/CodeBlock'
import Reactions from '../../components/Public/Reactions'
import styles from './PostContent.module.css'

export default function PostContent() {
  const { slug } = useParams()
  const { data: post, isError: error, isLoading } = useApi(`/posts/${slug}`)
  const countedRef = useRef(false)

  useEffect(() => {
    if (!post || countedRef.current) return
    countedRef.current = true
    const key = `viewed:${post.slug}`
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, '1')
      postData(`/posts/${slug}/view`).catch(() => {})
    }
  }, [post, slug])

  if (isLoading) return <div className={styles.loading}>Carregando post...</div>
  if (error || !post || post.error) return <div className={styles.error}>Post não encontrado.</div>

  return (
    <article className={styles.article}>
      <ReadingProgress />
      <header>
        <EstiloDigital className={styles.title}>{post.title}</EstiloDigital>
        <div className={styles.meta}>
          <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
          <span className={styles.views}>👀 {post.views || 0} views</span>
        </div>
      </header>

      <div className={`${styles.content} markdown-body`}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
          components={{
            pre: CodeBlock,
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      <Reactions slug={post.slug} initial={post.reactions} />
    </article>
  )
}