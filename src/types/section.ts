import { z } from 'zod'

export const sectionSchema = z.object({
  id: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  subject: z.object({
    id: z.string(),
    name: z.string(),
  }),
  professor: z.object({
    id: z.string(),
    fullName: z.string(),
  }).nullable(),
  days: z.array(z.string()),
})

export const createSectionSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
  subjectId: z.string(),
  professorId: z.string().optional(),
  dayIds: z.array(z.number()).min(1, 'Selecciona al menos un día'),
})

export type Section = z.infer<typeof sectionSchema>
export type CreateSection = z.infer<typeof createSectionSchema>