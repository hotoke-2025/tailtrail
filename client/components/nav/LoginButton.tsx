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
          {user && <p >{user?.nickname}</p>}
          <Button onClick={handleSignOut} className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-1.5 rounded-md shadow transition duration-200" >Sign out</Button>
        </div>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <div className="flex items-center space-x-3">
          <Button className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-1.5 rounded-md shadow transition duration-200" onClick={handleSignIn}>
            Sign in
          </Button>
        </div>
      </IfNotAuthenticated>
    </>
  )
}

export default LoginButton
