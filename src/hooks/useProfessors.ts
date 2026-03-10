import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getProfessorsRequest, createProfessorRequest } from '../api/professors'
import type { CreateProfessor } from '../types/professor'

export const useProfessors = () => {
  return useQuery({
    queryKey: ['professors'],
    queryFn: getProfessorsRequest,
  })
}

export const useCreateProfessor = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateProfessor) => createProfessorRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['professors'] })
    },
  })
}