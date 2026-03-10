import { useState } from 'react'
import { useSubjects } from '../../hooks/useSubjects'
import { useProfessors, useCreateProfessor } from '../../hooks/useProfessors'
import { useSections, useCreateSection, useDeleteSection } from '../../hooks/useSections'

const DAYS = [
  { id: 1, label: 'L', fullLabel: 'Lunes' },
  { id: 2, label: 'M', fullLabel: 'Martes' },
  { id: 3, label: 'X', fullLabel: 'Miércoles' },
  { id: 4, label: 'J', fullLabel: 'Jueves' },
  { id: 5, label: 'V', fullLabel: 'Viernes' },
  { id: 6, label: 'S', fullLabel: 'Sábado' },
  { id: 7, label: 'D', fullLabel: 'Domingo' },
]

const SectionsStep = () => {
  const [subjectId, setSubjectId] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [selectedDays, setSelectedDays] = useState<number[]>([])
  const [professorQuery, setProfessorQuery] = useState('')
  const [professorId, setProfessorId] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)

  const { data: subjects = [] } = useSubjects()
  const { data: professors = [] } = useProfessors()
  const { data: sections = [], isLoading } = useSections()
  const { mutate: createSection, isPending: isCreating } = useCreateSection()
  const { mutate: deleteSection } = useDeleteSection()
  const { mutate: createProfessor, isPending: isCreatingProfessor } = useCreateProfessor()

  const filteredProfessors = professors.filter(p =>
    p.fullName.toLowerCase().includes(professorQuery.toLowerCase())
  )

  const showCreateOption =
    professorQuery.trim().length > 1 &&
    !professors.some(p => p.fullName.toLowerCase() === professorQuery.toLowerCase())

  const handleSelectProfessor = (id: string, name: string) => {
    setProfessorId(id)
    setProfessorQuery(name)
    setShowDropdown(false)
  }

  const handleCreateProfessor = () => {
    createProfessor({ fullName: professorQuery.trim() }, {
      onSuccess: (newProfessor) => {
        setProfessorId(newProfessor.id)
        setShowDropdown(false)
      }
    })
  }

  const toggleDay = (id: number) => {
    setSelectedDays(prev =>
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    )
  }

  const handleAdd = () => {
    if (!subjectId || !startTime || !endTime || selectedDays.length === 0) return
    createSection({
      subjectId,
      startTime,
      endTime,
      dayIds: selectedDays,
      ...(professorId ? { professorId } : {}),
    }, {
      onSuccess: () => {
        setSubjectId('')
        setStartTime('')
        setEndTime('')
        setSelectedDays([])
        setProfessorQuery('')
        setProfessorId('')
      }
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold text-[#1A1A18] mb-1">Secciones</h2>
        <p className="text-sm text-[#6B6B63]">Agrega los grupos con sus horarios y días.</p>
      </div>

      <div className="flex flex-col gap-3">

        {/* Materia */}
        <div>
          <label className="text-xs font-medium text-[#6B6B63] mb-1.5 block">Materia</label>
          <select
            value={subjectId}
            onChange={e => setSubjectId(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E1DA] bg-[#F7F6F2] text-sm outline-none focus:border-[#2D5A27] focus:bg-white transition-colors"
          >
            <option value="">Selecciona una materia</option>
            {subjects.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        {/* Horario */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-[#6B6B63] mb-1.5 block">Hora inicio</label>
            <input
              type="time"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E1DA] bg-[#F7F6F2] text-sm outline-none focus:border-[#2D5A27] focus:bg-white transition-colors"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[#6B6B63] mb-1.5 block">Hora fin</label>
            <input
              type="time"
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E1DA] bg-[#F7F6F2] text-sm outline-none focus:border-[#2D5A27] focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Días */}
        <div>
          <label className="text-xs font-medium text-[#6B6B63] mb-1.5 block">Días</label>
          <div className="flex gap-2">
            {DAYS.map(day => (
              <button
                key={day.id}
                onClick={() => toggleDay(day.id)}
                title={day.fullLabel}
                className={`w-9 h-9 rounded-lg text-xs font-semibold transition-colors
                  ${selectedDays.includes(day.id)
                    ? 'bg-[#2D5A27] text-white'
                    : 'bg-[#F7F6F2] text-[#6B6B63] hover:bg-[#E8F0E6]'
                  }`}
              >
                {day.label}
              </button>
            ))}
          </div>
        </div>

        {/* Profesor combobox */}
        <div className="relative">
          <label className="text-xs font-medium text-[#6B6B63] mb-1.5 block">Profesor <span className="text-[#A8A89E]">(opcional)</span></label>
          <input
            value={professorQuery}
            onChange={e => {
              setProfessorQuery(e.target.value)
              setProfessorId('')
              setShowDropdown(true)
            }}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
            placeholder="Buscar o crear profesor..."
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#E2E1DA] bg-[#F7F6F2] text-sm outline-none focus:border-[#2D5A27] focus:bg-white transition-colors"
          />
          {showDropdown && (filteredProfessors.length > 0 || showCreateOption) && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-[#E2E1DA] rounded-lg shadow-sm overflow-hidden">
              {filteredProfessors.map(p => (
                <button
                  key={p.id}
                  onMouseDown={() => handleSelectProfessor(p.id, p.fullName)}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-[#F7F6F2] transition-colors"
                >
                  {p.fullName}
                </button>
              ))}
              {showCreateOption && (
                <button
                  onMouseDown={handleCreateProfessor}
                  disabled={isCreatingProfessor}
                  className="w-full text-left px-4 py-2.5 text-sm text-[#2D5A27] font-medium hover:bg-[#E8F0E6] transition-colors border-t border-[#E2E1DA]"
                >
                  {isCreatingProfessor ? 'Creando...' : `+ Crear "${professorQuery.trim()}"`}
                </button>
              )}
            </div>
          )}
        </div>

        <button
          onClick={handleAdd}
          disabled={isCreating || !subjectId || !startTime || !endTime || selectedDays.length === 0}
          className="w-full py-2.5 bg-[#2D5A27] text-white text-sm font-medium rounded-lg hover:bg-[#244820] disabled:opacity-50 transition-colors"
        >
          {isCreating ? 'Agregando...' : 'Agregar sección'}
        </button>
      </div>

      {/* Lista */}
      {isLoading ? (
        <p className="text-sm text-[#A8A89E]">Cargando...</p>
      ) : sections.length === 0 ? (
        <p className="text-sm text-[#A8A89E] text-center py-4">Aún no has agregado secciones</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {sections.map(section => (
            <li key={section.id} className="flex items-center justify-between px-4 py-3 bg-[#F7F6F2] rounded-lg">
              <div>
                <p className="text-sm font-medium text-[#1A1A18]">{section.subject.name}</p>
                <p className="text-xs text-[#6B6B63]">
                  {section.startTime} – {section.endTime} · {section.days.join(', ')}
                  {section.professor && ` · ${section.professor.fullName}`}
                </p>
              </div>
              <button
                onClick={() => deleteSection(section.id)}
                className="text-xs text-[#A8A89E] hover:text-red-400 transition-colors"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SectionsStep