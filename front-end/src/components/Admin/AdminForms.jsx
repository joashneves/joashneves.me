import { useState, useEffect } from 'react'
import Button from '../Button'
import { postData, putData, postFormData } from '../../services/api'

export default function AdminForms({ activeTab, tags, links, mutate, editingItem, onCancelEdit }) {
  const [formData, setFormData] = useState({
    title: '', content: '', description: '', url: '', 
    name: '', long_description: '', repo_link: '', alternative_link: '', 
    tag_ids: [], link_ids: []
  })
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    if (editingItem) {
      setFormData({
        title: editingItem.title || '',
        content: editingItem.content || '',
        description: editingItem.description || '',
        url: editingItem.url || '',
        name: editingItem.name || '',
        long_description: editingItem.long_description || '',
        repo_link: editingItem.repo_link || '',
        alternative_link: editingItem.alternative_link || '',
        tag_ids: editingItem.tag_ids || [],
        link_ids: editingItem.link_ids || []
      })
      if (editingItem.image_url) {
        setPreview(editingItem.image_url)
      } else {
        setPreview(null)
      }
    } else {
      resetForm()
    }
  }, [editingItem, activeTab])

  const handleSelectionChange = (id, field) => {
    setFormData(prev => {
      const currentItems = Array.isArray(prev[field]) ? prev[field] : []
      const isSelected = currentItems.includes(id)
      return {
        ...prev,
        [field]: isSelected 
          ? currentItems.filter(item => item !== id)
          : [...currentItems, id]
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
    
    let result;
    const isEditing = !!editingItem;
    const endpoint = isEditing ? `/${activeTab}/${editingItem.id}` : `/${activeTab}/`;

    try {
      if (activeTab === 'projects') {
        const fd = new FormData()
        fd.append('title', formData.title)
        fd.append('long_description', formData.long_description)
        fd.append('repo_link', formData.repo_link)
        fd.append('alternative_link', formData.alternative_link)
        
        // Handling link_ids for Projects
        formData.link_ids.forEach(id => fd.append('link_ids', id))

        if (selectedFile) fd.append('file', selectedFile)

        result = await postFormData(endpoint, fd, isEditing ? 'PUT' : 'POST')
      } else {
        if (isEditing) {
          result = await putData(endpoint, formData)
        } else {
          result = await postData(endpoint, formData)
        }
      }

      if (result.error) {
        alert('Erro: ' + result.error)
      } else {
        alert(isEditing ? 'Atualizado com sucesso!' : 'Salvo com sucesso!')
        if (isEditing) onCancelEdit()
        resetForm()
        mutate()
      }
    } catch (err) {
      console.error(err)
      alert('Erro ao conectar com a API')
    }
  }

  const resetForm = () => {
    setFormData({ 
      title: '', content: '', description: '', url: '', 
      name: '', long_description: '', repo_link: '', alternative_link: '', 
      tag_ids: [], link_ids: [] 
    })
    setSelectedFile(null)
    setPreview(null)
  }

  const renderTagSelector = () => (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem' }}>Tags:</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {tags?.items?.map(tag => {
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
              <input type="checkbox" checked={isSelected} onChange={() => handleSelectionChange(tag.id, 'tag_ids')} style={{ display: 'none' }} />
              # {tag.name}
            </label>
          )
        })}
      </div>
    </div>
  )

  const renderLinkSelector = () => (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem' }}>Links relacionados:</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {links?.map(link => {
          const isSelected = Array.isArray(formData.link_ids) && formData.link_ids.includes(link.id)
          return (
            <label key={link.id} style={{ 
              padding: '0.3rem 0.6rem', 
              borderRadius: '20px', 
              border: `1px solid ${isSelected ? 'var(--efects-purple)' : 'var(--gh-dark-border-default)'}`,
              background: isSelected ? 'var(--efects-purple)' : 'transparent',
              cursor: 'pointer',
              fontSize: '0.8rem'
            }}>
              <input type="checkbox" checked={isSelected} onChange={() => handleSelectionChange(link.id, 'link_ids')} style={{ display: 'none' }} />
              {link.title}
            </label>
          )
        })}
      </div>
    </div>
  )

  const commonButtons = (
    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
      <Button type="submit">{editingItem ? 'Atualizar' : 'Publicar'}</Button>
      {editingItem && (
        <button 
          type="button" 
          onClick={onCancelEdit}
          style={{ 
            background: 'transparent', 
            color: 'var(--gh-dark-fg-muted)', 
            border: '1px solid var(--gh-dark-border-default)', 
            padding: '0.6rem 1.2rem', 
            borderRadius: '6px', 
            cursor: 'pointer' 
          }}
        >
          Cancelar
        </button>
      )}
    </div>
  )

  if (activeTab === 'posts') {
    return (
      <form onSubmit={handleSubmit}>
        <input placeholder="Título" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={inputStyle} required />
        <textarea placeholder="Descrição" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={textareaStyle} />
        {renderTagSelector()}
        <textarea placeholder="Conteúdo (Markdown)" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} style={textareaStyle} />
        {commonButtons}
      </form>
    )
  }
  if (activeTab === 'links') {
    return (
      <form onSubmit={handleSubmit}>
        <input placeholder="Título" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={inputStyle} required />
        <input placeholder="URL" value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} style={inputStyle} required />
        {renderTagSelector()}
        <textarea placeholder="Descrição" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={textareaStyle} />
        {commonButtons}
      </form>
    )
  }
  if (activeTab === 'tags') {
    return (
      <form onSubmit={handleSubmit}>
        <input placeholder="Nome da Tag" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={inputStyle} required />
        {commonButtons}
      </form>
    )
  }
  if (activeTab === 'projects') {
    return (
      <form onSubmit={handleSubmit}>
        <input placeholder="Título" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={inputStyle} required />
        <input placeholder="Repositório (GitHub/GitLab...)" value={formData.repo_link} onChange={e => setFormData({...formData, repo_link: e.target.value})} style={inputStyle} required />
        <input placeholder="Link Alternativo (Demo/Site...)" value={formData.alternative_link} onChange={e => setFormData({...formData, alternative_link: e.target.value})} style={inputStyle} />
        <textarea placeholder="Descrição Longa" value={formData.long_description} onChange={e => setFormData({...formData, long_description: e.target.value})} style={textareaStyle} />
        
        {renderLinkSelector()}

        <div style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px dashed var(--gh-dark-border-default)', borderRadius: '8px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Imagem do Projeto:</label>
          <input type="file" onChange={onFileSelect} accept="image/*" style={{ marginBottom: '1rem' }} />
          {preview && (
            <div>
              <p style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>{selectedFile ? 'Pré-visualização:' : 'Imagem Atual:'}</p>
              <img src={preview} alt="Preview" style={{ width: '100%', maxHeight: '150px', objectFit: 'cover', borderRadius: '8px' }} />
            </div>
          )}
        </div>
        
        {commonButtons}
      </form>
    )
  }
  return null
}

const inputStyle = { width: '100%', padding: '0.5rem', marginBottom: '1rem', borderRadius: '4px', border: '1px solid var(--gh-dark-border-default)', background: 'var(--gh-dark-bg-default)', color: 'white' }
const textareaStyle = { ...inputStyle, minHeight: '100px' }
