import Button from '../UI/Button.tsx'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated.tsx'
import { useAuth0 } from '@auth0/auth0-react'

function LoginButton() {
  const { user, loginWithRedirect, logout } = useAuth0()
  console.log(user)

  const handleSignOut = () => {
    // console.log('sign out')
    logout()
  }

  const handleSignIn = () => {
    // console.log('sign in')
    loginWithRedirect()
  }

  return (
    <>
      <IfAuthenticated>
        <div className="flex items-center space-x-3">
          {user && (
            <img
              src={user?.picture}
              alt={user?.name}
              className="h-8 w-8 rounded-full"
            />
          )}
          {user && <p>{user?.nickname}</p>}
          <Button
            onClick={handleSignOut}
            className="rounded-md bg-orange-500 px-4 py-1.5 text-sm text-white shadow transition duration-200 hover:bg-orange-600"
          >
            Sign out
          </Button>
        </div>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <div className="flex items-center space-x-3">
          <Button
            className="rounded-md bg-orange-500 px-4 py-1.5 text-sm text-white shadow transition duration-200 hover:bg-orange-600"
            onClick={handleSignIn}
          >
            Sign in
          </Button>
        </div>
      </IfNotAuthenticated>
    </>
  )
}

export default LoginButton
