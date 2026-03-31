import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--gh-dark-bg-default)' }}>
        <p style={{ color: 'white' }}>Verificando acesso...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/adm/logar" replace />
  }

  if (requiredRole && user.cargo !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return children
}
