import api from '../lib/axios'
import type { CatalogRule, Rule, CreateRule } from '../types/rule'

export const getRulesCatalogRequest = async (): Promise<CatalogRule[]> => {
  const response = await api.get('/rules/catalog')
  return response.data
}

export const getRulesRequest = async (): Promise<Rule[]> => {
  const response = await api.get('/rules')
  return response.data
}

export const createRuleRequest = async (data: CreateRule): Promise<Rule> => {
  const response = await api.post('/rules', data)
  return response.data
}

export const updateRuleRequest = async (id: string, data: Partial<CreateRule>): Promise<Rule> => {
  const response = await api.put(`/rules/${id}`, data)
  return response.data
}

export const deleteRuleRequest = async (id: string): Promise<void> => {
  await api.delete(`/rules/${id}`)
}