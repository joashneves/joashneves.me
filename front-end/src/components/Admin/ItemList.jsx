import { deleteData } from '../../services/api'
import styles from './AdminPanel.module.css'

export default function ItemList({ activeTab, data, page, setPage, onEditItem, mutate }) {
  const items = data?.items || []
  const total = data?.total || 0
  const perPage = data?.per_page || 10
  const totalPages = Math.ceil(total / perPage)

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      try {
        const result = await deleteData(`/${activeTab}/${id}`)
        if (result.error) {
          alert('Erro: ' + result.error)
        } else {
          alert('Excluído com sucesso!')
          if (mutate) mutate()
        }
      } catch {
        alert('Erro ao excluir item')
      }
    }
  }

  return (
    <div>
      <h3 className={styles.panelTitle}>
        Existentes ({activeTab})
      </h3>
      <ul className={styles.list}>
        {items.length === 0 && <p className={styles.empty}>Nenhum item encontrado.</p>}
        {items.map(item => (
          <li key={item.id} className={styles.listItem}>
            <div className={styles.listItemText}>
              {activeTab === 'tags' ? `# ${item.name}` : item.title}
            </div>
            <div className={styles.itemActions}>
              <button
                onClick={() => onEditItem(item)}
                className={`${styles.actionBtn} ${styles.editBtn}`}
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className={`${styles.actionBtn} ${styles.deleteBtn}`}
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className={styles.miniPagination}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`${styles.plainBtn} ${page === p ? styles.plainBtnActive : ''}`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}