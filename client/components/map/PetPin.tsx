import { Marker, InfoWindow } from '@react-google-maps/api'
import { Pet } from '../../../models/pet'
import { useState } from 'react'

interface PetMarkerProps {
  pet: Pet
  position: google.maps.LatLngLiteral
}

export default function PetMarker({ pet, position }: PetMarkerProps) {
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false)