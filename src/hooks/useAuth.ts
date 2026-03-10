import { jwtDecode } from 'jwt-decode'
import { loginRequest, registerRequest, logoutRequest } from '../api/auth'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import type { LoginForm, RegisterForm } from '../types/auth'
import type { User } from '../types/auth'
import useAuthStore from '../store/authStore'

export const useLogin = () => {
  const { setAuth } = useAuthStore()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: LoginForm) => loginRequest(data),
    onSuccess: (response) => {
      const user = jwtDecode<User>(response.accessToken)
      setAuth(user, response.accessToken)
      navigate('/dashboard')
    },
  })
}

export const useRegister = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: RegisterForm) => registerRequest(data),
    onSuccess: () => {
      navigate('/login')
    },
  })
}

export const useLogout = () => {
  const { logout } = useAuthStore()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: logoutRequest,
    onSettled: () => {
      logout()
      navigate('/login')
    },
  })
}