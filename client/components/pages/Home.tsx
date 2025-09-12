import MapComponent from '../map/MapComponent'
import LoginButton from '../nav/LoginButton'
import ListOfPets from '../pets/ListOfPets'

export default function HomePage() {
  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Welcome to TailTrail</h1>

      <div className="home-page flex h-[calc(100vh-100px)]">
        {/* LEFT COLUMN */}
        {/* All components are here */}
        <aside className="w-[40%] overflow-y-auto border-r p-4">
          <div>
            <LoginButton />
          </div>

          <div>
            <h2 className="mb-2 text-xl font-bold">Pet Profile / Add Pet</h2>
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
        <main className="relative w-[60%] p-4">
          <MapComponent />

          <div className="absolute right-4 top-4 flex gap-2">
            <button className="rounded bg-red-600 px-4 py-2 text-white">
              LOST
            </button>
            <button className="rounded bg-green-500 px-4 py-2 text-white">
              FOUND
            </button>
          </div>
        </main>
      </div>
    </>
  )
}
