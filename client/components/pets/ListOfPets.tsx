import { useState } from 'react'
import PetCard from './PetCard'
import PetCardPopUp from '../pages/PetCardPopUp'
import type { Pet } from '../../../models/pet'

interface Props {
  pets: Pet[] // declare prop
}

export default function ListOfPets({ pets }: Props) {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null)
  
  return (
    <div>
      <h2>Lost and Found Pets</h2>
      {pets.length === 0 ? (
        <p className="text-gray-500 italic">No pets found for this filter.</p>
      ) : (
        <div>
          {pets.map((pet) => (
            <button
              key={pet.id}
              className="w-full text-left" // Make entire pet clickable
              onClick={() => setSelectedPet(pet)} // Open modal
            >
              <PetCard pet={pet} />
            </button>
          ))}
        </div>
      )}
    {/* Render modal when pet is selected */}
      {selectedPet && (
        <PetCardPopUp pet={selectedPet} onClose={() => setSelectedPet(null)} />
      )}

    </div>
  )
}