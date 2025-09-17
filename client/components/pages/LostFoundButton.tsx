// This component display only the LOST / FOUND / ALL buttons. 
// All logic is it Home.tsx component.

interface LostFoundButtonProps {
  filter: 'all' | 'lost' | 'found'
  setFilter: (filter: 'all' | 'lost' | 'found') => void
}

export default function LostFoundButton({ filter, setFilter }: LostFoundButtonProps) {
  return (
    <div className="absolute top-4 right-4 flex gap-2 z-10 mt-1 mr-1 text-sm">
      {/* LOST Button */}
      <button
        onClick={() => setFilter('lost')}
        className={`px-5 py-2 rounded-full font-semibold shadow-sm transition ${
          filter === 'lost' ? 'bg-red-500 text-white' : 'bg-red-100 text-red-600 hover:bg-red-200'
        }`}
      >
        LOST
      </button>

      {/* FOUND Button */}
      <button
        onClick={() => setFilter('found')}
        className={`px-5 py-2 rounded-full font-semibold shadow-sm transition ${
          filter === 'found' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-600 hover:bg-green-200'
        }`}
      >
        FOUND
      </button>

      {/* ALL Button */}
      <button
        onClick={() => setFilter('all')}
        className={`px-5 py-2 rounded-full font-semibold shadow-sm transition ${
          filter === 'all' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        ALL
      </button>
    </div>
  )
}