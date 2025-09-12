import { useState, useEffect } from 'react'
import MapComponent from '../map/MapComponent'
import LoginButton from '../nav/LoginButton'
import ListOfPets from '../pets/ListOfPets'
import type { Pet } from '../../../models/pet'
import LostFoundButton from './LostFoundButton'

export default function HomePage() {
  // Filter state and pet state
  const [filter, setFilter] = useState<'all' | 'lost' | 'found'>('all')
  const [pets, setPets] = useState<Pet[]>([])

  // Get pets from the API when the component appears 
  useEffect(() => {
    async function fetchPets() {
      const res = await fetch('/api/v1/pets')
      const data: Pet[] = await res.json()
      setPets(data)
    }
    fetchPets()
  }, [])

  // Apply filtering logic
const filteredPets = pets.filter((pet) => {
  const lostValue = String(pet.lost).toLowerCase()

  if (filter === 'lost') return lostValue === 'true'
  if (filter === 'found') return lostValue === 'false'
  return true
})

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Welcome to TailTrail</h1>

      <div className="home-page flex h-[calc(100vh-100px)]">
        {/* LEFT COLUMN */}
        {/* All components are here */}
        <aside className="w-[40%] overflow-y-auto border-r p-4">
          <div>
            <LoginButton />
          </div>

          <div>
            <h2 className="mb-2 text-xl font-bold">Pet Profile / Add Pet</h2>
            {/* Add profile image, form, etc. here */}
            <p>Profile info</p>
            <p>Add Pet Button</p>
          </div>

        <div className="mt-6">
          <h3 className="font-semibold">Recent Logs</h3>
          <ListOfPets pets={filteredPets} />
        </div>
      </aside>

      {/* RIGHT COLUMN */}
      {/* Map as a main component */}
      <main className="w-[60%] p-4 relative">
        <LostFoundButton filter={filter} setFilter={setFilter} />
        <MapComponent filter={filter} />
      </main>
    </div>
    </>
  )
}
