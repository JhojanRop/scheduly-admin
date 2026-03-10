import api from '../lib/axios'
import type { Professor, CreateProfessor } from '../types/professor'

export const getProfessorsRequest = async (): Promise<Professor[]> => {
  const response = await api.get('/professors')
  return response.data
}

export const createProfessorRequest = async (data: CreateProfessor): Promise<Professor> => {
  const response = await api.post('/professors', data)
  return response.data
}