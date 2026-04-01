import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { useParams } from 'react-router-dom'
import { useApi } from '../../services/api'

export default function PostContent() {
  const { slug } = useParams()
  const { data: post, isError: error, isLoading } = useApi(`/posts/${slug}`)

  if (isLoading) return <div style={{ color: 'white', textAlign: 'center', padding: '5rem' }}>Carregando post...</div>
  if (error || !post || post.error) return <div style={{ color: 'white', textAlign: 'center', padding: '5rem' }}>Post não encontrado.</div>

  return (
    <article style={{ padding: '2rem', maxWidth: '800px', margin: '4rem auto', background: 'var(--gh-dark-bg-default)', borderRadius: '12px', border: '1px solid var(--gh-dark-border-default)' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--title-green-color)', marginBottom: '1rem' }}>{post.title}</h1>
        <div style={{ display: 'flex', gap: '1rem', color: 'var(--gh-dark-fg-muted)' }}>
          <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
        </div>
      </header>
      
      <div className="markdown-body" style={{ color: 'var(--gh-dark-fg-default)', lineHeight: '1.8' }}>
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
