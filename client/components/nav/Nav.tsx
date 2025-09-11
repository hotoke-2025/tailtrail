import { IfAuthenticated, IfNotAuthenticated } from './Authenticated.tsx'
import { NavGroup, NavButton } from '../Styled.tsx'
import { useAuth0 } from '@auth0/auth0-react'

function Nav() {
  const { user, loginWithRedirect, logout } = useAuth0()
  console.log(user)

  const handleSignOut = () => {
    // console.log('sign out')
    logout()
  }

  const handleSignIn = () => {
    console.log('sign in')
    loginWithRedirect()
  }

  return (
    <>
      <NavGroup>
        <IfAuthenticated>
          <NavButton onClick={handleSignOut}>Sign out</NavButton>
          {user && <p>Signed in as: {user?.nickname}</p>}
          {user && <p>Name: {user?.name}</p>}
          {user && <img src={user?.picture} alt={user?.name} />}
        </IfAuthenticated>
        <IfNotAuthenticated>
          <NavButton onClick={handleSignIn}>Sign in</NavButton>
        </IfNotAuthenticated>
      </NavGroup>
      <h1>Pets</h1>
    </>
  )
}

export default Nav
