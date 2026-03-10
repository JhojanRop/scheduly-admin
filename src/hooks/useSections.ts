import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getSectionsRequest, createSectionRequest, deleteSectionRequest } from '../api/sections'
import type { CreateSection } from '../types/section'

export const useSections = () => {
  return useQuery({
    queryKey: ['sections'],
    queryFn: getSectionsRequest,
  })
}

export const useCreateSection = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateSection) => createSectionRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sections'] })
    },
  })
}

export const useDeleteSection = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteSectionRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sections'] })
    },
  })
}