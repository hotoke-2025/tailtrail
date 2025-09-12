import { Marker, InfoWindow } from '@react-google-maps/api'
import { Pet } from '../../../models/pet'
import { useState } from 'react'
import InfoCard from '../pets/InfoCard'

interface PetMarkerProps {
  pet: Pet
  position: google.maps.LatLngLiteral
}


export default function PetMarker({ pet, position }: PetMarkerProps) {
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false)
    //function for image icon resize
const customIcon = {  
}
    //function for alt image if no image found
    
    return (
        <Marker position={position}
        icon={customIcon}
        title={pet.name}
        onClick={() => setIsInfoWindowOpen(true)}
        onError={() => customIcon.url = '/derp.png'}
        >
            {isInfoWindowOpen && (
                <InfoWindow onCloseClick={() => setIsInfoWindowOpen(false)}
                position={position}
                ><InfoCard pet={pet} /></InfoWindow>
            )}
        </Marker>
    )}