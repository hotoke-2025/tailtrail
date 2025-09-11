import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}
