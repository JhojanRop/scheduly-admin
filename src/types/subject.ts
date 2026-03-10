import { z } from 'zod'

export const subjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  userId: z.string(),
})

export const createSubjectSchema = z.object({
  name: z.string().min(2, 'Mínimo 2 caracteres'),
})

export type Subject = z.infer<typeof subjectSchema>
export type CreateSubject = z.infer<typeof createSubjectSchema>