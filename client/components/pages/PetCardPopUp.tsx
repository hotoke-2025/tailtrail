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
          className="absolute top-3 right-3 text-sm text-gray-500 hover:text-gray-700 font-medium"
        >
          Close
        </button>

        <div className="flex items-center gap-4 mb-4">
          <img
            src={`/images/${pet.photoUrl}`}
            alt={pet.name}
            className="w-24 h-24 rounded-md object-cover border border-gray-300 shadow-sm" // ⬅ square with rounded corners
          />

          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-800 capitalize">{pet.name}</h2>
            {pet.lost ? (
              <span className="text-xs bg-red-100 text-red-600 font-semibold px-2 py-[2px] rounded-full flex items-center gap-1">
                ⚠️ LOST
              </span>
            ) : (
              <span className="text-xs bg-green-100 text-green-600 font-semibold px-2 py-[2px] rounded-full flex items-center gap-1">
                ✅ FOUND
              </span>
            )}
          </div>
        </div>

        <div className="text-sm font-medium text-gray-700 space-y-1">
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
    </div>
  )
}