import { useLogout } from '../hooks/useAuth'

const DashboardPage = () => {
  const { mutate: logout, isPending } = useLogout()

  return (
    <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center">
      <div className="bg-white rounded-2xl border border-[#E2E1DA] p-10 text-center">
        <h1 className="text-2xl font-semibold text-[#1A1A18] mb-2">Dashboard</h1>
        <p className="text-sm text-[#6B6B63] mb-8">Bienvenido a Scheduly</p>
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