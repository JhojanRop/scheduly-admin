import { z } from 'zod'

export const createSavedScheduleSchema = z.object({
  name: z.string().min(1),
  sectionIds: z.array(z.string()),
})

export type CreateSavedSchedule = z.infer<typeof createSavedScheduleSchema>