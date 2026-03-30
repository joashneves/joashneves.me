import { useState } from 'react'
import Button from '../../../components/Button'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    console.log('Tentativa de login:', { email, password })
    // Aqui virá a lógica de autenticação futura
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
        <h2>Acesso Admin</h2>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>E-mail:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '0.5rem', 
              borderRadius: '4px',
              border: '1px solid var(--gh-dark-border-default)',
              background: 'var(--gh-dark-bg-default)',
              color: 'white'
            }} 
          />
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>Senha:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '0.5rem', 
              borderRadius: '4px',
              border: '1px solid var(--gh-dark-border-default)',
              background: 'var(--gh-dark-bg-default)',
              color: 'white'
            }} 
          />
        </div>
        <Button type="submit">Entrar</Button>
      </form>
    </section>
  )
}
