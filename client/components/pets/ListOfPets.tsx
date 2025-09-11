import { useQuery } from '@tanstack/react-query'
import { getPets } from '../../apis/pets'
import PetCard from './PetCard'
import type { Pet } from '../../../models/pet'

export default function ListOfPets() {
  const {
    data: pets,
    isLoading,
    isError,
  } = useQuery<Pet[]>({
    queryKey: ['pets'],
    queryFn: getPets,
  })

  if (isLoading) {
    return <p>Loading pets...</p>
  }

  if (isError) {
    return <p>Could not load pets. Please try again later.</p>
  }

  return (
    <div>
      <h2>Lost anf Found Pets</h2>
      <div>
        {pets?.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  )
}