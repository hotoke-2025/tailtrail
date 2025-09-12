import { Pet } from '../../../models/pet'


export const getCoordsFromAddress = async (address: string): Promise<{ lat: number; lng: number }> => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
    )
    const data = await response.json()
    
    if (data.results && data.results.length > 0) {
      const location = data.results[0].geometry.location
      return {
        lat: location.lat,
        lng: location.lng
      }
    }
    throw new Error('Address not found')
  } catch (error) {
    console.error('Geocoding error:', error)
    throw error
  }
}