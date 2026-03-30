export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <input 
        placeholder={placeholder || "O que você está procurando?"}
        value={value} 
        onChange={e => onChange(e.target.value)}
        style={{ 
          width: '100%', 
          padding: '1rem', 
          fontSize: '1.1rem',
          borderRadius: '12px', 
          border: '1px solid var(--gh-dark-border-default)', 
          background: 'var(--gh-dark-bg-default)', 
          color: 'white',
          outline: 'none',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transition: 'border-color 0.2s ease'
        }}
        onFocus={(e) => e.target.style.borderColor = 'var(--efects-purple)'}
        onBlur={(e) => e.target.style.borderColor = 'var(--gh-dark-border-default)'}
      />
    </div>
  )
}
