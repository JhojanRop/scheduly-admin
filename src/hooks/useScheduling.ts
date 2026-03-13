import { useMutation } from '@tanstack/react-query'
import { generateScheduleRequest } from '../api/scheduling'
import type { GenerateSchedule } from '../types/scheduling'

export const useGenerateSchedule = () => {
  return useMutation({
    mutationFn: (data: GenerateSchedule) => generateScheduleRequest(data),
  })
}