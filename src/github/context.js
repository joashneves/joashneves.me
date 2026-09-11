import { createContext, useContext } from 'react'

export const GithubContext = createContext(null)

export function useGithub() {
  return useContext(GithubContext)
}