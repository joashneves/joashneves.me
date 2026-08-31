import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import styles from './AdminPanel.module.css'

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className={styles.loadingScreen}>
        <p className={styles.loadingText}>Verificando acesso...</p>
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