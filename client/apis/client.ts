import { useAuth0 } from '@auth0/auth0-react'

export function useAuthFetch() {
  const { getAccessTokenSilently } = useAuth0()
  
  // troken async function
  return async (url: string, options: RequestInit = {}) => {
    try {
      const token = await getAccessTokenSilently()
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      return response
    } catch (error) {
      console.error('Auth fetch error:', error)
      throw error
    }
  }
}