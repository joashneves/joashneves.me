import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mutate } from 'swr'
import Button from '../../../components/Button'
import { API_BASE_URL } from '../../../services/api'
import styles from '../../../components/Admin/AdminPanel.module.css'

export default function Login() {
  const [user, setUser] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, senha }),
        credentials: 'include'
      })

      const data = await response.json()

      if (response.ok) {
        mutate(`${API_BASE_URL}/auth/me`, { user: data.user }, false)
        navigate('/adm/painel')
      } else {
        setError(data.error || 'Erro ao fazer login')
      }
    } catch {
      setError('Erro de conexão com o servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={styles.loginSection}>
      <form onSubmit={handleLogin} className={styles.loginCard}>
        <h1 className={styles.title} style={{ fontSize: '1.6rem' }}>Acesso Admin</h1>

        {error && <p className={styles.loginError}>{error}</p>}

        <div className={styles.field}>
          <label className={styles.fieldLabel}>Usuário ou E-mail:</label>
          <input
            type="text"
            name="username"
            autoComplete="username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel}>Senha:</label>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
    </section>
  )
}