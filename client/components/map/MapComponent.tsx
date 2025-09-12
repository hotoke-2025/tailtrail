import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import LoadingPawprint from '../LoadingPaw.tsx'
import PetMarker from './PetPin.tsx'

interface MapComponentProps {
  filter: 'all' | 'lost' | 'found'
}

const containerStyle = {
  width: '100%',
  height: '800px'
}

const defaultCenter = {
  lat: -36.848461, 
  lng: 174.763336
}

//REMOVE LATER AFTER LOST AND FOUND TESTING
const defaultCentertest = {
  lat: -36.898461, 
  lng: 174.813336
}

const testFoundMarker = {
   id: 1,
  owner_id: 1,
  species: 'dog',
  breed: 'heading dog',
  name: "Malu'i",
  sex: 'male',
  desexed: true,
  colour: 'black and white',
  age: 3,
  size: 'medium',
  microchipped: true,
  home_suburb: 'island bay',
  last_location: 'island bay beach',
  last_seen_date: '2025-10-09',
  photo_url: 'https://zaakkuu.github.io/images/20250609_125929.jpg',
  lost: false,
  registration_number: 12345,
}

const testLostMarker = {
   id: 2,
  owner_id: 1,
  species: 'dog',
  breed: 'heading dog',
  name: "Malu'i",
  sex: 'male',
  desexed: true,
  colour: 'black and white',
  age: 3,
  size: 'medium',
  microchipped: true,
  home_suburb: 'island bay',
  last_location: 'island bay beach',
  last_seen_date: '2025-10-09',
  photo_url: 'https://zaakkuu.github.io/images/20250618_104509.jpg',
  lost: true,
  registration_number: 12345,
}

function getFilteredMarkers(filter: 'all' | 'lost' | 'found') {
  const markers = []
  if (filter === 'all' || filter === 'found') {
    markers.push({
      pet: testFoundMarker,
      position: defaultCenter,
    })
  }
  if (filter === 'all' || filter === 'lost') {
    markers.push({
      pet: testLostMarker,
      position: defaultCentertest,
    })
  }
  return markers
}

export default function MapComponent({ filter }: MapComponentProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    return (
      <div>
        Error no api key found
      </div>
    )
  }

  const filteredMarkers = getFilteredMarkers(filter)

  return (
    <LoadScript 
      googleMapsApiKey={apiKey}
      loadingElement={<LoadingPawprint />}
    >
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
          {/* Example marker
        <PetMarker 
        pet={testFoundMarker} 
          position={defaultCenter} 
        />
        <PetMarker 
        pet={testLostMarker} 
          position={defaultCentertest}
        /> */}

        {/* SHOW ONLY FILTERED MARKERS */}
        {filteredMarkers.map(({ pet, position }) => (
          <PetMarker key={pet.id} pet={pet} position={position} />
        ))}
      </GoogleMap>
    </LoadScript>
  )
}