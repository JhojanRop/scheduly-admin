import api from '../lib/axios'
import type { ScheduleResult, GenerateSchedule } from '../types/scheduling'

export const generateScheduleRequest = async (data: GenerateSchedule): Promise<ScheduleResult[]> => {
  const response = await api.post('/scheduling/generate', data)
  return response.data
}