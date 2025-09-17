import {
  GoogleMap,
  LoadScript,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api'
import LoadingPawprint from '../LoadingPaw.tsx'
import type { Pet } from '../../../models/pet.ts'
import { usePets } from '../../hooks/usePets.ts'
import PetMarker from './PetPin.tsx'
interface MapComponentProps {
  filter: 'all' | 'lost' | 'found'
}

const containerStyle = {
  width: '100%',
  height: '800px',
}

const defaultCenter = {
  lat: -36.848461,
  lng: 174.763336,
}

// test data
// const defaultCentertest = {
//   lat: -36.898461,
//   lng: 174.813336,
// }

// const testFoundMarker = {
//   id: 1,
//   owner_id: 1,
//   species: 'dog',
//   breed: 'heading dog',
//   name: "Malu'i",
//   sex: 'male',
//   desexed: true,
//   colour: 'black and white',
//   age: 3,
//   size: 'medium',
//   microchipped: true,
//   home_suburb: 'island bay',
//   last_location: 'island bay beach',
//   last_seen_date: '2025-10-09',
//   photo_url: 'https://zaakkuu.github.io/images/20250609_125929.jpg',
//   lost: false,
//   registration_number: 12345,
// }

// const testLostMarker = {
//   id: 2,
//   owner_id: 1,
//   species: 'dog',
//   breed: 'heading dog',
//   name: "Malu'i",
//   sex: 'male',
//   desexed: true,
//   colour: 'black and white',
//   age: 3,
//   size: 'medium',
//   microchipped: true,
//   home_suburb: 'island bay',
//   last_location: 'island bay beach',
//   last_seen_date: '2025-10-09',
//   photo_url: 'https://zaakkuu.github.io/images/20250618_104509.jpg',
//   lost: true,
//   registration_number: 12345,
// }

export default function MapComponent({ filter }: MapComponentProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  const { data: pets, isLoading: loading, error } = usePets()
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ['places'],
  })

  if (!apiKey) return <div>Error: no API key found</div>
  if (loading) return <LoadingPawprint />
  if (error) return <div>Error loading pets: {error}</div>
  if (!pets || pets.length === 0) return <div>No pets to display</div>
  if (loadError) return <div>Error loading maps</div>
  if (!isLoaded) return <LoadingPawprint />

  // Filter pets dynamically
  const filteredMarkers = pets
    .filter((p) => {
      if (filter === 'all') return true
      if (filter === 'lost') return p.lost
      if (filter === 'found') return !p.lost
      return true
    })
    .map((p) => {
      const lat = parseFloat(p.latitude)
      const lng = parseFloat(p.longitude)

      if (isNaN(lat) || isNaN(lng)) {
        console.warn(`Skipping pet ${p.id} due to invalid coords`, p)
        return null
      }

      return { pet: p, position: { lat, lng } }
    })
    .filter(Boolean) as { pet: Pet; position: { lat: number; lng: number } }[]

  // console.log(filteredMarkers)

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={12}
      options={{
        mapId: '34123ba350ed27c7d0c481d4',
        disableDefaultUI: true,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
      }}
    >
      {/* Using the built-in Marker for testing */}
      {/* {filteredMarkers.map(({ pet, position }) => (
          <Marker key={pet.id} position={position} title={pet.name} />
        ))} */}

      {/* Using custom PetMarker */}
      {filteredMarkers.map(({ pet, position }) => (
        <PetMarker key={pet.id} pet={pet} position={position} />
      ))}
    </GoogleMap>
  )
}
