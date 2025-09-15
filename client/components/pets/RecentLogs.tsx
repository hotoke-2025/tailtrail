import { useState } from 'react'
import RecentPetCard from './RecentPetCard'
import PetCardPopUp from '../pages/PetCardPopUp'
import type { Pet } from '../../../models/pet'

interface Props {
  pets?: Pet[] // allow undefined
}

export default function RecentLogs({ pets = [] }: Props) {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null)

  console.log(
    'Before sort:',
    pets.map((p) => ({ id: p.id, last_seen_date: p.last_seen_date })),
  )

  const sortedPets = [...pets].sort((a, b) => {
    const dateA = new Date(a.last_seen_date).getTime() || 0
    const dateB = new Date(b.last_seen_date).getTime() || 0
    return dateB - dateA
  })

  console.log(
    'After sort:',
    sortedPets.map((p) => ({ id: p.id, last_seen_date: p.last_seen_date })),
  )

  return (
    <div>
      {sortedPets.length === 0 ? (
        <p className="italic text-gray-500">No recent logs.</p>
      ) : (
        <div>
          {sortedPets.map((pet) => (
            <button
              key={pet.id}
              className="w-full text-left"
              onClick={() => setSelectedPet(pet)}
            >
            <RecentPetCard key={pet.id} pet={pet} />
            </button>
          ))}
        </div>
      )}
      {/* Full details popup modal */}
      {selectedPet && (
        <PetCardPopUp pet={selectedPet} onClose={() => setSelectedPet(null)} />
      )}
    </div>
  )
}
