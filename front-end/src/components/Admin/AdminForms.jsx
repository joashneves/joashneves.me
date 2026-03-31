import { useState } from 'react'
import Button from '../Button'

export default function AdminForms({ activeTab, tags, mutate }) {
  const [formData, setFormData] = useState({
    title: '', content: '', description: '', url: '', 
    name: '', long_description: '', repo_link: '', alternative_link: '', tag_ids: []
  })
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)

  const handleTagChange = (tagId) => {
    setFormData(prev => {
      const currentTags = Array.isArray(prev.tag_ids) ? prev.tag_ids : []
      const isSelected = currentTags.includes(tagId)
      return {
        ...prev,
        tag_ids: isSelected 
          ? currentTags.filter(id => id !== tagId)
          : [...currentTags, tagId]
      }
    })
  }

  const onFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    let response;
    try {
      if (activeTab === 'projects') {
        const fd = new FormData()
        fd.append('title', formData.title)
        fd.append('long_description', formData.long_description)
        fd.append('repo_link', formData.repo_link)
        fd.append('alternative_link', formData.alternative_link)
        if (selectedFile) fd.append('file', selectedFile)

        response = await fetch('http://localhost:5000/api/projects/', {
          method: 'POST',
          body: fd,
          credentials: 'include' // IMPORTANTE: Envia o cookie de sessão
        })
      } else {
        response = await fetch(`http://localhost:5000/api/${activeTab}/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
          credentials: 'include' // IMPORTANTE: Envia o cookie de sessão
        })
      }

      const result = await response.json()
      if (response.ok) {
        alert('Salvo com sucesso!')
        resetForm()
        mutate()
      } else {
        alert('Erro: ' + (result.error || 'Falha ao salvar'))
      }
    } catch (err) {
      alert('Erro ao conectar com a API')
    }
  }

  const resetForm = () => {
    setFormData({ 
      title: '', content: '', description: '', url: '', 
      name: '', long_description: '', repo_link: '', alternative_link: '', tag_ids: [] 
    })
    setSelectedFile(null)
    setPreview(null)
  }

  const renderTagSelector = () => (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem' }}>Tags:</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {tags?.map(tag => {
          const isSelected = Array.isArray(formData.tag_ids) && formData.tag_ids.includes(tag.id)
          return (
            <label key={tag.id} style={{ 
              padding: '0.3rem 0.6rem', 
              borderRadius: '20px', 
              border: `1px solid ${isSelected ? 'var(--efects-purple)' : 'var(--gh-dark-border-default)'}`,
              background: isSelected ? 'var(--efects-purple)' : 'transparent',
              cursor: 'pointer',
              fontSize: '0.8rem'
            }}>
              <input type="checkbox" checked={isSelected} onChange={() => handleTagChange(tag.id)} style={{ display: 'none' }} />
              # {tag.name}
            </label>
          )
        })}
      </div>
    </div>
  )

  if (activeTab === 'posts') {
    return (
      <form onSubmit={handleSubmit}>
        <h3>Novo Post</h3>
        <input placeholder="Título" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={inputStyle} required />
        <textarea placeholder="Descrição" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={textareaStyle} />
        {renderTagSelector()}
        <textarea placeholder="Conteúdo (Markdown)" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} style={textareaStyle} />
        <Button type="submit">Publicar</Button>
      </form>
    )
  }
  if (activeTab === 'links') {
    return (
      <form onSubmit={handleSubmit}>
        <h3>Novo Link</h3>
        <input placeholder="Título" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={inputStyle} required />
        <input placeholder="URL" value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} style={inputStyle} required />
        {renderTagSelector()}
        <textarea placeholder="Descrição" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={textareaStyle} />
        <Button type="submit">Salvar Link</Button>
      </form>
    )
  }
  if (activeTab === 'tags') {
    return (
      <form onSubmit={handleSubmit}>
        <h3>Nova Tag</h3>
        <input placeholder="Nome da Tag" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={inputStyle} required />
        <Button type="submit">Criar Tag</Button>
      </form>
    )
  }
  if (activeTab === 'projects') {
    return (
      <form onSubmit={handleSubmit}>
        <h3>Novo Projeto</h3>
        <input placeholder="Título" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={inputStyle} required />
        <input placeholder="Repositório (GitHub/GitLab...)" value={formData.repo_link} onChange={e => setFormData({...formData, repo_link: e.target.value})} style={inputStyle} required />
        <input placeholder="Link Alternativo (Demo/Site...)" value={formData.alternative_link} onChange={e => setFormData({...formData, alternative_link: e.target.value})} style={inputStyle} />
        <textarea placeholder="Descrição Longa" value={formData.long_description} onChange={e => setFormData({...formData, long_description: e.target.value})} style={textareaStyle} />
        
        <div style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px dashed var(--gh-dark-border-default)', borderRadius: '8px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Imagem do Projeto:</label>
          <input type="file" onChange={onFileSelect} accept="image/*" style={{ marginBottom: '1rem' }} />
          {preview && (
            <div>
              <p style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>Pré-visualização:</p>
              <img src={preview} alt="Preview" style={{ width: '100%', maxHeight: '150px', objectFit: 'cover', borderRadius: '8px' }} />
            </div>
          )}
        </div>
        
        <Button type="submit">Salvar Projeto</Button>
      </form>
    )
  }
  return null
}

const inputStyle = { width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '4px', border: '1px solid var(--gh-dark-border-default)', background: 'var(--gh-dark-bg-default)', color: 'white' }
const textareaStyle = { ...inputStyle, minHeight: '100px' }
