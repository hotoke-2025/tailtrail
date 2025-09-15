import { Pet } from '../../../models/pet'
import PetMarker from '../map/PetPin'


interface Props {
  pet: Pet
  lost?: boolean
}

export default function InfoCard(pet, { pet }: Props) {
  const lostColor = pet.lost ? '#f87171' : '#4ade80'
  return (
    <div style={{ border: lostColor, padding: '1rem', marginBottom: '1rem' }}>
      <ul style={{ textAlign: 'center' }} >
        <li><strong style={{ textAlign: 'left' }} >Name:</strong> {pet.name}</li>
        <li><strong>Species:</strong> {pet.species}</li>
        <li><strong>Breed:</strong> {pet.breed}</li>
        <li><strong>Sex:</strong> {pet.sex}</li>
        <li><strong>Colour:</strong> {pet.colour}</li>
        <li><strong>Age:</strong> {pet.age}</li>
        <li><strong>Size:</strong> {pet.size}</li>
        <li><strong>Microchipped:</strong> {pet.microchipped ? 'Yes' : 'No'}</li>
        <li><strong>Last Location:</strong> {pet.lastLocation}</li>
        <li><strong>Last Seen Date:</strong> {pet.lastSeenDate}</li>
      </ul>
    </div>
  )
}
