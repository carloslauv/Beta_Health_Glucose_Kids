import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'

export default function NavButtons({ canGoNext = true, nextLabel = 'Next →', onNext }) {
  const { state, dispatch } = useApp()
  const { currentStep } = state

  function handleBack() {
    if (currentStep > 1) dispatch({ type: 'SET_STEP', payload: currentStep - 1 })
  }

  function handleNext() {
    if (onNext) onNext()
    else if (currentStep < 6) dispatch({ type: 'SET_STEP', payload: currentStep + 1 })
  }

  return (
    <div className="flex items-center justify-between pt-4 pb-6 px-4 max-w-3xl mx-auto w-full">
      {currentStep > 1 ? (
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleBack}
          className="px-5 py-2.5 rounded-xl border-2 border-gray-300 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
        >
          ← Back
        </motion.button>
      ) : (
        <div />
      )}

      {currentStep < 6 && (
        <motion.button
          whileHover={{ scale: canGoNext ? 1.03 : 1 }}
          whileTap={{ scale: canGoNext ? 0.97 : 1 }}
          onClick={canGoNext ? handleNext : undefined}
          className={`px-6 py-2.5 rounded-xl font-bold text-white transition-colors shadow-md ${
            canGoNext
              ? 'bg-purple-600 hover:bg-purple-700 cursor-pointer'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {nextLabel}
        </motion.button>
      )}
    </div>
  )
}
