import useSWR from 'swr'
import { API_BASE_URL, fetcher } from '../services/api'

export function useAuth() {
  const { data, error, mutate, isLoading } = useSWR(`${API_BASE_URL}/auth/me`, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false
  })

  const logout = async () => {
    await fetch(`${API_BASE_URL}/auth/logout`, { method: 'POST', credentials: 'include' })
    mutate(null) // Limpa o cache do SWR
    window.location.href = '/' // Redireciona para a home
  }

  return {
    user: data?.user,
    isAuthenticated: !!data?.user,
    isLoading,
    logout,
    mutate
  }
}
