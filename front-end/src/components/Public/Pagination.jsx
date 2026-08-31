import styles from './Pagination.module.css'

export default function Pagination({ total, perPage, currentPage, onPageChange }) {
  const totalPages = Math.ceil(total / perPage)
  if (totalPages <= 1) return null

  return (
    <div className={styles.container}>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`${styles.pageButton} ${currentPage === p ? styles.active : ''}`}
        >
          {p}
        </button>
      ))}
    </div>
  )
}