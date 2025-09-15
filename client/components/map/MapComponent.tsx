import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import LoadingPawprint from '../LoadingPaw.tsx'
import type { Pet } from '../../../models/pet.ts'
import { usePets } from '../../hooks/usePets.ts'

interface MapComponentProps {
  filter: 'all' | 'lost' | 'found'
}

const containerStyle = {
  width: '100%',
<<<<<<< HEAD
  height: '800px',
=======
  height: '600px'
>>>>>>> main
}

const defaultCenter = {
  lat: -36.848461,
  lng: 174.763336,
}

export default function MapComponent({ filter }: MapComponentProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  const { pets, loading, error } = usePets()

  if (!apiKey) return <div>Error: no API key found</div>
  if (loading) return <LoadingPawprint />
  if (error) return <div>Error loading pets: {error}</div>
  if (!pets || pets.length === 0) return <div>No pets to display</div>

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

  return (
    <LoadScript googleMapsApiKey={apiKey} loadingElement={<LoadingPawprint />}>
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
        {filteredMarkers.map(({ pet, position }) => (
          <Marker key={pet.id} position={position} title={pet.name} />
        ))}
      </GoogleMap>
    </LoadScript>
  )
}
