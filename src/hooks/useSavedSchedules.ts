import { useMutation } from '@tanstack/react-query'
import { createSavedScheduleRequest } from '../api/savedSchedules'
import type { CreateSavedSchedule } from '../types/savedSchedule'

export const useCreateSavedSchedule = () => {
  return useMutation({
    mutationFn: (data: CreateSavedSchedule) => createSavedScheduleRequest(data),
  })
}