import useSWR from 'swr'

const API_BASE_URL = 'http://127.0.0.1:5000/api'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export const useApi = (endpoint) => {
  const { data, error, mutate } = useSWR(`${API_BASE_URL}${endpoint}`, fetcher)
  
  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate
  }
}

export const postData = async (endpoint, payload) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  return response.json()
}

export const uploadImage = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  
  const response = await fetch(`${API_BASE_URL}/upload/`, {
    method: 'POST',
    body: formData,
  })
  return response.json()
}
