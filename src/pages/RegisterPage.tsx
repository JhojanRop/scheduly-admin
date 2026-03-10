import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, Navigate } from 'react-router-dom'
import { registerSchema, type RegisterForm } from '../types/auth'
import { useRegister } from '../hooks/useAuth'
import useAuthStore from '../store/authStore'
import type { AxiosError } from 'axios'

export default function RegisterPage() {
  const { isAuthenticated } = useAuthStore()
  const { mutate, isPending, isError, error } = useRegister()

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema)
  })

  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  const onSubmit = (data: RegisterForm) => {
    mutate(data)
  }

  return (
    <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm border border-[#E2E1DA] p-10 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-[#1A1A18] mb-1">Crear cuenta</h1>
        <p className="text-sm text-[#6B6B63] mb-8">Empieza a optimizar tus horarios</p>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-[#6B6B63] mb-1.5 block">Nombre completo</label>
            <input
              {...register('fullName')}
              placeholder="John Doe"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E1DA] bg-[#F7F6F2] text-sm outline-none focus:border-[#2D5A27] focus:bg-white transition-colors"
            />
            {errors.fullName && (
              <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="text-xs font-medium text-[#6B6B63] mb-1.5 block">Usuario</label>
            <input
              {...register('username')}
              placeholder="johndoe"
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
              {(error as AxiosError<{ message?: string }>)?.response?.data?.message || 'Error al crear la cuenta'}
            </p>
          )}

          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isPending}
            className="w-full py-2.5 bg-[#2D5A27] text-white text-sm font-medium rounded-lg hover:bg-[#244820] disabled:opacity-60 transition-colors mt-2"
          >
            {isPending ? 'Creando cuenta...' : 'Registrarse'}
          </button>
        </div>

        <p className="text-center text-sm text-[#6B6B63] mt-6">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-[#2D5A27] font-medium">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}