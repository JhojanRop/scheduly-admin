import { z } from 'zod'

export const scheduleResultSectionSchema = z.object({
  sectionId: z.string(),
  subject: z.string(),
  professor: z.string().nullable(),
  startTime: z.string(),
  endTime: z.string(),
  days: z.array(z.string()),
})

export const scheduleResultSchema = z.object({
  rank: z.number(),
  score: z.number(),
  sections: z.array(scheduleResultSectionSchema),
})

export const generateScheduleSchema = z.object({
  subjectIds: z.array(z.string()).min(1),
})

export type ScheduleResultSection = z.infer<typeof scheduleResultSectionSchema>
export type ScheduleResult = z.infer<typeof scheduleResultSchema>
export type GenerateSchedule = z.infer<typeof generateScheduleSchema>