import { useMemo, useState } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useRulesCatalog, useRules, useCreateRule, useDeleteRule, useUpdateRule } from '../../hooks/useRules'
import { useProfessors } from '../../hooks/useProfessors'
import type { CatalogRule, Rule } from '../../types/rule'

type ParamValue = number | string | { start: string; end: string }
type RuleWithName = Rule & { name: string }

const ParameterInput = ({
  catalog,
  value,
  onChange,
}: {
  catalog: CatalogRule
  value: ParamValue | undefined
  onChange: (val: ParamValue) => void
}) => {
  const { data: professors = [] } = useProfessors()
  if (!catalog.parameter) return null
  const { type, label, min, max } = catalog.parameter

  if (type === 'number') return (
    <div className="mt-2">
      <label className="text-xs text-[#6B6B63] mb-1 block">{label}</label>
      <input type="number" min={min} max={max} value={(value as number | undefined) ?? ''} onChange={e => onChange(Number(e.target.value))}
        className="w-full px-3 py-2 rounded-lg border border-[#E2E1DA] bg-[#F7F6F2] text-sm outline-none focus:border-[#2D5A27] focus:bg-white transition-colors" />
    </div>
  )

  if (type === 'timeRange') {
    const timeVal = value as { start: string; end: string } | undefined
    return (
      <div className="mt-2">
        <label className="text-xs text-[#6B6B63] mb-1 block">{label}</label>
        <div className="grid grid-cols-2 gap-2">
          <input type="time" value={timeVal?.start ?? ''} onChange={e => onChange({ ...timeVal, start: e.target.value, end: timeVal?.end ?? '' })}
            className="px-3 py-2 rounded-lg border border-[#E2E1DA] bg-[#F7F6F2] text-sm outline-none focus:border-[#2D5A27] focus:bg-white transition-colors" />
          <input type="time" value={timeVal?.end ?? ''} onChange={e => onChange({ start: timeVal?.start ?? '', ...timeVal, end: e.target.value })}
            className="px-3 py-2 rounded-lg border border-[#E2E1DA] bg-[#F7F6F2] text-sm outline-none focus:border-[#2D5A27] focus:bg-white transition-colors" />
        </div>
      </div>
    )
  }

  if (type === 'daySelect') {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    return (
      <div className="mt-2">
        <label className="text-xs text-[#6B6B63] mb-1 block">{label}</label>
        <select value={(value as number | string | undefined) ?? ''} onChange={e => onChange(Number(e.target.value))}
          className="w-full px-3 py-2 rounded-lg border border-[#E2E1DA] bg-[#F7F6F2] text-sm outline-none focus:border-[#2D5A27] focus:bg-white transition-colors">
          <option value="">Selecciona un día</option>
          {days.map((d, i) => <option key={i} value={i}>{d}</option>)}
        </select>
      </div>
    )
  }

  if (type === 'professorSelect') return (
    <div className="mt-2">
      <label className="text-xs text-[#6B6B63] mb-1 block">{label}</label>
      <select value={(value as string | undefined) ?? ''} onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-[#E2E1DA] bg-[#F7F6F2] text-sm outline-none focus:border-[#2D5A27] focus:bg-white transition-colors">
        <option value="">Selecciona un profesor</option>
        {professors.map(p => <option key={p.id} value={p.id}>{p.fullName}</option>)}
      </select>
    </div>
  )

  return null
}

const SortableRule = ({ rule, index, onRemove }: { rule: RuleWithName; index: number; onRemove: () => void }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: rule.id })
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-3 px-4 py-3 bg-white border border-[#E2E1DA] rounded-lg">
      <div {...attributes} {...listeners} className="cursor-grab text-[#A8A89E] hover:text-[#6B6B63] transition-colors select-none">⠿</div>
      <div className="w-6 h-6 rounded-full bg-[#E8F0E6] text-[#2D5A27] text-xs font-semibold flex items-center justify-center shrink-0">
        {index + 1}
      </div>
      <span className="flex-1 text-sm font-medium text-[#1A1A18]">{rule.name}</span>
      <button onClick={onRemove} className="text-xs text-[#A8A89E] hover:text-red-400 transition-colors">Quitar</button>
    </div>
  )
}

