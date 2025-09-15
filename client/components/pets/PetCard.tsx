import type { Pet } from '../../../models/pet'

interface Props {
  pet: Pet
}

export default function PetCard({ pet }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm px-6 py-5 mb-4 hover:bg-gray-50 transition">
      {/* 🆕 Flex row: image on left, name + badge (lost/found) on right */}
      <div className="flex items-center gap-4 mb-4">
        {/* 🆕 Pet image as square with rounded corners */}
        <img
          src={`/images/${pet.photoUrl}`}
          alt={pet.name}
          className="w-14 h-14 rounded-full object-cover border border-gray-300 shadow-sm" // 🆕 was rounded-full → now square with soft corners
        />

        {/* 🆕 Pet name + badge (LOST / FOUND) */}
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-800">{pet.name}</h2> {/* 🆕 styled pet name */}
          {pet.lost ? (
            <span className="text-xs bg-red-100 text-red-600 font-semibold px-2 py-[2px] rounded-full flex items-center gap-1">
              ⚠️ LOST {/* 🆕 red badge if lost */}
            </span>
          ) : (
            <span className="text-xs bg-green-100 text-green-600 font-semibold px-2 py-[2px] rounded-full flex items-center gap-1">
              ✅ FOUND {/* 🆕 green badge if not lost */}
            </span>
          )}
        </div>
      </div>

      <ul className="text-sm font-medium text-gray-700 space-y-2">
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
