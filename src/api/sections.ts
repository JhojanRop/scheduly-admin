import api from '../lib/axios'
import type { Section, CreateSection } from '../types/section'

export const getSectionsRequest = async (): Promise<Section[]> => {
  const response = await api.get('/sections')
  return response.data
}

export const createSectionRequest = async (data: CreateSection): Promise<Section> => {
  const response = await api.post('/sections', data)
  return response.data
}

export const deleteSectionRequest = async (id: string): Promise<void> => {
  await api.delete(`/sections/${id}`)
}