import { useState, useEffect } from 'react'
import { getPets } from '../apis/pets'
import { Pet } from '../../models/pet'

export function usePets() {
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPets() {
      try {
        const petsData = await getPets()
        setPets(petsData)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setLoading(false)
      }
    }

    fetchPets()
  }, [])

  return { pets, loading, error }
}