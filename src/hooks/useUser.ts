import { useQuery } from '@tanstack/react-query'
import { getMeRequest } from '../api/users'

export const useMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: getMeRequest,
  })
}