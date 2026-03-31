import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mutate } from 'swr'
import Button from '../../../components/Button'

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
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, senha }),
        credentials: 'include'
      })

      const data = await response.json()

      if (response.ok) {
        // Injeta os dados do usuário diretamente no cache do SWR sem esperar o fetch
        // Isso faz o ProtectedRoute liberar o acesso instantaneamente
        mutate('http://localhost:5000/api/auth/me', { user: data.user }, false)
        
        // Redireciona logo em seguida
        navigate('/adm/painel')
      } else {
        setError(data.error || 'Erro ao fazer login')
      }
    } catch (err) {
      setError('Erro de conexão com o servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: 'calc(100vh - 54px)',
      padding: '1rem'
    }}>
      <form onSubmit={handleLogin} style={{ 
        background: 'var(--gh-dark-bg-muted)', 
        padding: '2rem', 
        borderRadius: '8px', 
        border: '1px solid var(--gh-dark-border-default)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ color: 'var(--title-green-color)', marginBottom: '1.5rem' }}>Acesso Admin</h2>
        
        {error && <p style={{ color: '#f85149', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--gh-dark-fg-muted)' }}>Usuário ou E-mail:</label>
          <input 
            type="text" 
            name="username" // Sugestão para o navegador
            autoComplete="username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
            style={inputStyle} 
          />
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--gh-dark-fg-muted)' }}>Senha:</label>
          <input 
            type="password" 
            name="password" // Sugestão para o navegador
            autoComplete="current-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            style={inputStyle} 
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
    </section>
  )
}

const inputStyle = {
  width: '100%', 
  padding: '0.6rem', 
  borderRadius: '6px',
  border: '1px solid var(--gh-dark-border-default)',
  background: 'var(--gh-dark-bg-default)',
  color: 'white',
  outline: 'none',
  fontSize: '1rem'
}
