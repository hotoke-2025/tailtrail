import PetCard from './PetCard'
import type { Pet } from '../../../models/pet'

interface Props {
  pets: Pet[] // declare prop
}

export default function ListOfPets({ pets }: Props) {
  return (
    <div>
      <h2>Lost and Found Pets</h2>
      {pets.length === 0 ? (
        <p className="text-gray-500 italic">No pets found for this filter.</p>
      ) : (
        <div>
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      )}
    </div>
  )
}