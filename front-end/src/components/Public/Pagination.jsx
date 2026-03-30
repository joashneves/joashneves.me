export default function Pagination({ total, perPage, currentPage, onPageChange }) {
  const totalPages = Math.ceil(total / perPage)
  if (totalPages <= 1) return null

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '4rem' }}>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
        <button 
          key={p} 
          onClick={() => onPageChange(p)}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: currentPage === p ? 'var(--efects-purple)' : 'transparent',
            color: 'white',
            border: '1px solid var(--efects-purple)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontWeight: currentPage === p ? 'bold' : 'normal',
            boxShadow: currentPage === p ? '0 4px 12px rgba(127, 90, 240, 0.3)' : 'none'
          }}
        >
          {p}
        </button>
      ))}
    </div>
  )
}
