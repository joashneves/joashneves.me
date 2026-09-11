import { useEffect, useMemo, useRef, useState } from 'react'
import { GithubContext } from './github/context.js'

const CACHE_KEY = 'github:profile'
const CACHE_TTL = 15 * 60 * 1000

async function fetchJson(url, signal) {
  const res = await fetch(url, { signal })
  if (!res.ok) throw new Error(`GitHub API: ${res.status}`)
  return res.json()
}

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { savedAt, payload } = JSON.parse(raw)
    if (Date.now() - savedAt < CACHE_TTL) return payload
  } catch {
    /* ignore */
  }
  return null
}

function writeCache(payload) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), payload }))
  } catch {
    /* storage indisponível */
  }
}

async function fetchGitHubUser(signal) {
  const user = await fetchJson('https://api.github.com/users/joashneves', signal)
  return {
    login: user.login,
    name: user.name,
    bio: user.bio,
    followers: user.followers,
    following: user.following,
    public_repos: user.public_repos,
    html_url: user.html_url,
  }
}

export function GithubProvider({ children }) {
  const [state, setState] = useState(() => {
    const cached = readCache()
    return { data: cached, loading: !cached, error: null }
  })
  const [refreshKey, setRefreshKey] = useState(0)
  const isFirstRun = useRef(true)

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      if (readCache()) return
    }

    const controller = new AbortController()
    setState((prev) => ({ data: prev.data, loading: true, error: null }))

    fetchGitHubUser(controller.signal)
      .then((payload) => {
        writeCache(payload)
        setState({ data: payload, loading: false, error: null })
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setState((prev) => ({ data: prev.data, loading: false, error: err }))
      })

    return () => controller.abort()
  }, [refreshKey])

  const value = useMemo(
    () => ({ ...state, refresh: () => setRefreshKey((key) => key + 1) }),
    [state],
  )

  return <GithubContext.Provider value={value}>{children}</GithubContext.Provider>
}