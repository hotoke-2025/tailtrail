import { useState, useEffect } from 'react'
import { getPets } from '../apis/pets'
import { Pet } from '../../models/pet'
import { useQuery } from '@tanstack/react-query'
import { query } from 'express'

export function usePets() {
  //   const { data, isLoading, error } = useQuery<Pet[],
  //     queryKey: ['pets'],
  //     queryFn: getPets,
  // })
  // return {
  //   pets:data,
  //   loading: isLoading,
  //   error: error ? error.message :null,
  // }
  // const [pets, setPets] = useState<Pet[]>([])
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState<string | null>(null)

  // replace with useQuery
  // set key to be pets
  // return useQuery({
  const query = useQuery<Pet[], Error>({
    queryKey: ['pets'],
    queryFn: getPets,
  })
  return query
}

// useEffect(() => {
//   async function fetchPets() {
//     try {
//       const petsData = await getPets()
//       setPets(petsData)
//       setLoading(false)
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An error occurred')
//       setLoading(false)
//     }
//   }

//   fetchPets()
// }, [])
