import { Link, Navigate } from 'react-router-dom'
import { loginSchema, type LoginForm } from '../types/auth'
import { useForm } from 'react-hook-form'
import { useLogin } from '../hooks/useAuth'
import { zodResolver } from '@hookform/resolvers/zod'
import type { AxiosError } from 'axios'
import useAuthStore from '../store/authStore'

export default function LoginPage() {
  const { isAuthenticated } = useAuthStore()
  const { mutate, isPending, isError, error } = useLogin()

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  })

  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  const onSubmit = (data: LoginForm) => {
    mutate(data)
  }

  return (
    <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm border border-[#E2E1DA] p-10 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-[#1A1A18] mb-1">Bienvenido de nuevo</h1>
        <p className="text-sm text-[#6B6B63] mb-8">Ingresa para gestionar tus horarios</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-[#6B6B63] mb-1.5 block">Usuario</label>
            <input
              {...register('username')}
              placeholder="Usuario"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E1DA] bg-[#F7F6F2] text-sm outline-none focus:border-[#2D5A27] focus:bg-white transition-colors"
            />
            {errors.username && (
              <p className="text-xs text-red-500 mt-1">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="text-xs font-medium text-[#6B6B63] mb-1.5 block">Contraseña</label>
            <input
              {...register('password')}
              type="password"
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E1DA] bg-[#F7F6F2] text-sm outline-none focus:border-[#2D5A27] focus:bg-white transition-colors"
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          {isError && (
            <p className="text-xs text-red-500">
              {(error as AxiosError<{ message?: string }>)?.response?.data?.message || 'Credenciales incorrectas'}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2.5 bg-[#2D5A27] text-white text-sm font-medium rounded-lg hover:bg-[#244820] disabled:opacity-60 transition-colors mt-2"
          >
            {isPending ? 'Ingresando...' : 'Iniciar sesión'}
          </button>
        </form>

        <p className="text-center text-sm text-[#6B6B63] mt-6">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-[#2D5A27] font-medium">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  )
}