import api from '../lib/axios'
import type { LoginForm, RegisterForm, AuthResponse, RegisterResponse } from '../types/auth'

export const loginRequest = async (data: LoginForm): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', data)
  return response.data
}

export const registerRequest = async (data: RegisterForm): Promise<RegisterResponse> => {
  const response = await api.post('/auth/register', data)
  return response.data
}

export const logoutRequest = async (): Promise<void> => {
  await api.post('/auth/logout')
}