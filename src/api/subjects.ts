import api from '../lib/axios'
import type { Subject, CreateSubject } from '../types/subject'

export const getSubjectsRequest = async (): Promise<Subject[]> => {
  const response = await api.get('/subjects')
  return response.data
}

export const createSubjectRequest = async (data: CreateSubject): Promise<Subject> => {
  const response = await api.post('/subjects', data)
  return response.data
}

export const deleteSubjectRequest = async (id: string): Promise<void> => {
  await api.delete(`/subjects/${id}`)
}