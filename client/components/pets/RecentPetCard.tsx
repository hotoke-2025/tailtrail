import type { Pet } from '../../../models/pet'

interface Props {
  pet: Pet
}

export default function RecentPetCard({ pet }: Props) {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '1rem',
        marginBottom: '1rem',
      }}
    >
      <ul>
        <li>
          <strong>Name:</strong> {pet.name}
        </li>
        <li>
          <strong>Species:</strong> {pet.species}
        </li>
        <li>
          <strong>Breed:</strong> {pet.breed}
        </li>
        <li>
          <strong>Sex:</strong> {pet.sex}
        </li>
        <li>
          <strong>Colour:</strong> {pet.colour}
        </li>
        <li>
          <strong>Age:</strong> {pet.age}
        </li>
        <li>
          <strong>Microchipped:</strong> {pet.microchipped ? 'Yes' : 'No'}
        </li>
        <li>
          <strong>Home Suburb:</strong> {pet.homeSuburb}
        </li>
        <li>
          <strong>Last Location:</strong> {pet.lastLocation}
        </li>
        <li>
          <strong>Last Seen Date:</strong> {pet.lastSeenDate}
        </li>
        <li>
          <strong>Photo URL:</strong> {pet.photoUrl}
        </li>
        <li>
          <strong>Lost:</strong> {pet.lost ? 'Yes' : 'No'}
        </li>
        <li>
          <strong>Registration Number:</strong> {pet.registrationNumber}
        </li>
      </ul>
    </div>
  )
}
