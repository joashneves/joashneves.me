import styles from './SearchBar.module.css'

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className={styles.container}>
      <input 
        placeholder={placeholder || "O que você está procurando?"}
        value={value} 
        onChange={e => onChange(e.target.value)}
        className={styles.input}
      />
    </div>
  )
}
