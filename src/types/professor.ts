import { z } from 'zod'

export const professorSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  userId: z.string(),
})

export const createProfessorSchema = z.object({
  fullName: z.string().min(2, 'Mínimo 2 caracteres'),
})

export type Professor = z.infer<typeof professorSchema>
export type CreateProfessor = z.infer<typeof createProfessorSchema>