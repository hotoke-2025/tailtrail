import { useState, useEffect } from 'react'
import MapComponent from '../map/MapComponent'
import LoginButton from '../nav/LoginButton'
import ListOfPets from '../pets/ListOfPets'
import type { Pet } from '../../../models/pet'
import LostFoundButton from './LostFoundButton'
import LostPetForm from '../pets/LostPetForm'
import RecentLogs from '../pets/RecentLogs'
import Footer from '../Footer'
import Header from '../Header'

export default function HomePage() {
  // Filter state and pet state
  const [filter, setFilter] = useState<'all' | 'lost' | 'found'>('all')
  const [pets, setPets] = useState<Pet[]>([])
  const [isLostPetFormOpen, setLostPetFormOpen] = useState(false)

  // Fetch pets function, can be called from anywhere
  const fetchPets = async () => {
    const res = await fetch('/api/v1/pets')
    const data: Pet[] = await res.json()
    setPets(data)
  }

  // Get pets from the API when the component appears
  useEffect(() => {
    fetchPets()
  }, [])

  // Apply filtering logic
  // const filteredPets = pets.filter((pet) => {
  //   const lostValue = String(pet.lost).toLowerCase()

  //   if (filter === 'lost') return lostValue === 'true'
  //   if (filter === 'found') return lostValue === 'false'
  //   return true
  // })

  return (
    <>
      <Header />

      <div className="flex h-screen">
        {/* LEFT COLUMN */}
        {/* All components are here */}
        <aside className="w-[40%] overflow-y-auto border-r bg-white p-4">
          <div>
            <h2 className="mb-4 text-lg font-semibold text-slate-800">
              Pet Profile
            </h2>
            {/* Add profile image, form, etc. here */}
            {/* <p>Profile info</p> */}
            <button onClick={() => setLostPetFormOpen(true)}>
              Report a lost animal
            </button>
            <LostPetForm
              isOpen={isLostPetFormOpen}
              onClose={() => setLostPetFormOpen(false)}
              onSuccess={fetchPets}
            />
          </div>

          <div className="mt-6">
            <h3 className="mb-4 text-lg font-semibold text-slate-800">
              Recently Reported Pets
            </h3>
            <RecentLogs pets={pets} />
            <ListOfPets pets={pets} />
          </div>
        </aside>

        {/* RIGHT COLUMN */}
        {/* Map as a main component */}
        <main className="relative w-[60%] p-4">
          <LostFoundButton filter={filter} setFilter={setFilter} />
          <MapComponent filter={filter} />
        </main>
      </div>
      <Footer />
    </>
  )
}
