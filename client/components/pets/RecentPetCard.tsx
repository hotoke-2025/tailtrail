import type { Pet } from '../../../models/pet'

interface Props {
  pet: Pet
}

export default function RecentPetCard({ pet }: Props) {
  return (
    <div className="mb-4 rounded-2xl bg-white px-6 py-5 shadow-sm transition hover:bg-gray-50">
      {/* Flex row: image on left, name + badge (lost of found) on right */}
      <div className="mb-4 flex items-center gap-4">
        {/* Pet image - circle avatar */}
        <img
          src={pet.photoUrl}
          alt={pet.name}
          className="h-14 w-14 rounded-full border border-gray-300 object-cover shadow-sm" // Image as rounded avatar
        />

        {/* Name and LOST badge side by side */}
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-800">{pet.name}</h2>{' '}
          {/* Pet name */}
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

      <ul className="space-y-2 text-sm font-medium text-gray-700">
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
          <strong>Home Suburb:</strong> {pet.homeSuburb}
        </li>
        <li>
          <strong>Last Location:</strong> {pet.lastLocation}
        </li>
        <li>
          <strong>Last Seen Date:</strong> {pet.lastSeenDate}
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
