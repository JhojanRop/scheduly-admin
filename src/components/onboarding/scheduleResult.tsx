import { useNavigate } from 'react-router-dom'
import type { ScheduleResult } from '../../types/scheduling'
import { useCreateSavedSchedule } from '../../hooks/useSavedSchedules'

const DAYS_ES: Record<string, string> = {
  monday: 'Lun', tuesday: 'Mar', wednesday: 'Mié',
  thursday: 'Jue', friday: 'Vie', saturday: 'Sáb', sunday: 'Dom'
}

const ScheduleResults = ({ results }: { results: ScheduleResult[] }) => {
  const navigate = useNavigate()
  const { mutate: saveSchedule, isPending } = useCreateSavedSchedule()

  const handleSave = (result: ScheduleResult) => {
    saveSchedule({
      name: `Horario opción ${result.rank}`,
      sectionIds: result.sections.map(s => s.sectionId),
    }, {
      onSuccess: () => navigate('/dashboard')
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold text-[#1A1A18] mb-1">Tus mejores horarios</h2>
        <p className="text-sm text-[#6B6B63]">Escoge el que más se adapte a ti y guárdalo.</p>
      </div>

      <div className="flex flex-col gap-4">
        {results.map((result, i) => (
          <div
            key={result.rank}
            className={`rounded-xl border p-5 transition-colors
              ${i === 0 ? 'border-[#2D5A27] bg-[#E8F0E6]' : 'border-[#E2E1DA] bg-[#F7F6F2]'}
            `}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {i === 0 && (
                  <span className="text-xs font-semibold bg-[#2D5A27] text-white px-2 py-0.5 rounded-full">
                    Mejor opción
                  </span>
                )}
                <span className="text-xs text-[#6B6B63]">Opción {result.rank}</span>
              </div>
              <div className="text-right">
                <p className="text-2xl font-semibold text-[#2D5A27]">{result.score.toFixed(0)}</p>
                <p className="text-xs text-[#A8A89E]">score</p>
              </div>
            </div>

            {/* Secciones */}
            <div className="flex flex-col gap-2 mb-4">
              {result.sections.map(section => (
                <div key={section.sectionId} className="flex items-center justify-between bg-white rounded-lg px-3 py-2">
                  <div>
                    <p className="text-sm font-medium text-[#1A1A18]">{section.subject}</p>
                    {section.professor && (
                      <p className="text-xs text-[#6B6B63]">{section.professor}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-[#1A1A18]">
                      {section.startTime} – {section.endTime}
                    </p>
                    <p className="text-xs text-[#6B6B63]">
                      {section.days.map(d => DAYS_ES[d] ?? d).join(' · ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Acción */}
            <button
              onClick={() => handleSave(result)}
              disabled={isPending}
              className={`w-full py-2 text-sm font-medium rounded-lg transition-colors
                ${i === 0
                  ? 'bg-[#2D5A27] text-white hover:bg-[#244820]'
                  : 'bg-white text-[#2D5A27] border border-[#2D5A27] hover:bg-[#E8F0E6]'
                } disabled:opacity-50`}
            >
              {isPending ? 'Guardando...' : 'Elegir este horario'}
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('/dashboard')}
        className="text-sm text-[#A8A89E] hover:text-[#6B6B63] transition-colors text-center"
      >
        Ir al inicio sin guardar →
      </button>
    </div>
  )
}

export default ScheduleResults