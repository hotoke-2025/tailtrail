import type { Pet } from '../../../models/pet'

interface PetCardPopUpProps {
  pet: Pet
  onClose: () => void
}

export default function PetCardPopUp({ pet, onClose }: PetCardPopUpProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          Close
        </button>

        <h2 className="text-xl font-bold mb-2">{pet.name}</h2>
        <img src={pet.photoUrl} alt={pet.name} className="w-full h-auto mb-4" />
        <p><strong>Species:</strong> {pet.species}</p>
        <p><strong>Breed:</strong> {pet.breed}</p>
        <p><strong>Sex:</strong> {pet.sex}</p>
        <p><strong>Desexed:</strong> {pet.desexed ? 'Yes' : 'No'}</p>
        <p><strong>Colour:</strong> {pet.colour}</p>
        <p><strong>Age:</strong> {pet.age}</p>
        <p><strong>Size:</strong> {pet.size}</p>
        <p><strong>Microchipped:</strong> {pet.microchipped ? 'Yes' : 'No'}</p>
        <p><strong>Home Suburb:</strong> {pet.homeSuburb}</p>
        <p><strong>Last Location:</strong> {pet.lastLocation}</p>
        <p><strong>Last Seen:</strong> {pet.lastSeenDate}</p>
        <p><strong>Lost:</strong> {pet.lost ? 'Yes' : 'No'}</p>
        <p><strong>Registration #:</strong> {pet.registrationNumber}</p>
      </div>
    </div>
  )
}