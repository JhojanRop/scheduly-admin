import { useState } from 'react'
import { useSubjects, useCreateSubject, useDeleteSubject } from '../../hooks/useSubjects'

export default function SubjectsStep() {
  const [input, setInput] = useState('')
  const { data: subjects = [], isLoading } = useSubjects()
  const { mutate: createSubject, isPending: isCreating } = useCreateSubject()
  const { mutate: deleteSubject } = useDeleteSubject()

  const handleAdd = () => {
    const name = input.trim()
    if (!name) return
    createSubject({ name }, {
      onSuccess: () => setInput('')
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAdd()
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold text-[#1A1A18] mb-1">Tus materias</h2>
        <p className="text-sm text-[#6B6B63]">Agrega las materias que vas a cursar este semestre.</p>
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ej: Cálculo II"
          className="flex-1 px-3.5 py-2.5 rounded-lg border border-[#E2E1DA] bg-[#F7F6F2] text-sm outline-none focus:border-[#2D5A27] focus:bg-white transition-colors"
        />
        <button
          onClick={handleAdd}
          disabled={isCreating || !input.trim()}
          className="px-4 py-2.5 bg-[#2D5A27] text-white text-sm font-medium rounded-lg hover:bg-[#244820] disabled:opacity-50 transition-colors"
        >
          {isCreating ? '...' : 'Agregar'}
        </button>
      </div>

      {/* List */}
      {isLoading ? (
        <p className="text-sm text-[#A8A89E]">Cargando...</p>
      ) : subjects.length === 0 ? (
        <p className="text-sm text-[#A8A89E] text-center py-6">Aún no has agregado materias</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {subjects.map(subject => (
            <li key={subject.id} className="flex items-center justify-between px-4 py-3 bg-[#F7F6F2] rounded-lg">
              <span className="text-sm font-medium text-[#1A1A18]">{subject.name}</span>
              <button
                onClick={() => deleteSubject(subject.id)}
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
