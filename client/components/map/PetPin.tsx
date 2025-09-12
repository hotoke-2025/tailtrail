import { Marker, InfoWindow } from '@react-google-maps/api'
import { Pet } from '../../../models/pet'
import { useState, useEffect } from 'react'
import InfoCard from '../pets/InfoCard'

interface PetMarkerProps {
  pet: Pet
  position: google.maps.LatLngLiteral
}


export default function PetMarker({ pet, position }: PetMarkerProps) {
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false)
  const [iconUrl, setIconUrl] = useState(pet.photo_url || '/replacewithlogo.jpg')
   
  useEffect(() => {
    if (!pet.photo_url) {
      setIconUrl('/replacewithlogo.jpg')
      return
    }
    const img = new window.Image()
    img.src = pet.photo_url
    img.onload = () => setIconUrl(pet.photo_url)
    img.onerror = () => setIconUrl('/replacewithlogo.jpg')
  }, [pet.photo_url])
  //function for image icon resize
const customIcon = {  
    url: pet.photo_url || '/replacewithlogo.jpg', 
    scaledSize: new google.maps.Size(50, 50),  
}
    //function for alt image if no image found
    
    return (
        <Marker position={position}
        icon={customIcon}
        title={pet.name}
        onClick={() => setIsInfoWindowOpen(true)}
        >
            {isInfoWindowOpen && (
                <InfoWindow onCloseClick={() => setIsInfoWindowOpen(false)}
                position={position}
                ><InfoCard pet={pet} /></InfoWindow>
            )}
        </Marker>
    )}