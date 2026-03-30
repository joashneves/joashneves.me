import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { useParams } from 'react-router-dom'

export default function Post() {
  const { id } = useParams()
  
  // Conteúdo de exemplo em Markdown
  const markdownContent = `
# Post ${id}

Este é um exemplo de post em **Markdown** que será renderizado pelo \`react-markdown\`.

## O que temos aqui:
- Suporte a GFM (GitHub Flavored Markdown)
- Renderização de tabelas e listas
- Suporte a tags HTML brutas através do rehype-raw
  `

  return (
    <article style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]} 
        rehypePlugins={[rehypeRaw]}
      >
        {markdownContent}
      </ReactMarkdown>
    </article>
  )
}
