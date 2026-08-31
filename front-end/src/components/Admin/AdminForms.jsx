import { useState, useEffect } from 'react'
import Button from '../Button'
import { postData, putData, postFormData } from '../../services/api'
import styles from './AdminPanel.module.css'

export default function AdminForms({ activeTab, tags, links, mutate, editingItem, onCancelEdit }) {
  const [formData, setFormData] = useState({
    title: '', content: '', description: '', url: '',
    name: '', long_description: '', repo_link: '', alternative_link: '',
    tag_ids: [], link_ids: [], date: ''
  })
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)

  const resetForm = () => {
    setFormData({
      title: '', content: '', description: '', url: '',
      name: '', long_description: '', repo_link: '', alternative_link: '',
      tag_ids: [], link_ids: [], date: ''
    })
    setSelectedFile(null)
    setPreview(null)
  }

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
        link_ids: editingItem.link_ids || [],
        date: editingItem.date ? editingItem.date.slice(0, 10) : ''
      })
      setPreview(editingItem.image_url || null)
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
        if (formData.date) fd.append('date', formData.date)

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

  const renderSelector = (label, items, field) => (
    <div className={styles.field}>
      <label className={styles.fieldLabel}>{label}</label>
      <div className={styles.selectorsGroup}>
        {items?.map(item => {
          const isSelected = Array.isArray(formData[field]) && formData[field].includes(item.id)
          return (
            <label
              key={item.id}
              className={`${styles.selector} ${isSelected ? styles.selectorActive : ''}`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleSelectionChange(item.id, field)}
                style={{ display: 'none' }}
              />
              {field === 'tag_ids' ? `# ${item.name}` : item.title}
            </label>
          )
        })}
      </div>
    </div>
  )

  const commonButtons = (
    <div className={styles.formActions}>
      <Button type="submit">{editingItem ? 'Atualizar' : 'Publicar'}</Button>
      {editingItem && (
        <button type="button" onClick={onCancelEdit} className={styles.cancelBtn}>
          Cancelar
        </button>
      )}
    </div>
  )

  if (activeTab === 'posts') {
    return (
      <form onSubmit={handleSubmit}>
        <input placeholder="Título" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className={styles.input} style={{ marginBottom: '1rem' }} required />
        <div className={styles.field}>
          <textarea placeholder="Descrição" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className={`${styles.input} ${styles.textarea}`} />
        </div>
        {renderSelector('Tags:', tags?.items, 'tag_ids')}
        <textarea placeholder="Conteúdo (Markdown)" value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} className={`${styles.input} ${styles.textarea}`} />
        {commonButtons}
      </form>
    )
  }
  if (activeTab === 'links') {
    return (
      <form onSubmit={handleSubmit}>
        <input placeholder="Título" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className={styles.input} style={{ marginBottom: '1rem' }} required />
        <input placeholder="URL" value={formData.url} onChange={e => setFormData({ ...formData, url: e.target.value })} className={styles.input} style={{ marginBottom: '1rem' }} required />
        {renderSelector('Tags:', tags?.items, 'tag_ids')}
        <textarea placeholder="Descrição" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className={`${styles.input} ${styles.textarea}`} />
        {commonButtons}
      </form>
    )
  }
  if (activeTab === 'tags') {
    return (
      <form onSubmit={handleSubmit}>
        <input placeholder="Nome da Tag" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className={styles.input} required />
        {commonButtons}
      </form>
    )
  }
  if (activeTab === 'projects') {
    return (
      <form onSubmit={handleSubmit}>
        <input placeholder="Título" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className={styles.input} style={{ marginBottom: '1rem' }} required />
        <input placeholder="Repositório (GitHub/GitLab...)" value={formData.repo_link} onChange={e => setFormData({ ...formData, repo_link: e.target.value })} className={styles.input} style={{ marginBottom: '1rem' }} required />
        <input placeholder="Link Alternativo (Demo/Site...)" value={formData.alternative_link} onChange={e => setFormData({ ...formData, alternative_link: e.target.value })} className={styles.input} style={{ marginBottom: '1rem' }} />
        <input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className={styles.input} style={{ marginBottom: '1rem' }} aria-label="Data do projeto" />
        <div className={styles.field}>
          <textarea placeholder="Descrição Longa" value={formData.long_description} onChange={e => setFormData({ ...formData, long_description: e.target.value })} className={`${styles.input} ${styles.textarea}`} />
        </div>

        {renderSelector('Links relacionados:', links, 'link_ids')}

        <div className={styles.fileDrop}>
          <label className={styles.fieldLabel}>Imagem do Projeto:</label>
          <input type="file" onChange={onFileSelect} accept="image/*" style={{ marginBottom: '1rem' }} />
          {preview && (
            <div>
              <p style={{ fontSize: '0.8rem', marginBottom: '0.5rem', color: 'var(--gh-dark-fg-muted)' }}>
                {selectedFile ? 'Pré-visualização:' : 'Imagem Atual:'}
              </p>
              <img src={preview} alt="Preview" className={styles.preview} />
            </div>
          )}
        </div>

        {commonButtons}
      </form>
    )
  }
  return null
}