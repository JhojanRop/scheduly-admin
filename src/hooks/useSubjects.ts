import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getSubjectsRequest, createSubjectRequest, deleteSubjectRequest } from '../api/subjects'
import type { CreateSubject } from '../types/subject'

export const useSubjects = () => {
  return useQuery({
    queryKey: ['subjects'],
    queryFn: getSubjectsRequest,
  })
}

export const useCreateSubject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateSubject) => createSubjectRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] })
    },
  })
}

export const useDeleteSubject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteSubjectRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subjects'] })
    },
  })
}