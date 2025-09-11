import { useFruits } from '../hooks/useFruits.ts'
import HomePage from './pages/Home.tsx'

function App() {
  const { data } = useFruits()

  return (
    <>
      <div className="app">
        <h1 className="text-3xl font-bold underline">Tail Trail</h1>
        <HomePage />
      </div>
    </>
  )
}

export default App
 