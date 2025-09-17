import { Auth0Provider } from '@auth0/auth0-react'
import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface Auth0ProviderProps {
  children: ReactNode
}

export default function CustomAuth0Provider({ children }: Auth0ProviderProps) {
  const navigate = useNavigate()

  const domain = import.meta.env.VITE_AUTH0_DOMAIN
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE

  if (!domain || !clientId || !audience) {
    return <div>AUTH0 ERROR NO USER DETECTED</div>
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
      redirect_uri: window.location.origin,
      audience: audience,
      }}
      onRedirectCallback={(appState) => {
        navigate(appState?.returnTo || window.location.pathname)
      }}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  )
}