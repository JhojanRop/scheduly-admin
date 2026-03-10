import api from '../lib/axios'
import type { UserProfile } from '../types/auth'

export const getMeRequest = async (): Promise<UserProfile> => {
  const response = await api.get('/users/me')
  return response.data
}