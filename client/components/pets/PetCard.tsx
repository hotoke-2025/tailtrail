import type { Pet } from '../../../models/pet'

interface Props {
  pet: Pet
}

export default function PetCard({ pet }: Props) {
  function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-NZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    
    <div className="rounded-xl bg-blue-50 px-6 py-12 shadow-sm transition hover:scale-[1.01] hover:bg-blue-200 mb-6">
      <div className="flex items-center gap-6">
        {/* Avatar */}
        <div className="w-32 aspect-square overflow-hidden rounded-full border border-gray-300 shadow flex-shrink-0">
          <img
            src={pet.photoUrl}
            alt={pet.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name + Status + Pet info */}
        <div className="space-y-3 flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-800">{pet.name}</h2>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                pet.lost
                  ? 'bg-red-100 text-red-600'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              {pet.lost ? 'LOST' : 'FOUND'}
            </span>
          </div>

          <div className="mt-1 text-sm font-medium text-blue-900 space-y-3">
          {/* First line: Breed + Sex */}
          <div className="flex gap-4">
            <span>
              <span className="font-bold">Breed:</span> {pet.breed}
            </span>
            <span>
              <span className="font-bold">Sex:</span>{' '}
              {pet.sex === 'male' ? '♂️ Male' : '♀️ Female'}
            </span>
          </div>

          {/* Second line: Home suburb + Reg number */}
          <div className="flex gap-4">
            <span>
              <span className="font-bold">Home Suburb:</span> {pet.homeSuburb}
            </span>
            <span>
              <span className="font-bold">Registration #:</span> {pet.registrationNumber}
            </span>
          </div>
        </div>
        </div>
      </div>

      {/* Last seen note */}
      <div className="mt-3 flex items-center rounded-md border-l-4 border-orange-400 bg-yellow-100 px-3 py-2 text-sm shadow-sm">
        <span className="font-semibold text-gray-900">Last seen:</span>&nbsp;
        {formatDate(pet.lastSeenDate)} – "{pet.lastLocation}"
      </div>
    </div>
)
}
