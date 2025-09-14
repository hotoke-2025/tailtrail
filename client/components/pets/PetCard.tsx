import type { Pet } from '../../../models/pet'

interface Props {
  pet: Pet
}

export default function PetCard({ pet }: Props) {
  return (
    <div className="border p-4 mb-4 rounded shadow hover:bg-gray-50 transition">
      <ul>
        <li><strong>Name:</strong> {pet.name}</li>
        <img
          src={`/images/${pet.photoUrl}`}
          alt={pet.name}
          className="mt-2 h-32 w-auto object-cover rounded"
        />
        <li><strong>Species:</strong> {pet.species}</li>
        <li><strong>Breed:</strong> {pet.breed}</li>
        <li><strong>Sex:</strong> {pet.sex}</li>
        <li><strong>Home Suburb:</strong> {pet.homeSuburb}</li>
        <li><strong>Last Location:</strong> {pet.lastLocation}</li>
        <li><strong>Last Seen Date:</strong> {pet.lastSeenDate}</li>
        <li><strong>Lost:</strong> {pet.lost ? 'Yes' : 'No'}</li>
      </ul>
    </div>
  )
}
