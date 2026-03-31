import useSWR from 'swr'

const fetcher = (url) => fetch(url, { credentials: 'include' }).then((res) => {
  if (!res.ok) throw new Error('Não autenticado')
  return res.json()
})

export function useAuth() {
  const { data, error, mutate, isLoading } = useSWR('http://localhost:5000/api/auth/me', fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false
  })

  const logout = async () => {
    await fetch('http://localhost:5000/api/auth/logout', { method: 'POST', credentials: 'include' })
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
