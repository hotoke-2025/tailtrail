// This component display only the LOST / FOUND / ALL buttons. 
// All logic is it Home.tsx component.

interface LostFoundButtonProps {
  filter: 'all' | 'lost' | 'found'
  setFilter: (filter: 'all' | 'lost' | 'found') => void
}

export default function LostFoundButton({ filter, setFilter }: LostFoundButtonProps) {
  return (
    <div className="absolute top-4 right-4 flex gap-2 z-10">
      {/* LOST Button */}
      <button
        onClick={() => setFilter('lost')}
        className={`px-4 py-2 rounded ${
          filter === 'lost' ? 'bg-red-600 text-white' : 'bg-red-400 text-white'
        }`}
      >
        LOST
      </button>

      {/* FOUND Button */}
      <button
        onClick={() => setFilter('found')}
        className={`px-4 py-2 rounded ${
          filter === 'found' ? 'bg-green-600 text-white' : 'bg-green-400 text-white'
        }`}
      >
        FOUND
      </button>

      {/* ALL Button */}
      <button
        onClick={() => setFilter('all')}
        className={`px-4 py-2 rounded ${
          filter === 'all' ? 'bg-gray-600 text-white' : 'bg-gray-400 text-white'
        }`}
      >
        ALL
      </button>
    </div>
  )
}