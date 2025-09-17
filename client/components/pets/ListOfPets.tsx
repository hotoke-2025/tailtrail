import { useState } from 'react'
import PetCard from './PetCard'
import PetCardPopUp from '../pages/PetCardPopUp'
import type { Pet } from '../../../models/pet'

interface Props {
  pets: Pet[] // declare prop
  isLoading?: boolean
  error?: string
}

export default function ListOfPets({ pets, isLoading, error }: Props) {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null)
  const [showList, setShowList] = useState(false)
  const [search, setSearch] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = pets.filter((pet) => {
    const lower = search.toLowerCase()

    return (
      pet.name?.toLowerCase().includes(lower) ||
      pet.species?.toLowerCase().includes(lower) ||
      pet.breed?.toLowerCase().includes(lower) ||
      pet.colour?.toLowerCase().includes(lower) ||
      pet.homeSuburb?.toLowerCase().includes(lower) ||
      pet.lastLocation?.toLowerCase().includes(lower)
    )
  })
  
  return (
    
    <div className="mb-8">
      {/* Toggle button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setShowList(!showList)}
          className="text-sm font-medium mb-4 rounded-full border border-gray-300 bg-white px-4 py-2 shadow-sm hover:bg-sky-100 hover:border-gray-400 transition mt-4"
        >
          {showList ? 'Hide List of All Pets ▲' : 'Show List of All Pets ▼'}
        </button>
      </div>

    {/* Handle loading and error states */}
      {showList && (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-slate-800">List of All Lost and Found Pets:</h2>
          {/* SEARCH BAR GOES HERE */}
          <div className="mb-4 flex gap-2">
            
            <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search by suburb, species, breed etc."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

            {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('')
                setSearch('') // This resets the actual search filter
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear input"
            >
              ×
            </button>
          )}
          
          </div>
            
            <button
              onClick={() => setSearch(searchQuery)}
              className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 transition"
            >
              Search
            </button>
          </div>
          
          

          {isLoading ? (
            <p className="text-gray-500 italic">Loading...</p>
          ) : error ? (
            <p className="text-red-500 font-semibold">Error: {error}</p>
          ) : filtered.length === 0 ? (
            <p className="text-gray-500 italic">No pets found for this filter.</p>
          ) : (
            <div>
              {filtered.map((pet) => (
                <button
                  key={pet.id}
                  className="w-full text-left"
                  onClick={() => setSelectedPet(pet)}
                >
                  <PetCard pet={pet} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

    {/* Render modal when pet is selected */}
      {selectedPet && (
        <PetCardPopUp pet={selectedPet} onClose={() => setSelectedPet(null)} />
      )}

    </div>

  
  )
}