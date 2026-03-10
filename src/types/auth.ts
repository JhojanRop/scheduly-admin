import { z } from 'zod'

export const userSchema = z.object({
  sub: z.string(),
  username: z.string(),
})

export const loginSchema = z.object({
  username: z.string().min(3, 'Mínimo 3 caracteres'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
})

export const registerSchema = z.object({
  fullName: z.string().min(2, 'Mínimo 2 caracteres'),
  username: z.string().min(3, 'Mínimo 3 caracteres'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
})

export const authResponseSchema = z.object({
  accessToken: z.string(),
})

export const registerResponseSchema = z.object({
  id: z.string(),
  username: z.string(),
  fullName: z.string(),
  createdAt: z.string(),
})

export type User = z.infer<typeof userSchema>
export type LoginForm = z.infer<typeof loginSchema>
export type RegisterForm = z.infer<typeof registerSchema>
export type AuthResponse = z.infer<typeof authResponseSchema>
export type RegisterResponse = z.infer<typeof registerResponseSchema>