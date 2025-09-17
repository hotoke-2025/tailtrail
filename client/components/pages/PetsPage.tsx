import { useState } from 'react'
import ListOfPets from '../pets/ListOfPets'
import RecentPetCard from '../pets/RecentPetCard'
import type { Pet } from '../../../models/pet'

interface Props {
  pets: Pet[] // full list
}

export default function PetsPage({ pets }: Props) {
  const [activeTab, setActiveTab] = useState<'recent' | 'all'>('recent')

  // Sort or filter to get the 3 most recent pets (adjust logic if needed)
  const recentPets = [...pets]
    .sort((a, b) => new Date(b.lastSeenDate).getTime() - new Date(a.lastSeenDate).getTime())
    .slice(0, 3)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Toggle buttons */}
      <div className="flex justify-start gap-4 mb-8">
        <button
          onClick={() => setActiveTab('recent')}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition 
            ${activeTab === 'recent' 
              ? 'bg-blue-500 text-white shadow' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          Recently Reported
        </button>
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition 
            ${activeTab === 'all' 
              ? 'bg-blue-500 text-white shadow' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          All Pets
        </button>
      </div>

      {/* Conditional rendering */}
      {activeTab === 'recent' && (
        <div className="space-y-6">
          {recentPets.map((pet) => (
            <RecentPetCard key={pet.id} pet={pet} />
          ))}
        </div>
      )}

      {activeTab === 'all' && (
        <ListOfPets pets={pets} />
      )}
    </div>
  )
}
