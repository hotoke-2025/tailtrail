import { useState, useEffect } from 'react'
import { getPets, getPetsByStatus } from '../apis/pets'
import { Pet } from '../../models/pet'
import {loadingPawprint} from '../../apis/LoadingPaw.tsx'

export function usePets() {
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPets() {
      try {
        const petsData = await getPets()
        setPets(petsData)
        setLoading(loadingPawprint)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setLoading(false)
      }
    }

    fetchPets()
  }, [])

  return { pets, loading, error }
}