const RulesStep = () => {
  const { data: catalog = [], isLoading: loadingCatalog } = useRulesCatalog()
  const { data: savedRules = [], isLoading: loadingRules } = useRules()
  const { mutate: createRule } = useCreateRule()
  const { mutate: deleteRule } = useDeleteRule()
  const { mutate: updateRule } = useUpdateRule()

  const [dragOrderIds, setDragOrderIds] = useState<string[] | null>(null)
  const [localParamOverrides, setLocalParamOverrides] = useState<Record<string, ParamValue>>({})

  const orderedRules = useMemo<RuleWithName[]>(() => {
    if (!savedRules.length || !catalog.length) return []
    const sorted = [...savedRules]
      .sort((a, b) => a.priorityOrder - b.priorityOrder)
      .map(rule => ({
        ...rule,
        name: catalog.find(c => c.type === rule.type)?.name ?? rule.type,
      }))
    if (!dragOrderIds) return sorted
    return dragOrderIds
      .map(id => sorted.find(r => r.id === id))
      .filter((r): r is RuleWithName => r !== undefined)
  }, [savedRules, catalog, dragOrderIds])

  const baseParamValues = useMemo<Record<string, ParamValue>>(() => {
    const params: Record<string, ParamValue> = {}
    savedRules.forEach(r => { if (r.parameters !== null) params[r.type] = r.parameters as ParamValue })
    return params
  }, [savedRules])

  const paramValues: Record<string, ParamValue> = { ...baseParamValues, ...localParamOverrides }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const selectedTypes = orderedRules.map(r => r.type)

  const handleToggle = (catalogRule: CatalogRule) => {
    setDragOrderIds(null)
    if (selectedTypes.includes(catalogRule.type)) {
      const rule = orderedRules.find(r => r.type === catalogRule.type)
      if (rule) deleteRule(rule.id)
    } else {
      createRule({
        type: catalogRule.type,
        priorityOrder: orderedRules.length + 1,
        parameters: paramValues[catalogRule.type] ?? null,
      })
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = orderedRules.findIndex(r => r.id === active.id)
    const newIndex = orderedRules.findIndex(r => r.id === over.id)
    const reordered = arrayMove(orderedRules, oldIndex, newIndex)

    setDragOrderIds(reordered.map(r => r.id))

    reordered.forEach((rule, index) => {
      if (rule.priorityOrder !== index + 1) {
        updateRule({ id: rule.id, data: { priorityOrder: index + 1 } })
      }
    })
  }

  const handleParamChange = (type: string, val: ParamValue) => {
    setLocalParamOverrides(prev => ({ ...prev, [type]: val }))
    const rule = orderedRules.find(r => r.type === type)
    if (rule) updateRule({ id: rule.id, data: { parameters: val } })
  }

  if (loadingCatalog || loadingRules) return <p className="text-sm text-[#A8A89E]">Cargando reglas...</p>

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-semibold text-[#1A1A18] mb-1">Reglas de optimización</h2>
        <p className="text-sm text-[#6B6B63]">Selecciona las reglas y ordénalas por prioridad.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* Catálogo */}
        <div className="flex flex-col gap-2 flex-1">
          <p className="text-xs font-medium text-[#6B6B63] uppercase tracking-wide">Disponibles</p>
          {catalog.map(rule => {
            const isSelected = selectedTypes.includes(rule.type)
            return (
              <div key={rule.type} className={`rounded-lg border transition-colors ${isSelected ? 'border-[#2D5A27] bg-[#E8F0E6]' : 'border-[#E2E1DA] bg-[#F7F6F2]'}`}>
                <div className="flex items-center gap-3 px-4 py-3 cursor-pointer" onClick={() => handleToggle(rule)}>
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors
              ${isSelected ? 'bg-[#2D5A27] border-[#2D5A27]' : 'border-[#A8A89E]'}`}>
                    {isSelected && <span className="text-white text-[10px]">✓</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1A1A18]">{rule.name}</p>
                    <p className="text-xs text-[#6B6B63]">{rule.description}</p>
                  </div>
                </div>
                {isSelected && rule.parameter && (
                  <div className="px-4 pb-3">
                    <ParameterInput
                      catalog={rule}
                      value={paramValues[rule.type]}
                      onChange={val => handleParamChange(rule.type, val)}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Orden */}
        <div className="flex flex-col gap-2 flex-1">
          <p className="text-xs font-medium text-[#6B6B63] uppercase tracking-wide">
            Orden de prioridad
          </p>
          {orderedRules.length === 0 ? (
            <p className="text-sm text-[#A8A89E] text-center py-8">Selecciona reglas para ordenarlas</p>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={orderedRules.map(r => r.id)} strategy={verticalListSortingStrategy}>
                {orderedRules.map((rule, index) => (
                  <SortableRule
                    key={rule.id}
                    rule={rule}
                    index={index}
                    onRemove={() => handleToggle(catalog.find(c => c.type === rule.type)!)}
                  />
                ))}
              </SortableContext>
            </DndContext>
          )}
        </div>

      </div>
    </div>
  )
}

export default RulesStep