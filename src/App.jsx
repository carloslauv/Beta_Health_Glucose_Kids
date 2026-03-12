import { AppProvider, useApp } from './context/AppContext'
import ProgressBar from './components/layout/ProgressBar'
import StepLayout from './components/layout/StepLayout'
import Step1Welcome from './components/steps/Step1Welcome'
import Step2PlateBuilder from './components/steps/Step2PlateBuilder'
import Step3MealFrequency from './components/steps/Step3MealFrequency'
import Step4BodyReaction from './components/steps/Step4BodyReaction'
import Step5LongTermImpact from './components/steps/Step5LongTermImpact'
import Step6Compare from './components/steps/Step6Compare'

function AppInner() {
  const { state } = useApp()
  const { currentStep } = state

  const STEPS = {
    1: <Step1Welcome />,
    2: <Step2PlateBuilder />,
    3: <Step3MealFrequency />,
    4: <Step4BodyReaction />,
    5: <Step5LongTermImpact />,
    6: <Step6Compare />,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍎</span>
            <span className="font-extrabold text-purple-700 text-sm sm:text-base">Glucose Explorer</span>
          </div>
          {currentStep > 1 && <ProgressBar currentStep={currentStep} />}
        </div>
      </header>

      {/* Step content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <StepLayout step={currentStep}>
          {STEPS[currentStep]}
        </StepLayout>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  )
}
