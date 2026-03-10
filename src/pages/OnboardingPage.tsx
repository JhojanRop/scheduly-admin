import { useState } from 'react'
import SubjectsStep from '../components/onboarding/SubjectsStep'
import SectionsStep from '../components/onboarding/SectionsStep'

const steps = [
  { id: 1, label: 'Materias', component: SubjectsStep },
  { id: 2, label: 'Secciones', component: SectionsStep },
  { id: 3, label: 'Reglas', component: () => <div>Reglas — próximamente</div> },
]

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const StepComponent = steps[currentStep - 1].component


  return (
    <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-[#E2E1DA] p-8 w-full max-w-lg sm:max-w-2xl">


        {/* Steps indicator */}
        <div className="flex items-center justify-center mb-10 gap-1">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-1">
              <div className="flex items-center gap-1.5">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 transition-all
              ${currentStep === step.id ? 'bg-[#2D5A27] text-white' : ''}
              ${currentStep > step.id ? 'bg-[#E8F0E6] text-[#2D5A27]' : ''}
              ${currentStep < step.id ? 'bg-[#F7F6F2] text-[#A8A89E]' : ''}
            `}>
                  {currentStep > step.id ? '✓' : step.id}
                </div>
                <span className={`text-xs whitespace-nowrap transition-all hidden sm:block
              ${currentStep === step.id ? 'text-[#1A1A18] font-medium' : 'text-[#A8A89E]'}
            `}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 h-px mx-2 shrink-0 transition-all
              ${currentStep > step.id ? 'bg-[#2D5A27]' : 'bg-[#E2E1DA]'}
            `} />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="min-h-48 flex items-center justify-center text-sm text-[#6B6B63]">
          <StepComponent />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-10">
          <button
            onClick={() => setCurrentStep(s => s - 1)}
            disabled={currentStep === 1}
            className="px-4 py-2 text-sm font-medium text-[#6B6B63] border border-[#E2E1DA] rounded-lg hover:bg-[#F7F6F2] disabled:opacity-0 transition-colors"
          >
            ← Atrás
          </button>
          <div className="flex items-center gap-2">
            {steps.map(step => (
              <div key={step.id} className={`h-1.5 rounded-full transition-all
                ${currentStep === step.id ? 'w-4 bg-[#2D5A27]' : 'w-1.5 bg-[#E2E1DA]'}
              `} />
            ))}
          </div>
          <button
            onClick={() => setCurrentStep(s => s + 1)}
            disabled={currentStep === steps.length}
            className="px-4 py-2 text-sm font-medium bg-[#2D5A27] text-white rounded-lg hover:bg-[#244820] disabled:opacity-60 transition-colors"
          >
            Siguiente →
          </button>
        </div>

      </div>
    </div>
  )
}

export default OnboardingPage