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
import PetsPage from './PetsPage'
import LostPetPosterForm from '../pets/LostPetPosterForm'

export default function HomePage() {
  // Filter state and pet state
  const [filter, setFilter] = useState<'all' | 'lost' | 'found'>('all')
  const [pets, setPets] = useState<Pet[]>([])
  const [isLostPetFormOpen, setLostPetFormOpen] = useState(false)
  const [isLostPetPosterFormOpen, setLostPetPosterFormOpen] = useState(false)

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

   return (
    <>
      <Header />

      <div className="flex h-screen">
        {/* LEFT COLUMN */}
        {/* All components are here */}
        <aside className="w-[40%] overflow-y-auto border-r bg-white p-4">
          <div>
            {/* Add profile image, form, etc. here */}
            {/* <p>Profile info</p> */}
            <div className="flex gap-2">
              <button
                onClick={() => setLostPetPosterFormOpen(true)}
                className="rounded-md bg-blue-600 px-4 py-2 font-bold text-white shadow-md hover:bg-blue-700"
              >
                Upload a lost pet poster
              </button>
              <LostPetPosterForm
                isOpen={isLostPetPosterFormOpen}
                onClose={() => setLostPetPosterFormOpen(false)}
                onSuccess={fetchPets}
              />
              <button
                onClick={() => setLostPetFormOpen(true)}
                className="rounded-md bg-blue-600 px-4 py-2 font-bold text-white shadow-md hover:bg-blue-700"
              >
                Report my pet as lost
              </button>
              <LostPetForm
                isOpen={isLostPetFormOpen}
                onClose={() => setLostPetFormOpen(false)}
                onSuccess={fetchPets}
              />
            </div>
          </div>
          {/* <div className="mt-6">
            <h3 className="mb-4 text-lg font-semibold text-slate-800">
              Recently Reported Pets
            </h3>
            <RecentLogs pets={pets} />
            <ListOfPets pets={pets} />
          </div> */}
          <PetsPage pets={pets} />
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
