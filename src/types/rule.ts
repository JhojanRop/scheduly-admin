import { z } from 'zod'

export const catalogRuleSchema = z.object({
  type: z.string(),
  name: z.string(),
  description: z.string(),
  parameter: z.object({
    type: z.string(),
    label: z.string(),
    required: z.boolean(),
    format: z.string(),
    min: z.number().optional(),
    max: z.number().optional(),
  }).nullable(),
})

export const ruleSchema = z.object({
  id: z.string(),
  type: z.string(),
  priorityOrder: z.number(),
  parameters: z.any().nullable(),
  userId: z.string(),
})

export const createRuleSchema = z.object({
  type: z.string(),
  priorityOrder: z.number(),
  parameters: z.any().nullable(),
})

export type CatalogRule = z.infer<typeof catalogRuleSchema>
export type Rule = z.infer<typeof ruleSchema>
export type CreateRule = z.infer<typeof createRuleSchema>