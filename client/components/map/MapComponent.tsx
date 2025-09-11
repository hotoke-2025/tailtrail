import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { Pet } from '../../../models/pet.ts'

const containerStyle = {
  width: '100%',
  height: '400px'
}

const defaultCenter = {
  lat: -36.848461, 
  lng: 174.763336
}

interface MapComponentProps {
  pets: Pet[]
  center?: google.maps.LatLngLiteral
  zoom?: number
}

export default function MapComponent({ 
  pets, 
  center = defaultCenter, 
  zoom = 10 
}: MapComponentProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    return <div>Google Maps API key is missing</div>
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
      >
        {pets.map((pet) => (
          <Marker
            key={pet.id}
            position={{
              lat: (defaultCenter.lat),
              lng: (defaultCenter.lng)
            }}
            title={pet.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  )
}