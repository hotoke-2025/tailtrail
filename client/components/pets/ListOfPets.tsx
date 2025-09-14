import { useState } from 'react'
import PetCard from './PetCard'
import PetCardPopUp from '../pages/PetCardPopUp'
import type { Pet } from '../../../models/pet'

interface Props {
  pets: Pet[] // declare prop
  isLoading: boolean
  error: string
}

export default function ListOfPets({ pets, isLoading, error }: Props) {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null)
  const [showList, setShowList] = useState(false)
  
  return (
    <div className="mb-8">
      {/* Toggle button */}
      <button
        onClick={() => setShowList(!showList)}
        className="text-sm font-semibold mb-4 bg-[#dad6d6] px-2 py-2 rounded hover:bg-[#c4c2c2] transition"
      >
        {showList ? 'Hide Lost and Found Pets ▲' : 'Show Lost and Found Pets ▼'}
      </button>

    {/* Handle loading and error states */}
      {showList && (
        <div>
          <h2 className="text-xl font-bold mb-2">List of All Lost and Found Pets:</h2>

          {isLoading ? (
            <p className="text-gray-500 italic">Loading...</p>
          ) : error ? (
            <p className="text-red-500 font-semibold">Error: {error}</p>
          ) : pets.length === 0 ? (
            <p className="text-gray-500 italic">No pets found for this filter.</p>
          ) : (
            <div>
              {pets.map((pet) => (
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