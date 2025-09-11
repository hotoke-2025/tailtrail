import MapComponent from '../map/MapComponent'
import ListOfPets from '../pets/ListOfPets'

export default function HomePage() {
  return (
    <>
    <h1 className='text-2xl font-bold mb-4'>Welcome to TailTrail</h1>
    
    <div className="home-page flex h-[calc(100vh-100px)]">
      {/* LEFT COLUMN */}
      {/* All components are here */}
      <aside className="w-[40%] p-4 border-r overflow-y-auto">
        <div>
          <h2>Login page</h2>
        </div>
        
        <div>
          <h2 className="text-xl font-bold mb-2">Pet Profile / Add Pet</h2>
          {/* Add profile image, form, etc. here */}
          <p>Profile info</p>
          <p>Add Pet Button</p>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold">Recent Logs</h3>
          <ListOfPets />
        </div>
      </aside>

      {/* RIGHT COLUMN */}
      {/* Map as a main component */}
      <main className="w-[60%] p-4 relative">
        <MapComponent />

        <div className="absolute top-4 right-4 flex gap-2">
          <button className="bg-red-600 text-white px-4 py-2 rounded">LOST</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded">FOUND</button>
        </div>
      </main>
    </div>
    </>

  )
}
