import useSWR from 'swr'

// No desenvolvimento com Proxy do Vite, usamos o caminho relativo.
// Isso evita problemas de CORS e Cookies SameSite.
export const API_BASE_URL = '/api'

export const fetcher = (url) => fetch(url, { 
  method: 'GET',
  credentials: 'include'
}).then(async (res) => {
  if (!res.ok) {
    let errorMessage = `Erro ${res.status}`
    try {
      const errorData = await res.json()
      errorMessage = errorData.error || errorMessage
    } catch (e) { }
    throw new Error(errorMessage)
  }
  return res.json()
})

export const useApi = (endpoint) => {
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  const { data, error, mutate } = useSWR(`${API_BASE_URL}${path}`, fetcher)
  
  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate
  }
}

export const postData = async (endpoint, payload) => {
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    credentials: 'include',
  })
  return response.json()
}

export const putData = async (endpoint, payload) => {
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    credentials: 'include',
  })
  return response.json()
}

export const deleteData = async (endpoint) => {
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  return response.json()
}

export const postFormData = async (endpoint, formData, method = 'POST') => {
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: method,
    body: formData,
    credentials: 'include',
  })
  return response.json()
}
