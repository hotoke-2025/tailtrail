import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import LoadingPawprint from '../LoadingPaw.tsx'

const containerStyle = {
  width: '100%',
  height: '800px'
}

const defaultCenter = {
  lat: -36.848461, 
  lng: 174.763336
}

export default function MapComponent() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    return (
      <div>
        Error no api key found
      </div>
    )
  }

  return (
    <LoadScript 
      googleMapsApiKey={apiKey}
      loadingElement={<LoadingPawprint />}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={10}
        options={{
          mapId: '34123ba350ed27c7d0c481d4',
          disableDefaultUI: true,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
        }}
      >
          {/* Example marker*/}
        <Marker 
          position={defaultCenter} 
          title="Auckland Center"
          
        />
      </GoogleMap>
    </LoadScript>
  )
}