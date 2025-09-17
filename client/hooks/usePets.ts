import { getPets } from '../apis/pets'
import { Pet } from '../../models/pet'
import { useQuery } from '@tanstack/react-query'

export function usePets() {
  const query = useQuery<Pet[], Error>({
    queryKey: ['pets'],
    queryFn: getPets,
  })
  return query
}
