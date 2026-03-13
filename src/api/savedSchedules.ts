import api from '../lib/axios'
import type { CreateSavedSchedule } from '../types/savedSchedule'

export const createSavedScheduleRequest = async (data: CreateSavedSchedule) => {
  const response = await api.post('/saved-schedules', data)
  return response.data
}