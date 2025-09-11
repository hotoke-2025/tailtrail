import type { Pet } from '../../../models/pet'

interface Props {
  pet: Pet
}

export default function PetCard({ pet }: Props) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <ul>
        <li><strong>ID:</strong> {pet.id}</li>
        <li><strong>Name:</strong> {pet.name}</li>
        <li><strong>Species:</strong> {pet.species}</li>
        <li><strong>Breed:</strong> {pet.breed}</li>
        <li><strong>Sex:</strong> {pet.sex}</li>
        <li><strong>Desexed:</strong> {pet.desexed ? 'Yes' : 'No'}</li>
        <li><strong>Colour:</strong> {pet.colour}</li>
        <li><strong>Age:</strong> {pet.age}</li>
        <li><strong>Size:</strong> {pet.size}</li>
        <li><strong>Microchipped:</strong> {pet.microchipped ? 'Yes' : 'No'}</li>
        <li><strong>Home Suburb:</strong> {pet.home_suburb}</li>
        <li><strong>Last Location:</strong> {pet.last_location}</li>
        <li><strong>Last Seen Date:</strong> {pet.last_seen_date}</li>
        <li><strong>Photo URL:</strong> {pet.photo_url}</li>
        <li><strong>Lost:</strong> {pet.lost ? 'Yes' : 'No'}</li>
        <li><strong>Registration Number:</strong> {pet.registration_number}</li>
      </ul>
    </div>
  )
}
