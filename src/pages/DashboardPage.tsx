import { useLogout } from '../hooks/useAuth'
import { useMe } from '../hooks/useUser'

const DashboardPage = () => {
  const { mutate: logout, isPending } = useLogout()
  const { data: profile, isLoading } = useMe()

  if (isLoading) return (
    <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center">
      <p className="text-sm text-[#6B6B63]">Cargando...</p>
    </div>
  )

  if (!profile?.hasData) return (
    <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center">
      <div className="bg-white rounded-2xl border border-[#E2E1DA] p-10 text-center max-w-md">
        <h1 className="text-2xl font-semibold text-[#1A1A18] mb-2">¡Bienvenido a Scheduly!</h1>
        <p className="text-sm text-[#6B6B63] mb-8">Antes de generar tu horario, necesitas configurar tus materias, profesores y secciones.</p>
        <button className="px-6 py-2.5 bg-[#2D5A27] text-white text-sm font-medium rounded-lg hover:bg-[#244820] transition-colors">
          Comenzar configuración →
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center">
      <div className="bg-white rounded-2xl border border-[#E2E1DA] p-10 text-center">
        <h1 className="text-2xl font-semibold text-[#1A1A18] mb-2">Dashboard</h1>
        <p className="text-sm text-[#6B6B63] mb-8">Bienvenido de nuevo, {profile.fullName}</p>
        <button
          onClick={() => logout()}
          disabled={isPending}
          className="px-6 py-2.5 bg-[#2D5A27] text-white text-sm font-medium rounded-lg hover:bg-[#244820] disabled:opacity-60 transition-colors"
        >
          {isPending ? 'Cerrando...' : 'Cerrar sesión'}
        </button>
      </div>
    </div>
  )
}

export default DashboardPage