import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getRulesCatalogRequest, getRulesRequest, createRuleRequest, deleteRuleRequest, updateRuleRequest } from '../api/rules'
import type { CreateRule } from '../types/rule'

export const useRulesCatalog = () => {
  return useQuery({
    queryKey: ['rules-catalog'],
    queryFn: getRulesCatalogRequest,
  })
}

export const useRules = () => {
  return useQuery({
    queryKey: ['rules'],
    queryFn: getRulesRequest,
  })
}

export const useCreateRule = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateRule) => createRuleRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rules'] })
    },
  })
}

export const useUpdateRule = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateRule> }) =>
      updateRuleRequest(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rules'] })
    },
  })
}

export const useDeleteRule = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteRuleRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rules'] })
    },
  })
}