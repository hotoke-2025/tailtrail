import type { Pet } from '../../../models/pet'

interface PetCardPopUpProps {
  pet: Pet
  onClose: () => void
}

export default function PetCardPopUp({ pet, onClose }: PetCardPopUpProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-lg space-y-4">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <div className="mb-4 flex items-center gap-4">
          <img
            src={pet.photoUrl}
            alt={pet.name}
            className="h-52 w-52 rounded-md border border-gray-300 object-cover shadow-sm"
          />

          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold capitalize text-gray-800">
              {pet.name}
            </h2>
            {pet.lost ? (
              <span className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-[2px] text-xs font-semibold text-red-600">
                ⚠️ LOST
              </span>
            ) : (
              <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-[2px] text-xs font-semibold text-green-600">
                ✅ FOUND
              </span>
            )}
          </div>
        </div>

        <hr />
        
          {/* Physical Info */}
          <div className="grid grid-cols-2 gap-2 text-base text-gray-700">
            <p><strong>Species:</strong> {pet.species}</p>
            <p><strong>Breed:</strong> {pet.breed}</p>
            <p><strong>Sex:</strong> {pet.sex}</p>
            <p><strong>Desexed:</strong> {pet.desexed ? 'Yes' : 'No'}</p>
            <p><strong>Colour:</strong> {pet.colour}</p>
            <p><strong>Age:</strong> {pet.age}</p>
            <p><strong>Size:</strong> {pet.size}</p>
            <p><strong>Microchipped:</strong> {pet.microchipped ? 'Yes' : 'No'}</p>
          </div>
          <hr />
          {/* Location Info */}
          <div className="space-y-1 text-base text-gray-700">
            <p><strong>Home Suburb:</strong> {pet.homeSuburb}</p>
            <p><strong>Last Location:</strong> {pet.lastLocation}</p>
            <p><strong>Last Seen:</strong> {pet.lastSeenDate}</p>
            <p><strong>Registration #:</strong> {pet.registrationNumber}</p>
          </div>
        </div>
      </div>
  )
}
