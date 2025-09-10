import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <>
      <header>
        <h1>Tail Trail</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  )
}
