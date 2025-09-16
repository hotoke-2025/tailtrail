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
  const [iconUrl, setIconUrl] = useState('')
  const [isHovered, setIsHovered] = useState(false)

  const lostColor = pet.lost ? '#f87171' : '#4ade80'

  useEffect(() => {
    createCustomIcon(pet.photoUrl)
  }, [pet.photoUrl, pet.lost, isHovered])

  const createCustomIcon = (imageUrl: string) => {
    const canvas = document.createElement('canvas')
    const size = isHovered ? 70 : 48
    const imageSize = isHovered ? 59 : 39
    const borderWidth = isHovered ? 4 : 3
    const cornerRadius = 12

    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = imageUrl

    img.onload = () => {
      ctx.clearRect(0, 0, size, size)

      //  Thicc border,
      ctx.fillStyle = lostColor
      roundRect(ctx, 0, 0, size, size, cornerRadius)
      ctx.fill()

      // Fill behind image with lostcolor
      ctx.fillStyle = lostColor
      roundRect(
        ctx,
        borderWidth,
        borderWidth,
        size - borderWidth * 2,
        size - borderWidth * 2,
        cornerRadius - 2,
      )
      ctx.fill()

      // Image rounded corners
      roundRect(
        ctx,
        borderWidth + 2,
        borderWidth + 2,
        imageSize,
        imageSize,
        cornerRadius - 3,
      )
      ctx.clip()

      // Draw image
      ctx.drawImage(img, borderWidth + 2, borderWidth + 2, imageSize, imageSize)
      ctx.restore()

      setIconUrl(canvas.toDataURL('image/png', 1.0))
    }

    img.onerror = () => {
      // error for image that just makes a blank icon with the lost color
      ctx.clearRect(0, 0, size, size)
      ctx.fillStyle = lostColor
      setIconUrl(canvas.toDataURL('image/png', 1.0))
    }
  }

  //Copied from MDN (GOAT FOR CANVAS RENDERING I LEARNT IT IN LIKE AN HOUR)
  //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/roundRect
  const roundRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
  ) => {
    ctx.beginPath()
    ctx.moveTo(x + radius, y)
    ctx.arcTo(x + width, y, x + width, y + height, radius)
    ctx.arcTo(x + width, y + height, x, y + height, radius)
    ctx.arcTo(x, y + height, x, y, radius)
    ctx.arcTo(x, y, x + width, y, radius)
    ctx.closePath()
  }

  const customIcon = iconUrl
    ? {
        url: iconUrl,
        scaledSize: new google.maps.Size(
          isHovered ? 70 : 60,
          isHovered ? 70 : 60,
        ),
        anchor: new google.maps.Point(isHovered ? 35 : 30, isHovered ? 35 : 30),
      }
    : undefined

  if (!customIcon) return null

  return (
    <Marker
      position={position}
      icon={customIcon}
      title={pet.name}
      onClick={() => setIsInfoWindowOpen(true)}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      options={{ optimized: false }}
    >
      {isInfoWindowOpen && (
        <InfoWindow
          onCloseClick={() => setIsInfoWindowOpen(false)}
          position={position}
        >
          <InfoCard pet={pet} />
        </InfoWindow>
      )}
    </Marker>
  )
}
